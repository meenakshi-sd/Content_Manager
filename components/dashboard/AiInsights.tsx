'use client';

import React from 'react';
import { StructuredAiOutput, ContentRecommendation } from '@/types/youtube';
import RecommendationCard from './RecommendationCard';
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Lightbulb, 
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

interface AiInsightsProps {
  insightsData: StructuredAiOutput;
  onAddToPlanner: (rec: ContentRecommendation) => void;
  onNavigateToPlanner?: () => void;
  addedRecommendationTitles?: string[];
}

export default function AiInsights({
  insightsData,
  onAddToPlanner,
  onNavigateToPlanner,
  addedRecommendationTitles = [],
}: AiInsightsProps) {
  if (!insightsData) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-pink-950/40 border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>✦ AI Content Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
            {insightsData.summary}
          </h2>
          <p className="text-xs text-slate-300 mt-2 font-normal">
            Gemini analyzed your recent content to identify patterns and opportunities.
          </p>

          {/* Top Topics Badges */}
          {insightsData.topTopics && insightsData.topTopics.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1">Top Pillars:</span>
              {insightsData.topTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-800/90 text-pink-300 border border-slate-750 text-xs font-semibold"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3 Insight Cards (What's Working, Audience Pattern, Opportunity) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {insightsData.insights.map((insight, idx) => {
          const isWarning = insight.type === 'warning';
          const isOpportunity = insight.type === 'opportunity';
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                isWarning
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                  : isOpportunity
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-200'
                  : 'bg-purple-500/10 border-purple-500/20 text-purple-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-2">
                {isWarning ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                ) : isOpportunity ? (
                  <TrendingUp className="w-4 h-4 text-blue-400 shrink-0" />
                ) : (
                  <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                )}
                <span>{insight.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {insight.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* What's Working & Proven Content Patterns */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          What&apos;s Working & Audience Patterns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insightsData.contentPatterns.map((pattern, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <span className="text-pink-400 font-bold shrink-0">✦</span>
              <span className="leading-relaxed">{pattern}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Content Ideas Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-pink-400" />
              Recommended Next Content
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              High-potential video topics personalized for your channel audience
            </p>
          </div>
          {onNavigateToPlanner && (
            <button
              onClick={onNavigateToPlanner}
              className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors"
            >
              View Content Plan <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {insightsData.recommendations.map((rec, idx) => (
            <RecommendationCard
              key={idx}
              recommendation={rec}
              onAddToPlanner={onAddToPlanner}
              isAlreadyAdded={addedRecommendationTitles.includes(rec.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
