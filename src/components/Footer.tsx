import { BookHeart, Heart } from 'lucide-react';
import { WaveBackground } from '@/components/Illustrations';

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-stone-200/60 bg-[#f4eee3]">
      <WaveBackground className="absolute -top-px left-0 w-full" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-700 text-[#fbf8f3]">
              <BookHeart className="h-4 w-4" />
            </span>
            <div>
              <p className="font-serif text-sm font-semibold text-stone-700">The Quiet Library</p>
              <p className="text-xs text-stone-400">A calm space for your feelings</p>
            </div>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-stone-500">
            This library offers trusted information and gentle activities, not
            medical advice. If you're in crisis, please reach out to a helpline
            or a trusted adult. You deserve support.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-1.5 border-t border-stone-200/60 pt-6 text-xs text-stone-400">
          <Heart className="h-3 w-3" />
          Made with care for young people everywhere.
        </div>
      </div>
    </footer>
  );
}
