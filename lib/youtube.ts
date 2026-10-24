import { ChannelInfo, Video } from '@/types/youtube';
import { parseISO8601Duration } from './metrics';

export type YouTubeFetchResult = {
  channel: ChannelInfo;
  videos: Video[];
  isDemoData: boolean;
  error?: string;
};

// Realistic mock data for fallback / missing key scenario
export function getMockYouTubeData(queryHandle = '@techcreator'): YouTubeFetchResult {
  const channel: ChannelInfo = {
    id: 'UC_demo_channel_123',
    title: 'Marques Brownlee',
    handle: '@mkbhd',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    description: 'Quality tech videos | YouTuber | Geek | Podcaster | Ultimate Frisbee player',
    subscribers: 18400000,
    totalViews: 4120000000,
    videoCount: 1620,
    customUrl: '@mkbhd',
  };

  const videos: Video[] = [
    {
      id: 'demo-vid-1',
      title: 'Apple Vision Pro 2: Everything We Know So Far!',
      thumbnail: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop&q=80',
      publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      views: 1850000,
      likes: 124000,
      comments: 6800,
      duration: '14:25',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      engagementRate: Number((((124000 + 6800) / 1850000) * 100).toFixed(2)),
    },
    {
      id: 'demo-vid-2',
      title: 'Top 5 AI Hardware Gadgets (2026 Buyers Guide)',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      views: 2420000,
      likes: 189000,
      comments: 11200,
      duration: '18:10',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      engagementRate: Number((((189000 + 11200) / 2420000) * 100).toFixed(2)),
    },
    {
      id: 'demo-vid-3',
      title: 'I Built a Full Stack SaaS with Claude & Next.js in 1 Hour',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      publishedAt: new Date(Date.now() - 86400000 * 9).toISOString(),
      views: 3100000,
      likes: 245000,
      comments: 15400,
      duration: '22:45',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      engagementRate: Number((((245000 + 15400) / 3100000) * 100).toFixed(2)),
    },
    {
      id: 'demo-vid-4',
      title: 'The Truth About Electric Cars in 2026',
      thumbnail: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80',
      publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      views: 1290000,
      likes: 82000,
      comments: 4900,
      duration: '16:05',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      engagementRate: Number((((82000 + 4900) / 1290000) * 100).toFixed(2)),
    },
    {
      id: 'demo-vid-5',
      title: 'Why AI Assistants Are Replacing Search Engines',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
      publishedAt: new Date(Date.now() - 86400000 * 18).toISOString(),
      views: 2890000,
      likes: 210000,
      comments: 13100,
      duration: '12:30',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      engagementRate: Number((((210000 + 13100) / 2890000) * 100).toFixed(2)),
    },
    {
      id: 'demo-vid-6',
      title: 'Smartphone Blind Camera Test 2026!',
      thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      publishedAt: new Date(Date.now() - 86400000 * 24).toISOString(),
      views: 4500000,
      likes: 380000,
      comments: 29000,
      duration: '25:12',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      engagementRate: Number((((380000 + 29000) / 4500000) * 100).toFixed(2)),
    },
    {
      id: 'demo-vid-7',
      title: 'Coding 10x Faster with AI Agents (Complete Setup)',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      publishedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      views: 1950000,
      likes: 165000,
      comments: 9800,
      duration: '19:40',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      engagementRate: Number((((165000 + 9800) / 1950000) * 100).toFixed(2)),
    },
    {
      id: 'demo-vid-8',
      title: 'Desk Setup Tour 2026: Ultimate Productivity Studio',
      thumbnail: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop&q=80',
      publishedAt: new Date(Date.now() - 86400000 * 36).toISOString(),
      views: 980000,
      likes: 71000,
      comments: 3200,
      duration: '11:15',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      engagementRate: Number((((71000 + 3200) / 980000) * 100).toFixed(2)),
    }
  ];

  return {
    channel,
    videos,
    isDemoData: true,
  };
}

export function parseYouTubeInput(input: string): { type: 'handle' | 'channelId' | 'query'; value: string } {
  const trimmed = input.trim();
  
  if (trimmed.startsWith('UC') && trimmed.length >= 20 && !trimmed.includes('/')) {
    return { type: 'channelId', value: trimmed };
  }

  // Handle URL forms
  try {
    const urlStr = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    const url = new URL(urlStr);
    const pathname = url.pathname;

    if (pathname.includes('/channel/')) {
      const parts = pathname.split('/channel/');
      const channelId = parts[1]?.split('/')[0];
      if (channelId) return { type: 'channelId', value: channelId };
    }

    if (pathname.includes('/@')) {
      const handle = pathname.substring(pathname.indexOf('/@') + 1).split('/')[0];
      return { type: 'handle', value: handle.startsWith('@') ? handle : `@${handle}` };
    }

    if (pathname.startsWith('/c/') || pathname.startsWith('/user/')) {
      const name = pathname.split('/')[2];
      if (name) return { type: 'query', value: name };
    }
  } catch {
    // Not a valid URL, treat as raw handle or query
  }

  if (trimmed.startsWith('@')) {
    return { type: 'handle', value: trimmed };
  }

  return { type: 'query', value: trimmed.startsWith('@') ? trimmed : `@${trimmed}` };
}

export async function fetchYouTubeChannelData(
  channelInput: string,
  apiKey?: string
): Promise<YouTubeFetchResult> {
  const key = apiKey || process.env.YOUTUBE_API_KEY;

  if (!key) {
    console.warn('YOUTUBE_API_KEY is missing. Using fallback demo data.');
    return getMockYouTubeData(channelInput);
  }

  try {
    const parsed = parseYouTubeInput(channelInput);
    let channelId = '';
    let channelItem: any = null;

    if (parsed.type === 'channelId') {
      channelId = parsed.value;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${key}`
      );
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        channelItem = data.items[0];
      }
    } else if (parsed.type === 'handle') {
      const handle = parsed.value;
      // Try forHandle parameter
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&forHandle=${encodeURIComponent(
          handle
        )}&key=${key}`
      );
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        channelItem = data.items[0];
        channelId = channelItem.id;
      } else {
        // Fallback search
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
            handle
          )}&key=${key}`
        );
        const searchData = await searchRes.json();
        if (searchData.items && searchData.items.length > 0) {
          channelId = searchData.items[0].id.channelId;
          const cRes = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${key}`
          );
          const cData = await cRes.json();
          if (cData.items && cData.items.length > 0) {
            channelItem = cData.items[0];
          }
        }
      }
    } else {
      // Query search
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
          parsed.value
        )}&key=${key}`
      );
      const searchData = await searchRes.json();
      if (searchData.items && searchData.items.length > 0) {
        channelId = searchData.items[0].id.channelId;
        const cRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${key}`
        );
        const cData = await cRes.json();
        if (cData.items && cData.items.length > 0) {
          channelItem = cData.items[0];
        }
      }
    }

    if (!channelItem) {
      console.warn('Channel not found on YouTube API, falling back to mock data');
      return {
        ...getMockYouTubeData(channelInput),
        error: `Channel "${channelInput}" not found on YouTube API. Showing demo channel data.`,
      };
    }

    const snippet = channelItem.snippet || {};
    const stats = channelItem.statistics || {};
    const uploadsPlaylistId = channelItem.contentDetails?.relatedPlaylists?.uploads;

    const channel: ChannelInfo = {
      id: channelItem.id,
      title: snippet.title || 'YouTube Creator',
      handle: snippet.customUrl || parsed.value,
      avatar: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || '',
      description: snippet.description || '',
      subscribers: parseInt(stats.subscriberCount || '0', 10),
      totalViews: parseInt(stats.viewCount || '0', 10),
      videoCount: parseInt(stats.videoCount || '0', 10),
      customUrl: snippet.customUrl,
    };

    if (!uploadsPlaylistId) {
      return {
        channel,
        videos: [],
        isDemoData: false,
      };
    }

    // Fetch recent 15 videos from uploads playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=15&key=${key}`
    );
    const playlistData = await playlistRes.json();
    const playlistItems = playlistData.items || [];

    const videoIds = playlistItems
      .map((item: any) => item.snippet?.resourceId?.videoId)
      .filter(Boolean);

    if (videoIds.length === 0) {
      return { channel, videos: [], isDemoData: false };
    }

    // Fetch video statistics & details
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(
        ','
      )}&key=${key}`
    );
    const videosData = await videosRes.json();
    const videoDetailsList = videosData.items || [];

    const videos: Video[] = videoDetailsList.map((v: any) => {
      const vSnippet = v.snippet || {};
      const vStats = v.statistics || {};
      const vDetails = v.contentDetails || {};

      const views = parseInt(vStats.viewCount || '0', 10);
      const likes = parseInt(vStats.likeCount || '0', 10);
      const comments = parseInt(vStats.commentCount || '0', 10);
      const engagementRate = views > 0 ? Number((((likes + comments) / views) * 100).toFixed(2)) : 0;

      return {
        id: v.id,
        title: vSnippet.title || 'Untitled Video',
        thumbnail:
          vSnippet.thumbnails?.maxres?.url ||
          vSnippet.thumbnails?.high?.url ||
          vSnippet.thumbnails?.medium?.url ||
          vSnippet.thumbnails?.default?.url ||
          '',
        publishedAt: vSnippet.publishedAt || new Date().toISOString(),
        views,
        likes,
        comments,
        duration: parseISO8601Duration(vDetails.duration),
        url: `https://www.youtube.com/watch?v=${v.id}`,
        engagementRate,
      };
    });

    return {
      channel,
      videos,
      isDemoData: false,
    };
  } catch (err: any) {
    console.error('Error fetching YouTube API data:', err);
    return {
      ...getMockYouTubeData(channelInput),
      error: `YouTube API error (${err?.message || 'Quota or network issue'}). Showing demo channel data.`,
    };
  }
}
