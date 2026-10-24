'use client';

import React, { useState } from 'react';
import { Video } from '@/types/youtube';
import { formatCompactNumber, formatDate } from '@/lib/metrics';
import { 
  Search, 
  ExternalLink, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  PlaySquare
} from 'lucide-react';

interface VideoPerformanceProps {
  videos: Video[];
}

type FilterPreset = 'all' | 'highest-views' | 'highest-engagement' | 'recent';

export default function VideoPerformance({ videos }: VideoPerformanceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterPreset>('all');

  // Filtering & Sorting based on selected preset
  const filteredVideos = videos
    .filter((v) => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (activeFilter === 'highest-views') {
        return b.views - a.views;
      }
      if (activeFilter === 'highest-engagement') {
        return b.engagementRate - a.engagementRate;
      }
      if (activeFilter === 'recent') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      // 'all' defaults to views descending
      return b.views - a.views;
    });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="w-full sm:w-auto">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <PlaySquare className="w-5 h-5 text-pink-400" />
            Content Performance Table
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Analyzed recent video uploads ({videos.length} videos)
          </p>
        </div>

        {/* Filter Buttons & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'highest-views', label: 'Highest Views' },
              { id: 'highest-engagement', label: 'Highest Engagement' },
              { id: 'recent', label: 'Recent' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as FilterPreset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Videos List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {video.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-semibold flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {video.duration}
                  </span>
                )}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/90 text-white text-xs font-semibold shadow-lg">
                    Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-pink-300 transition-colors">
                  {video.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                  Published {formatDate(video.publishedAt)}
                </p>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="px-4 py-3 bg-slate-950/60 border-t border-slate-850 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-slate-300 font-semibold">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-purple-400" />
                  {formatCompactNumber(video.views)}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
                  {formatCompactNumber(video.likes)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  {formatCompactNumber(video.comments)}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                <TrendingUp className="w-3 h-3" />
                {video.engagementRate}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
          No videos match your search query &quot;{searchQuery}&quot;.
        </div>
      )}
    </div>
  );
}
