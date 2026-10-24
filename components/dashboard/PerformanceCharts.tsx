'use client';

import React, { useState } from 'react';
import { Video } from '@/types/youtube';
import { formatCompactNumber } from '@/lib/metrics';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface PerformanceChartsProps {
  videos: Video[];
}

export default function PerformanceCharts({ videos }: PerformanceChartsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!videos || videos.length === 0) return null;

  // Take top 10 recent videos for clean visualization
  const chartVideos = videos.slice(0, 10);
  const maxViews = Math.max(...chartVideos.map((v) => v.views || 0), 1);
  const maxEngagement = Math.max(...chartVideos.map((v) => v.engagementRate || 0), 0.1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1 — Views by Video */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              Views by Recent Video
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Relative audience reach across last 10 uploads
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Views Range
          </span>
        </div>

        {/* SVG Bar Chart */}
        <div className="relative h-56 flex items-end gap-2 pt-6 pb-2 border-b border-slate-800 px-2">
          {chartVideos.map((video, idx) => {
            const heightPercent = Math.max(10, Math.round((video.views / maxViews) * 100));
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-14 z-20 bg-slate-800 text-white text-[11px] p-2 rounded-lg shadow-xl border border-slate-700 pointer-events-none whitespace-nowrap">
                    <p className="font-semibold text-purple-300 truncate max-w-[180px]">
                      {video.title}
                    </p>
                    <p className="text-slate-300 font-bold">{formatCompactNumber(video.views)} views</p>
                  </div>
                )}

                {/* Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isHovered
                      ? 'bg-gradient-to-t from-purple-600 via-indigo-500 to-cyan-400 shadow-lg shadow-purple-500/40 scale-x-105'
                      : 'bg-gradient-to-t from-purple-900/60 to-purple-600/80 hover:from-purple-800'
                  }`}
                />

                {/* Video Index Label */}
                <span className="text-[10px] text-slate-500 font-mono mt-2 group-hover:text-purple-300">
                  #{idx + 1}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-3 font-mono">
          <span>Oldest</span>
          <span>Recent Uploads →</span>
          <span>Latest</span>
        </div>
      </div>

      {/* Chart 2 — Engagement Rate Trend */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Engagement Rate (%) by Video
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ((Likes + Comments) / Views) * 100 ratio
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Engagement
          </span>
        </div>

        {/* SVG Sparkline / Column Chart */}
        <div className="relative h-56 flex items-end gap-2 pt-6 pb-2 border-b border-slate-800 px-2">
          {chartVideos.map((video, idx) => {
            const heightPercent = Math.max(10, Math.round((video.engagementRate / maxEngagement) * 100));
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-14 z-20 bg-slate-800 text-white text-[11px] p-2 rounded-lg shadow-xl border border-slate-700 pointer-events-none whitespace-nowrap">
                    <p className="font-semibold text-emerald-300 truncate max-w-[180px]">
                      {video.title}
                    </p>
                    <p className="text-emerald-400 font-bold">{video.engagementRate}% Engagement</p>
                  </div>
                )}

                {/* Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isHovered
                      ? 'bg-gradient-to-t from-emerald-600 via-teal-500 to-cyan-300 shadow-lg shadow-emerald-500/40 scale-x-105'
                      : 'bg-gradient-to-t from-emerald-900/60 to-emerald-600/80 hover:from-emerald-800'
                  }`}
                />

                {/* Video Index Label */}
                <span className="text-[10px] text-slate-500 font-mono mt-2 group-hover:text-emerald-300">
                  #{idx + 1}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-3 font-mono">
          <span>Oldest</span>
          <span>Engagement Ratio →</span>
          <span>Latest</span>
        </div>
      </div>
    </div>
  );
}
