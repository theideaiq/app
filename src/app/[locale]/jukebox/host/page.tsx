'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { createClient } from '@/lib/supabase/client';
import { Play, SkipForward, Music } from 'lucide-react';

export default function JukeboxHost() {
  const [queue, setQueue] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const supabase = createClient();

  // 1. Initial Fetch & Subscribe to Realtime Updates
  useEffect(() => {
    fetchQueue();

    const channel = supabase
      .channel('jukebox_queue')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'jukebox_queue' }, (payload) => {
        // Add new song to the end of the queue
        setQueue((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // 2. Queue Manager
  useEffect(() => {
    // If nothing is playing and we have songs, play the next one
    if (!currentVideo && queue.length > 0) {
      playNext();
    }
  }, [queue, currentVideo]);

  const fetchQueue = async () => {
    const { data } = await supabase
      .from('jukebox_queue')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    
    if (data) setQueue(data);
  };

  const playNext = async () => {
    if (queue.length === 0) return;
    
    const next = queue[0];
    const remaining = queue.slice(1);
    
    setCurrentVideo(next);
    setQueue(remaining);

    // Mark as played in DB so it doesn't reappear on refresh
    await supabase.from('jukebox_queue').update({ status: 'played' }).eq('id', next.id);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      
      {/* The Actual Player (Hidden or Visible) */}
      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-8 relative">
        <ReactPlayer
          url={currentVideo ? `https://www.youtube.com/watch?v=${currentVideo.video_id}` : ''}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
          onEnded={playNext} // Auto-play next when done
          onStart={() => setIsPlaying(true)}
        />
        {/* Placeholder if empty */}
        {!currentVideo && (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
             <Music size={64} className="mb-4 opacity-50" />
             <p className="text-xl">Queue is empty. Add songs to start.</p>
           </div>
        )}
      </div>

      {/* Now Playing Info */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-2">{currentVideo?.title || "Waiting for requests..."}</h1>
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600/20 text-red-500 text-sm font-bold uppercase tracking-widest">
           {isPlaying ? "Now Playing" : "Ready"}
        </div>
      </div>

      {/* Up Next List */}
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
           <h3 className="text-gray-400 text-sm uppercase tracking-widest font-bold">Up Next ({queue.length})</h3>
           <button onClick={playNext} className="text-white hover:text-red-500 transition flex items-center gap-2 text-sm">
             <SkipForward size={16} /> Skip
           </button>
        </div>
        
        <div className="space-y-2">
          {queue.map((item, i) => (
            <div key={item.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg opacity-60">
               <span className="text-gray-500 font-mono text-sm">#{i + 1}</span>
               <img src={item.thumbnail} className="w-10 h-10 rounded object-cover" />
               <p className="truncate font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
