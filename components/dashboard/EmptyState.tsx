'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, BarChart3, Brain, Zap } from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';

interface EmptyStateProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function EmptyState({ onAnalyze, isLoading }: EmptyStateProps) {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onAnalyze(inputUrl.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 max-w-4xl mx-auto my-auto text-center animate-fade-in">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#832632]/10 border border-[#832632]/20 text-[#832632] text-xs font-bold mb-6">
        <Sparkles className="w-4 h-4 text-[#832632]" />
        <span>Connect YouTube Channel</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-black text-[#211C1D] tracking-tight leading-tight mb-4">
        Creator Intelligence
      </h1>

      <p className="text-base sm:text-lg text-[#624641] max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
        Paste your public YouTube channel URL to discover what&apos;s working and what you should create next.
      </p>

      {/* Channel URL Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl mb-12">
        <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-[#FFFDF9] border border-[#D9C8B5] shadow-xl focus-within:border-[#832632] transition-colors">
          <div className="relative flex-1 w-full flex items-center">
            <YoutubeIcon className="w-5 h-5 absolute left-3.5 text-red-600 shrink-0" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste YouTube Channel URL or @handle (e.g. @mkbhd)"
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-transparent text-[#211C1D] placeholder-[#a69688] focus:outline-none font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputUrl.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-[#832632] hover:bg-[#6e1e28] text-[#F9F2E8] shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Analyze Channel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left">
        <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#832632]/10 text-[#832632] flex items-center justify-center mb-3">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#211C1D] mb-1">Real Data Analytics</h3>
          <p className="text-xs text-[#624641] leading-relaxed">
            Fetches live YouTube metrics, views, likes, and calculates exact engagement ratios.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#832632]/10 text-[#832632] flex items-center justify-center mb-3">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#211C1D] mb-1">Gemini AI Intelligence</h3>
          <p className="text-xs text-[#624641] leading-relaxed">
            Interprets high-performing content themes, identifies patterns, and predicts next topics.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#832632]/10 text-[#832632] flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#211C1D] mb-1">Content Planner Workflow</h3>
          <p className="text-xs text-[#624641] leading-relaxed">
            Action button converts AI recommendations directly into your content planner.
          </p>
        </div>
      </div>
    </div>
  );
}
