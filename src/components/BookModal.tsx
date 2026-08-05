import { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  Bookmark,
  HeartHandshake,
  Phone,
  Video,
  Mic,
  FileText,
  BookOpen,
} from 'lucide-react';
import type { Emotion, LibraryResource, ResourceType } from '@/lib/types';
import { COLOR_PALETTES, RESOURCE_TYPE_LABELS } from '@/lib/palettes';

interface BookModalProps {
  resource: LibraryResource;
  emotion: Emotion;
  allResources: LibraryResource[];
  onClose: () => void;
  onSelect: (r: LibraryResource) => void;
}

const TYPE_ICONS: Record<ResourceType, typeof BookOpen> = {
  book: BookOpen,
  article: FileText,
  video: Video,
  podcast: Mic,
  organization: HeartHandshake,
  helpline: Phone,
};

export function BookModal({
  resource,
  emotion,
  allResources,
  onClose,
  onSelect,
}: BookModalProps) {
  const [page, setPage] = useState(0); // 0 = intro, 1 = resource detail
  const [opening, setOpening] = useState(true);
  const palette = COLOR_PALETTES[resource.cover_color];

  useEffect(() => {
    setPage(0);
    setOpening(true);
    const t = setTimeout(() => setOpening(false), 500);
    return () => clearTimeout(t);
  }, [resource]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setPage((p) => Math.min(p + 1, 1));
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(p - 1, 0));
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const sameType = allResources
    .filter((r) => r.resource_type === resource.resource_type)
    .sort((a, b) => a.sort_order - b.sort_order);
  const currentIndex = sameType.findIndex((r) => r.id === resource.id);
  const prev = currentIndex > 0 ? sameType[currentIndex - 1] : null;
  const next = currentIndex < sameType.length - 1 ? sameType[currentIndex + 1] : null;

  const TypeIcon = TYPE_ICONS[resource.resource_type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-2 backdrop-blur-sm animate-fade-in sm:p-6"
      onClick={onClose}
    >
      <div
        className={`relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-[#fbf8f3] shadow-2xl ${
          opening ? 'animate-book-open' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 25px 80px ${palette.glow}, 0 0 0 1px rgba(0,0,0,0.06)` }}
      >
        {/* Cover spine (left edge) */}
        <div
          className="absolute left-0 top-0 z-10 h-full w-2"
          style={{
            backgroundColor: palette.book,
            boxShadow: `inset -2px 0 4px ${palette.bookDark}40`,
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-30 rounded-lg bg-[#fbf8f3]/80 p-1.5 text-stone-400 backdrop-blur transition-colors hover:bg-white hover:text-stone-700"
          aria-label="Close book"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Pages */}
        <div className="paper-grain relative flex-1 overflow-y-auto">
          {/* Intro page */}
          {page === 0 && (
            <div key={resource.id + '-intro'} className="animate-page-turn px-6 py-10 sm:px-12 sm:py-14">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: palette.book, color: palette.text }}
                >
                  <TypeIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    {emotion.name} Library
                  </p>
                  <p className="text-sm font-medium text-stone-500">
                    {RESOURCE_TYPE_LABELS[resource.resource_type]}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="h-px w-16 bg-stone-300" />
              </div>

              <h1 className="mt-8 text-center font-serif text-2xl font-medium leading-snug text-stone-800 sm:text-3xl">
                {resource.title}
              </h1>
              {resource.author && (
                <p className="mt-2 text-center font-serif text-base italic text-stone-500">
                  by {resource.author}
                </p>
              )}
              <p className="mt-1 text-center text-sm text-stone-400">{resource.provider}</p>

              <p className="mx-auto mt-8 max-w-lg text-center font-serif text-base leading-relaxed text-stone-600">
                {emotion.intro_text}
              </p>

              <div className="mt-10 flex flex-col items-center gap-3">
                <button
                  onClick={() => setPage(1)}
                  className="flex items-center gap-2 rounded-xl bg-stone-700 px-5 py-2.5 text-sm font-semibold text-[#fbf8f3] transition-colors hover:bg-stone-800"
                >
                  Turn the page
                  <ChevronRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-stone-400">Page 1 of 2</p>
              </div>
            </div>
          )}

          {/* Detail page */}
          {page === 1 && (
            <div key={resource.id + '-detail'} className="animate-page-turn px-6 py-10 sm:px-12 sm:py-14">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPage(0)}
                  className="flex items-center gap-1 text-sm font-medium text-stone-500 transition-colors hover:text-stone-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous page
                </button>
                <span className="text-xs text-stone-400">Page 2 of 2</span>
              </div>

              <h2 className="mt-6 font-serif text-2xl font-medium leading-snug text-stone-800">
                {resource.title}
              </h2>
              {resource.author && (
                <p className="mt-1 font-serif text-base italic text-stone-500">
                  by {resource.author}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ backgroundColor: palette.bg, color: palette.text }}
                >
                  <TypeIcon className="h-3 w-3" />
                  {RESOURCE_TYPE_LABELS[resource.resource_type]}
                </span>
                <span className="text-xs font-medium text-stone-400">{resource.provider}</span>
                {resource.is_free ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Free
                  </span>
                ) : (
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
                    Paid
                  </span>
                )}
                {resource.duration_text && (
                  <span className="flex items-center gap-1 text-xs text-stone-400">
                    <Clock className="h-3 w-3" />
                    {resource.duration_text}
                  </span>
                )}
              </div>

              <p className="mt-6 font-serif text-base leading-relaxed text-stone-700">
                {resource.description}
              </p>

              {/* Helpline highlight */}
              {resource.resource_type === 'helpline' && (
                <div
                  className="mt-6 rounded-xl p-5"
                  style={{ backgroundColor: palette.bg }}
                >
                  <p className="flex items-center gap-2 font-serif text-sm font-medium text-stone-700">
                    <Phone className="h-4 w-4" />
                    This is a free, confidential helpline. You can reach out
                    anytime — trained counselors are there to listen.
                  </p>
                </div>
              )}

              {/* Visit resource */}
              <div className="mt-8">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[#fbf8f3] transition-all hover:shadow-md active:scale-[0.98]"
                  style={{ backgroundColor: palette.accent }}
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit resource
                </a>
              </div>

              {/* Book navigation */}
              {(prev || next) && (
                <div className="mt-10 flex items-center justify-between border-t border-stone-200 pt-6">
                  <button
                    onClick={() => prev && onSelect(prev)}
                    disabled={!prev}
                    className="flex items-center gap-1 text-sm font-medium text-stone-500 transition-colors hover:text-stone-800 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {prev ? prev.title : 'Previous'}
                  </button>
                  <button
                    onClick={() => next && onSelect(next)}
                    disabled={!next}
                    className="flex items-center gap-1 text-sm font-medium text-stone-500 transition-colors hover:text-stone-800 disabled:opacity-30"
                  >
                    {next ? next.title : 'Next'}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Page corner bookmark */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-0 w-0 border-b-[24px] border-l-[24px] border-b-[#e8dfc8] border-l-transparent opacity-60" />
      </div>
    </div>
  );
}
