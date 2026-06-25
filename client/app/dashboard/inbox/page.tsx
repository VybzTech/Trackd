'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InboxList } from '@/components/inbox-list';
import { JobForm } from '@/components/job-form';
import { mockJobs } from '@/lib/mock-data';
import { Job } from '@/types';
import { BsInbox } from 'react-icons/bs';

// Simulate incoming jobs from extension/smart paste
const incomingJobs = mockJobs.slice(0, 3);

export default function InboxPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(incomingJobs[0] || null);
  const [jobs, setJobs] = useState(incomingJobs);

  const handleApproveJob = (job: Job) => {
    console.log('[Trackd] Job approved:', job);
    // Remove from inbox and move to dashboard
    setJobs((prev) => prev.filter((j) => j.id !== job.id));
    setSelectedJob(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <BsInbox className="w-8 h-8 text-slate-400" />
        <div>
          <h1 className="text-3xl font-bold text-white font-heading">Inbox</h1>
          <p className="text-slate-400 mt-1">Review and approve new job postings</p>
        </div>
        <span className="ml-auto px-3 py-1 bg-[var(--vybz-blue)] text-white rounded-full text-sm font-semibold">
          {jobs.length} new
        </span>
      </motion.div>

      {/* Split Pane */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-280px)]">
          {/* Left: Job List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              Incoming Jobs
            </h2>
            <div className="flex-1 overflow-y-auto">
              <InboxList
                jobs={jobs}
                selectedId={selectedJob?.id}
                onSelect={setSelectedJob}
              />
            </div>
          </motion.div>

          {/* Right: Job Form */}
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-2 overflow-y-auto"
            >
              <div className="card-3d p-6">
                <JobForm job={selectedJob} onSubmit={handleApproveJob} />
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-3d py-12 text-center"
        >
          <Inbox className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No incoming jobs</h3>
          <p className="text-slate-400">
            Use the browser extension or smart paste to add jobs
          </p>
        </motion.div>
      )}
    </div>
  );
}
