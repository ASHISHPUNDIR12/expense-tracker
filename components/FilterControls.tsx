'use client'; // This component only needs client-side interactivity to show the 'active' state

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function FilterControls() {
  const searchParams = useSearchParams();
  const period = searchParams.get('period') || 'month';

  const getLinkClassName = (p: string) => 
    `p-2 border rounded-lg ${period === p ? 'bg-blue-500 text-white' : 'bg-white'}`;

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <Link href="/dashboard?period=week" className={getLinkClassName('week')}>
        Last 7 Days
      </Link>
      <Link href="/dashboard?period=month" className={getLinkClassName('month')}>
        This Month
      </Link>
      <Link href="/dashboard" className={getLinkClassName('all')}>
        All Time
      </Link>
    </div>
  );
}