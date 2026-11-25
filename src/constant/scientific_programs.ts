export const SP_BASE = "/scientific-programs-and-selected-abstracts"
export const SP_TITLE = "Scientific Programs & Selected Abstracts"

export type SPItem = { slug: string; label: string }
export type SPGroup = { label: string; items: SPItem[] }

/** Left-hand navigation. Each slug has a generated section in src/content/scientific-programs. */
export const SP_NAV: SPGroup[] = [
    {
        label: "Scientific Programme",
        items: [
            { slug: "programme-at-a-glance", label: "Programme at a Glance" },
            { slug: "message-from-hon-secretary", label: "Message from the Hon. Secretary" },
            { slug: "day-1", label: "Day 1 · Fri, 27 Nov" },
            { slug: "day-2", label: "Day 2 · Sat, 28 Nov" },
            { slug: "day-3", label: "Day 3 · Sun, 29 Nov" },
            { slug: "unmoderated-posters-and-videos", label: "Unmoderated Posters & Videos" },
            { slug: "faculty-index", label: "Convenor & Faculty Index" },
        ],
    },
    {
        label: "Selected Abstracts",
        items: [
            { slug: "selected-best-video-sessions", label: "Best Video Sessions" },
            { slug: "selected-best-paper-sessions", label: "Best Paper Sessions" },
            { slug: "selected-best-poster-sessions", label: "Best Poster Sessions" },
            { slug: "selected-moderated-podium", label: "Moderated Podium" },
            { slug: "selected-moderated-video", label: "Moderated Video" },
            { slug: "selected-moderated-poster", label: "Moderated Poster" },
            { slug: "selected-unmoderated", label: "Unmoderated Posters & Videos" },
        ],
    },
    {
        label: "Abstract Submissions 2026",
        items: [
            { slug: "submissions-podium", label: "Podium (106)" },
            { slug: "submissions-video", label: "Video (115)" },
            { slug: "submissions-eposter", label: "E-poster (22)" },
            { slug: "submissions-poster", label: "Poster (85)" },
        ],
    },
]

export const SP_ITEMS = SP_NAV.flatMap((g) => g.items.map((item) => ({ ...item, group: g.label })))
export const SP_DEFAULT_SLUG = SP_ITEMS[0].slug
