import { Activity, Trophy, Users as LineupIcon } from 'lucide-react';

export default function TabComponent({ updateActiveTab, activeTab }) {
    const handleClick = (newActiveTab) => {
        updateActiveTab(newActiveTab);        
    }
  return (
    <div className="flex bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            {[
              { id: 'summary', label: 'Ringkasan', icon: <Trophy size={14}/> },
              { id: 'statistics', label: 'Statistik', icon: <Activity size={14}/> },
              { id: 'lineup', label: 'Line-up', icon: <LineupIcon size={14}/> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleClick(tab.id)}
                className={`flex-1 md:flex-none flex items-center gap-2 px-8 py-4 text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id 
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white' 
                  : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
  )
}
