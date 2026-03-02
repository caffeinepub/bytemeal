import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ─── Local Types ──────────────────────────────────────────────────────────────

export interface Donation {
  id: string;
  foodItem: string;
  quantity: bigint;
  unit: string;
  donorId: string;
  expiryDate: bigint;
}

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

let donationsStore: Donation[] = [
  {
    id: '1',
    foodItem: 'Basmati Rice',
    quantity: 20n,
    unit: 'kg',
    donorId: 'DONOR-001',
    expiryDate: BigInt(new Date('2026-04-15').getTime()) * 1_000_000n,
  },
  {
    id: '2',
    foodItem: 'Whole Wheat Bread',
    quantity: 50n,
    unit: 'pieces',
    donorId: 'DONOR-002',
    expiryDate: BigInt(new Date('2026-03-20').getTime()) * 1_000_000n,
  },
  {
    id: '3',
    foodItem: 'Fresh Vegetables',
    quantity: 15n,
    unit: 'kg',
    donorId: 'DONOR-003',
    expiryDate: BigInt(new Date('2026-03-10').getTime()) * 1_000_000n,
  },
];

let assistanceRequestsStore: AssistanceRequest[] = [
  {
    id: '1',
    recipientName: 'Hope Foundation',
    numberOfPeople: 50n,
    itemsRequired: 'Rice, Lentils, Cooking Oil',
    deliveryAddress: '123 Hope Street, Eastside',
  },
  {
    id: '2',
    recipientName: 'Community Kitchen',
    numberOfPeople: 30n,
    itemsRequired: 'Bread, Vegetables, Fruits',
    deliveryAddress: '456 Main Ave, Downtown',
  },
];

let volunteersStore: Volunteer[] = [
  {
    id: '1',
    fullName: 'Priya Sharma',
    email: 'priya@example.com',
    phoneNumber: '+91 98765 43210',
    location: 'Mumbai',
    preferredRole: 'Delivery Driver',
  },
  {
    id: '2',
    fullName: 'Rahul Verma',
    email: 'rahul@example.com',
    phoneNumber: '+91 87654 32109',
    location: 'Delhi',
    preferredRole: 'Food Sorter',
  },
  {
    id: '3',
    fullName: 'Anita Patel',
    email: 'anita@example.com',
    phoneNumber: '+91 76543 21098',
    location: 'Bangalore',
    preferredRole: 'Coordinator',
  },
];

// ─── Donations ───────────────────────────────────────────────────────────────

export function useGetDonations() {
  return useQuery<Donation[]>({
    queryKey: ['donations'],
    queryFn: async () => {
      // Simulate async fetch
      await new Promise((r) => setTimeout(r, 300));
      return [...donationsStore];
    },
  });
}

export function useAddDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      foodItem: string;
      quantity: bigint;
      unit: string;
      donorId: string;
      expiryDate: bigint;
    }) => {
      await new Promise((r) => setTimeout(r, 500));
      const newDonation: Donation = {
        id: Date.now().toString(),
        ...params,
      };
      donationsStore = [...donationsStore, newDonation];
      return newDonation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
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
