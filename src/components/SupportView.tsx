import { useState } from 'react';
import { ChevronDown, LifeBuoy, Phone, Globe, ExternalLink, Heart } from 'lucide-react';
import { LeafDivider, MoonStarsIllustration } from '@/components/Illustrations';

interface Country {
  code: string;
  name: string;
  flag: string;
  emergency: string;
  crisisLines: { name: string; number: string; info: string }[];
  websites: { name: string; url: string; description: string }[];
}

const COUNTRIES: Country[] = [
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    emergency: '111',
    crisisLines: [
      { name: '1737', number: '1737', info: 'Free 24/7 — call or text to talk to a trained counselor.' },
      { name: 'Youthline', number: '0800 37 66 33', info: 'Text 234 or call — free support for young people, 24/7.' },
      { name: 'Lifeline Aotearoa', number: '0800 543 354', info: 'Confidential support and counseling, available 24/7.' },
    ],
    websites: [
      { name: 'Mental Health Foundation NZ', url: 'https://www.mentalhealth.org.nz/helplines', description: 'A full list of NZ helplines and support services.' },
      { name: 'Youthline', url: 'https://www.youthline.co.nz/', description: 'Support, info, and counseling for young New Zealanders.' },
    ],
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    emergency: '000',
    crisisLines: [
      { name: 'Lifeline Australia', number: '13 11 14', info: 'Free, confidential crisis support, available 24/7.' },
      { name: 'Kids Helpline', number: '1800 55 1800', info: 'Free support for ages 5–25, available 24/7. Web chat also available.' },
      { name: 'Beyond Blue', number: '1300 22 4636', info: 'Support for anxiety, depression, and suicide prevention.' },
    ],
    websites: [
      { name: 'Beyond Blue', url: 'https://www.beyondblue.org.au/', description: 'Information and support for anxiety and depression.' },
      { name: 'ReachOut', url: 'https://au.reachout.com/', description: 'Mental health support designed for young Australians.' },
      { name: 'Lifeline', url: 'https://www.lifeline.org.au/', description: 'Crisis support and suicide prevention.' },
    ],
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    emergency: '119',
    crisisLines: [
      { name: 'Korea Suicide Prevention Center', number: '1393', info: '24/7 suicide prevention hotline. Free and confidential.' },
      { name: 'Mental Health Crisis Helpline', number: '1577-0199', info: 'Mental health counseling and crisis support.' },
      { name: 'Youth Helpline (1388)', number: '1388', info: 'Counseling for youth — call, text, or chat online.' },
    ],
    websites: [
      { name: 'Korea Mental Health Association', url: 'https://www.kmha.or.kr/', description: 'Mental health resources and support in Korea.' },
      { name: 'Youth Helpline 1388', url: 'https://www.i-1388.kr/', description: 'Support and counseling for young people in Korea.' },
    ],
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    emergency: '911',
    crisisLines: [
      { name: '988 Suicide & Crisis Lifeline', number: '988', info: 'Call or text 988 — free, confidential, 24/7.' },
      { name: 'The Trevor Project', number: '1-866-488-7386', info: 'Crisis support for LGBTQ+ youth. Text START to 678-678.' },
      { name: 'Crisis Text Line', number: 'Text HOME to 741741', info: 'Free, 24/7 crisis support by text message.' },
    ],
    websites: [
      { name: '988 Lifeline', url: 'https://988lifeline.org/', description: 'Suicide and crisis support, call or text 988.' },
      { name: 'The Trevor Project', url: 'https://www.thetrevorproject.org/', description: 'LGBTQ+ youth crisis intervention and suicide prevention.' },
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org/', description: 'Free, 24/7 text-based crisis support.' },
    ],
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    emergency: '911',
    crisisLines: [
      { name: 'Kids Help Phone', number: '1-800-668-6868', info: 'Free, 24/7 support for youth. Text CONNECT to 686868.' },
      { name: 'Talk Suicide Canada', number: '1-833-456-4566', info: 'Suicide crisis helpline, available 24/7.' },
      { name: 'Crisis Text Line Canada', number: 'Text CONNECT to 686868', info: 'Free text-based support, available 24/7.' },
    ],
    websites: [
      { name: 'Kids Help Phone', url: 'https://kidshelpphone.ca/', description: 'Canada\'s 24/7 national youth support service.' },
      { name: 'Talk Suicide Canada', url: 'https://talksuicide.ca/', description: 'National suicide crisis helpline.' },
    ],
  },
];

export function SupportView() {
  const [open, setOpen] = useState<string | null>('NZ');

  return (
    <div className="paper-texture min-h-[calc(100vh-65px)]">
      <section className="relative overflow-hidden border-b border-stone-200/60 bg-white/40">
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center">
          <MoonStarsIllustration className="mx-auto h-16 w-16 opacity-80" />
          <h1 className="mt-4 font-serif text-3xl font-medium text-stone-800 sm:text-4xl">
            Need Immediate Support?
          </h1>
          <div className="mt-6 flex justify-center">
            <LeafDivider className="w-40" />
          </div>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-stone-600">
            If you're in immediate danger or think you may harm yourself or
            someone else, contact your local emergency services immediately.
            <span className="italic"> You don't have to face it alone.</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-stone-500">
          <LifeBuoy className="h-5 w-5 text-stone-400" />
          Select your country for local helplines
        </div>

        <div className="space-y-3">
          {COUNTRIES.map((c) => {
            const isOpen = open === c.code;
            return (
              <div
                key={c.code}
                className="overflow-hidden rounded-2xl bg-white/70 ring-1 ring-stone-200/60"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : c.code)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-stone-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <p className="font-serif text-lg font-medium text-stone-800">{c.name}</p>
                      <p className="flex items-center gap-1.5 text-xs text-stone-400">
                        <Phone className="h-3 w-3" />
                        Emergency: {c.emergency}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="animate-fade-in border-t border-stone-200/60 px-5 py-5">
                    {/* Emergency */}
                    <div className="mb-5 rounded-xl bg-rose-50 p-4 ring-1 ring-rose-100">
                      <p className="flex items-center gap-2 text-sm font-semibold text-rose-700">
                        <Phone className="h-4 w-4" />
                        Emergency number: {c.emergency}
                      </p>
                      <p className="mt-1 text-xs text-rose-600/80">
                        Call this number if you or someone else is in immediate danger.
                      </p>
                    </div>

                    {/* Crisis lines */}
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Crisis & Youth Helplines
                    </h4>
                    <div className="space-y-3">
                      {c.crisisLines.map((line) => (
                        <div key={line.name} className="rounded-xl bg-stone-50 p-4">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-serif text-base font-medium text-stone-800">{line.name}</p>
                            <span className="rounded-lg bg-stone-700 px-2.5 py-1 text-sm font-semibold text-[#fbf8f3]">
                              {line.number}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-stone-500">{line.info}</p>
                        </div>
                      ))}
                    </div>

                    {/* Websites */}
                    <h4 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Trusted Websites
                    </h4>
                    <div className="space-y-2">
                      {c.websites.map((w) => (
                        <a
                          key={w.url}
                          href={w.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 rounded-xl bg-stone-50 p-3 transition-colors hover:bg-stone-100"
                        >
                          <div className="min-w-0">
                            <p className="flex items-center gap-1.5 font-medium text-stone-700 group-hover:text-stone-900">
                              <Globe className="h-3.5 w-3.5 text-stone-400" />
                              {w.name}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-stone-400">{w.description}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 shrink-0 text-stone-300 transition-colors group-hover:text-stone-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-stone-500">
          <Heart className="h-4 w-4 text-stone-400" />
          If you can, reach out to a trusted adult too — a teacher, family
          member, or school counselor.
        </div>
      </section>
    </div>
  );
}
