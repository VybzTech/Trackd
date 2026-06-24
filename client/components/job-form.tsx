'use client';

import { motion } from 'framer-motion';
import { Job } from '@/types';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface JobFormProps {
  job: Job;
  onSubmit?: (job: Job) => void;
}

export function JobForm({ job, onSubmit }: JobFormProps) {
  const [formData, setFormData] = useState(job);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit?.(formData);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Company Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
          Company Info
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-2">Company Name</label>
            <input
              type="text"
              value={formData.company.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  company: { ...prev.company, name: e.target.value },
                }))
              }
              className="input-inset w-full px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Industry</label>
            <input
              type="text"
              value={formData.company.industry || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  company: { ...prev.company, industry: e.target.value },
                }))
              }
              className="input-inset w-full px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Role Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
          Role Info
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-2">Job Title</label>
            <input
              type="text"
              value={formData.role.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  role: { ...prev.role, title: e.target.value },
                }))
              }
              className="input-inset w-full px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Level</label>
            <select
              value={formData.role.level || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  role: { ...prev.role, level: e.target.value as any },
                }))
              }
              className="input-inset w-full px-3 py-2 text-sm bg-slate-700/50"
            >
              <option value="">Select level</option>
              <option value="Entry">Entry</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compensation */}
      {formData.compensation && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Compensation
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-2">Min Salary</label>
              <input
                type="number"
                value={formData.compensation.min || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    compensation: {
                      ...prev.compensation!,
                      min: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className="input-inset w-full px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2">Max Salary</label>
              <input
                type="number"
                value={formData.compensation.max || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    compensation: {
                      ...prev.compensation!,
                      max: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className="input-inset w-full px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
          Job Description
        </h3>
        <textarea
          value={formData.description || ''}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="input-inset w-full px-3 py-2 text-sm h-32 resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        className="btn-3d-primary w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4" />
            Approve & Commit to Tracker
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
