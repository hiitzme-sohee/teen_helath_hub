import { useEffect, useRef, useState } from 'react';
import { BookOpen, Activity, Home } from 'lucide-react';
import type { Emotion } from '@/lib/types';
import { COLOR_PALETTES } from '@/lib/palettes';
import { EmotionIcon } from '@/components/EmotionIcon';
import { LeafDivider } from '@/components/Illustrations';

interface ComfortTransitionProps {
  emotion: Emotion;
  onGoLibrary: () => void;
  onGoActivities: () => void;
  onGoHome: () => void;
}

export function ComfortTransition({
  emotion,
  onGoLibrary,
  onGoActivities,
  onGoHome,
}: ComfortTransitionProps) {
  const [showChoices, setShowChoices] = useState(false);
  const palette = COLOR_PALETTES[emotion.color_key];

  useEffect(() => {
    const t = setTimeout(() => setShowChoices(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto py-8"
      style={{ backgroundColor: palette.bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative flex flex-col items-center px-6 text-center">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full animate-breathe shadow-lg"
          style={{ backgroundColor: palette.book, color: palette.text }}
        >
          <EmotionIcon name={emotion.icon} className="h-8 w-8" />
        </span>
        <div className="mt-8 flex justify-center">
          <LeafDivider className="w-32" />
        </div>
        <p
          className="animate-fade-up mt-6 font-serif text-2xl font-medium leading-relaxed sm:text-4xl"
          style={{ color: palette.text }}
        >
          {emotion.comfort_message}
        </p>

        {/* Choices */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 transition-all duration-700 ${
            showChoices ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-serif text-base text-stone-500">
            What would you like to do next?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onGoLibrary}
              className="group flex items-center gap-3 rounded-2xl bg-white/80 px-6 py-4 text-left shadow-sm ring-1 ring-stone-200/60 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: palette.book, color: palette.text }}
              >
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-sm font-medium" style={{ color: palette.text }}>
                  Browse the library
                </p>
                <p className="text-xs text-stone-400">Explore books & resources</p>
              </div>
            </button>

            <button
              onClick={onGoActivities}
              className="group flex items-center gap-3 rounded-2xl bg-white/80 px-6 py-4 text-left shadow-sm ring-1 ring-stone-200/60 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: palette.book, color: palette.text }}
              >
                <Activity className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-sm font-medium" style={{ color: palette.text }}>
                  Try an activity
                </p>
                <p className="text-xs text-stone-400">A calming exercise</p>
              </div>
            </button>
          </div>

          <button
            onClick={onGoHome}
            className="mt-2 flex items-center gap-1.5 text-sm font-medium text-stone-400 transition-colors hover:text-stone-600"
          >
            <Home className="h-4 w-4" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
