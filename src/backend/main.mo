import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type DonationStatus = {
    #available;
    #accepted;
    #collected;
  };

  type NGO = {
    id : Nat;
    name : Text;
    contactPerson : Text;
    email : Text;
    phoneNumber : Text;
    address : Text;
    assistanceType : AssistanceType;
    status : NGOStatus;
  };

  type AssistanceType = {
    #foodDistribution;
    #shelter;
    #medicalAid;
    #education;
    #generalRelief;
  };

  type NGOStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type FoodDonation = {
    id : Nat;
    donorName : Text;
    foodItems : Text;
    quantity : Nat;
    pickupLocation : Text;
    status : DonationStatus;
  };

  public type UserProfile = {
    name : Text;
    organization : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let ngos = List.empty<NGO>();
  let foodDonations = List.empty<FoodDonation>();

  // User profile management

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // NGO management

  public shared ({ caller }) func addNGO(
    name : Text,
    contactPerson : Text,
    email : Text,
    phoneNumber : Text,
    address : Text,
    assistanceType : AssistanceType,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add NGOs");
    };
    let ngo : NGO = {
      id = ngos.size();
      name;
      contactPerson;
      email;
      phoneNumber;
      address;
      assistanceType;
      status = #pending;
    };
    ngos.add(ngo);
  };

  public query ({ caller }) func getNGOs() : async [NGO] {
    ngos.toArray();
  };

  public query ({ caller }) func getNGOStatus(id : Nat) : async ?NGOStatus {
    if (id >= ngos.size()) {
      return null;
    };
    let ngosArray = ngos.toArray();
    ?ngosArray[id].status;
  };

  public shared ({ caller }) func updateNGO(
    id : Nat,
    name : Text,
    contactPerson : Text,
    email : Text,
    phoneNumber : Text,
    address : Text,
    assistanceType : AssistanceType,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update NGOs");
    };
    if (id >= ngos.size()) {
      Runtime.trap("NGO with id " # id.toText() # " does not exist");
    };

    let updatedNGOs = List.empty<NGO>();

    func updateNGOAtIndex(ngo : NGO, index : Nat) {
      if (index == id) {
        updatedNGOs.add({
          id;
          name;
          contactPerson;
          email;
          phoneNumber;
          address;
          assistanceType;
          status = ngo.status;
        });
      } else {
        updatedNGOs.add(ngo);
      };
    };

    var currentIndex = 0;
    ngos.forEach(
      func(ngo) {
        updateNGOAtIndex(ngo, currentIndex);
        currentIndex += 1;
      }
    );

    ngos.clear();
    ngos.addAll(updatedNGOs.values());
  };

  public shared ({ caller }) func deleteNGO(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete NGOs");
    };
    let initialSize = ngos.size();
    let filteredNGOs = ngos.filter(func(ngo) { ngo.id != id });

    if (filteredNGOs.size() == initialSize) {
      Runtime.trap("NGO with id " # id.toText() # " does not exist");
    };

    ngos.clear();
    ngos.addAll(filteredNGOs.values());
  };

  public shared ({ caller }) func updateNGOStatus(id : Nat, newStatus : NGOStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update NGO status");
    };
    if (id >= ngos.size()) {
      Runtime.trap("NGO with id " # id.toText() # " does not exist");
    };

    let updatedNGOs = ngos.map<NGO, NGO>(
      func(ngo) {
        if (ngo.id == id) {
          { ngo with status = newStatus };
        } else {
          ngo;
        };
      }
    );

    ngos.clear();
    ngos.addAll(updatedNGOs.values());
  };

  // Food donation management

  public query ({ caller }) func getFoodDonations() : async [FoodDonation] {
    foodDonations.toArray();
  };

  public shared ({ caller }) func addFoodDonation(
    donorName : Text,
    foodItems : Text,
    quantity : Nat,
    pickupLocation : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add food donations");
    };
    let donation : FoodDonation = {
      id = foodDonations.size();
      donorName;
      foodItems;
      quantity;
      pickupLocation;
      status = #available;
    };
    foodDonations.add(donation);
  };

  public shared ({ caller }) func acceptDonation(donationId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users (NGOs) can accept donations");
    };
    let filteredDonations = foodDonations.filter(func(donation) { donation.id == donationId });
    if (filteredDonations.size() == 0) {
      Runtime.trap("Donation with id " # donationId.toText() # " does not exist");
    };
    let filteredDonationsArray = filteredDonations.toArray();
    if (filteredDonationsArray[0].status != #available) {
      Runtime.trap("Donation is not available");
    };

    let updatedDonations = foodDonations.map<FoodDonation, FoodDonation>(
      func(donation) {
        if (donation.id == donationId) {
          { donation with status = #accepted };
        } else {
          donation;
        };
      }
    );

    foodDonations.clear();
    foodDonations.addAll(updatedDonations.values());
  };

  public shared ({ caller }) func markDonationAsCollected(donationId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users (NGOs) can mark donations as collected");
    };
    let filteredDonations = foodDonations.filter(func(donation) { donation.id == donationId });
    if (filteredDonations.size() == 0) {
      Runtime.trap("Donation with id " # donationId.toText() # " does not exist");
    };
    let filteredDonationsArray = filteredDonations.toArray();
    if (filteredDonationsArray[0].status != #accepted) {
      Runtime.trap("Donation must be accepted before it can be marked as collected");
    };

    let updatedDonations = foodDonations.map<FoodDonation, FoodDonation>(
      func(donation) {
        if (donation.id == donationId) {
          { donation with status = #collected };
        } else {
          donation;
        };
      }
    );

    foodDonations.clear();
    foodDonations.addAll(updatedDonations.values());
  };

  public query ({ caller }) func getDonationStatus(id : Nat) : async ?DonationStatus {
    let filteredDonations = foodDonations.filter(func(donation) { donation.id == id });
    if (filteredDonations.size() == 0) {
      return null;
    };
    let filteredDonationsArray = filteredDonations.toArray();
    ?filteredDonationsArray[0].status;
  };
};
