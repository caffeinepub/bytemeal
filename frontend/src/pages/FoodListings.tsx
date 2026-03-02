import { Link } from '@tanstack/react-router';
import { Package, User, Calendar, Scale, ShoppingBag, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useGetDonations } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { Donation } from '../hooks/useQueries';

function formatExpiryDate(nanoseconds: bigint): string {
  const milliseconds = Number(nanoseconds / 1_000_000n);
  const date = new Date(milliseconds);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function DonationCard({ donation }: { donation: Donation }) {
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
              {donation.foodItem}
            </h3>
            <span className="text-white/50 text-xs">Food Donation</span>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 status-completed">
          Available
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-sky/10 flex items-center justify-center flex-shrink-0">
            <Scale className="w-3.5 h-3.5 text-brand-sky" />
          </div>
          <div>
            <div className="text-white/40 text-xs">Quantity</div>
            <div className="text-white/90 text-sm font-medium">
              {donation.quantity.toString()} {donation.unit}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-brand-orange" />
          </div>
          <div>
            <div className="text-white/40 text-xs">Donor ID</div>
            <div className="text-white/90 text-sm font-medium truncate max-w-[80px]">
              {donation.donorId}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <div className="w-7 h-7 rounded-lg bg-brand-sky/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-3.5 h-3.5 text-brand-sky" />
          </div>
          <div>
            <div className="text-white/40 text-xs">Expires</div>
            <div className="text-white/90 text-sm font-medium">
              {formatExpiryDate(donation.expiryDate)}
            </div>
          </div>
        </div>
      </div>
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
        </GlassCard>
      ))}
    </div>
  );
}

export default function FoodListings() {
  const { data: donations, isLoading, isError } = useGetDonations();

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
            Browse available food donations from generous donors in your community.
          </p>
        </div>

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
              <Package className="w-4 h-4" />
              Donate Food
            </Link>
          </GlassCard>
        ) : (
          <>
            {/* Count badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/60 text-sm">
                Showing <span className="text-white font-semibold">{donations.length}</span> available donation{donations.length !== 1 ? 's' : ''}
              </span>
              <Link
                to="/donate"
                className="btn-orange inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              >
                <Package className="w-4 h-4" />
                Add Donation
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {donations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
