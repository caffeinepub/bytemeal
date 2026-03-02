import { Link } from '@tanstack/react-router';
import {
  UtensilsCrossed,
  Heart,
  Truck,
  Users,
  Leaf,
  HandHeart,
  ArrowRight,
  Package,
  MapPin,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Donate Surplus Food',
    description: 'Restaurants, households, and businesses can donate excess food to those in need.',
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
  },
  {
    icon: HandHeart,
    title: 'Request Assistance',
    description: 'NGOs and individuals can request food assistance for their communities.',
    color: 'text-brand-sky',
    bg: 'bg-brand-sky/10',
  },
  {
    icon: Truck,
    title: 'Volunteer Delivery',
    description: 'Join our network of delivery volunteers to bridge the gap between donors and recipients.',
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
  },
  {
    icon: Leaf,
    title: 'Reduce Waste',
    description: 'Together we can significantly reduce food waste and its environmental impact.',
    color: 'text-brand-sky',
    bg: 'bg-brand-sky/10',
  },
];

const stats = [
  { value: '10K+', label: 'Meals Saved', icon: Package },
  { value: '500+', label: 'Active Donors', icon: Heart },
  { value: '200+', label: 'Volunteers', icon: Users },
  { value: '50+', label: 'Cities Covered', icon: MapPin },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Leaf className="w-4 h-4 text-brand-sky" />
            <span className="text-white/80 text-sm font-medium">Fighting Food Waste Together</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6 animate-fade-in">
            Byte<span className="text-gradient-orange">Meal</span>
            <br />
            <span className="text-gradient-sky">Zero Hunger</span>
          </h1>

          <p className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Connecting food donors with those in need. Every meal saved is a step toward a hunger-free world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
            <Link
              to="/donate"
              className="btn-orange inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold w-full sm:w-auto justify-center"
            >
              <UtensilsCrossed className="w-5 h-5" />
              Donate Food
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/request-help"
              className="btn-sky inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold w-full sm:w-auto justify-center"
            >
              <HandHeart className="w-5 h-5" />
              Get Help
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="p-4 text-center">
                <stat.icon className="w-5 h-5 text-brand-orange mx-auto mb-2" />
                <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
                <div className="text-white/60 text-xs mt-1">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              How <span className="text-gradient-orange">ByteMeal</span> Works
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              A simple, efficient platform connecting food donors, recipients, and volunteers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <GlassCard key={feature.title} className="p-6 hover:scale-105 transition-transform duration-300">
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard strong className="p-8 sm:p-12 text-center">
            <Truck className="w-12 h-12 text-brand-orange mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Join Our Volunteer Network
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Become a delivery partner and help us get food from donors to those who need it most.
            </p>
            <Link
              to="/volunteer"
              className="btn-orange inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold"
            >
              <Users className="w-5 h-5" />
              Become a Volunteer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
