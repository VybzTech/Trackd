'use client';

import { OnboardingWizard } from '@/components/onboarding-wizard';
import { useRouter } from 'next/navigation';
import { OnboardingState } from '@/types';

export default function WelcomePage() {
  const router = useRouter();

  const handleComplete = (state: OnboardingState) => {
    // Save onboarding state (will be persisted to backend later)
    console.log('[Trackd] Onboarding completed:', state);
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return <OnboardingWizard onComplete={handleComplete} />;
}
