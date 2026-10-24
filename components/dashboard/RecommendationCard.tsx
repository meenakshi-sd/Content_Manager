'use client';

import React, { useState } from 'react';
import { ContentRecommendation } from '@/types/youtube';
import { Plus, Check, Sparkles } from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';

interface RecommendationCardProps {
  recommendation: ContentRecommendation;
  onAddToPlanner: (rec: ContentRecommendation) => void;
  isAlreadyAdded?: boolean;
}

export default function RecommendationCard({
  recommendation,
  onAddToPlanner,
  isAlreadyAdded = false,
}: RecommendationCardProps) {
  const [added, setAdded] = useState(isAlreadyAdded);

  const handleClick = () => {
    if (!added) {
      onAddToPlanner(recommendation);
      setAdded(true);
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-xs hover:border-[#832632]/40 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#832632]/10 text-[#832632] border border-[#832632]/20 text-[11px] font-bold">
            <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
            {recommendation.format || 'YouTube Video'}
          </span>
          <span className="text-[10px] text-[#832632] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> AI Idea
          </span>
        </div>

        <h4 className="text-base font-bold text-[#211C1D] leading-snug mb-2">
          {recommendation.title}
        </h4>

        <p className="text-xs text-[#211C1D] leading-relaxed bg-[#F9F2E8] p-3 rounded-xl border border-[#E5DCD0] mb-4 font-medium">
          <span className="font-bold text-[#832632]">Why: </span>
          {recommendation.reason}
        </p>
      </div>

      <button
        onClick={handleClick}
        disabled={added}
        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
          added
            ? 'bg-emerald-600/15 text-emerald-700 border border-emerald-600/30 cursor-default'
            : 'bg-[#832632] hover:bg-[#6e1e28] text-[#F9F2E8] shadow-md active:scale-98'
        }`}
      >
        {added ? (
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
}
