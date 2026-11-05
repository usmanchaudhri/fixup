import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pt-28">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]">
          A technician in Muscat today.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-muted-foreground sm:text-2xl">
          Same-day AC, plumbing, and electrical. Clear prices in OMR.
        </p>
        <Link
          href="/services"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-[var(--navy)] px-7 text-sm font-semibold text-white"
        >
          Book a visit
        </Link>
        <video
          className="mx-auto mt-10 aspect-video w-full max-w-md rounded-2xl object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/oman-ac-repair.jpg"
          aria-label="A technician servicing a wall air conditioner"
        >
          <source src="/videos/oman-ac-repair.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
