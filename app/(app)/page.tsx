"use client";
import HomeContent from '@/ui/homecontent';
import HomeRightSidebar from '@/ui/homerightsidebar';

export default function HomePage() {
  

  return (
    <>
    <main className="md:col-span-9 lg:col-span-7 space-y-6">          
        <HomeContent />        
    </main>
    {/* --- RIGHT SIDEBAR --- */}
    <HomeRightSidebar />
    </>
  );
}



