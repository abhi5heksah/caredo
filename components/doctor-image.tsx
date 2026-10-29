"use client"

import { useEffect, useState } from "react"

const FALLBACK = "/doctor.png"
const SECONDARY_FALLBACK = "/female-doctor-smiling.png"
const LAST_RESORT = "/placeholder.svg"

export function DoctorImage({
    src,
    alt,
    className,
}: {
    src?: string | null
    alt: string
    className?: string
}) {
    const [current, setCurrent] = useState(src || FALLBACK)

    useEffect(() => {
        setCurrent(src || FALLBACK)
    }, [src])

    return (
        <img
            src={current}
            alt={alt}
            className={className}
            onError={() => {
                setCurrent((prev) => {
                    if (prev === LAST_RESORT) return LAST_RESORT
                    if (prev === SECONDARY_FALLBACK) return LAST_RESORT
                    if (prev === FALLBACK) return SECONDARY_FALLBACK
                    return FALLBACK
                })
            }}
        />
    )
}
