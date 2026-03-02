import { useState } from 'react';
import { Building2, User, Mail, Phone, MapPin, HandHeart, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../components/GlassCard';
import { useAddNGO } from '../hooks/useQueries';
import { AssistanceType } from '../backend';

interface FormState {
  name: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  address: string;
  assistanceType: string;
}

const initialForm: FormState = {
  name: '',
  contactPerson: '',
  email: '',
  phoneNumber: '',
  address: '',
  assistanceType: '',
};

const assistanceOptions: { label: string; value: AssistanceType }[] = [
  { label: 'Food Distribution', value: AssistanceType.foodDistribution },
  { label: 'Shelter', value: AssistanceType.shelter },
  { label: 'Medical Aid', value: AssistanceType.medicalAid },
  { label: 'Education', value: AssistanceType.education },
  { label: 'General Relief', value: AssistanceType.generalRelief },
];

export default function NGORegistrationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const addNGO = useAddNGO();

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'NGO name is required';
    if (!form.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.assistanceType) newErrors.assistanceType = 'Please select type of assistance';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
      await addNGO.mutateAsync({
        name: form.name.trim(),
        contactPerson: form.contactPerson.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        address: form.address.trim(),
        assistanceType: form.assistanceType as AssistanceType,
      });
      toast.success('NGO Registered Successfully!', {
        description: `${form.name} has been registered as a partner NGO.`,
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
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            NGO <span className="text-gradient-orange">Registration</span>
          </h1>
          <p className="text-white/60 text-lg">
            Register your NGO to partner with ByteMeal and help distribute food to those in need.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NGO Name */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-orange" />
                NGO Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., Hope Foundation"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Contact Person */}
            <div>
              <label className="form-label flex items-center gap-2">
                <User className="w-4 h-4 text-brand-orange" />
                Contact Person *
              </label>
              <input
                type="text"
                name="contactPerson"
                value={form.contactPerson}
                onChange={handleChange}
                placeholder="Full name of the contact person"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.contactPerson && (
                <p className="text-red-400 text-xs mt-1">{errors.contactPerson}</p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-orange" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ngo@example.com"
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
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
                  placeholder="+91 XXXXX XXXXX"
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                />
                {errors.phoneNumber && (
                  <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="form-label flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-orange" />
                Address *
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full address of the NGO"
                rows={3}
                className="glass-input w-full px-4 py-3 rounded-xl text-sm resize-none"
              />
              {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Type of Assistance */}
            <div>
              <label className="form-label flex items-center gap-2">
                <HandHeart className="w-4 h-4 text-brand-orange" />
                Type of Assistance Needed *
              </label>
              <select
                name="assistanceType"
                value={form.assistanceType}
                onChange={handleChange}
                className="glass-input w-full px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-900 text-white">
                  Select type of assistance
                </option>
                {assistanceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.assistanceType && (
                <p className="text-red-400 text-xs mt-1">{errors.assistanceType}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={addNGO.isPending}
              className="btn-orange w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {addNGO.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <Building2 className="w-5 h-5" />
                  Register NGO
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
