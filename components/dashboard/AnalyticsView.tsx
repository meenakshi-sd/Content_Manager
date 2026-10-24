'use client';

import React from 'react';
import { ChannelInfo, Video, PerformanceMetrics, StructuredAiOutput } from '@/types/youtube';
import { formatCompactNumber } from '@/lib/metrics';
import MetricCard from './MetricCard';
import PerformanceCharts from './PerformanceCharts';
import { 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  TrendingUp, 
  Award, 
  Sparkles,
  ExternalLink,
  ChartNoAxesCombined
} from 'lucide-react';

interface AnalyticsViewProps {
  channel: ChannelInfo;
  videos: Video[];
  metrics: PerformanceMetrics;
  aiInsights?: StructuredAiOutput | null;
}

export default function AnalyticsView({ channel, videos, metrics, aiInsights }: AnalyticsViewProps) {
  const topRankedVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Analytics Hero */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ChartNoAxesCombined className="w-6 h-6 text-pink-400" />
            Performance Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deep dive into viewer reach, engagement retention, and ranked content performance
          </p>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Fetched Views"
          value={formatCompactNumber(metrics.totalFetchedViews)}
          subtitle="Across recent videos"
          icon={Eye}
          color="purple"
        />
        <MetricCard
          title="Avg Engagement"
          value={`${metrics.averageEngagement}%`}
          subtitle="Likes + Comments / Views"
          icon={TrendingUp}
          color="emerald"
          highlight
        />
        <MetricCard
          title="Avg Likes"
          value={formatCompactNumber(metrics.averageLikes)}
          subtitle="Per video average"
          icon={ThumbsUp}
          color="indigo"
        />
        <MetricCard
          title="Avg Comments"
          value={formatCompactNumber(metrics.averageComments)}
          subtitle="Viewer engagement"
          icon={MessageSquare}
          color="blue"
        />
      </div>

      {/* Interactive Charts */}
      <div>
        <h2 className="text-base font-bold text-white mb-4">Analytics Visualization</h2>
        <PerformanceCharts videos={videos} />
      </div>

      {/* Top 3 Ranked Content & Gemini Interpretation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 3 Videos */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-amber-400" />
            Top Ranked Content
          </h3>
          <div className="space-y-3">
            {topRankedVideos.map((video, idx) => (
              <div
                key={video.id}
                className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-xs font-mono font-bold text-purple-400 shrink-0">
                    #{idx + 1}
                  </span>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-12 h-8 rounded-lg object-cover shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate">{video.title}</h4>
                    <p className="text-[11px] text-slate-400">
                      {formatCompactNumber(video.views)} views • {video.engagementRate}% engagement
                    </p>
                  </div>
                </div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Gemini AI Performance Interpretation */}
        {aiInsights && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border border-purple-500/30 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Data Interpretation</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">Channel Trajectory Summary</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {aiInsights.summary}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Core Observations:</span>
                {aiInsights.contentPatterns.slice(0, 2).map((pattern, idx) => (
                  <p key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>{pattern}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
