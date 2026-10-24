import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiInsights } from '@/lib/gemini';
import { ChannelInfo, Video, PerformanceMetrics } from '@/types/youtube';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { channel, videos, metrics } = body as {
      channel: ChannelInfo;
      videos: Video[];
      metrics: PerformanceMetrics;
    };

    if (!channel || !videos) {
      return NextResponse.json(
        { error: 'Missing channel or video data for AI analysis.' },
        { status: 400 }
      );
    }

    const aiResult = await generateGeminiInsights(channel, videos, metrics);

    return NextResponse.json({
      success: true,
      data: aiResult.data,
      isDemoData: aiResult.isDemoData,
      error: aiResult.error,
    });
  } catch (err: any) {
    console.error('API /api/ai/analyze Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate Gemini AI insights.' },
      { status: 500 }
    );
  }
}
