import {
  Building2,
  CheckCircle2,
  HandHeart,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GlassCard from "../components/GlassCard";
import { addNGO } from "../utils/storage";

interface FormState {
  name: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  address: string;
  assistanceType: string;
}

const initialForm: FormState = {
  name: "",
  contactPerson: "",
  email: "",
  phoneNumber: "",
  address: "",
  assistanceType: "",
};

const assistanceOptions = [
  { label: "Food Distribution", value: "Food Distribution" },
  { label: "Shelter", value: "Shelter" },
  { label: "Medical Aid", value: "Medical Aid" },
  { label: "Education", value: "Education" },
  { label: "General Relief", value: "General Relief" },
];

export default function NGORegistrationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "NGO name is required";
    if (!form.contactPerson.trim())
      newErrors.contactPerson = "Contact person is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.assistanceType)
      newErrors.assistanceType = "Please select type of assistance";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

    addNGO({
      name: form.name.trim(),
      contactPerson: form.contactPerson.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
      address: form.address.trim(),
      assistanceType: form.assistanceType,
    });

    toast.success("NGO Registered Successfully!", {
      description: `${form.name} has been registered as a partner NGO. We will review your application shortly.`,
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
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            NGO <span className="text-gradient-orange">Registration</span>
          </h1>
          <p className="text-white/60 text-lg">
            Register your NGO to partner with ByteMeal and help distribute food
            to those in need.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* NGO Name */}
            <div>
              <label
                htmlFor="ngoName"
                className="form-label flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-orange-400" />
                NGO Name *
              </label>
              <input
                id="ngoName"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., Hope Foundation"
                data-ocid="ngo.name.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.name && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="ngo.name.error_state"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Contact Person */}
            <div>
              <label
                htmlFor="contactPerson"
                className="form-label flex items-center gap-2"
              >
                <User className="w-4 h-4 text-orange-400" />
                Contact Person *
              </label>
              <input
                id="contactPerson"
                type="text"
                name="contactPerson"
                value={form.contactPerson}
                onChange={handleChange}
                placeholder="Full name of the contact person"
                data-ocid="ngo.contact_person.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                autoComplete="name"
              />
              {errors.contactPerson && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="ngo.contact_person.error_state"
                >
                  {errors.contactPerson}
                </p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ngoEmail"
                  className="form-label flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-orange-400" />
                  Email *
                </label>
                <input
                  id="ngoEmail"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ngo@example.com"
                  data-ocid="ngo.email.input"
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                  autoComplete="email"
                />
                {errors.email && (
                  <p
                    className="text-red-400 text-xs mt-1"
                    data-ocid="ngo.email.error_state"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="ngoPhone"
                  className="form-label flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  Phone Number *
                </label>
                <input
                  id="ngoPhone"
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  data-ocid="ngo.phone.input"
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                  autoComplete="tel"
                />
                {errors.phoneNumber && (
                  <p
                    className="text-red-400 text-xs mt-1"
                    data-ocid="ngo.phone.error_state"
                  >
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="ngoAddress"
                className="form-label flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-orange-400" />
                Address *
              </label>
              <textarea
                id="ngoAddress"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full address of the NGO"
                rows={3}
                data-ocid="ngo.address.textarea"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                autoComplete="street-address"
              />
              {errors.address && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="ngo.address.error_state"
                >
                  {errors.address}
                </p>
              )}
            </div>

            {/* Type of Assistance */}
            <div>
              <label
                htmlFor="assistanceType"
                className="form-label flex items-center gap-2"
              >
                <HandHeart className="w-4 h-4 text-orange-400" />
                Type of Assistance Needed *
              </label>
              <select
                id="assistanceType"
                name="assistanceType"
                value={form.assistanceType}
                onChange={handleChange}
                data-ocid="ngo.assistance_type.select"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-900 text-white">
                  Select type of assistance
                </option>
                {assistanceOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-gray-900 text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.assistanceType && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="ngo.assistance_type.error_state"
                >
                  {errors.assistanceType}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              data-ocid="ngo.submit_button"
              disabled={isSubmitting}
              className="btn-orange w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Building2 className="w-5 h-5" />
              Register NGO
            </button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
