export type ResourceType =
  | 'book'
  | 'article'
  | 'video'
  | 'podcast'
  | 'organization'
  | 'helpline';

export type ColorKey =
  | 'dusty-blue'
  | 'sage'
  | 'muted-coral'
  | 'lavender'
  | 'amber'
  | 'terracotta'
  | 'warm-yellow'
  | 'dusty-rose'
  | 'soft-teal'
  | 'soft-clay';

export interface Emotion {
  id: string;
  name: string;
  slug: string;
  color_key: ColorKey;
  description: string;
  comfort_message: string;
  intro_text: string;
  icon: string;
  sort_order: number;
}

export interface LibraryResource {
  id: string;
  emotion_id: string;
  title: string;
  author: string | null;
  provider: string;
  url: string;
  resource_type: ResourceType;
  description: string;
  duration_text: string | null;
  is_free: boolean;
  cover_color: ColorKey;
  spine_text: string | null;
  sort_order: number;
}

export type ActivityType =
  | 'breathing'
  | 'grounding'
  | 'gratitude'
  | 'mood'
  | 'affirmation'
  | 'timer'
  | 'sleep'
  | 'stretch'
  | 'journal'
  | 'detox'
  | 'reflection';

export interface Activity {
  id: string;
  emotion_id: string | null;
  title: string;
  description: string;
  activity_type: ActivityType;
  duration_text: string | null;
  icon: string;
  sort_order: number;
}
