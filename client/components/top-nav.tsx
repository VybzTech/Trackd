import Link from 'next/link';
import { FaRocket } from 'react-icons/fa';

export function TopNav() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-900 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
            <FaRocket className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Trackd
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          <Link 
            href="/ingest" 
            className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            Ingest
          </Link>
        </div>
      </div>
    </nav>
  );
}
