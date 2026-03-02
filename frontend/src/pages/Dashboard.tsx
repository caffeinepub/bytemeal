import {
  User,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Package,
  Calendar,
  Star,
  TrendingUp,
  Heart,
  Users,
  BarChart3,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetDonations, useGetVolunteers, useGetAssistanceRequests } from '../hooks/useQueries';

const assignedTasks = [
  {
    id: 1,
    title: 'Food Collection',
    location: 'Green Market, Downtown',
    due: 'Due Today',
    status: 'pending' as const,
    icon: Package,
    priority: 'High',
  },
  {
    id: 2,
    title: 'Delivery to NGO',
    location: 'Hope Foundation, Eastside',
    due: 'Tomorrow, 10:00 AM',
    status: 'inprogress' as const,
    icon: Truck,
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Warehouse Sorting',
    location: 'Central Warehouse',
    due: 'Mar 5, 2026',
    status: 'completed' as const,
    icon: Package,
    priority: 'Low',
  },
];

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'status-pending',
    icon: AlertCircle,
  },
  inprogress: {
    label: 'In Progress',
    className: 'status-inprogress',
    icon: Clock,
  },
  completed: {
    label: 'Completed',
    className: 'status-completed',
    icon: CheckCircle2,
  },
};

interface StatCardProps {
  icon: React.ElementType;
  count: number | undefined;
  label: string;
  isLoading: boolean;
  accentClass: string;
  iconBgClass: string;
}

function StatCard({ icon: Icon, count, label, isLoading, accentClass, iconBgClass }: StatCardProps) {
  return (
    <GlassCard strong className="p-5 flex flex-col gap-3">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBgClass}`}>
        <Icon className={`w-5 h-5 ${accentClass}`} />
      </div>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-16 bg-white/10" />
          <Skeleton className="h-3 w-24 bg-white/10" />
        </div>
      ) : (
        <>
          <div className={`font-display font-bold text-3xl ${accentClass}`}>
            {count ?? 0}
          </div>
          <div className="text-white/60 text-sm font-medium">{label}</div>
        </>
      )}
    </GlassCard>
  );
}

export default function Dashboard() {
  const { data: donations, isLoading: donationsLoading } = useGetDonations();
  const { data: volunteers, isLoading: volunteersLoading } = useGetVolunteers();
  const { data: requests, isLoading: requestsLoading } = useGetAssistanceRequests();

  const donationCount = donations?.length;
  const volunteerCount = volunteers?.length;
  const requestCount = requests?.length;

  return (
    <section className="page-section">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl btn-orange flex items-center justify-center shadow-orange-glow">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Welcome, <span className="text-gradient-orange">User</span> 👋
              </h1>
              <p className="text-white/60 text-sm">Food Coordinator · ByteMeal Network</p>
            </div>
          </div>
        </div>

        {/* Live Stats Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-brand-sky" />
            <h2 className="font-display font-semibold text-white/80 text-sm uppercase tracking-wider">
              Live Platform Stats
            </h2>
            <span className="flex items-center gap-1 text-xs text-brand-sky/70 bg-brand-sky/10 px-2 py-0.5 rounded-full border border-brand-sky/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-sky animate-pulse inline-block" />
              Live
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={Heart}
              count={donationCount}
              label="Total Donations"
              isLoading={donationsLoading}
              accentClass="text-brand-orange"
              iconBgClass="bg-brand-orange/15"
            />
            <StatCard
              icon={AlertCircle}
              count={requestCount}
              label="Assistance Requests"
              isLoading={requestsLoading}
              accentClass="text-brand-sky"
              iconBgClass="bg-brand-sky/15"
            />
            <StatCard
              icon={Users}
              count={volunteerCount}
              label="Registered Volunteers"
              isLoading={volunteersLoading}
              accentClass="text-brand-orange"
              iconBgClass="bg-brand-orange/15"
            />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <Package className="w-6 h-6 text-brand-orange mx-auto mb-2" />
            <div className="font-display font-bold text-2xl text-white">{donationCount ?? 0}</div>
            <div className="text-white/60 text-xs">Donations</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <User className="w-6 h-6 text-brand-sky mx-auto mb-2" />
            <div className="font-display font-bold text-2xl text-white">{volunteerCount ?? 0}</div>
            <div className="text-white/60 text-xs">Volunteers</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <Truck className="w-6 h-6 text-brand-orange mx-auto mb-2" />
            <div className="font-display font-bold text-2xl text-white">{requestCount ?? 0}</div>
            <div className="text-white/60 text-xs">Requests</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-brand-sky mx-auto mb-2" />
            <div className="font-display font-bold text-2xl text-white">
              {assignedTasks.filter((t) => t.status === 'completed').length}
            </div>
            <div className="text-white/60 text-xs">Tasks Done</div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <GlassCard strong className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display font-semibold text-white text-lg">Your Profile</h2>
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full btn-orange flex items-center justify-center shadow-orange-glow mb-3">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-white text-lg">Alex Johnson</h3>
                <span className="text-xs px-3 py-1 rounded-full status-pending mt-1 font-medium">
                  Food Coordinator
                </span>
              </div>

              {/* Profile Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">Email</div>
                    <div className="text-white/80">alex@bytemeal.org</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-brand-sky/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-brand-sky" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">Phone</div>
                    <div className="text-white/80">+1 (555) 012-3456</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">Location</div>
                    <div className="text-white/80">San Francisco, CA</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-brand-sky/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-brand-sky" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">Role</div>
                    <div className="text-white/80">Food Coordinator</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Assigned Tasks */}
          <div className="lg:col-span-2">
            <GlassCard strong className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-brand-sky" />
                  <h2 className="font-display font-semibold text-white text-lg">Assigned Tasks</h2>
                </div>
                <span className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full">
                  {assignedTasks.length} tasks
                </span>
              </div>

              <div className="space-y-4">
                {assignedTasks.map((task) => {
                  const config = statusConfig[task.status];
                  const StatusIcon = config.icon;
                  const TaskIcon = task.icon;

                  return (
                    <div
                      key={task.id}
                      className="glass-card p-4 rounded-xl flex items-start gap-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                        <TaskIcon className="w-5 h-5 text-brand-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <h3 className="font-semibold text-white text-sm">{task.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${config.className}`}>
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-white/40" />
                          <span className="text-white/50 text-xs">{task.location}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-brand-sky" />
                            <span className="text-brand-sky text-xs font-medium">{task.due}</span>
                          </div>
                          <span className="text-white/30 text-xs">·</span>
                          <span className="text-white/40 text-xs">Priority: {task.priority}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
