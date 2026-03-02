import { useState } from 'react';
import { Users, User, Mail, Phone, MapPin, Briefcase, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../components/GlassCard';
import { useAddVolunteer } from '../hooks/useQueries';

interface FormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  preferredRole: string;
}

const initialForm: FormState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  location: '',
  preferredRole: '',
};

const roleOptions = [
  { value: '', label: 'Select a role...' },
  { value: 'Delivery Driver', label: 'Delivery Driver' },
  { value: 'Food Sorter', label: 'Food Sorter / Packer' },
  { value: 'Coordinator', label: 'Volunteer Coordinator' },
  { value: 'Community Outreach', label: 'Community Outreach' },
];

export default function VolunteerForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const addVolunteer = useAddVolunteer();

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.preferredRole) newErrors.preferredRole = 'Please select a preferred role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await addVolunteer.mutateAsync({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        location: form.location.trim(),
        preferredRole: form.preferredRole,
      });
      toast.success('Registration Successful!', {
        description: `Welcome to the ByteMeal volunteer network, ${form.fullName}!`,
        duration: 5000,
        icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
      });
      setForm(initialForm);
      setErrors({});
    } catch {
      toast.error('Registration Failed', {
        description: 'Please try again. If the problem persists, contact support.',
      });
    }
  };

  return (
    <section className="page-section">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl btn-orange mb-4 shadow-orange-glow">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Volunteer <span className="text-gradient-orange">Registration</span>
          </h1>
          <p className="text-white/60 text-lg">
            Join our network of dedicated volunteers making a difference every day.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="form-label flex items-center gap-2">
                <User className="w-4 h-4 text-brand-orange" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-orange" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-orange" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="form-label flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-orange" />
                Location / City *
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Your city or area"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.location && (
                <p className="text-red-400 text-xs mt-1">{errors.location}</p>
              )}
            </div>

            {/* Preferred Role */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-brand-orange" />
                Preferred Role *
              </label>
              <select
                name="preferredRole"
                value={form.preferredRole}
                onChange={handleChange}
                className="glass-input w-full px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer"
              >
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value} className="bg-gray-900 text-white">
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.preferredRole && (
                <p className="text-red-400 text-xs mt-1">{errors.preferredRole}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={addVolunteer.isPending}
              className="btn-orange w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {addVolunteer.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <Users className="w-5 h-5" />
                  Register as Volunteer
                </>
              )}
            </button>
          </form>
        </GlassCard>

        <p className="text-center text-white/40 text-sm mt-4">
          By registering, you agree to our volunteer guidelines and code of conduct.
        </p>
      </div>
    </section>
  );
}
