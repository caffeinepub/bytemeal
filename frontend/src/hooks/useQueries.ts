import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { AssistanceType, NGOStatus } from '../backend';

// ─── Local Types ──────────────────────────────────────────────────────────────

export interface AssistanceRequest {
  id: string;
  recipientName: string;
  numberOfPeople: bigint;
  itemsRequired: string;
  deliveryAddress: string;
}

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  preferredRole: string;
}

// ─── In-memory store (client-side) ───────────────────────────────────────────

let assistanceRequestsStore: AssistanceRequest[] = [];

let volunteersStore: Volunteer[] = [];

// ─── Food Donations (Backend) ─────────────────────────────────────────────────

export function useGetFoodDonations() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['foodDonations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFoodDonations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFoodDonation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      donorName: string;
      foodItems: string;
      quantity: bigint;
      pickupLocation: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addFoodDonation(
        params.donorName,
        params.foodItems,
        params.quantity,
        params.pickupLocation,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foodDonations'] });
    },
  });
}

export function useAcceptDonation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (donationId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.acceptDonation(donationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foodDonations'] });
    },
  });
}

export function useMarkDonationAsCollected() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (donationId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.markDonationAsCollected(donationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foodDonations'] });
    },
  });
}

// ─── Assistance Requests ──────────────────────────────────────────────────────

export function useGetAssistanceRequests() {
  return useQuery<AssistanceRequest[]>({
    queryKey: ['assistanceRequests'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return [...assistanceRequestsStore];
    },
  });
}

export function useAddAssistanceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      recipientName: string;
      numberOfPeople: bigint;
      itemsRequired: string;
      deliveryAddress: string;
    }) => {
      await new Promise((r) => setTimeout(r, 500));
      const newRequest: AssistanceRequest = {
        id: Date.now().toString(),
        ...params,
      };
      assistanceRequestsStore = [...assistanceRequestsStore, newRequest];
      return newRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assistanceRequests'] });
    },
  });
}

// ─── Volunteers ───────────────────────────────────────────────────────────────

export function useGetVolunteers() {
  return useQuery<Volunteer[]>({
    queryKey: ['volunteers'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return [...volunteersStore];
    },
  });
}

export function useAddVolunteer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      fullName: string;
      email: string;
      phoneNumber: string;
      location: string;
      preferredRole: string;
    }) => {
      await new Promise((r) => setTimeout(r, 500));
      const newVolunteer: Volunteer = {
        id: Date.now().toString(),
        ...params,
      };
      volunteersStore = [...volunteersStore, newVolunteer];
      return newVolunteer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });
}

// ─── NGOs ─────────────────────────────────────────────────────────────────────

export function useGetNGOs() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['ngos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNGOs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddNGO() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      contactPerson: string;
      email: string;
      phoneNumber: string;
      address: string;
      assistanceType: AssistanceType;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addNGO(
        params.name,
        params.contactPerson,
        params.email,
        params.phoneNumber,
        params.address,
        params.assistanceType,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngos'] });
    },
  });
}

export function useUpdateNGOStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: bigint; newStatus: NGOStatus }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateNGOStatus(params.id, params.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngos'] });
    },
  });
}
