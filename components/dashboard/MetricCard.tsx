'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'purple' | 'indigo' | 'emerald' | 'blue' | 'amber';
  highlight?: boolean;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  highlight = false,
}: MetricCardProps) {
  return (
    <div
      className={`p-5 rounded-2xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-xs transition-all duration-200 hover:border-[#832632]/40 ${
        highlight ? 'ring-1 ring-[#832632]/30 bg-[#832632]/5' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-[#624641] uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded-xl bg-[#832632]/10 text-[#832632]">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-[#211C1D] tracking-tight">{value}</h3>
        {trend && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-[#624641] mt-2 truncate font-medium">{subtitle}</p>
      )}
    </div>
  );
}
