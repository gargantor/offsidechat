"use client"

import {fetchMatch2} from '@/temp_data/fetchmatch2';
import FixtureContent from '@/components/content/fixture';
import HomeRightSidebar from '@/ui/homerightsidebar';
import { useEffect, useState } from 'react';

export default function Test2Page() {    
    
    const [loading, setLoading] = useState(true);

    /* useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            const response = await fetchMatch2();
            setData(response);
            
        }
        fetchData();
      return () => { }
    }, []) */
    
    return(
        <>
            <main className="md:col-span-9 lg:col-span-7 space-y-6">          
                <FixtureContent />        
            </main>
            {/* --- RIGHT SIDEBAR --- */}
            <HomeRightSidebar />
            </>
    )
}