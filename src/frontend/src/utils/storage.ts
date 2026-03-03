// ─── localStorage Keys ────────────────────────────────────────────────────────

const KEYS = {
  donations: "bytemeal_donations",
  ngos: "bytemeal_ngos",
  volunteers: "bytemeal_volunteers",
  requests: "bytemeal_requests",
  feedback: "bytemeal_feedback",
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export type DonationStatus = "available" | "accepted" | "collected";

export interface Donation {
  id: string;
  donorName: string;
  foodItems: string;
  quantity: number;
  pickupLocation: string;
  status: DonationStatus;
  createdAt: string;
}

export interface NGO {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  address: string;
  assistanceType: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  preferredRole: string;
  createdAt: string;
}

export interface AssistanceRequest {
  id: string;
  recipientName: string;
  numberOfPeople: number;
  itemsRequired: string;
  deliveryAddress: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ─── Generic helpers ──────────────────────────────────────────────────────────

function getList<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]") as T[];
  } catch {
    return [];
  }
}

function setList<T>(key: string, list: T[]): void {
  localStorage.setItem(key, JSON.stringify(list));
}

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Donations ────────────────────────────────────────────────────────────────

export function getDonations(): Donation[] {
  return getList<Donation>(KEYS.donations);
}

export function addDonation(
  params: Omit<Donation, "id" | "status" | "createdAt">,
): Donation {
  const donation: Donation = {
    ...params,
    id: genId(),
    status: "available",
    createdAt: new Date().toISOString(),
  };
  const list = getDonations();
  setList(KEYS.donations, [...list, donation]);
  return donation;
}

export function updateDonationStatus(id: string, status: DonationStatus): void {
  const list = getDonations().map((d) => (d.id === id ? { ...d, status } : d));
  setList(KEYS.donations, list);
}

// ─── NGOs ─────────────────────────────────────────────────────────────────────

export function getNGOs(): NGO[] {
  return getList<NGO>(KEYS.ngos);
}

export function addNGO(params: Omit<NGO, "id" | "status" | "createdAt">): NGO {
  const ngo: NGO = {
    ...params,
    id: genId(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const list = getNGOs();
  setList(KEYS.ngos, [...list, ngo]);
  return ngo;
}

// ─── Volunteers ───────────────────────────────────────────────────────────────

export function getVolunteers(): Volunteer[] {
  return getList<Volunteer>(KEYS.volunteers);
}

export function addVolunteer(
  params: Omit<Volunteer, "id" | "createdAt">,
): Volunteer {
  const volunteer: Volunteer = {
    ...params,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  const list = getVolunteers();
  setList(KEYS.volunteers, [...list, volunteer]);
  return volunteer;
}

// ─── Assistance Requests ──────────────────────────────────────────────────────

export function getRequests(): AssistanceRequest[] {
  return getList<AssistanceRequest>(KEYS.requests);
}

export function addRequest(
  params: Omit<AssistanceRequest, "id" | "createdAt">,
): AssistanceRequest {
  const request: AssistanceRequest = {
    ...params,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  const list = getRequests();
  setList(KEYS.requests, [...list, request]);
  return request;
}

// ─── Feedback ─────────────────────────────────────────────────────────────────

export function getFeedbacks(): Feedback[] {
  return getList<Feedback>(KEYS.feedback);
}

export function addFeedback(
  params: Omit<Feedback, "id" | "createdAt">,
): Feedback {
  const feedback: Feedback = {
    ...params,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  const list = getFeedbacks();
  setList(KEYS.feedback, [...list, feedback]);
  return feedback;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface Stats {
  donations: number;
  volunteers: number;
  ngos: number;
  requests: number;
}

export function getStats(): Stats {
  return {
    donations: getDonations().length,
    volunteers: getVolunteers().length,
    ngos: getNGOs().length,
    requests: getRequests().length,
  };
}
