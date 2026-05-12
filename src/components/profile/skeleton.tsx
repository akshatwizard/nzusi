'use client'

// Reusable shimmer base
function Sk({
    w, h, rounded, className, style
}: {
    w?: string; h?: string; rounded?: string; className?: string; style?: React.CSSProperties
}) {
    return (
        <div
            className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${className ?? ''}`}
            style={{ width: w, height: h, borderRadius: rounded ?? '6px', ...style }}
        />
    )
}

// ─── Hero skeleton ────────────────────────────────────────────────────────────
function HeroSkeleton() {
    return (
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
            <div className='p-5 md:p-7 flex flex-col sm:flex-row items-start gap-5'>

                {/* Avatar */}
                <div className='relative shrink-0'>
                    <Sk w='96px' h='96px' rounded='14px' />
                    <Sk
                        w='22px' h='22px' rounded='50%'
                        className='absolute -bottom-1.5 -right-1.5'
                    />
                </div>

                {/* Info */}
                <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
                        <div className='flex-1'>
                            {/* Name + verified */}
                            <div className='flex items-center gap-2 mb-2'>
                                <Sk w='180px' h='22px' />
                                <Sk w='16px' h='16px' rounded='50%' />
                            </div>
                            {/* Designation */}
                            <Sk w='140px' h='13px' className='mb-1.5' />
                            {/* City */}
                            <Sk w='110px' h='11px' className='mb-3' />
                            {/* Badges */}
                            <div className='flex items-center gap-2'>
                                <Sk w='64px' h='20px' rounded='100px' />
                                <Sk w='72px' h='20px' rounded='100px' />
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className='flex items-center gap-2 shrink-0'>
                            <Sk w='64px' h='30px' rounded='8px' />
                            <Sk w='90px' h='30px' rounded='8px' />
                        </div>
                    </div>

                    {/* Progress */}
                    <div className='mt-4 pt-4 border-t border-slate-100'>
                        <div className='flex items-center justify-between mb-1.5'>
                            <Sk w='120px' h='11px' />
                            <Sk w='30px' h='11px' />
                        </div>
                        <div className='h-2 bg-slate-100 rounded-full overflow-hidden'>
                            <Sk w='54%' h='8px' rounded='100px' />
                        </div>
                        <Sk w='200px' h='10px' className='mt-1.5' />
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Sidebar skeleton ─────────────────────────────────────────────────────────
function SidebarSkeleton() {
    return (
        <aside className='lg:w-60 xl:w-64 shrink-0 flex flex-col gap-4'>

            {/* Nav card */}
            <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
                <div className='px-4 py-3.5 border-b border-slate-100'>
                    <Sk w='70px' h='10px' />
                </div>
                <div className='p-2 flex flex-col gap-1'>
                    <Sk w='100%' h='34px' rounded='10px' />
                    {[0.5, 0.5, 0.5].map((op, i) => (
                        <Sk key={i} w='100%' h='34px' rounded='10px' style={{ opacity: op }} />
                    ))}
                    <div className='pt-2 mt-1 border-t border-slate-50'>
                        <Sk w='100%' h='34px' rounded='10px' style={{ opacity: 0.4 }} />
                    </div>
                </div>
            </div>

            {/* Completion tips card */}
            <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
                <div className='px-4 py-3.5 border-b border-slate-100 flex items-center gap-2'>
                    <Sk w='13px' h='13px' rounded='50%' />
                    <Sk w='100px' h='10px' />
                </div>
                <div className='p-3 flex flex-col gap-2'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='flex items-center gap-2.5 px-2.5 py-2'>
                            <Sk w='6px' h='6px' rounded='50%' className='shrink-0' />
                            <Sk h='12px' className='flex-1' />
                        </div>
                    ))}
                    <Sk w='80px' h='10px' className='mx-auto mt-1' />
                </div>
            </div>

            {/* Member ID mini card */}
            <Sk h='90px' rounded='16px' style={{ opacity: 0.7 }} />
        </aside>
    )
}

// ─── Section header skeleton ──────────────────────────────────────────────────
function CardHeaderSk({ withEdit = true }: { withEdit?: boolean }) {
    return (
        <div className='flex items-center justify-between mb-5'>
            <div className='flex items-center gap-2'>
                <Sk w='28px' h='28px' rounded='50%' />
                <Sk w='150px' h='16px' />
            </div>
            {withEdit && <Sk w='50px' h='28px' rounded='8px' />}
        </div>
    )
}

// ─── Personal Info skeleton ───────────────────────────────────────────────────
function PersonalInfoSkeleton() {
    return (
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6'>
            <CardHeaderSk />

            {/* Field grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-6'>
                {[
                    ['70px', '120px'],
                    ['50px', '160px'],
                    ['55px', '100px'],
                    ['60px', '40px'],
                    ['90px', '80px'],
                    ['65px', '130px'],
                ].map(([lw, vw], i) => (
                    <div key={i}>
                        <Sk w={lw} h='10px' className='mb-2' />
                        <Sk w={vw} h='14px' style={{ opacity: i === 4 ? 0.4 : 1 }} />
                    </div>
                ))}
            </div>

            {/* Address */}
            <div className='pt-5 border-t border-slate-100'>
                <div className='flex items-center gap-2 mb-4'>
                    <Sk w='13px' h='13px' rounded='50%' />
                    <Sk w='70px' h='10px' />
                </div>
                <div className='rounded-xl border border-slate-100 p-4 max-w-xs'>
                    <div className='flex items-center gap-2 mb-3'>
                        <Sk w='65px' h='10px' />
                        <Sk w='54px' h='16px' rounded='100px' />
                    </div>
                    <Sk w='140px' h='13px' />
                </div>
            </div>
        </div>
    )
}

// ─── Professional Details skeleton ───────────────────────────────────────────
function SectionBlockSk({ label, empty }: { label: string; empty?: boolean }) {
    return (
        <div>
            <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-2'>
                    <Sk w='13px' h='13px' rounded='50%' />
                    <Sk w='140px' h='10px' />
                </div>
                <Sk w='60px' h='18px' rounded='100px' />
            </div>
            {empty ? (
                <div className='rounded-xl border border-dashed border-slate-200 h-12 opacity-40' />
            ) : (
                <div className='flex items-center gap-3 p-4 rounded-xl border border-slate-100'>
                    <Sk w='32px' h='32px' rounded='8px' className='shrink-0' />
                    <div className='flex-1'>
                        <Sk w='80%' h='13px' className='mb-2' />
                        <Sk w='50%' h='11px' />
                    </div>
                </div>
            )}
        </div>
    )
}

function ProfessionalInfoSkeleton() {
    return (
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6'>
            <CardHeaderSk />
            <div className='flex flex-col gap-8'>
                <SectionBlockSk label='Current Designations' />
                <SectionBlockSk label='Academic Qualifications' empty />
                <SectionBlockSk label='Urology Trainings' empty />
            </div>
        </div>
    )
}

// ─── Membership skeleton ──────────────────────────────────────────────────────
function MembershipSkeleton() {
    return (
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6'>
            <CardHeaderSk withEdit={false} />

            {/* Status banner */}
            <div className='flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 mb-5'>
                <Sk w='16px' h='16px' rounded='50%' className='shrink-0' />
                <div className='flex-1'>
                    <Sk w='60%' h='13px' className='mb-2' />
                    <Sk w='40%' h='11px' />
                </div>
            </div>

            {/* Grid facts */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5'>
                {[['80%', '60%'], ['50px', '30px'], ['55px', '35px']].map(([lw, vw], i) => (
                    <div key={i}>
                        <Sk w={lw} h='10px' className='mb-2' />
                        <Sk w={vw} h='13px' />
                    </div>
                ))}
            </div>

            {/* USI block */}
            <div className='flex items-start gap-3 p-4 rounded-xl border border-slate-100'>
                <Sk w='16px' h='16px' rounded='50%' className='mt-0.5 shrink-0' />
                <div className='flex-1'>
                    <Sk w='70%' h='12px' className='mb-2' />
                    <Sk w='45%' h='11px' />
                </div>
            </div>
        </div>
    )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ProfilePageSkeleton() {
    return (
        <div className='bg-slate-50 min-h-screen'>
            {/* Banner */}
            <div className='h-36 md:h-44 bg-slate-200 animate-pulse' />

            <div className='max-w-6xl mx-auto px-4 md:px-6 lg:px-8 -mt-10 md:-mt-14 pb-16 relative z-10'>
                <HeroSkeleton />

                <div className='mt-5 flex flex-col lg:flex-row gap-5 items-start'>
                    <SidebarSkeleton />

                    <div className='flex-1 min-w-0 flex flex-col gap-4'>
                        <PersonalInfoSkeleton />
                        <ProfessionalInfoSkeleton />
                        <MembershipSkeleton />
                    </div>
                </div>
            </div>
        </div>
    )
}