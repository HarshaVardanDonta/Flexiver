import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const handler = async (req: Request) => {
  try{
    const supabase =await  createClient(Deno.env.get('https://tnfeykqptcbbabeuwwxn.supabase.co')!, Deno.env.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZmV5a3FwdGNiYmFiZXV3d3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MDYxMTYsImV4cCI6MjAyMzM4MjExNn0.Y5FPy2jo_vo1ZjRFn9LkAyPMyItAKid_VSqkEkuHeqU')!);
    const { record, error } = await supabase.from("TempQuote").select("*").limit(1).single();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer re_ihLH3hZP_JkZrB4hc9v4a97tjn47n3Fdd`,
      },
      body: JSON.stringify({
        from: 'info@flexiver.com.au',
        to: 'dharsha227@gmail.com',
        subject: 'Flexiver',
        html: `<div>
        <h1>New Customer Details</h1>
        ${record }
        </div>`,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  catch(e){
  }

}

Deno.serve(handler)
