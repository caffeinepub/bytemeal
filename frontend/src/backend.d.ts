import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface NGO {
    id: bigint;
    status: NGOStatus;
    name: string;
    contactPerson: string;
    email: string;
    address: string;
    phoneNumber: string;
    assistanceType: AssistanceType;
}
export interface FoodDonation {
    id: bigint;
    status: DonationStatus;
    foodItems: string;
    donorName: string;
    quantity: bigint;
    pickupLocation: string;
}
export interface UserProfile {
    name: string;
    email: string;
    organization: string;
}
export enum AssistanceType {
    medicalAid = "medicalAid",
    foodDistribution = "foodDistribution",
    education = "education",
    generalRelief = "generalRelief",
    shelter = "shelter"
}
export enum DonationStatus {
    available = "available",
    collected = "collected",
    accepted = "accepted"
}
export enum NGOStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptDonation(donationId: bigint): Promise<void>;
    addFoodDonation(donorName: string, foodItems: string, quantity: bigint, pickupLocation: string): Promise<void>;
    addNGO(name: string, contactPerson: string, email: string, phoneNumber: string, address: string, assistanceType: AssistanceType): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteNGO(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDonationStatus(id: bigint): Promise<DonationStatus | null>;
    getFoodDonations(): Promise<Array<FoodDonation>>;
    getNGOStatus(id: bigint): Promise<NGOStatus | null>;
    getNGOs(): Promise<Array<NGO>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markDonationAsCollected(donationId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateNGO(id: bigint, name: string, contactPerson: string, email: string, phoneNumber: string, address: string, assistanceType: AssistanceType): Promise<void>;
    updateNGOStatus(id: bigint, newStatus: NGOStatus): Promise<void>;
}
