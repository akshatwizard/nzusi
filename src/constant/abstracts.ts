import { Play, LayoutGrid, BookOpen, Stethoscope } from 'lucide-react'

export const CATEGORIES = [
    {
        id: 'video',
        code: 'BV',
        label: 'Video',
        longLabel: 'Best Video Session',
        icon: Play,
        count: 12,
        color: 'bg-violet-50 border-violet-200 text-violet-700',
        iconBg: 'bg-violet-100',
        iconColor: 'text-violet-600',
        dotColor: 'bg-violet-500',
        accent: '#7c3aed',
        description: 'Surgical technique videos demonstrating innovative urological procedures, live surgery recordings, and step-by-step operative demonstrations.',
        downloadUrl: 'https://1d2b4dea-e0f6-42cc-87ed-25777b45da4f.usrfiles.com/ugd/1d2b4d_ab61dcb331984fc3a7e757ec4b0dd3c0.pdf',
        highlights: ['Robotic surgery', 'Laparoscopic techniques', 'Endourology', 'Reconstructive procedures'],
    },
    {
        id: 'podium',
        code: 'BP',
        label: 'Podium',
        longLabel: 'Best Paper Session',
        icon: Stethoscope,
        count: 18,
        color: 'bg-fun-blue-50 border-fun-blue-200 text-fun-blue-700',
        iconBg: 'bg-fun-blue-100',
        iconColor: 'text-fun-blue-600',
        dotColor: 'bg-fun-blue-500',
        accent: '#185fa5',
        description: 'Oral presentations of original research, randomised controlled trials, and clinical studies selected for podium presentation at NZUSICON 2025.',
        downloadUrl: '#',
        highlights: ['RCTs', 'Clinical outcomes', 'Epidemiology', 'New techniques'],
    },
    {
        id: 'poster',
        code: 'BPos',
        label: 'Posters',
        longLabel: 'Moderated Poster Session',
        icon: LayoutGrid,
        count: 24,
        color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        dotColor: 'bg-emerald-500',
        accent: '#059669',
        description: 'Moderated poster presentations covering a broad range of urological topics, reviewed and discussed by expert faculty during dedicated poster sessions.',
        downloadUrl: '#',
        highlights: ['Case series', 'Pilot studies', 'QI projects', 'Technology'],
    },
    {
        id: 'unmoderated',
        code: 'UPos',
        label: 'e-Posters',
        longLabel: 'Unmoderated e-Poster Session',
        icon: BookOpen,
        count: 31,
        color: 'bg-amber-50 border-amber-200 text-amber-700',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        dotColor: 'bg-amber-500',
        accent: '#d97706',
        description: 'Electronic poster submissions displayed throughout the conference. Authors present at designated times for attendee interaction and discussion.',
        downloadUrl: '#',
        highlights: ['Case reports', 'Observational studies', 'Reviews', 'Audits'],
    },
]

export const IMPORTANT_DATES = [
    {
        title: 'Submission Opens',
        date: '31 May 2026',
        color: 'text-blue-600',
        border: 'bg-blue-500',
        bg: 'bg-blue-50'
    },
    {
        title: 'Submission Closes',
        date: '15 Aug 2026',
        color: 'text-amber-600',
        border: 'bg-amber-500',
        bg: 'bg-amber-50'
    },
    {
        title: 'Acceptance Notification',
        date: '31 Aug 2026',
        color: 'text-emerald-600',
        border: 'bg-emerald-500',
        bg: 'bg-emerald-50'
    },
]

export const PRESENTATION_CATEGORIES = [
    'Marudhara Jodhpur Urology Trust Best Paper Session (Competition Category)',
    'Agra Urological Best Video Session 1 (Robotic Urology Videos) (Competition Category)',
    'Agra Urological Best Video Session 2 (Non-Robotic Urology Videos) (Competition Category)',
    'CMC Ludhiana Best Poster Session (Competition Category)',
    'Moderated Podium Session',
    'Moderated Video Session',
    'Moderated Poster Session',
    'Un-moderated e-Poster'
]

export const SCIENTIFIC_CATEGORIES = [
    'Stones/EndoUrology',
    'Oncology',
    'Pediatric Urology',
    'Reconstructive Urology',
    'UTI and infections',
    'Female and Functional Urology',
    'Organ Transplant',
    'Andrology',
    'Others'
]

export const ABSTRACT_STRUCTURE = [
    'Aims',
    'Methods',
    'Results',
    'Conclusions'
]

export const IMPORTANT_NOTES = [
    'Previously published abstracts shall be summarily rejected.',
    'Submission of the abstract carries with it an obligation to present the accepted abstract in person without any change in scientific content during the allotted time in the above conference.',
    'Withdrawal of presentation should be intimated to the scientific committee on or before 15th Oct, 2026.',
    'If the presenting author is not able to present the paper at the conference due to any reason, prior permission must be obtained from the Scientific Committee.',
    'More than one abstract can be submitted by any individual author, except for same prize competition category.',
    'One best poster/podium/video from each non-competition categories shall be awarded with a certificate.'
]

export const POSTER_GUIDELINES = [
    'The E-poster will be displayed on a standard 42” LCD TV or Poster Size.',
    'File format should be Power point (.PPT/.PPTX) in 16:9 ratio slide.',
    'Maximum number of slides per E-poster: 01 (One).',
    'Total size of the PPT slide should not exceed 5 MB.',
    'Animation/movies/sounds will not be supported.',
    'Poster title should be prominently displayed at the top.',
    'Text should include Aim/Objectives, Methods, Results and Conclusion.',
    'Use clear readable fonts like Helvetica, Calibri or Tahoma.'
]

export const VIDEO_GUIDELINES = [
    'Video must be an original production.',
    'Video must describe title, authors and affiliations at the beginning.',
    'Any speech or voice-over should be in clear English.',
    'Do not use background music preferably.',
    'Preferably use MP4/H.264 format.',
    'Minimum recommended resolution: 1920x1080.',
    'Do not upscale SD source to HD.',
    'Name your video file with your name and video title.'
]