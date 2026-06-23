'use client';

import { useState, useCallback } from 'react';
import { Job } from '@/types';
import { mockJobs } from '@/lib/mock-data';

export function useJobs(initial: Job[] = mockJobs) {
  const [jobs, setJobs] = useState<Job[]>(initial);

  const mutate = useCallback((job: Job) => {
    setJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) return prev.map((j) => (j.id === job.id ? { ...j, ...job } : j));
      return [{ ...job, createdAt: new Date(), updatedAt: new Date() }, ...prev];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const updateStatus = useCallback((id: string, status: Job['status'], notes?: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== id) return j;
        return {
          ...j,
          status,
          updatedAt: new Date(),
          statusHistory: [
            ...(j.statusHistory ?? []),
            { status, changedAt: new Date(), notes },
          ],
        };
      }),
    );
  }, []);

  return { jobs, mutate, remove, updateStatus };
}
