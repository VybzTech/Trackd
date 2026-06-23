'use client';

import { motion } from 'framer-motion';
import { User, Save, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { mockUser, mockResume } from '@/lib/mock-data';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: mockUser.name || '',
    email: mockUser.email,
    targetRoles: mockUser.targetRoles || [],
    targetIndustries: mockUser.targetIndustries || [],
    skills: mockUser.skills || [],
    experienceLevel: mockUser.experienceLevel || '',
  });

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <User className="w-8 h-8 text-slate-400" />
        <div>
          <h1 className="text-3xl font-bold text-white font-heading">Profile</h1>
          <p className="text-slate-400 mt-1">Manage your profile and preferences</p>
        </div>
      </motion.div>

      {/* Profile Settings */}
      <motion.div variants={itemVariants} className="card-3d space-y-6">
        <h2 className="text-lg font-semibold text-white">Personal Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="input-inset w-full px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="input-inset w-full px-4 py-2 opacity-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Experience Level
            </label>
            <select
              value={formData.experienceLevel}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  experienceLevel: e.target.value,
                }))
              }
              className="input-inset w-full px-4 py-2 bg-slate-700/50"
            >
              <option value="">Select level</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Target Industry
            </label>
            <input
              type="text"
              value={formData.targetIndustries.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  targetIndustries: e.target.value
                    .split(',')
                    .map((s) => s.trim()),
                }))
              }
              className="input-inset w-full px-4 py-2"
              placeholder="e.g., Tech, Fintech, AI"
            />
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div variants={itemVariants} className="card-3d space-y-4">
        <h2 className="text-lg font-semibold text-white">Skills</h2>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            placeholder="Add a skill..."
            className="input-inset flex-1 px-4 py-2 text-sm"
          />
          <button
            onClick={handleAddSkill}
            className="btn-3d flex items-center gap-2 px-4"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg text-sm text-white"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(idx)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Resume Section */}
      <motion.div variants={itemVariants} className="card-3d space-y-4">
        <h2 className="text-lg font-semibold text-white">Resume</h2>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Resume Text
          </label>
          <textarea
            value={mockResume}
            readOnly
            className="input-inset w-full px-4 py-3 text-xs h-48 resize-none font-mono opacity-75"
          />
        </div>

        <div className="flex gap-2">
          <button className="btn-3d flex-1">Update Resume</button>
          <button className="btn-3d flex-1">Download PDF</button>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <button className="btn-3d-primary flex items-center gap-2 px-6 py-3">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        <button className="btn-3d px-6 py-3">Cancel</button>
      </motion.div>
    </motion.div>
  );
}
