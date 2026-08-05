import { useMemo, useState } from 'react';
import { Activity as ActivityIcon } from 'lucide-react';
import type { Activity, Emotion } from '@/lib/types';
import { COLOR_PALETTES } from '@/lib/palettes';
import { EmotionIcon } from '@/components/EmotionIcon';
import { ActivityModal } from '@/components/ActivityModal';
import { LeafDivider, PlantIllustration, MoonStarsIllustration } from '@/components/Illustrations';

interface ActivitiesViewProps {
  activities: Activity[];
  emotions: Emotion[];
}

export function ActivitiesView({ activities, emotions }: ActivitiesViewProps) {
  const [selected, setSelected] = useState<Activity | null>(null);

  const universal = useMemo(
    () => activities.filter((a) => !a.emotion_id).sort((a, b) => a.sort_order - b.sort_order),
    [activities],
  );
  const byEmotion = useMemo(() => {
    const map = new Map<string, Activity[]>();
    for (const a of activities) {
      if (!a.emotion_id) continue;
      const list = map.get(a.emotion_id) ?? [];
      list.push(a);
      map.set(a.emotion_id, list);
    }
    return map;
  }, [activities]);

  const emotionById = useMemo(() => {
    const map = new Map<string, Emotion>();
    emotions.forEach((e) => map.set(e.id, e));
    return map;
  }, [emotions]);

  return (
    <div className="paper-texture min-h-[calc(100vh-65px)]">
      <section className="relative overflow-hidden border-b border-stone-200/60 bg-white/40">
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center">
          <div className="flex justify-center gap-6 opacity-80">
            <PlantIllustration className="h-16 w-16 hidden sm:block" />
            <MoonStarsIllustration className="h-16 w-16" />
            <PlantIllustration className="h-16 w-16 hidden sm:block" />
          </div>
          <h1 className="mt-4 font-serif text-3xl font-medium text-stone-800 sm:text-4xl">
            Calming Activities
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-500">
            Small, gentle things you can do right now. No experience needed —
            just a few minutes and a willingness to try.
          </p>
          <div className="mt-6 flex justify-center">
            <LeafDivider className="w-40" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Universal activities */}
        <div className="mb-12">
          <h2 className="mb-5 font-serif text-xl font-medium text-stone-800">
            For any moment
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {universal.map((a, i) => (
              <ActivityCard key={a.id} activity={a} index={i} onClick={() => setSelected(a)} />
            ))}
          </div>
        </div>

        {/* Emotion-specific activities */}
        {emotions.map((e) => {
          const list = byEmotion.get(e.id);
          if (!list || list.length === 0) return null;
          const palette = COLOR_PALETTES[e.color_key];
          return (
            <div key={e.id} className="mb-10">
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ backgroundColor: palette.book, color: palette.text }}
                >
                  <EmotionIcon name={e.icon} className="h-4 w-4" />
                </span>
                <h3 className="font-serif text-lg font-medium text-stone-800">
                  For {e.name.toLowerCase()}
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.sort((a, b) => a.sort_order - b.sort_order).map((a, i) => (
                  <ActivityCard
                    key={a.id}
                    activity={a}
                    index={i}
                    onClick={() => setSelected(a)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {selected && (
        <ActivityModal
          title={selected.title}
          description={selected.description}
          type={selected.activity_type}
          durationText={selected.duration_text}
          icon={selected.icon}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function ActivityCard({
  activity,
  index,
  onClick,
}: {
  activity: Activity;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 50}ms` }}
      className="group animate-rise flex flex-col items-start gap-3 rounded-2xl bg-white/70 p-5 text-left ring-1 ring-stone-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-700 group-hover:text-[#fbf8f3]">
        <EmotionIcon name={activity.icon} className="h-5 w-5" />
      </span>
      <div>
        <h4 className="font-serif text-base font-medium text-stone-800">{activity.title}</h4>
        {activity.duration_text && (
          <p className="mt-0.5 text-xs text-stone-400">{activity.duration_text}</p>
        )}
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-stone-500">
        {activity.description}
      </p>
      <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-stone-500 transition-colors group-hover:text-stone-800">
        <ActivityIcon className="h-3.5 w-3.5" />
        Begin activity
      </span>
    </button>
  );
}
