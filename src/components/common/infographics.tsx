import type { ReactNode } from "react";

type MarkProps = { className?: string };

const frame = "h-20 w-20";

function Mark({ className, children }: MarkProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className ?? frame}
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const navy = "var(--navy)";
const gold = "var(--gold)";
const wash = "color-mix(in srgb, var(--navy) 8%, white)";

export function AcMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect x="8" y="16" width="64" height="34" rx="8" fill={wash} stroke={navy} strokeWidth="2.6" />
      <rect x="16" y="24" width="48" height="7" rx="2" fill={navy} />
      <path d="M18 38h44M18 43h28" stroke={navy} strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M22 56c3 4 3 7 0 10M40 56c3 4 3 7 0 10M58 56c3 4 3 7 0 10" stroke={gold} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="62" cy="28" r="3" fill={gold} />
    </Mark>
  );
}

export function PlumbingMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <path d="M14 48h52c0 12-10 18-26 18S14 60 14 48z" fill={wash} stroke={navy} strokeWidth="2.6" />
      <path d="M24 18v14c0 8 6 12 14 12h10" stroke={navy} strokeWidth="3.2" strokeLinecap="round" />
      <rect x="16" y="12" width="16" height="8" rx="3" fill={navy} />
      <path d="M48 44v10" stroke={gold} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M48 58c2.2 3.4 2.2 5.6 0 7.2-2.2-1.6-2.2-3.8 0-7.2z" fill={gold} />
    </Mark>
  );
}

export function ElectricalMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect x="22" y="28" width="36" height="36" rx="8" fill={wash} stroke={navy} strokeWidth="2.6" />
      <rect x="32" y="14" width="5" height="16" rx="1.5" fill={navy} />
      <rect x="43" y="14" width="5" height="16" rx="1.5" fill={navy} />
      <path d="M44 36l-8 10h6l-3 12 12-14h-7l0-8z" fill={gold} stroke={navy} strokeWidth="1.4" strokeLinejoin="round" />
    </Mark>
  );
}

export function CleaningMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <path d="M30 18h14l5 10H25l5-10z" fill={gold} stroke={navy} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M25 28h24l-3 32a7 7 0 0 1-7 6h-4a7 7 0 0 1-7-6l-3-32z" fill={wash} stroke={navy} strokeWidth="2.6" />
      <path d="M32 40h12M34 48h8" stroke={navy} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M56 24c5 3 7 8 5 13M58 42c4 2 5 6 3 10" stroke={gold} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="62" cy="22" r="2" fill={gold} />
      <circle cx="68" cy="34" r="1.6" fill={gold} />
    </Mark>
  );
}

export function PaintingMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect x="10" y="34" width="36" height="30" rx="4" fill={wash} stroke={navy} strokeWidth="2.4" />
      <path d="M14 48h28" stroke={gold} strokeWidth="6" strokeLinecap="round" />
      <path d="M14 58h20" stroke={gold} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <rect x="40" y="16" width="26" height="12" rx="6" fill={navy} />
      <path d="M52 28v8" stroke={navy} strokeWidth="3" strokeLinecap="round" />
      <circle cx="52" cy="40" r="4" fill={gold} stroke={navy} strokeWidth="2" />
    </Mark>
  );
}

export function CarpentryMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect x="12" y="46" width="40" height="16" rx="3" fill={wash} stroke={navy} strokeWidth="2.4" />
      <path d="M22 46v-6M34 46v-6" stroke={gold} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="22" cy="38" r="2.2" fill={gold} />
      <circle cx="34" cy="38" r="2.2" fill={gold} />
      <path d="M44 18l18 14-8 4-6 16-6-4 8-6-10-8z" fill={navy} />
      <path d="M46 22l8 6" stroke={gold} strokeWidth="2.2" strokeLinecap="round" />
    </Mark>
  );
}
