import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function BackButton({ to = '/', label = 'Back to home' }: { to?: string; label?: string }) {
  return (
    <Button
      asChild
      variant="default"
      size="sm"
      className="rounded-full px-4 py-2 h-auto text-xs font-medium tracking-wider uppercase shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={to} className="inline-flex items-center gap-2">
        <ArrowLeft className="w-3.5 h-3.5" />
        {label}
      </Link>
    </Button>
  )
}
