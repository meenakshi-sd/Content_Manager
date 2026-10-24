import { ContentItem } from '@/types/youtube';

const STORAGE_KEY = 'creator_intelligence_content_plan';

export const INITIAL_CONTENT_ITEMS: ContentItem[] = [];

export function getStoredContentItems(): ContentItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: ContentItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Completely purge legacy seeded demo items if present in browser cache
    const cleaned = parsed.filter((item) => item && typeof item.id === 'string' && !item.id.startsWith('demo-'));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (err) {
    console.error('Failed to read content items from localStorage:', err);
    return [];
  }
}

export function saveStoredContentItems(items: ContentItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save content items to localStorage:', err);
  }
}
