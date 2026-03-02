import { toast } from 'sonner';
import { CheckCircle, XCircle, Clock, Building2, User, Mail, Tag } from 'lucide-react';
import { NGOStatus } from '../backend';
import { useGetNGOs, useUpdateNGOStatus } from '../hooks/useQueries';
import GlassCard from '../components/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

function assistanceTypeLabel(type: string): string {
  const map: Record<string, string> = {
    foodDistribution: 'Food Distribution',
    shelter: 'Shelter',
    medicalAid: 'Medical Aid',
    education: 'Education',
    generalRelief: 'General Relief',
  };
  return map[type] ?? type;
}

function StatusBadge({ status }: { status: NGOStatus }) {
  if (status === NGOStatus.approved) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
        <CheckCircle className="w-3.5 h-3.5" />
        Approved
      </span>
    );
  }
  if (status === NGOStatus.rejected) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
        <XCircle className="w-3.5 h-3.5" />
        Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">
      <Clock className="w-3.5 h-3.5" />
      Pending
    </span>
  );
}

export default function AdminNGOApproval() {
  const { data: ngos, isLoading, isError } = useGetNGOs();
  const updateStatus = useUpdateNGOStatus();

  function handleApprove(id: bigint, name: string) {
    updateStatus.mutate(
      { id, newStatus: NGOStatus.approved },
      {
        onSuccess: () => toast.success(`✅ "${name}" has been approved!`),
        onError: () => toast.error('Failed to approve NGO. Please try again.'),
      },
    );
  }

  function handleReject(id: bigint, name: string) {
    updateStatus.mutate(
      { id, newStatus: NGOStatus.rejected },
      {
        onSuccess: () => toast.error(`❌ "${name}" has been rejected.`),
        onError: () => toast.error('Failed to reject NGO. Please try again.'),
      },
    );
  }

  return (
    <section className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl btn-orange shadow-orange-glow mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
            NGO <span className="text-gradient-orange">Approval Panel</span>
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Review and manage NGO registration requests. Approve or reject pending applications.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GlassCard key={i} className="p-6 space-y-4">
                <Skeleton className="h-5 w-3/4 bg-white/10" />
                <Skeleton className="h-4 w-1/2 bg-white/10" />
                <Skeleton className="h-4 w-2/3 bg-white/10" />
                <Skeleton className="h-4 w-1/3 bg-white/10" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-9 w-24 bg-white/10 rounded-lg" />
                  <Skeleton className="h-9 w-24 bg-white/10 rounded-lg" />
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <GlassCard className="p-8 text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-white/70 text-lg">Failed to load NGOs. Please refresh the page.</p>
          </GlassCard>
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!ngos || ngos.length === 0) && (
          <GlassCard className="p-12 text-center">
            <Building2 className="w-14 h-14 text-white/30 mx-auto mb-4" />
            <h3 className="text-white/70 text-xl font-semibold mb-2">No NGOs Registered Yet</h3>
            <p className="text-white/40 text-sm">NGO registration requests will appear here for review.</p>
          </GlassCard>
        )}

        {/* NGO Cards Grid */}
        {!isLoading && !isError && ngos && ngos.length > 0 && (
          <>
            {/* Summary counts */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <span className="glass-card px-4 py-2 rounded-full text-sm text-white/80">
                Total: <strong className="text-white">{ngos.length}</strong>
              </span>
              <span className="glass-card px-4 py-2 rounded-full text-sm text-orange-300">
                Pending: <strong>{ngos.filter((n) => n.status === NGOStatus.pending).length}</strong>
              </span>
              <span className="glass-card px-4 py-2 rounded-full text-sm text-emerald-300">
                Approved: <strong>{ngos.filter((n) => n.status === NGOStatus.approved).length}</strong>
              </span>
              <span className="glass-card px-4 py-2 rounded-full text-sm text-red-300">
                Rejected: <strong>{ngos.filter((n) => n.status === NGOStatus.rejected).length}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ngos.map((ngo) => {
                const isPending = ngo.status === NGOStatus.pending;
                const isUpdating =
                  updateStatus.isPending && updateStatus.variables?.id === ngo.id;

                return (
                  <GlassCard key={ngo.id.toString()} className="p-6 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl btn-orange flex-shrink-0 flex items-center justify-center shadow-orange-glow">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-bold text-white text-base leading-tight truncate">
                          {ngo.name}
                        </h3>
                      </div>
                      <StatusBadge status={ngo.status} />
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-white/70">
                        <User className="w-4 h-4 flex-shrink-0 text-brand-sky" />
                        <span className="truncate">{ngo.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Mail className="w-4 h-4 flex-shrink-0 text-brand-sky" />
                        <span className="truncate">{ngo.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Tag className="w-4 h-4 flex-shrink-0 text-brand-orange" />
                        <span>{assistanceTypeLabel(ngo.assistanceType as unknown as string)}</span>
                      </div>
                    </div>

                    {/* Action Buttons — only for pending */}
                    {isPending && (
                      <div className="flex gap-2 pt-1 mt-auto">
                        <Button
                          size="sm"
                          className="flex-1 btn-orange text-white font-semibold rounded-lg border-0 hover:opacity-90 transition-opacity"
                          disabled={isUpdating}
                          onClick={() => handleApprove(ngo.id, ngo.name)}
                        >
                          {isUpdating ? (
                            <span className="flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              Approving…
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </span>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-500/40 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-lg transition-colors"
                          disabled={isUpdating}
                          onClick={() => handleReject(ngo.id, ngo.name)}
                        >
                          {isUpdating ? (
                            <span className="flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 border-2 border-red-400/40 border-t-red-300 rounded-full animate-spin" />
                              Rejecting…
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <XCircle className="w-4 h-4" />
                              Reject
                            </span>
                          )}
                        </Button>
                      </div>
                    )}
                  </GlassCard>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
