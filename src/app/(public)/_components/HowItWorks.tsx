import type { ReactNode } from "react";

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      {children}
    </svg>
  );
}

const steps = [
  {
    label: "Service",
    icon: (
      <Glyph>
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm6 1.5V9h4.5" />
        <path d="M8 13h8v1.5H8zm0 3.5h6V18H8z" />
      </Glyph>
    ),
  },
  {
    label: "Technician",
    icon: (
      <Glyph>
        <circle cx="12" cy="7" r="3.2" />
        <path d="M5 20c.6-4 3.2-6 7-6s6.4 2 7 6H5z" />
        <path d="M8 6.2h8l-.6 2.2H8.6L8 6.2z" />
      </Glyph>
    ),
  },
  {
    label: "Time",
    icon: (
      <Glyph>
        <circle cx="12" cy="13" r="7" />
        <path d="M12 9.5V13l3 2" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" />
      </Glyph>
    ),
  },
  {
    label: "Pay",
    icon: (
      <Glyph>
        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9z" />
        <path d="M3 10h18" stroke="var(--gold)" strokeWidth="1.6" />
        <circle cx="16.5" cy="14.5" r="1.4" fill="var(--gold)" />
      </Glyph>
    ),
  },
  {
    label: "Done",
    icon: (
      <Glyph>
        <path d="M12 2.5l2.2 1.6 2.7-.2 1.2 2.4 2.4 1.2-.2 2.7L22 12l-1.7 2.2.2 2.7-2.4 1.2-1.2 2.4-2.7-.2L12 21.5l-2.2-1.6-2.7.2-1.2-2.4-2.4-1.2.2-2.7L2 12l1.7-2.2-.2-2.7 2.4-1.2 1.2-2.4 2.7.2L12 2.5z" />
        <path d="M8 12.2l2.4 2.4 5.2-5.4" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </Glyph>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section aria-label="How a booking moves forward" className="px-6 py-10">
      <ol className="relative mx-auto grid max-w-4xl grid-cols-5">
        <div
          aria-hidden
          className="absolute left-[10%] right-[10%] top-7 h-1 rounded-full bg-[var(--gold)]"
        />
        {steps.map((step, index) => (
          <li key={step.label} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--navy)] text-white">
              {step.icon}
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-[11px] font-bold text-[var(--navy)]">
                {index + 1}
              </span>
            </div>
            <span className="mt-3 text-sm font-medium text-foreground sm:text-base">
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
