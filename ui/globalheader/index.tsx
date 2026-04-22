import {Search} from 'lucide-react'
import Link from 'next/link'
export default function GlobalHeader() {
  return (
    <nav className="bg-white border-b border-slate-200 py-3 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
            <div className="flex items-center gap-8">
            <Link href="/">
                <h1 className="text-emerald-600 font-black text-2xl tracking-tighter italic">OffsideChat</h1>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-500">
                <a href="#" className="text-emerald-600 border-b-2 border-emerald-600 pb-1">Sepak Bola</a>
                <a href="#" className="hover:text-slate-800 transition-colors">Basket</a>
                <a href="#" className="hover:text-slate-800 transition-colors">Tennis</a>
            </div>
            </div>
            
            <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                type="text" 
                placeholder="Cari tim atau liga..." 
                className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-10 pr-4 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-64 transition-all"
                />
            </div>
            <button className="bg-emerald-600 px-4 py-2 rounded-lg text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all active:scale-95">
                Login
            </button>
            </div>
        </div>
    </nav>
  )
}

