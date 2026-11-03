import Link from "next/link";

export default function SiteLogo({
  onDark = false,
  large = false,
}: {
  onDark?: boolean;
  large?: boolean;
}) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <div
        className={
          onDark
            ? `flex items-center justify-center rounded-lg bg-[var(--gold)] ${large ? "h-11 w-11" : "h-9 w-9"}`
            : `flex items-center justify-center rounded-lg bg-[var(--navy)] shadow-sm ${large ? "h-11 w-11" : "h-9 w-9"}`
        }
      >
        <span
          className={
            onDark
              ? `font-black tracking-tight text-[var(--navy)] ${large ? "text-base" : "text-sm"}`
              : `font-black tracking-tight text-[var(--gold)] ${large ? "text-base" : "text-sm"}`
          }
        >
          FX
        </span>
      </div>
      <span className={large ? "text-xl font-bold tracking-tight sm:text-2xl" : "text-base font-bold tracking-tight sm:text-lg"}>
        <span className={onDark ? "text-white" : "text-[var(--navy)] dark:text-white"}>
          FIXUP
        </span>
        <span className="text-[var(--gold)]"> Oman</span>
      </span>
    </Link>
  );
}
