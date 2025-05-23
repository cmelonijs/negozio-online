"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbsProps {
  homeLabel?: string
  showHome?: boolean
  transformLabel?: (segment: string) => string
  nonClickableSegments?: string[]
}

export function DynamicBreadcrumbs({
  homeLabel = "Home",
  showHome = true, 
  transformLabel = (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
  nonClickableSegments = []
}: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Split the pathname into segments and remove empty segments
  const segments = pathname.split('/').filter(Boolean)
  
  if (!segments.length && !showHome) {
    return null
  }
  
  return (
    <div className="wrapper py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Home item */}
          {showHome && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">{homeLabel}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {segments.length > 0 && <BreadcrumbSeparator />}
            </>
          )}
          
          {/* Dynamic segments */}
          {segments.map((segment, index) => {
            const isLastItem = index === segments.length - 1
            const href = `/${segments.slice(0, index + 1).join('/')}`
            
            // Apply transform function to make labels more readable
            const label = transformLabel(segment)
            
            // Check if this segment should be non-clickable
            const isNonClickable = nonClickableSegments.includes(segment)
            
            return (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {isLastItem || isNonClickable ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLastItem && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
