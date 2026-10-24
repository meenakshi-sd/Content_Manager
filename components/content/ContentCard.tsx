'use client';

import React from 'react';
import { ContentItem, ContentStatus } from '@/types/youtube';
import { Calendar, Trash2 } from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import { formatDate } from '@/lib/metrics';

interface ContentCardProps {
  item: ContentItem;
  onStatusChange: (id: string, newStatus: ContentStatus) => void;
  onDelete: (id: string) => void;
}

export default function ContentCard({ item, onStatusChange, onDelete }: ContentCardProps) {
  const statuses: { id: ContentStatus; label: string }[] = [
    { id: 'idea', label: 'Idea' },
    { id: 'planning', label: 'Planning' },
    { id: 'draft', label: 'Draft' },
    { id: 'ready', label: 'Ready' },
    { id: 'published', label: 'Published' },
  ];

  return (
    <div className="p-4 rounded-xl bg-[#F9F2E8] border border-[#E5DCD0] shadow-xs space-y-3 group hover:border-[#832632]/40 transition-all">
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#832632]/10 text-[#832632] border border-[#832632]/20 text-[10px] font-bold">
          <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
          {item.type || 'Video'}
        </span>
        <button
          onClick={() => onDelete(item.id)}
          className="text-[#a69688] hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all p-1 rounded-md hover:bg-[#E5DCD0]"
          title="Delete item"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <h4 className="text-xs font-bold text-[#211C1D] leading-snug line-clamp-2">
        {item.title}
      </h4>

      {item.description && (
        <p className="text-[11px] text-[#624641] line-clamp-2 leading-relaxed font-medium">
          {item.description}
        </p>
      )}

      {item.scheduledDate && (
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#832632] pt-1">
          <Calendar className="w-3 h-3 text-[#832632]" />
          <span>{formatDate(item.scheduledDate)}</span>
        </div>
      )}

      {/* Status Menu Selector */}
      <div className="pt-2 border-t border-[#E5DCD0] flex items-center justify-between">
        <span className="text-[10px] text-[#624641] font-bold">Status:</span>
        <select
          value={item.status}
          onChange={(e) => onStatusChange(item.id, e.target.value as ContentStatus)}
          className="text-xs font-bold bg-[#FFFDF9] border border-[#D9C8B5] text-[#832632] rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#832632] cursor-pointer"
        >
          {statuses.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
