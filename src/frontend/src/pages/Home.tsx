import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HandHeart,
  Leaf,
  Package,
  Truck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import { type Stats, getStats } from "../utils/storage";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Donate Surplus Food",
    description:
      "Restaurants, households, and businesses can donate excess food to those in need.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: HandHeart,
    title: "Request Assistance",
    description:
      "NGOs and individuals can request food assistance for their communities.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    icon: Truck,
    title: "Volunteer Delivery",
    description:
      "Join our network of delivery volunteers to bridge the gap between donors and recipients.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: Leaf,
    title: "Reduce Waste",
    description:
      "Together we can significantly reduce food waste and its environmental impact.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
];

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    donations: 0,
    volunteers: 0,
    ngos: 0,
    requests: 0,
  });

  useEffect(() => {
    setStats(getStats());
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8">
            <Leaf className="w-4 h-4 text-sky-400" />
            <span className="text-white/80 text-sm font-medium">
              Fighting Food Waste Together
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6">
            Byte<span className="text-gradient-orange">Meal</span>
            <br />
            <span className="text-gradient-sky">Zero Hunger</span>
          </h1>

          <p className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Connecting food donors with those in need. Every meal saved is a
            step toward a hunger-free world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/donate"
              data-ocid="home.donate.primary_button"
              className="btn-orange inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold w-full sm:w-auto justify-center"
            >
              <UtensilsCrossed className="w-5 h-5" />
              Donate Food
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/request-help"
              data-ocid="home.request.primary_button"
              className="btn-sky inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold w-full sm:w-auto justify-center"
            >
              <HandHeart className="w-5 h-5" />
              Get Help
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-black text-gradient-orange mb-1">
                {stats.donations}+
              </div>
              <div className="text-white/60 text-sm font-medium">
                Food Donations
              </div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-black text-gradient-sky mb-1">
                {stats.volunteers}+
              </div>
              <div className="text-white/60 text-sm font-medium">
                Volunteers
              </div>
            </GlassCard>
            <GlassCard className="p-6 text-center col-span-2 sm:col-span-1">
              <div className="text-3xl font-black text-gradient-orange mb-1">
                {stats.ngos}+
              </div>
              <div className="text-white/60 text-sm font-medium">
                NGOs Registered
              </div>
            </GlassCard>
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
              A simple, efficient platform connecting food donors, recipients,
              and volunteers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <GlassCard
                key={feature.title}
                className="p-6 hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard strong className="p-8 sm:p-12 text-center">
            <Truck className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Join Our Volunteer Network
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Become a delivery partner and help us get food from donors to
              those who need it most.
            </p>
            <Link
              to="/volunteer"
              data-ocid="home.volunteer.primary_button"
              className="btn-orange inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold"
            >
              <Users className="w-5 h-5" />
              Become a Volunteer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/ngo-register"
              data-ocid="home.ngo.secondary_button"
              className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-400/15 flex items-center justify-center flex-shrink-0">
                <HandHeart className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">
                  NGO Register
                </div>
                <div className="text-white/50 text-xs">
                  Partner with ByteMeal
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-white/60 transition-colors" />
            </Link>

            <Link
              to="/listings"
              data-ocid="home.listings.secondary_button"
              className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-400/15 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">
                  Food Listings
                </div>
                <div className="text-white/50 text-xs">Browse donations</div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-white/60 transition-colors" />
            </Link>

            <Link
              to="/feedback"
              data-ocid="home.feedback.secondary_button"
              className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-400/15 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">
                  Give Feedback
                </div>
                <div className="text-white/50 text-xs">Share your thoughts</div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-white/60 transition-colors" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
