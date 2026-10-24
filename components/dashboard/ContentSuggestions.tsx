'use client';

import React, { useState } from 'react';
import { StructuredAiOutput, ContentRecommendation } from '@/types/youtube';
import { 
  Sparkles, 
  Plus, 
  Check, 
  Flame, 
  Zap, 
  RefreshCw,
  Search,
  ArrowRight
} from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';

interface ContentSuggestionsProps {
  insightsData?: StructuredAiOutput | null;
  onAddToPlanner: (rec: ContentRecommendation) => void;
  onReGenerate?: () => void;
  onAnalyzeChannel?: (url: string) => void;
  addedRecommendationTitles?: string[];
  isLoading?: boolean;
}

export default function ContentSuggestions({
  insightsData,
  onAddToPlanner,
  onReGenerate,
  onAnalyzeChannel,
  addedRecommendationTitles = [],
  isLoading = false,
}: ContentSuggestionsProps) {
  const [addedTitles, setAddedTitles] = useState<string[]>(addedRecommendationTitles);
  const [inputUrl, setInputUrl] = useState('');

  const handleAdd = (rec: ContentRecommendation) => {
    if (!addedTitles.includes(rec.title)) {
      onAddToPlanner(rec);
      setAddedTitles((prev) => [...prev, rec.title]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim() && onAnalyzeChannel) {
      onAnalyzeChannel(inputUrl.trim());
    }
  };

  const recommendations = insightsData?.recommendations || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Suggestions Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#832632]/10 border border-[#832632]/20 text-[#832632] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>✦ Your Next Content Ideas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#211C1D] tracking-tight leading-snug">
              Turn what&apos;s working into your next great video.
            </h1>
            <p className="text-xs sm:text-sm text-[#624641] mt-2 leading-relaxed font-medium">
              Based on your recent performance, audience patterns, and strongest topics.
            </p>
          </div>

          {onReGenerate && recommendations.length > 0 && (
            <button
              onClick={onReGenerate}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#832632] hover:bg-[#6e1e28] text-[#F9F2E8] shadow-md flex items-center gap-2 shrink-0 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>Generate Suggestions</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State before analysis */}
      {recommendations.length === 0 && !isLoading && (
        <div className="p-10 sm:p-14 rounded-3xl bg-[#FFFDF9] border border-dashed border-[#D9C8B5] text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#832632]/10 text-[#832632] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#211C1D]">
              Analyze your channel to generate personalized content ideas.
            </h3>
            <p className="text-xs text-[#624641] max-w-md mx-auto leading-relaxed font-medium mt-1">
              Enter a public YouTube channel URL or @handle to extract performance metrics and generate AI content recommendations.
            </p>
          </div>

          {onAnalyzeChannel && (
            <form onSubmit={handleFormSubmit} className="w-full max-w-md mx-auto pt-2">
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#F9F2E8] border border-[#D9C8B5] focus-within:border-[#832632] transition-colors">
                <div className="relative flex-1 flex items-center">
                  <YoutubeIcon className="w-4 h-4 absolute left-3 text-red-600 shrink-0" />
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Enter YouTube URL or @handle..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-transparent text-[#211C1D] placeholder-[#a69688] focus:outline-none font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputUrl.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#832632] text-[#F9F2E8] hover:bg-[#6e1e28] shadow-sm disabled:opacity-50 transition-all flex items-center gap-1 shrink-0"
                >
                  <span>Generate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Suggestion Cards Grid */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#211C1D] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#832632]" />
              Recommended Content Concepts ({recommendations.length})
            </h2>
            <span className="text-xs text-[#624641] font-medium">Click to add directly to Content Plan</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, idx) => {
              const isAdded = addedTitles.includes(rec.title);
              const numStr = `#${(idx + 1).toString().padStart(2, '0')}`;
              const category = rec.category || 'HIGH-PERFORMING FORMAT';

              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Badges Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono font-extrabold text-[#832632]">
                        {numStr}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg border text-[10px] font-extrabold tracking-wider bg-[#832632]/10 text-[#832632] border-[#832632]/20">
                        {category}
                      </span>
                    </div>

                    {/* Concept Title */}
                    <h3 className="text-lg font-extrabold text-[#211C1D] leading-snug mb-3">
                      {rec.title}
                    </h3>

                    {/* Format & Platform Pills */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F9F2E8] text-[#211C1D] border border-[#E5DCD0] text-[11px] font-semibold">
                        <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                        {rec.platform || 'YouTube'}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F9F2E8] text-[#211C1D] border border-[#E5DCD0] text-[11px] font-semibold">
                        <Zap className="w-3 h-3 text-[#832632]" />
                        {rec.format || 'Video'}
                      </span>
                    </div>

                    {/* Why This Idea Section */}
                    <div className="p-4 rounded-xl bg-[#F9F2E8] border border-[#E5DCD0] mb-4 space-y-2">
                      <p className="text-xs text-[#211C1D] leading-relaxed font-medium">
                        <span className="font-bold text-[#832632]">Why this idea? </span>
                        {rec.reason}
                      </p>

                      {/* Based On Video Evidence */}
                      {rec.sourceVideos && rec.sourceVideos.length > 0 && (
                        <div className="pt-2 border-t border-[#E5DCD0]">
                          <span className="text-[11px] font-bold text-[#624641] block mb-1">Based on:</span>
                          <ul className="space-y-1">
                            {rec.sourceVideos.map((sv, sIdx) => (
                              <li key={sIdx} className="text-[11px] text-[#624641] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#832632]" />
                                <span className="truncate">{sv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Content Plan Action Button */}
                  <button
                    onClick={() => handleAdd(rec)}
                    disabled={isAdded}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-600/15 text-emerald-700 border border-emerald-600/30 cursor-default'
                        : 'bg-[#832632] hover:bg-[#6e1e28] text-[#F9F2E8] shadow-md active:scale-98'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>✓ Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Content Plan</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
