import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const FALLBACK = Icons.Heart;

export function EmotionIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: string;
  className?: string;
}) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name] ?? FALLBACK;
  return <Icon className={className} />;
}
