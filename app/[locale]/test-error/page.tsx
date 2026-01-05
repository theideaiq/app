'use client';

import { useEffect } from 'react';

export default function TestError() {
  // We use useEffect to ensure it crashes on the client side after mounting,
  // which is smoother for testing the UI than crashing the server build.
  useEffect(() => {
    throw new Error("This is a deliberate system crash simulation!");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
      <p>Initiating Crash Sequence...</p>
    </div>
  );
}
