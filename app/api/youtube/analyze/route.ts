import { NextRequest, NextResponse } from 'next/server';
import { fetchYouTubeChannelData } from '@/lib/youtube';
import { calculatePerformanceMetrics } from '@/lib/metrics';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { channelUrl } = body;

    if (!channelUrl || typeof channelUrl !== 'string' || channelUrl.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a valid YouTube channel URL or @handle' },
        { status: 400 }
      );
    }

    const result = await fetchYouTubeChannelData(channelUrl.trim());
    const metrics = calculatePerformanceMetrics(result.videos);

    return NextResponse.json({
      success: true,
      channel: result.channel,
      videos: result.videos,
      metrics,
      isDemoData: result.isDemoData,
      error: result.error,
    });
  } catch (err: any) {
    console.error('API /api/youtube/analyze Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to process YouTube channel analysis.' },
      { status: 500 }
    );
  }
}
