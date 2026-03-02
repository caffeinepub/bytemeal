import List "mo:core/List";
import Nat "mo:core/Nat";

module {
  type OldActor = {
    ngos : List.List<{
      id : Nat;
      name : Text;
      contactPerson : Text;
      email : Text;
      phoneNumber : Text;
      address : Text;
      assistanceType : {
        #foodDistribution;
        #shelter;
        #medicalAid;
        #education;
        #generalRelief;
      };
      status : {
        #pending;
        #approved;
        #rejected;
      };
    }>;
  };

  type NewActor = {
    ngos : List.List<{
      id : Nat;
      name : Text;
      contactPerson : Text;
      email : Text;
      phoneNumber : Text;
      address : Text;
      assistanceType : {
        #foodDistribution;
        #shelter;
        #medicalAid;
        #education;
        #generalRelief;
      };
      status : {
        #pending;
        #approved;
        #rejected;
      };
    }>;
    foodDonations : List.List<{
      id : Nat;
      donorName : Text;
      foodItems : Text;
      quantity : Nat;
      pickupLocation : Text;
      status : {
        #available;
        #accepted;
        #collected;
      };
    }>;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      foodDonations = List.empty();
    };
  };
};
