'use client';

import React, { useState, useEffect } from 'react';
import Sidebar, { NavView } from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import EmptyState from '@/components/dashboard/EmptyState';
import LoadingState from '@/components/dashboard/LoadingState';
import ChannelOverview from '@/components/dashboard/ChannelOverview';
import VideoPerformance from '@/components/dashboard/VideoPerformance';
import ContentSuggestions from '@/components/dashboard/ContentSuggestions';
import ContentPlanner from '@/components/content/ContentPlanner';
import AnalyticsView from '@/components/dashboard/AnalyticsView';

import { 
  ChannelInfo, 
  Video, 
  PerformanceMetrics, 
  StructuredAiOutput, 
  ContentItem, 
  ContentRecommendation,
  ContentStatus 
} from '@/types/youtube';
import { getStoredContentItems, saveStoredContentItems } from '@/lib/storage';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<NavView>('overview');
  const [channelUrl, setChannelUrl] = useState('');
  
  const [channel, setChannel] = useState<ChannelInfo | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [aiInsights, setAiInsights] = useState<StructuredAiOutput | null>(null);
  
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemoData, setIsDemoData] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load stored content plan on mount & clear legacy demo items
  useEffect(() => {
    const items = getStoredContentItems();
    setContentItems(items);
  }, []);

  // Save content plan whenever it changes
  const updateContentItems = (newItems: ContentItem[]) => {
    setContentItems(newItems);
    saveStoredContentItems(newItems);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAnalyze = async (url: string) => {
    if (!url.trim()) return;
    setChannelUrl(url);
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch YouTube Channel & Video Analytics
      const ytRes = await fetch('/api/youtube/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelUrl: url }),
      });

      const ytData = await ytRes.json();

      if (!ytRes.ok || !ytData.success) {
        throw new Error(ytData.error || 'Failed to analyze YouTube channel.');
      }

      setChannel(ytData.channel);
      setVideos(ytData.videos);
      setMetrics(ytData.metrics);
      setIsDemoData(Boolean(ytData.isDemoData));

      if (ytData.error) {
        setError(ytData.error);
      }

      // 2. Fetch Gemini AI Content Insights & Suggestions
      const aiRes = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: ytData.channel,
          videos: ytData.videos,
          metrics: ytData.metrics,
        }),
      });

      const aiData = await aiRes.json();

      if (aiData.success && aiData.data) {
        setAiInsights(aiData.data);
      }
    } catch (err: any) {
      console.error('Channel Analysis Error:', err);
      setError(err?.message || 'Could not analyze this channel. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add AI recommendation to Content Plan
  const handleAddRecommendationToPlanner = (rec: ContentRecommendation) => {
    const newItem: ContentItem = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `rec-${Date.now()}`,
      title: rec.title,
      description: rec.reason,
      status: 'idea',
      platform: rec.platform || 'YouTube',
      type: rec.format || 'YouTube Video',
      createdAt: new Date().toISOString(),
      scheduledDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      category: rec.category,
      sourceVideos: rec.sourceVideos,
    };

    const updated = [newItem, ...contentItems];
    updateContentItems(updated);
    showToast(`✓ Added to your content plan`);
  };

  // Handle manual new content item
  const handleAddContentItem = (newItem: ContentItem) => {
    const updated = [newItem, ...contentItems];
    updateContentItems(updated);
    showToast(`✓ Created content item "${newItem.title}"`);
  };

  // Handle status update (Idea -> Planning -> Draft -> Ready -> Published)
  const handleStatusChange = (id: string, newStatus: ContentStatus) => {
    const updated = contentItems.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    updateContentItems(updated);
  };

  // Handle delete content item
  const handleDeleteContentItem = (id: string) => {
    const updated = contentItems.filter((item) => item.id !== id);
    updateContentItems(updated);
  };

  const hasChannel = Boolean(channel && metrics);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F9F2E8] text-[#211C1D] font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-700 text-[#F9F2E8] shadow-2xl border border-emerald-500 animate-fade-in">
          <CheckCircle className="w-5 h-5 shrink-0 text-[#F9F2E8]" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        channelName={channel?.title}
        hasChannel={hasChannel}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeView={activeView}
          onAnalyze={handleAnalyze}
          isLoading={loading}
          isDemoData={isDemoData}
          currentChannelUrl={channelUrl}
          avatar={channel?.avatar}
          channelName={channel?.title}
        />

        {/* Global Error Banner */}
        {error && (
          <div className="mx-6 mt-4 p-4 rounded-2xl bg-[#832632]/10 border border-[#832632]/30 text-[#832632] flex items-start gap-3 text-xs">
            <AlertTriangle className="w-5 h-5 text-[#832632] shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">
              <span className="font-bold">Notice: </span>
              {error}
            </div>
            <button onClick={() => setError(null)} className="text-[#832632] hover:opacity-70">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Body Switcher */}
        <main className="flex-1 p-6 md:p-8 flex flex-col">
          {loading ? (
            <LoadingState channelUrl={channelUrl} />
          ) : !hasChannel && activeView !== 'planner' && activeView !== 'suggestions' ? (
            <EmptyState onAnalyze={handleAnalyze} isLoading={loading} />
          ) : (
            <>
              {activeView === 'overview' && channel && metrics && (
                <ChannelOverview
                  channel={channel}
                  videos={videos}
                  metrics={metrics}
                  aiInsights={aiInsights}
                  onAddToPlanner={handleAddRecommendationToPlanner}
                  onNavigateToSuggestions={() => setActiveView('suggestions')}
                  onNavigateToPlanner={() => setActiveView('planner')}
                  addedRecommendationTitles={contentItems.map((i) => i.title)}
                />
              )}

              {activeView === 'videos' && (
                <VideoPerformance videos={videos} />
              )}

              {activeView === 'suggestions' && (
                <ContentSuggestions
                  insightsData={aiInsights}
                  onAddToPlanner={handleAddRecommendationToPlanner}
                  onReGenerate={() => channelUrl && handleAnalyze(channelUrl)}
                  onAnalyzeChannel={handleAnalyze}
                  addedRecommendationTitles={contentItems.map((i) => i.title)}
                  isLoading={loading}
                />
              )}

              {activeView === 'planner' && (
                <ContentPlanner
                  items={contentItems}
                  onStatusChange={handleStatusChange}
                  onAddContent={handleAddContentItem}
                  onDeleteContent={handleDeleteContentItem}
                />
              )}

              {activeView === 'analytics' && channel && metrics && (
                <AnalyticsView
                  channel={channel}
                  videos={videos}
                  metrics={metrics}
                  aiInsights={aiInsights}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
