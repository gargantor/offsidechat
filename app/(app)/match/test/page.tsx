"use client";
import React, { useState } from 'react';
import { Send, Users, Activity, Trophy, Users as LineupIcon } from 'lucide-react';
import ScoreBoard from '@/components/match/scoreboard';
import TabComponent from '@/components/match/tabcomponent';
import TabSummary from '@/components/match/tabsummary';
import TabStatistics from '@/components/match/tabstatistics';
import TabLineups from '@/components/match/tablineups';
import ChatComponent from '@/components/chat';

export default function MatchPage() {
  const [activeTab, setActiveTab] = useState('summary');
  // Callback function to update activetab
  const updateActiveTab = (newActiveTab: string) => {
    setActiveTab(newActiveTab);
  };

  return (
    <div className='md:col-span-9 lg:col-span-9 space-y-6'>
    
      
      {/* 1. SCOREBOARD HEADER (Light) */}
      <ScoreBoard />

      {/* 2. MAIN GRID */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-[calc(100vh-120px)] shadow-lg mt-4 bg-white rounded-t-xl overflow-hidden">
        
        {/* LEFT PANEL */}
        <section className="lg:col-span-8 overflow-y-auto border-r border-gray-100">
          <TabComponent updateActiveTab={updateActiveTab} activeTab={activeTab} />

          <div className="p-6 md:p-10">
            {/* Gunakan komponen EventRow/StatRow sebelumnya dengan penyesuaian warna teks */}
            {activeTab === 'summary' && (
              <TabSummary />  
            )}

            {/* CONTENT: STATISTICS */}
            {activeTab === 'statistics' && (
              <TabStatistics />
            )}

            {/* CONTENT: LINEUP */}
            {activeTab === 'lineup' && (
              <TabLineups />
            )}
          </div>
        </section>

        {/* RIGHT PANEL: CHAT (Light Style) */}
        <ChatComponent />
      </main>
    
    </div>
  );
}

/* --- LIGHT HELPER COMPONENTS --- */
