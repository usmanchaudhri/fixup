import Link from "next/link";
import SiteLogo from "./SiteLogo";
import { brand } from "@/lib/brand";

const links = [
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/find-technicians" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <SiteLogo />
          <p className="text-sm text-muted-foreground">
            {brand.address}
            <span className="mx-2">·</span>
            <a href={`mailto:${brand.email}`} className="hover:text-foreground">
              {brand.email}
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${brand.whatsapp}`}
            className="hover:text-foreground"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </footer>
  );
}
