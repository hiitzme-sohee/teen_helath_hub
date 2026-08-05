import { useMemo, useState } from 'react';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  ExternalLink,
  Clock,
  Bookmark,
  LifeBuoy,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Emotion, LibraryResource, ResourceType } from '@/lib/types';
import { COLOR_PALETTES, RESOURCE_TYPE_LABELS } from '@/lib/palettes';
import { EmotionIcon } from '@/components/EmotionIcon';
import { LeafDivider } from '@/components/Illustrations';
import { BookModal } from '@/components/BookModal';

interface LibraryProps {
  emotion: Emotion;
  resources: LibraryResource[];
  onBack: () => void;
  onPickEmotion: (e: Emotion) => void;
  allEmotions: Emotion[];
  onSupport: () => void;
}

const TYPE_ICONS: Record<ResourceType, LucideIcon> = {
  book: BookOpen,
  article: Icons.FileText,
  video: Icons.Video,
  podcast: Icons.Mic,
  organization: Icons.HeartHandshake,
  helpline: Icons.Phone,
};

const SHELF_ORDER: ResourceType[] = ['book', 'article', 'video', 'podcast', 'organization'];

export function Library({
  emotion,
  resources,
  onBack,
  onPickEmotion,
  allEmotions,
  onSupport,
}: LibraryProps) {
  const [selected, setSelected] = useState<LibraryResource | null>(null);
  const palette = COLOR_PALETTES[emotion.color_key];

  const grouped = useMemo(() => {
    const map = new Map<ResourceType, LibraryResource[]>();
    for (const r of resources) {
      const list = map.get(r.resource_type) ?? [];
      list.push(r);
      map.set(r.resource_type, list);
    }
    return map;
  }, [resources]);

  const order: ResourceType[] = SHELF_ORDER;

  return (
    <div className="paper-texture min-h-[calc(100vh-65px)]">
      {/* Library header banner */}
      <section
        className="relative overflow-hidden border-b border-stone-200/60"
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
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-stone-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>

          <div className="mt-6 flex items-center gap-4">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm"
              style={{ backgroundColor: palette.book, color: palette.text }}
            >
              <EmotionIcon name={emotion.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="font-serif text-3xl font-medium text-stone-800 sm:text-4xl">
                {emotion.name}
              </h1>
              <p className="mt-0.5 text-sm text-stone-500">{emotion.description}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <LeafDivider className="w-40" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center font-serif text-lg italic leading-relaxed text-stone-600">
            {emotion.intro_text}
          </p>
        </div>
      </section>

      {/* Emotion switcher */}
      <section className="border-b border-stone-200/60 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto py-3">
            {allEmotions.map((e) => {
              const p = COLOR_PALETTES[e.color_key];
              const active = e.id === emotion.id;
              return (
                <button
                  key={e.id}
                  onClick={() => onPickEmotion(e)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? 'text-white shadow-sm'
                      : 'bg-white/70 text-stone-500 ring-1 ring-stone-200 hover:text-stone-800'
                  }`}
                  style={active ? { backgroundColor: p.book } : undefined}
                >
                  <EmotionIcon name={e.icon} className="h-3.5 w-3.5" />
                  {e.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bookshelves by type */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {order.map((type) => {
          const list = grouped.get(type);
          if (!list || list.length === 0) return null;
          return (
            <Bookshelf
              key={type}
              type={type}
              books={list}
              onSelect={setSelected}
            />
          );
        })}

        {/* Support prompt */}
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-stone-100 to-stone-50 p-6 text-center ring-1 ring-stone-200/60 sm:p-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-700 text-[#fbf8f3]">
            <LifeBuoy className="h-6 w-6" />
          </span>
          <h3 className="mt-4 font-serif text-xl font-medium text-stone-800">
            Do you need support right now?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-500">
            If things feel overwhelming, you don't have to face it alone.
            Helplines and crisis lines are available, free and confidential.
          </p>
          <button
            onClick={onSupport}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-stone-700 px-5 py-3 text-sm font-semibold text-[#fbf8f3] transition-all hover:bg-stone-800 hover:shadow-md active:scale-[0.98]"
          >
            <LifeBuoy className="h-4 w-4" />
            Find support near you
          </button>
        </div>
      </section>

      {selected && (
        <BookModal
          resource={selected}
          emotion={emotion}
          allResources={resources}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </div>
  );
}

function Bookshelf({
  type,
  books,
  onSelect,
}: {
  type: ResourceType;
  books: LibraryResource[];
  onSelect: (r: LibraryResource) => void;
}) {
  const Icon = TYPE_ICONS[type];
  const label = RESOURCE_TYPE_LABELS[type] + (books.length > 1 ? 's' : '');

  return (
    <div className="mb-14">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-serif text-xl font-medium text-stone-800">{label}</h2>
        <span className="text-sm text-stone-400">({books.length})</span>
      </div>

      {/* Shelf with books */}
      <div className="relative">
        <div className="flex items-end gap-3 overflow-x-auto pb-1 scrollbar-hide sm:gap-4">
          {books.map((book, i) => (
            <Book
              key={book.id}
              resource={book}
              index={i}
              onClick={() => onSelect(book)}
            />
          ))}
        </div>
        {/* shelf board */}
        <div className="mt-1 h-2.5 rounded-b-sm bg-gradient-to-b from-stone-300 to-stone-400 shadow-sm" />
        <div className="h-1 bg-stone-300/50 blur-sm" />
      </div>
    </div>
  );
}

function Book({
  resource,
  index,
  onClick,
}: {
  resource: LibraryResource;
  index: number;
  onClick: () => void;
}) {
  const palette = COLOR_PALETTES[resource.cover_color];
  // Vary height and thickness for realism
  const heights = [180, 200, 190, 210, 195, 205, 185, 215];
  const thicknesses = [44, 52, 48, 56, 46, 50, 42, 54];
  const h = heights[index % heights.length];
  const w = thicknesses[index % thicknesses.length];

  return (
    <button
      onClick={onClick}
      style={{
        height: `${h}px`,
        width: `${w}px`,
        backgroundColor: palette.book,
        animationDelay: `${index * 60}ms`,
        boxShadow: `inset -3px 0 6px ${palette.bookDark}40, 0 4px 12px ${palette.glow}`,
      }}
      className="group animate-rise relative shrink-0 cursor-pointer rounded-t-lg rounded-b-sm transition-all duration-300 hover:-translate-y-2 hover:rotate-[-1deg]"
      aria-label={`Open ${resource.title}`}
    >
      {/* spine top accent */}
      <div
        className="absolute inset-x-0 top-0 h-1.5 rounded-t-lg"
        style={{ backgroundColor: palette.bookDark, opacity: 0.5 }}
      />
      {/* spine bottom accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-1.5 rounded-b-sm"
        style={{ backgroundColor: palette.bookDark, opacity: 0.4 }}
      />
      {/* spine decorative lines */}
      <div
        className="absolute inset-x-2 top-5 h-px"
        style={{ backgroundColor: palette.text, opacity: 0.25 }}
      />
      <div
        className="absolute inset-x-2 bottom-5 h-px"
        style={{ backgroundColor: palette.text, opacity: 0.25 }}
      />
      {/* spine title */}
      <div className="flex h-full flex-col items-center justify-center px-1.5">
        <span
          className="font-serif text-[10px] font-medium leading-tight text-center [writing-mode:vertical-rl] rotate-180"
          style={{ color: palette.text }}
        >
          {resource.spine_text || resource.title}
        </span>
      </div>
      {/* hover glow */}
      <div
        className="absolute inset-0 rounded-t-lg rounded-b-sm opacity-0 transition-opacity group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 2px ${palette.accent}80, 0 8px 24px ${palette.glow}` }}
      />
    </button>
  );
}
