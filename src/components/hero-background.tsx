'use client'

export function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Subtle grid lines */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
                    `,
                    backgroundSize: '44px 44px',
                }}
            />

            {/* Primary orb — bottom right */}
            <div
                className="absolute -bottom-48 -right-24 sixe-130 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(24,95,165,0.32) 0%, transparent 70%)',
                }}
            />

            {/* Secondary orb — top center */}
            <div
                className="absolute -top-16 left-1/3 size-70 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(55,138,221,0.14) 0%, transparent 70%)',
                }}
            />

            {/* Faint diagonal line accent — top right */}
            <div
                className="absolute top-0 right-0 w-px h-64 opacity-10"
                style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(55,138,221,0.6), transparent)',
                    transform: 'translateX(-120px)',
                }}
            />
            <div
                className="absolute top-0 right-0 w-px h-40 opacity-[0.06]"
                style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(55,138,221,0.6), transparent)',
                    transform: 'translateX(-200px)',
                }}
            />

            {/* Faint corner accent — top left */}
            <div
                className="absolute top-0 left-0 w-48 h-48 opacity-[0.04]"
                style={{
                    background: 'radial-gradient(circle at top left, rgba(133,183,235,1) 0%, transparent 70%)',
                }}
            />
        </div>
    )
}