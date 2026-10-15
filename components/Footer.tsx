import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-primary-ink">AP</span>
          <span className="label-caps">Aryan Panwar · Business Analyst · AI products</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground-muted">
          <Link href="/writing" className="inline-flex min-h-11 items-center hover:text-primary-ink transition-colors">Writing</Link>
          <Link href="/faq" className="inline-flex min-h-11 items-center hover:text-primary-ink transition-colors">FAQ</Link>
          <span className="text-foreground-muted">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}