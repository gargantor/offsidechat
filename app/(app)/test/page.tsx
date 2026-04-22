"use client"
import { getDateMatches } from "@/lib/football";
import { actionDateMatches } from "../../actions"
import { formatDateToYYYYMMDD, groupMatchesByLeagueFromDB } from "@/lib/utils";
import { format } from "date-fns";
import { Card, Card2, CardBody, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleDemo, CollapsibleTrigger } from "@/components/ui/collapsible";

import {fetchMatch2} from '@/temp_data/fetchmatch2';
import { useEffect, useState } from 'react';


async function getAPI() {
  // Direct API call can use fetch with options for caching and revalidation
  const res = await fetch('http://localhost:3000/api/test', { next: { revalidate: 10 } }); 
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export default function TestPage() {
  const date  = new Date();
  const formattedDateUTC = formatDateToYYYYMMDD(date);
  const testFormattedDate = format(date, 'yyyy-MM-dd');

  const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
          
          const fetchData = async () => {
              setLoading(true);
              const response = await actionDateMatches(date);              
              const theData = groupMatchesByLeagueFromDB(response);
              console.log(theData);
                 

              setData(theData);
              
          }
          fetchData();
        return () => { }
      }, [])
  

  return (
    <>
    <main className="md:col-span-9 lg:col-span-7 space-y-6">          
      <h1>Pertandingan Langsung</h1>
      <p>formattedDateUTC = {formattedDateUTC}</p>
      <p>testFormattedDate = {testFormattedDate}</p>    
      <Card>
        <CardHeader>
          <h5 className="card-title">Card title</h5>
        </CardHeader>
        <CardBody>
          <div className="flex py-4 px-4">
            <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
        </CardBody>
      </Card>  
      <Card2 /> 
      <Card>
        <CardBody>
          <CollapsibleDemo />
          <Collapsible data-state="open" >
            <CollapsibleTrigger >
              <h5 className="card-title">Card title</h5>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>            
            </CollapsibleContent>
          </Collapsible>
        </CardBody>
      </Card>
    </main>
    </>
    
  );
}