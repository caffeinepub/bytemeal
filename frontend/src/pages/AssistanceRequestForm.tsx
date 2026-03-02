import { useState } from 'react';
import { HandHeart, User, Users, ShoppingBag, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../components/GlassCard';
import { useAddAssistanceRequest } from '../hooks/useQueries';

interface FormState {
  recipientName: string;
  numberOfPeople: string;
  itemsRequired: string;
  deliveryAddress: string;
}

const initialForm: FormState = {
  recipientName: '',
  numberOfPeople: '',
  itemsRequired: '',
  deliveryAddress: '',
};

export default function AssistanceRequestForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const addRequest = useAddAssistanceRequest();

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.recipientName.trim()) newErrors.recipientName = 'Recipient name is required';
    if (!form.numberOfPeople || Number(form.numberOfPeople) <= 0)
      newErrors.numberOfPeople = 'Valid number of people is required';
    if (!form.itemsRequired.trim()) newErrors.itemsRequired = 'Items required field cannot be empty';
    if (!form.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      await addRequest.mutateAsync({
        recipientName: form.recipientName.trim(),
        numberOfPeople: BigInt(Math.round(Number(form.numberOfPeople))),
        itemsRequired: form.itemsRequired.trim(),
        deliveryAddress: form.deliveryAddress.trim(),
      });
      toast.success('Request Submitted Successfully!', {
        description: 'Your assistance request has been received. We will contact you shortly.',
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl btn-sky mb-4 shadow-sky-glow">
            <HandHeart className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Assistance <span className="text-gradient-sky">Request Form</span>
          </h1>
          <p className="text-white/60 text-lg">
            NGOs and individuals can request food assistance for their communities.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipient Name */}
            <div>
              <label className="form-label flex items-center gap-2">
                <User className="w-4 h-4 text-brand-sky" />
                Recipient Name / Organization *
              </label>
              <input
                type="text"
                name="recipientName"
                value={form.recipientName}
                onChange={handleChange}
                placeholder="Your name or organization name"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.recipientName && (
                <p className="text-red-400 text-xs mt-1">{errors.recipientName}</p>
              )}
            </div>

            {/* Number of People */}
            <div>
              <label className="form-label flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-sky" />
                Number of People *
              </label>
              <input
                type="number"
                name="numberOfPeople"
                value={form.numberOfPeople}
                onChange={handleChange}
                placeholder="How many people need assistance?"
                min="1"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.numberOfPeople && (
                <p className="text-red-400 text-xs mt-1">{errors.numberOfPeople}</p>
              )}
            </div>

            {/* Items Required */}
            <div>
              <label className="form-label flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-brand-sky" />
                Items Required *
              </label>
              <textarea
                name="itemsRequired"
                value={form.itemsRequired}
                onChange={handleChange}
                placeholder="List the food items you need (e.g., Rice, Lentils, Cooking Oil, Bread)"
                rows={4}
                className="glass-input w-full px-4 py-3 rounded-xl text-sm resize-none"
              />
              {errors.itemsRequired && (
                <p className="text-red-400 text-xs mt-1">{errors.itemsRequired}</p>
              )}
            </div>

            {/* Delivery Address */}
            <div>
              <label className="form-label flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-sky" />
                Delivery Address *
              </label>
              <input
                type="text"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                placeholder="Full delivery address"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.deliveryAddress && (
                <p className="text-red-400 text-xs mt-1">{errors.deliveryAddress}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={addRequest.isPending}
              className="btn-sky w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {addRequest.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <HandHeart className="w-5 h-5" />
                  Submit Request
                </>
              )}
            </button>
          </form>
        </GlassCard>

        <p className="text-center text-white/40 text-sm mt-4">
          All requests are reviewed and matched with available donations in your area.
        </p>
      </div>
    </section>
  );
}
