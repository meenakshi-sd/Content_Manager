'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, BarChart3, Brain, CheckCircle2, Loader2 } from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';

interface LoadingStateProps {
  channelUrl?: string;
}

export default function LoadingState({ channelUrl }: LoadingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Fetching YouTube Data', desc: 'Connecting to YouTube API v3 and retrieving recent video uploads...', icon: YoutubeIcon },
    { title: 'Analyzing Performance', desc: 'Calculating engagement rates, view averages, and top performing formats...', icon: BarChart3 },
    { title: 'Generating AI Insights', desc: 'Synthesizing channel patterns with Gemini model for content recommendations...', icon: Brain },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1200);
    const timer2 = setTimeout(() => setCurrentStep(2), 2600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-xl mx-auto text-center my-auto animate-fade-in">
      {/* Animated Spinner Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#832632] text-[#F9F2E8] flex items-center justify-center shadow-xl mb-6">
        <Sparkles className="w-8 h-8 animate-spin text-[#F9F2E8]" />
      </div>

      <h2 className="text-2xl font-black text-[#211C1D] tracking-tight mb-2">
        Analyzing Channel...
      </h2>
      <p className="text-xs text-[#624641] font-mono mb-8 font-medium">
        {channelUrl || 'YouTube Channel'}
      </p>

      {/* Steps List */}
      <div className="w-full space-y-3 bg-[#FFFDF9] border border-[#E5DCD0] p-5 rounded-2xl text-left shadow-sm">
        {steps.map((step, idx) => {
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;
          const Icon = step.icon;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all flex items-center gap-3.5 ${
                isCurrent
                  ? 'bg-[#832632]/10 border-[#832632]/30 text-[#211C1D] shadow-xs'
                  : isDone
                  ? 'bg-[#F9F2E8] border-[#E5DCD0] text-[#211C1D]'
                  : 'opacity-40 border-transparent text-[#624641]'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-[#832632] animate-spin" />
                ) : (
                  <Icon className="w-5 h-5 text-[#624641]" />
                )}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold leading-tight text-[#211C1D]">{step.title}</h4>
                <p className="text-[11px] text-[#624641] mt-0.5 truncate font-medium">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
