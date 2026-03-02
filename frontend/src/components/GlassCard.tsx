import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
}

export default function GlassCard({ children, className, strong = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl',
        strong ? 'glass-card-strong' : 'glass-card',
        className
      )}
    >
      {children}
    </div>
  );
}
