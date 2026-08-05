import { BookHeart, LifeBuoy, Home } from 'lucide-react';

interface HeaderProps {
  view: 'home' | 'library' | 'activities' | 'support';
  onHome: () => void;
  onActivities: () => void;
  onSupport: () => void;
}

export function Header({ view, onHome, onActivities, onSupport }: HeaderProps) {
  const navItem = (
    label: string,
    Icon: typeof LifeBuoy,
    active: boolean,
    onClick: () => void,
  ) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-stone-200/60 text-stone-800'
          : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-[#fbf8f3]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          onClick={onHome}
          className="flex items-center gap-2.5 group"
          aria-label="The Quiet Library home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-stone-700 to-stone-800 text-[#fbf8f3] shadow-sm transition-transform group-hover:scale-105">
            <BookHeart className="h-5 w-5" />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-serif text-base font-semibold text-stone-800">
              The Quiet Library
            </span>
            <span className="text-[11px] text-stone-400">A calm space for your feelings</span>
          </span>
        </button>

        <nav className="flex items-center gap-1">
          {navItem('Home', Home, view === 'home', onHome)}
          {navItem('Activities', BookHeart, view === 'activities', onActivities)}
          {navItem('Support', LifeBuoy, view === 'support', onSupport)}
        </nav>
      </div>
    </header>
  );
}
