import { Video, PerformanceMetrics } from '@/types/youtube';

export function calculatePerformanceMetrics(videos: Video[]): PerformanceMetrics {
  if (!videos || videos.length === 0) {
    return {
      averageViews: 0,
      averageLikes: 0,
      averageComments: 0,
      totalFetchedViews: 0,
      averageEngagement: 0,
    };
  }

  const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);
  const totalLikes = videos.reduce((sum, v) => sum + (v.likes || 0), 0);
  const totalComments = videos.reduce((sum, v) => sum + (v.comments || 0), 0);
  const totalEngagement = videos.reduce((sum, v) => sum + (v.engagementRate || 0), 0);

  const count = videos.length;
  const averageViews = Math.round(totalViews / count);
  const averageLikes = Math.round(totalLikes / count);
  const averageComments = Math.round(totalComments / count);
  const averageEngagement = Number((totalEngagement / count).toFixed(2));

  let highestViewedVideo = videos[0];
  let highestEngagementVideo = videos[0];

  for (const video of videos) {
    if (video.views > (highestViewedVideo?.views || 0)) {
      highestViewedVideo = video;
    }
    if (video.engagementRate > (highestEngagementVideo?.engagementRate || 0)) {
      highestEngagementVideo = video;
    }
  }

  return {
    averageViews,
    averageLikes,
    averageComments,
    totalFetchedViews: totalViews,
    averageEngagement,
    highestViewedVideo,
    highestEngagementVideo,
  };
}

export function formatCompactNumber(num: number): string {
  if (num === undefined || num === null || isNaN(num)) return '0';
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.00$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function parseISO8601Duration(duration?: string): string {
  if (!duration) return '';
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;
  const hours = match[1] ? `${match[1]}:` : '';
  const minutes = match[2] ? (match[1] ? match[2].padStart(2, '0') : match[2]) : '0';
  const seconds = match[3] ? match[3].padStart(2, '0') : '00';
  return `${hours}${minutes}:${seconds}`;
}
