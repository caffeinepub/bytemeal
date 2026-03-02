import { Link } from '@tanstack/react-router';
import {
  Package,
  MapPin,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
  Loader2,
  User,
  Hash,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useGetFoodDonations, useAcceptDonation, useMarkDonationAsCollected } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { DonationStatus, type FoodDonation } from '../backend';
import { toast } from 'sonner';

function StatusBadge({ status }: { status: DonationStatus }) {
  if (status === DonationStatus.available) {
    return (
      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-green-500/20 text-green-300 border border-green-500/30 flex-shrink-0">
        Available
      </span>
    );
  }
  if (status === DonationStatus.accepted) {
    return (
      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-brand-sky/20 text-brand-sky border border-brand-sky/30 flex-shrink-0">
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

function DonationCard({ donation }: { donation: FoodDonation }) {
  const acceptDonation = useAcceptDonation();
  const markCollected = useMarkDonationAsCollected();

  const handleAccept = async () => {
    try {
      await acceptDonation.mutateAsync(donation.id);
      toast.success('Donation Accepted!', {
        description: `"${donation.foodItems}" has been marked as accepted.`,
        icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
      });
    } catch {
      toast.error('Action Failed', {
        description: 'Could not accept this donation. Please try again.',
      });
    }
  };

  const handleMarkCollected = async () => {
    try {
      await markCollected.mutateAsync(donation.id);
      toast.success('Donation Collected!', {
        description: `"${donation.foodItems}" has been marked as collected.`,
        icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
      });
    } catch {
      toast.error('Action Failed', {
        description: 'Could not mark this donation as collected. Please try again.',
      });
    }
  };

  const isAccepting = acceptDonation.isPending;
  const isCollecting = markCollected.isPending;

  return (
    <GlassCard className="p-5 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/15 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-5 h-5 text-brand-orange" />
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
          <div className="w-7 h-7 rounded-lg bg-brand-sky/10 flex items-center justify-center flex-shrink-0">
            <Hash className="w-3.5 h-3.5 text-brand-sky" />
          </div>
          <div>
            <div className="text-white/40 text-xs">Quantity</div>
            <div className="text-white/90 text-sm font-medium">
              {donation.quantity.toString()} units
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-brand-orange" />
          </div>
          <div>
            <div className="text-white/40 text-xs">Donor</div>
            <div className="text-white/90 text-sm font-medium truncate max-w-[90px]">
              {donation.donorName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <div className="w-7 h-7 rounded-lg bg-brand-sky/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-brand-sky" />
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
      {donation.status === DonationStatus.available && (
        <button
          onClick={handleAccept}
          disabled={isAccepting}
          className="btn-sky w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-1"
        >
          {isAccepting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Accepting...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Accept Donation
            </>
          )}
        </button>
      )}

      {donation.status === DonationStatus.accepted && (
        <button
          onClick={handleMarkCollected}
          disabled={isCollecting}
          className="btn-orange w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-1"
        >
          {isCollecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Marking...
            </>
          ) : (
            <>
              <Package className="w-4 h-4" />
              Mark as Collected
            </>
          )}
        </button>
      )}

      {donation.status === DonationStatus.collected && (
        <div className="flex items-center justify-center gap-2 py-2 text-white/40 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>Food Collected</span>
        </div>
      )}
    </GlassCard>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <GlassCard key={i} className="p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl bg-white/10" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28 bg-white/10" />
                <Skeleton className="h-3 w-16 bg-white/10" />
              </div>
            </div>
            <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10 rounded-lg bg-white/10" />
            <Skeleton className="h-10 rounded-lg bg-white/10" />
            <Skeleton className="h-10 rounded-lg bg-white/10 col-span-2" />
          </div>
          <Skeleton className="h-10 rounded-xl bg-white/10" />
        </GlassCard>
      ))}
    </div>
  );
}

export default function FoodListings() {
  const { data: donations, isLoading, isError } = useGetFoodDonations();

  const availableCount = donations?.filter(d => d.status === DonationStatus.available).length ?? 0;
  const acceptedCount = donations?.filter(d => d.status === DonationStatus.accepted).length ?? 0;
  const collectedCount = donations?.filter(d => d.status === DonationStatus.collected).length ?? 0;

  return (
    <section className="page-section">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl btn-orange mb-4 shadow-orange-glow">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Food <span className="text-gradient-orange">Listings</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Browse and manage food donations. NGOs can accept and mark donations as collected.
          </p>
        </div>

        {/* Status Summary Pills */}
        {!isLoading && !isError && donations && donations.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/25 text-green-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              {availableCount} Available
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/15 border border-brand-sky/25 text-brand-sky text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-sky inline-block" />
              {acceptedCount} Accepted
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/50 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-white/40 inline-block" />
              {collectedCount} Collected
            </span>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <GlassCard strong className="p-10 text-center max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-white text-xl mb-2">
              Failed to Load Listings
            </h3>
            <p className="text-white/60 text-sm">
              Unable to fetch food listings. Please try again later.
            </p>
          </GlassCard>
        ) : !donations || donations.length === 0 ? (
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
              className="btn-orange inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              Donate Food
            </Link>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {donations.map((donation) => (
              <DonationCard key={donation.id.toString()} donation={donation} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
