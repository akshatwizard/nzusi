"use client";
import ProfileHero from '@/components/profile/profile_hero';
import ProfileSidebar from '@/components/profile/profile_sidebar';
import { Section, Wrapper } from '@/components/ui/sections'
import { useAuth } from '@/context/auth_context';
import { useState } from 'react';
import { motion, Variants } from "motion/react"
import PersonalInfoCard from '@/components/profile/profile_info_card';
import ProfessionalInfoCard from '@/components/profile/professional_info_card';
import MembershipCard from '@/components/profile/membership_card';
import ActivityCard from '@/components/profile/active_card';
import { getProfileCompletion } from '@/lib/profile_completion';
import ProfilePageSkeleton from '@/components/profile/skeleton';
import { UpdateUserProfile } from '@/components/profile/update_profile';
import { useProfileContext } from '@/context/profile_update_context';
import UpdateDesignation from '@/components/profile/update_designation';
import UpdateAcademic from '@/components/profile/update_academic';


export type ActiveSection = 'overview' | 'personal' | 'professional' | 'membership' | 'activity'
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: d },
    })
}


export default function UserProfile() {
    const { editProfile, updateDesignation } = useProfileContext();
    const { user, loading, isMounted } = useAuth()
    const [activeSection, setActiveSection] = useState<ActiveSection>('overview')

    if (!user) return null
    const completion = getProfileCompletion(user)

    if (!isMounted || loading) {
        return <ProfilePageSkeleton />
    }

    return (
        <>
            <Section className='px-0! min-h-screen'>
                <div className='h-36 md:h-44 bg-fun-blue-950 relative overflow-hidden'>
                    <div
                        className='absolute inset-0 opacity-[0.04]'
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)`,
                            backgroundSize: '36px 36px',
                        }}
                    />
                    <div
                        className='absolute -bottom-20 left-1/3 w-96 h-96 rounded-full pointer-events-none'
                        style={{ background: 'radial-gradient(circle,rgba(24,95,165,.35) 0%,transparent 70%)' }}
                    />
                    <div
                        className='absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none'
                        style={{ background: 'radial-gradient(circle at top right,rgba(55,138,221,.1) 0%,transparent 70%)' }}
                    />
                </div>

                <div className='max-w-6xl mx-auto px-4 md:px-6 lg:px-8 -mt-10 md:-mt-14 pb-16 relative z-10'>

                    <ProfileHero completion={completion} user={user} />

                    <div className='mt-5 flex flex-col lg:flex-row gap-5 items-start'>

                        {/* Left sidebar */}
                        <ProfileSidebar
                            user={user}
                            completion={completion}
                            active={activeSection}
                            onSelect={setActiveSection}
                        />

                        {/* Right content area */}
                        <div className='flex-1 min-w-0 flex flex-col gap-4'>

                            {(activeSection === 'overview' || activeSection === 'personal') && (
                                <motion.div
                                    key='personal'
                                    initial='hidden' animate='show' custom={0}
                                    variants={fadeUp}
                                >
                                    <PersonalInfoCard user={user} />
                                </motion.div>
                            )}

                            {(activeSection === 'overview' || activeSection === 'professional') && (
                                <motion.div
                                    key='professional'
                                    initial='hidden' animate='show' custom={0.06}
                                    variants={fadeUp}
                                >
                                    <ProfessionalInfoCard user={user} />
                                </motion.div>
                            )}

                            {(activeSection === 'overview' || activeSection === 'membership') && (
                                <motion.div
                                    key='membership'
                                    initial='hidden' animate='show' custom={0.12}
                                    variants={fadeUp}
                                >
                                    <MembershipCard user={user} />
                                </motion.div>
                            )}

                            {/* {(activeSection === 'overview' || activeSection === 'activity') && (
                            <motion.div
                                key='activity'
                                initial='hidden' animate='show' custom={0.18}
                                variants={fadeUp}
                            >
                                <ActivityCard />
                            </motion.div>
                        )} */}

                        </div>
                    </div>
                </div>
            </Section>
            {editProfile &&
                <UpdateUserProfile user={user} />
            }
            {updateDesignation &&
                <UpdateDesignation name={user.name} data={user.present_designations[0] ?? null} />
            }
            <UpdateAcademic name={user.name} data={user.academic_qualifications} />
        </>
    )
}
