import { CheckCircle2, Loader2, MessageSquare, Star, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GlassCard from "../components/GlassCard";
import { addFeedback } from "../utils/storage";

interface FormState {
  name: string;
  rating: number;
  comment: string;
}

const initialForm: FormState = {
  name: "",
  rating: 0,
  comment: "",
};

export default function FeedbackForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = "Your name is required";
    if (form.rating === 0) newErrors.rating = "Please select a rating";
    if (!form.comment.trim()) newErrors.comment = "Please share your feedback";
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

  const handleStarClick = (star: number) => {
    setForm((prev) => ({ ...prev, rating: star }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    addFeedback({
      name: form.name.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
    });

    toast.success("Thank you for your Feedback!", {
      description: `We appreciate your ${form.rating}-star review, ${form.name}!`,
      duration: 5000,
      icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
    });

    setForm(initialForm);
    setErrors({});
    setHoveredStar(0);
    setIsSubmitting(false);
  };

  const starLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <section className="page-section">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl btn-sky mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Share Your <span className="text-gradient-sky">Feedback</span>
          </h1>
          <p className="text-white/60 text-lg">
            Your feedback helps us improve ByteMeal and serve the community
            better.
          </p>
        </div>

        <GlassCard strong className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="form-label flex items-center gap-2"
              >
                <User className="w-4 h-4 text-sky-400" />
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                data-ocid="feedback.name.input"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                autoComplete="name"
              />
              {errors.name && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="feedback.name.error_state"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Star Rating */}
            <fieldset className="border-0 p-0 m-0">
              <legend className="form-label flex items-center gap-2">
                <Star className="w-4 h-4 text-sky-400" />
                Your Rating *
              </legend>
              <div className="flex items-center gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    data-ocid={`feedback.star.${star}`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`w-9 h-9 transition-colors ${
                        star <= (hoveredStar || form.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/30"
                      }`}
                    />
                  </button>
                ))}
                {(hoveredStar || form.rating) > 0 && (
                  <span className="text-white/70 text-sm ml-2">
                    {starLabels[(hoveredStar || form.rating) - 1]}
                  </span>
                )}
              </div>
              {errors.rating && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="feedback.rating.error_state"
                >
                  {errors.rating}
                </p>
              )}
            </fieldset>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="form-label flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-sky-400" />
                Your Feedback *
              </label>
              <textarea
                id="comment"
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="Tell us about your experience with ByteMeal..."
                rows={5}
                data-ocid="feedback.comment.textarea"
                className="glass-input w-full px-4 py-3 rounded-xl text-sm resize-none"
              />
              {errors.comment && (
                <p
                  className="text-red-400 text-xs mt-1"
                  data-ocid="feedback.comment.error_state"
                >
                  {errors.comment}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              data-ocid="feedback.submit_button"
              disabled={isSubmitting}
              className="btn-sky w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
