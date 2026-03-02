import { useState } from 'react';
import { UtensilsCrossed, Package, User, Calendar, Scale, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../components/GlassCard';
import { useAddDonation } from '../hooks/useQueries';

interface FormState {
  foodItem: string;
  quantity: string;
  unit: string;
  donorId: string;
  expiryDate: string;
}

const initialForm: FormState = {
  foodItem: '',
  quantity: '',
  unit: 'kg',
  donorId: '',
  expiryDate: '',
};

const unitOptions = ['kg', 'g', 'lbs', 'oz', 'liters', 'pieces', 'boxes', 'bags', 'cans'];

export default function DonorForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const addDonation = useAddDonation();

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.foodItem.trim()) newErrors.foodItem = 'Food item is required';
    if (!form.quantity || Number(form.quantity) <= 0) newErrors.quantity = 'Valid quantity is required';
    if (!form.donorId.trim()) newErrors.donorId = 'Donor ID is required';
    if (!form.expiryDate) newErrors.expiryDate = 'Expiry date is required';
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

    const expiryTimestamp = BigInt(new Date(form.expiryDate).getTime()) * 1_000_000n;

    try {
      await addDonation.mutateAsync({
        foodItem: form.foodItem.trim(),
        quantity: BigInt(Math.round(Number(form.quantity))),
        unit: form.unit,
        donorId: form.donorId.trim(),
        expiryDate: expiryTimestamp,
      });
      toast.success('Donation Submitted Successfully!', {
        description: `Thank you for donating ${form.quantity} ${form.unit} of ${form.foodItem}.`,
        duration: 5000,
        icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
      });
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
            {/* Food Item */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-orange" />
                Food Item *
              </label>
              <input
                type="text"
                name="foodItem"
                value={form.foodItem}
                onChange={handleChange}
                placeholder="e.g., Rice, Bread, Vegetables"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.foodItem && (
                <p className="text-red-400 text-xs mt-1">{errors.foodItem}</p>
              )}
            </div>

            {/* Quantity + Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-orange" />
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  min="1"
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                />
                {errors.quantity && (
                  <p className="text-red-400 text-xs mt-1">{errors.quantity}</p>
                )}
              </div>
              <div>
                <label className="form-label">Unit</label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer"
                >
                  {unitOptions.map((u) => (
                    <option key={u} value={u} className="bg-gray-900 text-white">
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Donor ID */}
            <div>
              <label className="form-label flex items-center gap-2">
                <User className="w-4 h-4 text-brand-orange" />
                Donor ID *
              </label>
              <input
                type="text"
                name="donorId"
                value={form.donorId}
                onChange={handleChange}
                placeholder="Your unique donor identifier"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.donorId && (
                <p className="text-red-400 text-xs mt-1">{errors.donorId}</p>
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-orange" />
                Expiry Date *
              </label>
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                style={{ colorScheme: 'dark' }}
              />
              {errors.expiryDate && (
                <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={addDonation.isPending}
              className="btn-orange w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {addDonation.isPending ? (
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

        {/* Info note */}
        <p className="text-center text-white/40 text-sm mt-4">
          All donations are verified and distributed to verified NGOs and individuals in need.
        </p>
      </div>
    </section>
  );
}
