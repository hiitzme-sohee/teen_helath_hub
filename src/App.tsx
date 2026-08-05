import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Activity, Emotion, LibraryResource } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/components/Home';
import { ComfortTransition } from '@/components/ComfortTransition';
import { Library } from '@/components/Library';
import { ActivitiesView } from '@/components/ActivitiesView';
import { SupportView } from '@/components/SupportView';

type View = 'home' | 'library' | 'activities' | 'support';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [activeEmotion, setActiveEmotion] = useState<Emotion | null>(null);
  const [transitioning, setTransitioning] = useState<Emotion | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [emoRes, resRes, actRes] = await Promise.all([
        supabase.from('emotions').select('*').order('sort_order', { ascending: true }),
        supabase.from('resources').select('*'),
        supabase.from('activities').select('*'),
      ]);
      if (cancelled) return;
      if (emoRes.error || resRes.error || actRes.error) {
        setLoadError(true);
        setLoading(false);
        return;
      }
      setEmotions((emoRes.data as Emotion[]) ?? []);
      setResources((resRes.data as LibraryResource[]) ?? []);
      setActivities((actRes.data as Activity[]) ?? []);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const handlePickEmotion = (e: Emotion) => {
    setTransitioning(e);
  };

  const handleNavHome = () => {
    setView('home');
    setActiveEmotion(null);
    window.scrollTo(0, 0);
  };

  const handleNavActivities = () => {
    setView('activities');
    window.scrollTo(0, 0);
  };

  const handleNavSupport = () => {
    setView('support');
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="paper-texture flex min-h-screen flex-col items-center justify-center">
        <div className="animate-breathe h-16 w-16 rounded-full bg-gradient-to-br from-stone-300 to-stone-400" />
        <p className="mt-6 font-serif text-lg text-stone-500">Opening the library…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="paper-texture flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-xl text-stone-700">
          We couldn't open the library right now.
        </p>
        <p className="mt-2 text-sm text-stone-500">
          Please try again in a moment. If the problem continues, reach out to a
          trusted adult or a helpline.
        </p>
      </div>
    );
  }

  const libraryResources = activeEmotion
    ? resources.filter((r) => r.emotion_id === activeEmotion.id)
    : [];

  const headerView = view === 'library' ? 'library' : view;

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f3]">
      <Header
        view={headerView as 'home' | 'library' | 'activities' | 'support'}
        onHome={handleNavHome}
        onActivities={handleNavActivities}
        onSupport={handleNavSupport}
      />

      <div className="flex-1">
        {view === 'home' && (
          <Home
            emotions={emotions}
            onPickEmotion={handlePickEmotion}
            onBrowseAll={() => {
              if (emotions[0]) {
                setActiveEmotion(emotions[0]);
                setView('library');
                window.scrollTo(0, 0);
              }
            }}
            onActivities={handleNavActivities}
            onSupport={handleNavSupport}
          />
        )}

        {view === 'library' && activeEmotion && (
          <Library
            emotion={activeEmotion}
            resources={libraryResources}
            onBack={handleNavHome}
            onPickEmotion={(e) => {
              setActiveEmotion(e);
              window.scrollTo(0, 0);
            }}
            allEmotions={emotions}
            onSupport={handleNavSupport}
          />
        )}

        {view === 'activities' && (
          <ActivitiesView activities={activities} emotions={emotions} />
        )}

        {view === 'support' && <SupportView />}
      </div>

      <Footer />

      {transitioning && (
        <ComfortTransition
          emotion={transitioning}
          onGoLibrary={() => {
            setActiveEmotion(transitioning);
            setView('library');
            setTransitioning(null);
            window.scrollTo(0, 0);
          }}
          onGoActivities={() => {
            setActiveEmotion(transitioning);
            setView('activities');
            setTransitioning(null);
            window.scrollTo(0, 0);
          }}
          onGoHome={() => {
            setTransitioning(null);
            setView('home');
            window.scrollTo(0, 0);
          }}
        />
      )}
    </div>
  );
}
