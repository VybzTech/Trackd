'use client';

import { useState } from 'react';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';
import { FaRocket, FaSpinner } from 'react-icons/fa';

export default function IngestPage() {
  const [content, setContent] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleIngest = async () => {
    if (!content.trim()) {
      setMessage('Please paste some content first.');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      logger.info('Sending manual payload to API...');
      const response = await fetch('/api/ingest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceType: 'manual_web',
          payload: content,
          jobLink: jobLink || 'Manual Paste',
        }),
      });

      if (response.ok) {
        logger.success('Payload sent successfully!');
        setMessage('Success! Saved to data engine.');
        setContent('');
        setJobLink('');
      } else {
        const errorText = await response.text();
        logger.error('Failed to send payload:', errorText);
        setMessage(`Error: ${errorText}`);
      }
    } catch (err) {
      logger.error('Connection error:', err);
      setMessage('Failed to connect to the ingestion service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center p-8 text-center text-slate-100">
      
      <div className="mb-6 flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-xl">
          <FaRocket className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Trackd Ingestion
        </h1>
        <p className="max-w-xl text-lg text-slate-400">
          Paste the raw content of any job listing below, and our engine will pipe it into the review inbox.
        </p>
      </div>

      <div className="w-full space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="jobLink" className="text-sm font-semibold text-slate-300">
            Source URL (Optional)
          </label>
          <input
            id="jobLink"
            type="url"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="content" className="text-sm font-semibold text-slate-300">
            Raw Content
          </label>
          <textarea
            id="content"
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste the entire page content here..."
            className="w-full resize-y rounded-lg border border-slate-600 bg-slate-900 p-4 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleIngest}
          disabled={loading}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-4 font-bold text-white transition-all",
            "hover:bg-blue-500 active:scale-[0.98]",
            loading && "cursor-not-allowed opacity-70"
          )}
        >
          {loading ? (
            <>
              <FaSpinner className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Pipeline Job'
          )}
        </button>

        {message && (
          <div className={cn(
            "mt-4 rounded-lg p-3 text-sm font-medium",
            message.includes('Error') || message.includes('Failed') || message.includes('Please')
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          )}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
