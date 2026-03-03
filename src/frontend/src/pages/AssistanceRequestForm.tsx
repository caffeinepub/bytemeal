import {
  CheckCircle2,
  HandHeart,
  MapPin,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GlassCard from "../components/GlassCard";
import { addRequest } from "../utils/storage";

interface FormState {
  recipientName: string;
  numberOfPeople: string;
  itemsRequired: string;
  deliveryAddress: string;
}

const initialForm: FormState = {
  recipientName: "",
  numberOfPeople: "",
  itemsRequired: "",
  deliveryAddress: "",
};

export default function AssistanceRequestForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.recipientName.trim())
      newErrors.recipientName = "Recipient name is required";
    if (!form.numberOfPeople || Number(form.numberOfPeople) <= 0)
      newErrors.numberOfPeople = "Please enter a valid number of people";
    if (!form.itemsRequired.trim())
      newErrors.itemsRequired = "Items required field cannot be empty";
    if (!form.deliveryAddress.trim())
      newErrors.deliveryAddress = "Delivery address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

    addRequest({
      recipientName: form.recipientName.trim(),
      numberOfPeople: Number(form.numberOfPeople),
      itemsRequired: form.itemsRequired.trim(),
      deliveryAddress: form.deliveryAddress.trim(),
    });

    toast.success("Request Submitted!", {
      description:
        "Your assistance request has been received. We will contact you shortly.",
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl btn-sky mb-4">
            <HandHeart className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Assistance <span className="text-gradient-sky">Request Form</span>
          </h1>
          <p className="text-white/60 text-lg">
            NGOs and individuals can request food assistance for their
            communities.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Recipient Name */}
            <div>
              <label
                htmlFor="recipientName"
                className="form-label flex items-center gap-2"
              >
                <User className="w-4 h-4 text-sky-400" />
                Recipient Name / Organization *
              </label>
              <input
                id="recipientName"
                type="text"
                name="recipientName"
                value={form.recipientName}
                onChange={handleChange}
                placeholder="Your name or organization name"
                data-ocid="request.recipient_name.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                autoComplete="organization"
              />
              {errors.recipientName && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="request.recipient_name.error_state"
                >
                  {errors.recipientName}
                </p>
              )}
            </div>

            {/* Number of People */}
            <div>
              <label
                htmlFor="numberOfPeople"
                className="form-label flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-sky-400" />
                Number of People *
              </label>
              <input
                id="numberOfPeople"
                type="number"
                name="numberOfPeople"
                value={form.numberOfPeople}
                onChange={handleChange}
                placeholder="How many people need assistance?"
                min="1"
                data-ocid="request.people_count.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.numberOfPeople && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="request.people_count.error_state"
                >
                  {errors.numberOfPeople}
                </p>
              )}
            </div>

            {/* Items Required */}
            <div>
              <label
                htmlFor="itemsRequired"
                className="form-label flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-sky-400" />
                Items Required *
              </label>
              <textarea
                id="itemsRequired"
                name="itemsRequired"
                value={form.itemsRequired}
                onChange={handleChange}
                placeholder="List the food items you need (e.g., Rice, Lentils, Cooking Oil, Bread)"
                rows={4}
                data-ocid="request.items.textarea"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm resize-none"
              />
              {errors.itemsRequired && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="request.items.error_state"
                >
                  {errors.itemsRequired}
                </p>
              )}
            </div>

            {/* Delivery Address */}
            <div>
              <label
                htmlFor="deliveryAddress"
                className="form-label flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-sky-400" />
                Delivery Address *
              </label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                placeholder="Full delivery address"
                rows={3}
                data-ocid="request.address.textarea"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                autoComplete="street-address"
              />
              {errors.deliveryAddress && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="request.address.error_state"
                >
                  {errors.deliveryAddress}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              data-ocid="request.submit_button"
              disabled={isSubmitting}
              className="btn-sky w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              <HandHeart className="w-5 h-5" />
              Submit Request
            </button>
          </form>
        </GlassCard>

        <p className="text-center text-white/40 text-sm mt-4">
          All requests are reviewed and matched with available donations in your
          area.
        </p>
      </div>
    </section>
  );
}
