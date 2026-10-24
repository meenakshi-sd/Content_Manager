'use client';

import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import { NavView } from './Sidebar';

interface HeaderProps {
  activeView: NavView;
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  isDemoData?: boolean;
  currentChannelUrl?: string;
  avatar?: string;
  channelName?: string;
}

export default function Header({
  activeView,
  onAnalyze,
  isLoading,
  isDemoData,
  currentChannelUrl = '',
  avatar,
  channelName,
}: HeaderProps) {
  const [inputUrl, setInputUrl] = useState(currentChannelUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onAnalyze(inputUrl.trim());
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'overview':
        return 'Creator Overview';
      case 'videos':
        return 'Content Performance';
      case 'suggestions':
        return '✦ Content Suggestions';
      case 'planner':
        return 'Content Plan';
      case 'analytics':
        return 'Performance Analytics';
      default:
        return 'Creator Intelligence';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E5DCD0] px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* View Title */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <h2 className="text-lg font-bold text-[#211C1D] tracking-tight">{getTitle()}</h2>
        {isDemoData && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#832632]/10 text-[#832632] border border-[#832632]/20">
            <AlertCircle className="w-3.5 h-3.5" />
            Demo Data Mode
          </span>
        )}
      </div>

      {/* Quick Analyze Bar & Avatar */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 sm:flex-initial">
          <div className="relative flex-1 sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <YoutubeIcon className="w-4 h-4 text-red-600" />
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter YouTube URL or @handle..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-[#F9F2E8] border border-[#D9C8B5] text-[#211C1D] placeholder-[#624641] focus:outline-none focus:ring-2 focus:ring-[#832632] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputUrl.trim()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#832632] hover:bg-[#6e1e28] text-[#F9F2E8] shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze</span>
              </>
            )}
          </button>
        </form>

        {avatar && (
          <img
            src={avatar}
            alt={channelName || 'Creator Avatar'}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#832632]/30 shrink-0 hidden sm:block"
          />
        )}
      </div>
    </header>
  );
}
