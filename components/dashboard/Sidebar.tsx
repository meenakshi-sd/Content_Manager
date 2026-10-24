'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  PlaySquare, 
  Sparkles, 
  CalendarDays, 
  ChartNoAxesCombined,
  Zap
} from 'lucide-react';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';

export type NavView = 'overview' | 'videos' | 'suggestions' | 'planner' | 'analytics';

interface SidebarProps {
  activeView: NavView;
  setActiveView: (view: NavView) => void;
  channelName?: string;
  hasChannel: boolean;
}

export default function Sidebar({ activeView, setActiveView, channelName, hasChannel }: SidebarProps) {
  const navItems = [
    { id: 'overview' as NavView, label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'videos' as NavView, label: 'Videos', icon: PlaySquare, badge: null },
    { id: 'suggestions' as NavView, label: 'Content Suggestions', icon: Sparkles, badge: '✦ AI' },
    { id: 'planner' as NavView, label: 'Content Plan', icon: CalendarDays, badge: null },
    { id: 'analytics' as NavView, label: 'Analytics', icon: ChartNoAxesCombined, badge: null },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#211C1D] text-[#F9F2E8] border-r border-[#3a3335] flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#3a3335] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#832632] text-[#F9F2E8] flex items-center justify-center shadow-md">
          <Sparkles className="w-5 h-5 text-[#F9F2E8]" />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-[#F9F2E8] tracking-tight leading-none flex items-center gap-1.5">
            ✦ CreatorIQ
          </h1>
          <p className="text-[11px] text-[#d4c3b3] mt-1 flex items-center gap-1 font-medium">
            <Zap className="w-3 h-3 text-[#e6a3ab] fill-[#e6a3ab]/30" />
            YouTube Analytics
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 flex-1">
        <div className="px-3 py-2 text-[10px] font-bold text-[#a69688] uppercase tracking-widest">
          Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#832632] text-[#F9F2E8] shadow-md border border-[#a83b48]'
                  : 'text-[#d4c3b3] hover:text-[#F9F2E8] hover:bg-[#342c2e]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F9F2E8]' : 'text-[#a69688]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-[#832632] text-[#F9F2E8] border border-[#a83b48]">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Connected Channel Footer */}
      {hasChannel && (
        <div className="p-3.5 m-3 rounded-xl bg-[#2d2628] border border-[#3a3335] flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#832632]/30 shrink-0">
            <YoutubeIcon className="w-4 h-4 text-red-500" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#F9F2E8] truncate">
              {channelName || 'Connected Channel'}
            </p>
            <p className="text-[10px] text-[#a69688] truncate">YouTube Creator</p>
          </div>
        </div>
      )}
    </aside>
  );
}
