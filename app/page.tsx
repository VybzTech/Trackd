import { redirect } from 'next/navigation';

export default function Page() {
  // For now, redirect to auth. In production, this would check if user is logged in
  redirect('/dashboard');
}
