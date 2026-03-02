import { useState } from 'react';
import { UtensilsCrossed, Package, User, MapPin, Hash, CheckCircle2, Loader2, Truck } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../components/GlassCard';
import { useAddFoodDonation } from '../hooks/useQueries';

interface FormState {
  donorName: string;
  foodItems: string;
  quantity: string;
  pickupLocation: string;
}

const initialForm: FormState = {
  donorName: '',
  foodItems: '',
  quantity: '',
  pickupLocation: '',
};

export default function DonorForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const addFoodDonation = useAddFoodDonation();

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.donorName.trim()) newErrors.donorName = 'Donor name is required';
    if (!form.foodItems.trim()) newErrors.foodItems = 'Food items are required';
    if (!form.quantity || Number(form.quantity) <= 0) newErrors.quantity = 'Valid quantity is required';
    if (!form.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      await addFoodDonation.mutateAsync({
        donorName: form.donorName.trim(),
        foodItems: form.foodItems.trim(),
        quantity: BigInt(Math.round(Number(form.quantity))),
        pickupLocation: form.pickupLocation.trim(),
      });
      toast.success('Donation Submitted Successfully!', {
        description: `Thank you for donating ${form.foodItems}. It has been listed for NGOs to collect.`,
        duration: 5000,
        icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
      });
      setTimeout(() => {
        toast.success('Food Collection Confirmed!', {
          description: 'Your donation has been scheduled for pickup.',
          duration: 5000,
          icon: <Truck className="w-5 h-5 text-green-400" />,
        });
      }, 800);
      setForm(initialForm);
      setErrors({});
    } catch {
      toast.error('Submission Failed', {
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
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Donate <span className="text-gradient-orange">Food</span>
          </h1>
          <p className="text-white/60 text-lg">
            Share your surplus food and help reduce waste while feeding those in need.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donor Name */}
            <div>
              <label className="form-label flex items-center gap-2">
                <User className="w-4 h-4 text-brand-orange" />
                Your Name *
              </label>
              <input
                type="text"
                name="donorName"
                value={form.donorName}
                onChange={handleChange}
                placeholder="e.g., Rahul Sharma"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.donorName && (
                <p className="text-red-400 text-xs mt-1">{errors.donorName}</p>
              )}
            </div>

            {/* Food Items */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-orange" />
                Food Items *
              </label>
              <input
                type="text"
                name="foodItems"
                value={form.foodItems}
                onChange={handleChange}
                placeholder="e.g., Rice, Bread, Vegetables"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.foodItems && (
                <p className="text-red-400 text-xs mt-1">{errors.foodItems}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Hash className="w-4 h-4 text-brand-orange" />
                Quantity (units) *
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g., 10"
                min="1"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.quantity && (
                <p className="text-red-400 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Pickup Location */}
            <div>
              <label className="form-label flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-orange" />
                Pickup Location *
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                placeholder="e.g., 123 Main Street, Mumbai"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.pickupLocation && (
                <p className="text-red-400 text-xs mt-1">{errors.pickupLocation}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={addFoodDonation.isPending}
              className="btn-orange w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {addFoodDonation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <UtensilsCrossed className="w-5 h-5" />
                  Submit Donation
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
