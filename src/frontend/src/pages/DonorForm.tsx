import {
  CheckCircle2,
  Hash,
  MapPin,
  Package,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GlassCard from "../components/GlassCard";
import { addDonation } from "../utils/storage";

interface FormState {
  donorName: string;
  foodItems: string;
  quantity: string;
  pickupLocation: string;
}

const initialForm: FormState = {
  donorName: "",
  foodItems: "",
  quantity: "",
  pickupLocation: "",
};

export default function DonorForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.donorName.trim()) newErrors.donorName = "Donor name is required";
    if (!form.foodItems.trim()) newErrors.foodItems = "Food items are required";
    if (!form.quantity || Number(form.quantity) <= 0)
      newErrors.quantity = "Please enter a valid quantity (greater than 0)";
    if (!form.pickupLocation.trim())
      newErrors.pickupLocation = "Pickup location is required";
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

    addDonation({
      donorName: form.donorName.trim(),
      foodItems: form.foodItems.trim(),
      quantity: Number(form.quantity),
      pickupLocation: form.pickupLocation.trim(),
    });

    toast.success("Donation Submitted Successfully!", {
      description: `Thank you for donating "${form.foodItems}". It has been listed for NGOs to collect.`,
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
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Donate <span className="text-gradient-orange">Food</span>
          </h1>
          <p className="text-white/60 text-lg">
            Share your surplus food and help reduce waste while feeding those in
            need.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Donor Name */}
            <div>
              <label
                htmlFor="donorName"
                className="form-label flex items-center gap-2"
              >
                <User className="w-4 h-4 text-orange-400" />
                Your Name *
              </label>
              <input
                id="donorName"
                type="text"
                name="donorName"
                value={form.donorName}
                onChange={handleChange}
                placeholder="e.g., Rahul Sharma"
                data-ocid="donor.name.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                autoComplete="name"
              />
              {errors.donorName && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="donor.name.error_state"
                >
                  {errors.donorName}
                </p>
              )}
            </div>

            {/* Food Items */}
            <div>
              <label
                htmlFor="foodItems"
                className="form-label flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-orange-400" />
                Food Items *
              </label>
              <input
                id="foodItems"
                type="text"
                name="foodItems"
                value={form.foodItems}
                onChange={handleChange}
                placeholder="e.g., Rice, Bread, Vegetables"
                data-ocid="donor.food_items.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.foodItems && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="donor.food_items.error_state"
                >
                  {errors.foodItems}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="form-label flex items-center gap-2"
              >
                <Hash className="w-4 h-4 text-orange-400" />
                Quantity (units) *
              </label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g., 10"
                min="1"
                data-ocid="donor.quantity.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.quantity && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="donor.quantity.error_state"
                >
                  {errors.quantity}
                </p>
              )}
            </div>

            {/* Pickup Location */}
            <div>
              <label
                htmlFor="pickupLocation"
                className="form-label flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-orange-400" />
                Pickup Location *
              </label>
              <input
                id="pickupLocation"
                type="text"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                placeholder="e.g., 123 Main Street, Mumbai"
                data-ocid="donor.location.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                autoComplete="street-address"
              />
              {errors.pickupLocation && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="donor.location.error_state"
                >
                  {errors.pickupLocation}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              data-ocid="donor.submit_button"
              disabled={isSubmitting}
              className="btn-orange w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              <UtensilsCrossed className="w-5 h-5" />
              Submit Donation
            </button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
