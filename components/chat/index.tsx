import { Send, Users,} from 'lucide-react';

export default function ChatComponent() {
  return (
    <aside className="lg:col-span-4 flex flex-col bg-gray-50/50 h-[600px] lg:h-full">
          <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Users size={18} className="text-emerald-600" /> Live Chat
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">1,240 Online</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ChatMessage user="Rivaldo_99" msg="GGMU!! Rashford on fire malam ini 🔥" />
            <ChatMessage user="Anfield_Boys" msg="Van Dijk kena kartu kuning konyol bgt" />
            <ChatMessage user="Admin" msg="Gunakan bahasa yang sopan ya." isAdmin />
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 pr-2 border border-gray-200">
              <input type="text" placeholder="Tulis pesan..." className="flex-1 bg-transparent border-none text-sm py-2 px-4 outline-none" />
              <button className="p-2 bg-emerald-600 text-white rounded-full"><Send size={16} /></button>
            </div>
          </div>
        </aside>
  )
}

function ChatMessage({ user, msg, isAdmin }: any) {
  return (
    <div className="flex flex-col">
      <span className={`text-[10px] font-bold ${isAdmin ? 'text-rose-600' : 'text-emerald-700'}`}>{user}</span>
      <div className={`mt-1 p-3 rounded-2xl rounded-tl-none text-xs leading-relaxed shadow-sm ${isAdmin ? 'bg-rose-50 border border-rose-100' : 'bg-white border border-gray-100'}`}>
        {msg}
      </div>
    </div>
  );
}