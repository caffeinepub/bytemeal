import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Hash,
  MapPin,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GlassCard from "../components/GlassCard";
import {
  type Donation,
  type DonationStatus,
  getDonations,
  updateDonationStatus,
} from "../utils/storage";

function StatusBadge({ status }: { status: DonationStatus }) {
  if (status === "available") {
    return (
      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-green-500/20 text-green-300 border border-green-500/30 flex-shrink-0">
        Available
      </span>
    );
  }
  if (status === "accepted") {
    return (
      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex-shrink-0">
        Accepted
      </span>
    );
  }
  return (
    <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-white/10 text-white/50 border border-white/20 flex-shrink-0">
      Collected
    </span>
  );
}

interface DonationCardProps {
  donation: Donation;
  onStatusChange: () => void;
  index: number;
}

function DonationCard({ donation, onStatusChange, index }: DonationCardProps) {
  const handleAccept = () => {
    updateDonationStatus(donation.id, "accepted");
    toast.success("Donation Accepted!", {
      description: `"${donation.foodItems}" has been marked as accepted.`,
      icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
    });
    onStatusChange();
  };

  const handleMarkCollected = () => {
    updateDonationStatus(donation.id, "collected");
    toast.success("Donation Collected!", {
      description: `"${donation.foodItems}" has been marked as collected.`,
      icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
    });
    onStatusChange();
  };

  return (
    <GlassCard className="p-5 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-400/15 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-base leading-tight">
              {donation.foodItems}
            </h3>
            <span className="text-white/50 text-xs">Food Donation</span>
          </div>
        </div>
        <StatusBadge status={donation.status} />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
            <Hash className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div>
            <div className="text-white/40 text-xs">Quantity</div>
            <div className="text-white/90 text-sm font-medium">
              {donation.quantity} units
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-400/10 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div>
            <div className="text-white/40 text-xs">Donor</div>
            <div className="text-white/90 text-sm font-medium truncate max-w-[90px]">
              {donation.donorName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <div className="w-7 h-7 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div>
            <div className="text-white/40 text-xs">Pickup Location</div>
            <div className="text-white/90 text-sm font-medium">
              {donation.pickupLocation}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {donation.status === "available" && (
        <button
          type="button"
          onClick={handleAccept}
          data-ocid={`listings.accept.button.${index}`}
          className="btn-sky w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-1"
        >
          <CheckCircle2 className="w-4 h-4" />
          Accept Donation
        </button>
      )}

      {donation.status === "accepted" && (
        <button
          type="button"
          onClick={handleMarkCollected}
          data-ocid={`listings.collect.button.${index}`}
          className="btn-orange w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-1"
        >
          <Package className="w-4 h-4" />
          Mark as Collected
        </button>
      )}

      {donation.status === "collected" && (
        <div className="flex items-center justify-center gap-2 py-2 text-white/40 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>Food Collected</span>
        </div>
      )}
    </GlassCard>
  );
}

export default function FoodListings() {
  const [donations, setDonations] = useState<Donation[]>(() =>
    getDonations().reverse(),
  );

  const loadDonations = () => {
    setDonations(getDonations().reverse());
  };

  const availableCount = donations.filter(
    (d) => d.status === "available",
  ).length;
  const acceptedCount = donations.filter((d) => d.status === "accepted").length;
  const collectedCount = donations.filter(
    (d) => d.status === "collected",
  ).length;

  return (
    <section className="page-section">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl btn-orange mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Food <span className="text-gradient-orange">Listings</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Browse and manage food donations. NGOs can accept and mark donations
            as collected.
          </p>
        </div>

        {/* Status Summary Pills */}
        {donations.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/25 text-green-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              {availableCount} Available
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/15 border border-sky-500/25 text-sky-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              {acceptedCount} Accepted
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/50 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-white/40 inline-block" />
              {collectedCount} Collected
            </span>
          </div>
        )}

        {/* Content */}
        {donations.length === 0 ? (
          <GlassCard strong className="p-10 text-center max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-white text-xl mb-2">
              No Listings Yet
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Be the first to donate food and help someone in need.
            </p>
            <Link
              to="/donate"
              data-ocid="listings.donate.primary_button"
              className="btn-orange inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              Donate Food
            </Link>
          </GlassCard>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="listings.list"
          >
            {donations.map((donation, idx) => (
              <DonationCard
                key={donation.id}
                donation={donation}
                onStatusChange={loadDonations}
                index={idx + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
