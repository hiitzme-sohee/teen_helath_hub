import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Emotion } from '@/lib/types';
import { COLOR_PALETTES } from '@/lib/palettes';
import { EmotionIcon } from '@/components/EmotionIcon';
import {
  BookStackIllustration,
  PlantIllustration,
  ReadingLampIllustration,
  MoonStarsIllustration,
  LeafDivider,
} from '@/components/Illustrations';

interface HomeProps {
  emotions: Emotion[];
  onPickEmotion: (e: Emotion) => void;
  onBrowseAll: () => void;
  onActivities: () => void;
  onSupport: () => void;
}

export function Home({
  emotions,
  onPickEmotion,
  onBrowseAll,
  onActivities,
  onSupport,
}: HomeProps) {
  return (
    <div className="paper-texture min-h-[calc(100vh-65px)]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8 text-center">
          <div className="flex justify-center gap-6 opacity-80 sm:gap-10">
            <PlantIllustration className="h-20 w-20 hidden sm:block animate-rise" />
            <div className="flex flex-col items-center justify-end">
              <BookStackIllustration className="h-28 w-32 animate-rise" />
            </div>
            <ReadingLampIllustration className="h-20 w-20 hidden sm:block animate-rise" />
          </div>

          <div className="mt-8 flex justify-center">
            <LeafDivider className="w-32" />
          </div>

          <h1 className="mt-6 font-serif text-3xl font-medium leading-tight text-stone-800 sm:text-5xl">
            Welcome to <span className="italic text-stone-600">The Quiet Library</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-500 sm:text-lg">
            A calm, welcoming space where you can learn about your emotions and
            find trustworthy resources at your own pace. No pressure, no
            judgment — just a quiet place to explore how you feel.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onBrowseAll}
              className="rounded-xl bg-stone-700 px-5 py-3 text-sm font-semibold text-[#fbf8f3] shadow-sm transition-all hover:bg-stone-800 hover:shadow-md active:scale-[0.98]"
            >
              Browse the library
            </button>
            <button
              onClick={onActivities}
              className="rounded-xl bg-white/80 px-5 py-3 text-sm font-semibold text-stone-700 ring-1 ring-stone-200 transition-all hover:bg-white hover:shadow-sm active:scale-[0.98]"
            >
              Try a calming activity
            </button>
          </div>
        </div>
      </section>

      {/* Emotion Check */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-stone-200/70 sm:p-12">
          <div className="text-center">
            <MoonStarsIllustration className="mx-auto h-14 w-14 opacity-70" />
            <h2 className="mt-4 font-serif text-2xl font-medium text-stone-800 sm:text-3xl">
              How are you feeling today?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-500">
              Take a moment to notice what's inside. Choose whatever feels true
              right now — there are no wrong answers.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {emotions.map((e, i) => {
              const palette = COLOR_PALETTES[e.color_key];
              return (
                <button
                  key={e.id}
                  onClick={() => onPickEmotion(e)}
                  style={{
                    animationDelay: `${i * 50}ms`,
                    backgroundColor: palette.bgSoft,
                  }}
                  className="group animate-rise flex flex-col items-center gap-2 rounded-2xl p-4 ring-1 ring-stone-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{ backgroundColor: palette.book, color: palette.text }}
                  >
                    <EmotionIcon name={e.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-serif text-sm font-medium text-stone-700">
                    {e.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <LeafDivider className="w-32" />
          </div>

          <p className="mt-6 text-center text-xs text-stone-400">
            This is a gentle check-in, not a diagnosis. Whatever you choose,
            you're welcome here.
          </p>
        </div>

        {/* Quick links */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <QuickCard
            icon={Icons.HeartHandshake}
            title="Gentle activities"
            text="Breathing, grounding, journaling and more — small things you can do right now."
            onClick={onActivities}
          />
          <QuickCard
            icon={Icons.BookOpen}
            title="Trusted resources"
            text="Books, articles, videos, and helplines from WHO, NHS, UNICEF, Mind, and ReachOut."
            onClick={onBrowseAll}
          />
          <QuickCard
            icon={Icons.LifeBuoy}
            title="Need support now?"
            text="Emergency and crisis numbers for New Zealand, Australia, South Korea, the US, and Canada."
            onClick={onSupport}
          />
        </div>
      </section>
    </div>
  );
}

function QuickCard({
  icon: Icon,
  title,
  text,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start gap-2 rounded-2xl bg-white/60 p-5 text-left ring-1 ring-stone-200/60 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-700 group-hover:text-[#fbf8f3]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-serif text-base font-medium text-stone-800">{title}</h3>
      <p className="text-sm leading-relaxed text-stone-500">{text}</p>
    </button>
  );
}
