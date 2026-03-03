import {
  Briefcase,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GlassCard from "../components/GlassCard";
import { addVolunteer } from "../utils/storage";

interface FormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  preferredRole: string;
}

const initialForm: FormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  location: "",
  preferredRole: "",
};

const roleOptions = [
  { value: "", label: "Select a role..." },
  { value: "Delivery Driver", label: "Delivery Driver" },
  { value: "Food Sorter/Packer", label: "Food Sorter / Packer" },
  { value: "Volunteer Coordinator", label: "Volunteer Coordinator" },
  { value: "Community Outreach", label: "Community Outreach" },
];

export default function VolunteerForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.preferredRole)
      newErrors.preferredRole = "Please select a preferred role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    addVolunteer({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
      location: form.location.trim(),
      preferredRole: form.preferredRole,
    });

    toast.success("Registration Successful!", {
      description: `Welcome to the ByteMeal volunteer network, ${form.fullName}!`,
      duration: 5000,
      icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
    });

    setForm(initialForm);
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <section className="page-section">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl btn-orange mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Volunteer <span className="text-gradient-orange">Registration</span>
          </h1>
          <p className="text-white/60 text-lg">
            Join our network of dedicated volunteers making a difference every
            day.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="form-label flex items-center gap-2"
              >
                <User className="w-4 h-4 text-orange-400" />
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                data-ocid="volunteer.name.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                autoComplete="name"
              />
              {errors.fullName && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="volunteer.name.error_state"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="form-label flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-orange-400" />
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                data-ocid="volunteer.email.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                autoComplete="email"
              />
              {errors.email && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="volunteer.email.error_state"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="form-label flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                Phone Number *
              </label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                data-ocid="volunteer.phone.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                autoComplete="tel"
              />
              {errors.phoneNumber && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="volunteer.phone.error_state"
                >
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="form-label flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-orange-400" />
                Location / City *
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Your city or area"
                data-ocid="volunteer.location.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.location && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="volunteer.location.error_state"
                >
                  {errors.location}
                </p>
              )}
            </div>

            {/* Preferred Role */}
            <div>
              <label
                htmlFor="preferredRole"
                className="form-label flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-orange-400" />
                Preferred Role *
              </label>
              <select
                id="preferredRole"
                name="preferredRole"
                value={form.preferredRole}
                onChange={handleChange}
                data-ocid="volunteer.role.select"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer"
              >
                {roleOptions.map((role) => (
                  <option
                    key={role.value}
                    value={role.value}
                    className="bg-gray-900 text-white"
                  >
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.preferredRole && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="volunteer.role.error_state"
                >
                  {errors.preferredRole}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              data-ocid="volunteer.submit_button"
              disabled={isSubmitting}
              className="btn-orange w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Users className="w-5 h-5" />
              Register as Volunteer
            </button>
          </form>
        </GlassCard>

        <p className="text-center text-white/40 text-sm mt-4">
          By registering, you agree to our volunteer guidelines and code of
          conduct.
        </p>
      </div>
    </section>
  );
}
