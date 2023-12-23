'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Props = {}

export const Sidebar = (props: Props) => {
  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  )
}
