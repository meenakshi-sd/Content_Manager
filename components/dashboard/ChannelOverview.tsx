'use client';

import React from 'react';
import { ChannelInfo, Video, PerformanceMetrics, StructuredAiOutput, ContentRecommendation } from '@/types/youtube';
import { formatCompactNumber } from '@/lib/metrics';
import MetricCard from './MetricCard';
import PerformanceCharts from './PerformanceCharts';
import AiInsights from './AiInsights';
import { 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  TrendingUp, 
  ExternalLink,
  Users,
  Film,
  Award,
  Flame,
  ArrowRight
} from 'lucide-react';
import RecommendationCard from './RecommendationCard';

interface ChannelOverviewProps {
  channel: ChannelInfo;
  videos: Video[];
  metrics: PerformanceMetrics;
  aiInsights?: StructuredAiOutput | null;
  onAddToPlanner: (rec: ContentRecommendation) => void;
  onNavigateToSuggestions?: () => void;
  onNavigateToPlanner?: () => void;
  addedRecommendationTitles?: string[];
}

export default function ChannelOverview({
  channel,
  videos,
  metrics,
  aiInsights,
  onAddToPlanner,
  onNavigateToSuggestions,
  onNavigateToPlanner,
  addedRecommendationTitles = [],
}: ChannelOverviewProps) {
  const topVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. CREATOR PROFILE HERO */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-pink-950/30 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {channel.avatar ? (
              <img
                src={channel.avatar}
                alt={channel.title}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-pink-500/30 shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center ring-4 ring-pink-500/30">
                {channel.title.charAt(0)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {channel.title}
                </h1>
                <a
                  href={`https://youtube.com/${channel.handle || ''}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 transition-colors"
                  title="Open YouTube Channel"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs font-semibold text-pink-400 mt-1">
                {channel.handle || 'YouTube Creator'}
              </p>
              {channel.description && (
                <p className="text-xs text-slate-400 mt-2 max-w-xl line-clamp-2 leading-relaxed">
                  {channel.description}
                </p>
              )}
            </div>
          </div>

          {/* Quick Creator Counts */}
          <div className="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mb-1 font-semibold">
                <Users className="w-3.5 h-3.5 text-pink-400" />
                Subscribers
              </div>
              <p className="text-lg font-black text-white">
                {formatCompactNumber(channel.subscribers)}
              </p>
            </div>

            <div className="h-8 w-px bg-slate-800" />

            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mb-1 font-semibold">
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                Total Views
              </div>
              <p className="text-lg font-black text-white">
                {formatCompactNumber(channel.totalViews)}
              </p>
            </div>

            <div className="h-8 w-px bg-slate-800" />

            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mb-1 font-semibold">
                <Film className="w-3.5 h-3.5 text-emerald-400" />
                Videos
              </div>
              <p className="text-lg font-black text-white">
                {formatCompactNumber(channel.videoCount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. METRIC CARDS */}
      <div>
        <h2 className="text-base font-bold text-white mb-4">Channel Performance Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Subscribers"
            value={formatCompactNumber(channel.subscribers)}
            subtitle="Channel audience size"
            icon={Users}
            color="purple"
          />
          <MetricCard
            title="Total Views"
            value={formatCompactNumber(channel.totalViews)}
            subtitle="Lifetime views"
            icon={Eye}
            color="indigo"
          />
          <MetricCard
            title="Avg Views"
            value={formatCompactNumber(metrics.averageViews)}
            subtitle="per recent video"
            icon={Film}
            color="blue"
          />
          <MetricCard
            title="Engagement Rate"
            value={`${metrics.averageEngagement}%`}
            subtitle="(Likes + Comments) / Views"
            icon={TrendingUp}
            color="emerald"
            highlight
          />
        </div>
      </div>

      {/* 3. PERFORMANCE OVERVIEW (Two Columns: Left = Charts, Right = Top Performing Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceCharts videos={videos} />
        </div>

        {/* Right: Top Performing Content */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Top Performing Content
              </h3>
            </div>

            <div className="space-y-3">
              {topVideos.map((video) => (
                <div
                  key={video.id}
                  className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-12 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-white truncate">{video.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {formatCompactNumber(video.views)} views • {video.engagementRate}% engagement
                      </p>
                    </div>
                  </div>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI INSIGHTS SECTION */}
      {aiInsights && (
        <AiInsights
          insightsData={aiInsights}
          onAddToPlanner={onAddToPlanner}
          onNavigateToPlanner={onNavigateToPlanner}
          addedRecommendationTitles={addedRecommendationTitles}
        />
      )}

      {/* 5. CONTENT SUGGESTIONS PREVIEW */}
      {aiInsights && aiInsights.recommendations && aiInsights.recommendations.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-pink-400" />
                Content Ideas Preview
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                AI recommended video concepts based on viewer data
              </p>
            </div>
            {onNavigateToSuggestions && (
              <button
                onClick={onNavigateToSuggestions}
                className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors"
              >
                All Content Suggestions <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.recommendations.slice(0, 2).map((rec, idx) => (
              <RecommendationCard
                key={idx}
                recommendation={rec}
                onAddToPlanner={onAddToPlanner}
                isAlreadyAdded={addedRecommendationTitles.includes(rec.title)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
