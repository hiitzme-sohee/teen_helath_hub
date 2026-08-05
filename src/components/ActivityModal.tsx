import { useEffect, useRef, useState } from 'react';
import {
  Wind,
  Eye,
  Heart,
  Sparkles,
  Timer,
  Moon,
  Activity,
  PenLine,
  PhoneOff,
  CalendarHeart,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  Check,
} from 'lucide-react';
import type { ActivityType } from '@/lib/types';

interface ActivityModalProps {
  title: string;
  description: string;
  type: ActivityType;
  durationText: string | null;
  icon: string;
  onClose: () => void;
}

export function ActivityModal({
  title,
  description,
  type,
  durationText,
  icon,
  onClose,
}: ActivityModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-2 backdrop-blur-sm animate-fade-in sm:p-6"
      onClick={onClose}
    >
      <div
        className="paper-grain relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-[#fbf8f3] shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-200/60 px-6 py-4">
          <h3 className="font-serif text-lg font-medium text-stone-800">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <ActivityContent type={type} title={title} description={description} />
        </div>

        {durationText && (
          <div className="border-t border-stone-200/60 px-6 py-3 text-center text-xs text-stone-400">
            Suggested time: {durationText}
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityContent({
  type,
  title,
  description,
}: {
  type: ActivityType;
  title: string;
  description: string;
}) {
  switch (type) {
    case 'breathing':
      return <BreathingExercise description={description} />;
    case 'grounding':
      return <GroundingExercise description={description} />;
    case 'gratitude':
      return <JournalExercise description={description} placeholder="Write three things you're grateful for today..." lines={3} />;
    case 'mood':
      return <MoodCheckIn description={description} />;
    case 'affirmation':
      return <AffirmationCards description={description} />;
    case 'timer':
      return <StudyBreakTimer description={description} />;
    case 'sleep':
      return <SleepChecklist description={description} />;
    case 'stretch':
      return <StretchRoutine description={description} />;
    case 'journal':
      return <JournalExercise description={description} placeholder="Write whatever comes to mind..." lines={6} />;
    case 'detox':
      return <DetoxChallenge description={description} />;
    case 'reflection':
      return <ReflectionPrompts description={description} />;
    default:
      return <p className="text-sm text-stone-600">{description}</p>;
  }
}

/* ===== BREATHING ===== */
function BreathingExercise({ description }: { description: string }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    const durations = { inhale: 4000, hold: 4000, exhale: 4000, hold2: 4000 };
    const next: Record<typeof phase, typeof phase> = {
      inhale: 'hold',
      hold: 'exhale',
      exhale: 'hold2',
      hold2: 'inhale',
    };
    const t = setTimeout(() => {
      setPhase((p) => next[p]);
      setCount((c) => c + 1);
    }, durations[phase]);
    return () => clearTimeout(t);
  }, [phase, active]);

  const labels = { inhale: 'Breathe in', hold: 'Hold', exhale: 'Breathe out', hold2: 'Hold' };
  const scales = { inhale: 'scale-125', hold: 'scale-125', exhale: 'scale-100', hold2: 'scale-100' };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-8 text-center text-sm text-stone-500">{description}</p>
      <div className="relative flex h-48 w-48 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-stone-100" />
        <div
          className={`flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-sky-200 to-sky-300 transition-transform duration-[4000ms] ease-in-out ${scales[phase]}`}
        >
          <span className="font-serif text-sm font-medium text-sky-700">{labels[phase]}</span>
        </div>
      </div>
      <p className="mt-6 text-xs text-stone-400">Cycles: {Math.floor(count / 4)}</p>
      <button
        onClick={() => setActive((a) => !a)}
        className="mt-4 rounded-lg bg-stone-100 px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200"
      >
        {active ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}

/* ===== GROUNDING 5-4-3-2-1 ===== */
function GroundingExercise({ description }: { description: string }) {
  const steps = [
    { n: 5, sense: 'See', prompt: 'Name five things you can see around you right now.' },
    { n: 4, sense: 'Touch', prompt: 'Notice four things you can physically feel.' },
    { n: 3, sense: 'Hear', prompt: 'Listen for three sounds, near or far.' },
    { n: 2, sense: 'Smell', prompt: 'Find two scents you can notice.' },
    { n: 1, sense: 'Taste', prompt: 'Notice one taste, or take a sip of water.' },
  ];
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<boolean[]>([false, false, false, false, false]);

  return (
    <div className="flex flex-col">
      <p className="mb-6 text-center text-sm text-stone-500">{description}</p>
      <div className="flex justify-center gap-1.5">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              done[i]
                ? 'bg-emerald-100 text-emerald-600'
                : i === active
                  ? 'bg-stone-700 text-[#fbf8f3]'
                  : 'bg-stone-100 text-stone-400'
            }`}
          >
            {done[i] ? <Check className="h-4 w-4" /> : s.n}
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl bg-stone-50 p-6 text-center">
        <p className="font-serif text-lg font-medium text-stone-700">
          {steps[active].sense}
        </p>
        <p className="mt-2 text-sm text-stone-500">{steps[active].prompt}</p>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        {active < steps.length - 1 ? (
          <button
            onClick={() => {
              setDone((d) => { const nd = [...d]; nd[active] = true; return nd; });
              setActive((a) => a + 1);
            }}
            className="flex items-center gap-1 rounded-lg bg-stone-700 px-4 py-2 text-sm font-semibold text-[#fbf8f3] transition-colors hover:bg-stone-800"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              setDone((d) => { const nd = [...d]; nd[active] = true; return nd; });
            }}
            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            <Check className="h-4 w-4" /> Complete
          </button>
        )}
      </div>
      {done.every(Boolean) && (
        <p className="mt-4 text-center text-sm font-medium text-emerald-600 animate-fade-in">
          You're here, in this moment. Well done.
        </p>
      )}
    </div>
  );
}

/* ===== JOURNAL / GRATUITY ===== */
function JournalExercise({
  description,
  placeholder,
  lines,
}: {
  description: string;
  placeholder: string;
  lines: number;
}) {
  const [text, setText] = useState('');
  return (
    <div className="flex flex-col">
      <p className="mb-4 text-sm text-stone-500">{description}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={lines}
        className="w-full resize-none rounded-xl border border-stone-200 bg-white/70 px-4 py-3 font-serif text-base leading-relaxed text-stone-700 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-700/10"
        autoFocus
      />
      <p className="mt-3 text-xs text-stone-400">
        {text.trim() ? `${text.trim().split(/\s+/).length} words written` : 'Write freely — no one will see this but you.'}
      </p>
    </div>
  );
}

/* ===== MOOD CHECK-IN ===== */
function MoodCheckIn({ description }: { description: string }) {
  const moods = [
    { label: 'Great', emoji: '😄' },
    { label: 'Okay', emoji: '🙂' },
    { label: 'Meh', emoji: '😐' },
    { label: 'Low', emoji: '😔' },
    { label: 'Struggling', emoji: '😢' },
  ];
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="flex flex-col">
      <p className="mb-6 text-center text-sm text-stone-500">{description}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {moods.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-all ${
              selected === i
                ? 'bg-stone-700 text-[#fbf8f3] scale-105'
                : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-xs font-medium">{m.label}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className="mt-6 text-center text-sm font-medium text-stone-600 animate-fade-in">
          Thank you for noticing. It takes courage to name how you feel.
        </p>
      )}
    </div>
  );
}

/* ===== AFFIRMATIONS ===== */
const AFFIRMATIONS = [
  'You are worthy of kindness — including your own.',
  'Your feelings are valid, even the ones that are hard.',
  'You don\'t have to have it all figured out today.',
  'You have survived every hard day so far. That\'s remarkable.',
  'You are allowed to take up space in this world.',
  'Small steps still count as steps.',
  'You are not alone, even when it feels that way.',
  'Rest is not lazy. It\'s how you heal.',
];

function AffirmationCards({ description }: { description: string }) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * AFFIRMATIONS.length));
  return (
    <div className="flex flex-col items-center">
      <p className="mb-6 text-center text-sm text-stone-500">{description}</p>
      <div className="relative min-h-[200px] w-full max-w-md">
        <div className="paper-grain flex min-h-[200px] items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 p-8 shadow-inner">
          <p className="text-center font-serif text-xl font-medium italic leading-relaxed text-stone-700 animate-fade-in" key={idx}>
            "{AFFIRMATIONS[idx]}"
          </p>
        </div>
      </div>
      <button
        onClick={() => setIdx((i) => (i + 1) % AFFIRMATIONS.length)}
        className="mt-6 flex items-center gap-2 rounded-xl bg-stone-700 px-5 py-2.5 text-sm font-semibold text-[#fbf8f3] transition-colors hover:bg-stone-800"
      >
        <RotateCcw className="h-4 w-4" />
        Another one
      </button>
    </div>
  );
}

/* ===== STUDY BREAK TIMER ===== */
function StudyBreakTimer({ description }: { description: string }) {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setMode((m) => (m === 'focus' ? 'break' : 'focus'));
            return mode === 'focus' ? 5 * 60 : 25 * 60;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-6 text-center text-sm text-stone-500">{description}</p>
      <div className={`flex h-40 w-40 items-center justify-center rounded-full ${mode === 'focus' ? 'bg-sky-50' : 'bg-emerald-50'}`}>
        <span className="font-serif text-4xl font-medium tabular-nums text-stone-700">
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-stone-500">
        {mode === 'focus' ? 'Focus time' : 'Break time'}
      </p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-lg bg-stone-700 px-4 py-2 text-sm font-semibold text-[#fbf8f3] transition-colors hover:bg-stone-800"
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setRunning(false); setMode('focus'); setSeconds(25 * 60); }}
          className="rounded-lg bg-stone-100 px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/* ===== SLEEP CHECKLIST ===== */
function SleepChecklist({ description }: { description: string }) {
  const items = [
    'Dim the lights an hour before bed',
    'Put screens away or switch to night mode',
    'Take five slow, deep breaths',
    'Think of one good thing from today',
    'Let your shoulders soften and relax',
    'Give yourself permission to rest',
  ];
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false));
  const completed = checked.filter(Boolean).length;

  return (
    <div className="flex flex-col">
      <p className="mb-5 text-sm text-stone-500">{description}</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setChecked((c) => { const n = [...c]; n[i] = !n[i]; return n; })}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
              checked[i] ? 'bg-indigo-50' : 'bg-stone-50 hover:bg-stone-100'
            }`}
          >
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
              checked[i] ? 'border-indigo-400 bg-indigo-400 text-white' : 'border-stone-300'
            }`}>
              {checked[i] && <Check className="h-3 w-3" />}
            </span>
            <span className={`text-sm ${checked[i] ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
              {item}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-stone-400">
        {completed}/{items.length} done {completed === items.length && '— Sweet dreams 🌙'}
      </p>
    </div>
  );
}

/* ===== STRETCH ===== */
function StretchRoutine({ description }: { description: string }) {
  const stretches = [
    'Roll your shoulders slowly backward, five times',
    'Gently tilt your head toward each shoulder, holding for a breath',
    'Reach both arms up high and stretch toward the ceiling',
    'Slowly roll down, vertebra by vertebra, and back up',
    'Rotate your wrists and ankles gently',
    'Take one full, deep breath and shake out your hands',
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col">
      <p className="mb-5 text-center text-sm text-stone-500">{description}</p>
      <div className="flex justify-center gap-1.5 mb-6">
        {stretches.map((_, i) => (
          <div key={i} className={`h-2 w-2 rounded-full ${i === active ? 'bg-stone-700' : 'bg-stone-200'}`} />
        ))}
      </div>
      <div className="rounded-xl bg-stone-50 p-6 text-center min-h-[100px] flex items-center justify-center">
        <p className="font-serif text-lg text-stone-700">{stretches[active]}</p>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        {active < stretches.length - 1 ? (
          <button
            onClick={() => setActive((a) => a + 1)}
            className="flex items-center gap-1 rounded-lg bg-stone-700 px-4 py-2 text-sm font-semibold text-[#fbf8f3] transition-colors hover:bg-stone-800"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
            <Check className="h-4 w-4" /> All done
          </span>
        )}
      </div>
    </div>
  );
}

/* ===== DETOX ===== */
function DetoxChallenge({ description }: { description: string }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-6 text-center text-sm text-stone-500">{description}</p>
      <div className="flex h-40 w-40 items-center justify-center rounded-full bg-stone-50">
        <span className="font-serif text-4xl font-medium tabular-nums text-stone-700">
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-4 text-sm text-stone-500">Time away from your screen</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-lg bg-stone-700 px-4 py-2 text-sm font-semibold text-[#fbf8f3] transition-colors hover:bg-stone-800"
        >
          {running ? 'Pause' : seconds > 0 ? 'Resume' : 'Begin'}
        </button>
        <button
          onClick={() => { setRunning(false); setSeconds(0); }}
          className="rounded-lg bg-stone-100 px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200"
        >
          Reset
        </button>
      </div>
      <p className="mt-4 text-xs text-stone-400 max-w-xs text-center">
        Tip: put your phone face down, look out a window, and notice five things you can see.
      </p>
    </div>
  );
}

/* ===== REFLECTION ===== */
function ReflectionPrompts({ description }: { description: string }) {
  const prompts = [
    'What was one thing today that made you smile, even a little?',
    'What\'s something that felt hard this week?',
    'What are you proud of, even if it seems small?',
    'What would you like more of in your life right now?',
    'What\'s one gentle thing you can do for yourself tomorrow?',
  ];
  const [answers, setAnswers] = useState<string[]>(new Array(prompts.length).fill(''));

  return (
    <div className="flex flex-col">
      <p className="mb-5 text-sm text-stone-500">{description}</p>
      <div className="space-y-4">
        {prompts.map((p, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">{p}</label>
            <textarea
              value={answers[i]}
              onChange={(e) => setAnswers((a) => { const n = [...a]; n[i] = e.target.value; return n; })}
              rows={2}
              className="w-full resize-none rounded-lg border border-stone-200 bg-white/70 px-3 py-2 font-serif text-sm leading-relaxed text-stone-700 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-700/10"
              placeholder="Your thoughts…"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
