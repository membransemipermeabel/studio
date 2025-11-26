import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 4 13V8a7.98 7.98 0 0 1 10-6.06 7.98 7.98 0 0 1 10 6.06V13a7 7 0 0 1-7 7h-2" />
      <path d="M12 4A5.5 5.5 0 0 0 6.5 9.5" />
    </svg>
  );
}
