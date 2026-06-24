import { redirect } from 'next/navigation';
import { FaRocket } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className={cn("rounded-2xl bg-white p-8 shadow-xl text-center flex flex-col items-center", "border border-gray-100")}>
        <div className="rounded-full bg-blue-100 p-4 text-blue-600 mb-6">
          <FaRocket className="h-10 w-10 animate-bounce" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Trackd is Ready</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Tailwind CSS, React Icons, and the cn helper are successfully configured. Let's build something amazing!
        </p>
        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}
