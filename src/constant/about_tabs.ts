import AboutBids from '@/components/about_bid'
import AboutConstitution from '@/components/about_constitution'
import AboutCouncil from '@/components/about_council'
import PastPresidents from '@/components/past_president'
import PastSecretaries from '@/components/past_secretaries'
import PastTreasurers from '@/components/past_treasurers'
import { ComponentType } from 'react'

export type Tab_Config = {
    label: string
    items: {
        label: string
        component: ComponentType
    }[]
}

export const About_Tab: Tab_Config[] = [
    {
        label: 'Organisation',
        items: [
            { label: 'Council', component: AboutCouncil },
            { label: 'Constitution', component: AboutConstitution },
            { label: 'Bids', component: AboutBids },
        ],
    },
    {
        label: 'Past Executives',
        items: [
            { label: 'Past Presidents', component: PastPresidents },
            { label: 'Past Secretaries', component: PastSecretaries },
            { label: 'Past Treasurers', component: PastTreasurers },
        ],
    },
    // {
    //     label: 'Membership',
    //     items: [
    //         { label: 'Online Application', component: null },
    //         { label: 'Nomination Form', component: null },
    //     ],
    // },
]