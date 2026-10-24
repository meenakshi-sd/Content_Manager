export type Video = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  views: number;
  likes: number;
  comments: number;
  duration?: string;
  url: string;
  engagementRate: number; // calculated: ((likes + comments) / views) * 100
};

export type ChannelInfo = {
  id: string;
  title: string;
  handle?: string;
  avatar: string;
  description: string;
  subscribers: number;
  totalViews: number;
  videoCount: number;
  customUrl?: string;
};

export type PerformanceMetrics = {
  averageViews: number;
  averageLikes: number;
  averageComments: number;
  totalFetchedViews: number;
  averageEngagement: number;
  highestViewedVideo?: Video;
  highestEngagementVideo?: Video;
};

export type SuggestionCategory = 
  | 'HIGH-PERFORMING FORMAT' 
  | 'TRENDING TOPIC' 
  | 'CONTENT GAP' 
  | 'FOLLOW-UP IDEA' 
  | 'EXPERIMENT';

export type ContentRecommendation = {
  id?: string;
  title: string;
  format: string;
  platform?: string;
  reason: string;
  category?: SuggestionCategory;
  sourceVideos?: string[];
};

export type AiInsight = {
  title: string;
  description: string;
  type?: 'positive' | 'warning' | 'opportunity';
};

export type StructuredAiOutput = {
  summary: string;
  topTopics: string[];
  contentPatterns: string[];
  insights: AiInsight[];
  recommendations: ContentRecommendation[];
};

export type ContentStatus = 'idea' | 'planning' | 'draft' | 'ready' | 'published';

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
  platform: string;
  type: string;
  createdAt: string;
  scheduledDate?: string;
  category?: SuggestionCategory;
  sourceVideos?: string[];
};
