import Link from "next/link";
import type { ComponentType } from "react";
import {
  AcMark,
  CarpentryMark,
  CleaningMark,
  ElectricalMark,
  PaintingMark,
  PlumbingMark,
} from "@/components/common/infographics";

const services: { label: string; Mark: ComponentType<{ className?: string }> }[] = [
  { label: "AC", Mark: AcMark },
  { label: "Plumbing", Mark: PlumbingMark },
  { label: "Electrical", Mark: ElectricalMark },
  { label: "Cleaning", Mark: CleaningMark },
  { label: "Painting", Mark: PaintingMark },
  { label: "Carpentry", Mark: CarpentryMark },
];

export default function PopularIndustries() {
  return (
    <nav aria-label="Services" className="px-6 py-8">
      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 min-[420px]:grid-cols-3 sm:grid-cols-6">
        {services.map(({ label, Mark }) => (
          <li key={label}>
            <Link
              href="/services"
              className="flex flex-col items-center gap-3 text-center text-lg font-semibold text-foreground hover:text-[var(--navy)] sm:text-2xl"
            >
              <Mark className="h-16 w-16 sm:h-24 sm:w-24" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
