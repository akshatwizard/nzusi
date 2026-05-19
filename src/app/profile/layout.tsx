import ProfileContextProvider from '@/context/profile_update_context'
import { ReactNode } from 'react'

export default function ProfilePageLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ProfileContextProvider>
            {children}
        </ProfileContextProvider>
    )
}
