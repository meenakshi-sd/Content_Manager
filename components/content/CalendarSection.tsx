'use client';

import React from 'react';
import { ContentItem } from '@/types/youtube';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import { formatDate } from '@/lib/metrics';

interface CalendarSectionProps {
  items: ContentItem[];
}

export default function CalendarSection({ items }: CalendarSectionProps) {
  const scheduledItems = items
    .filter((item) => item.status !== 'published')
    .sort((a, b) => {
      const dateA = a.scheduledDate ? new Date(a.scheduledDate).getTime() : new Date(a.createdAt).getTime();
      const dateB = b.scheduledDate ? new Date(b.scheduledDate).getTime() : new Date(b.createdAt).getTime();
      return dateA - dateB;
    })
    .slice(0, 5);

  if (scheduledItems.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E5DCD0]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#211C1D] flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#832632]" />
          Upcoming Publishing Schedule
        </h3>
        <span className="text-xs text-[#624641] font-medium">Timeline View</span>
      </div>

      <div className="space-y-3">
        {scheduledItems.map((item) => {
          const displayDate = item.scheduledDate
            ? formatDate(item.scheduledDate)
            : 'Upcoming Soon';

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#F9F2E8] border border-[#E5DCD0] flex items-center justify-between gap-4 hover:border-[#832632]/30 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-[#832632]/10 shrink-0">
                  <YoutubeIcon className="w-4 h-4 text-red-600" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-[#211C1D] truncate">{item.title}</h4>
                  <p className="text-[11px] text-[#624641] capitalize mt-0.5 font-medium">
                    {item.type || 'YouTube Video'} • <span className="text-[#832632] font-bold">{item.status}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#832632] bg-[#832632]/10 px-3 py-1 rounded-lg border border-[#832632]/20 shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>{displayDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
