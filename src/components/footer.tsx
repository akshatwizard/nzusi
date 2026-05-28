import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"

interface FooterLinks {
    About: Links[];
    Resources: Links[];
    NZUSI: Links[];
}

type Links = {
    label: string;
    href: string;
    open_in_next_tab: boolean;
}

const links: FooterLinks = {
    About: [
        { label: "Council", href: "/about", open_in_next_tab: false },
        { label: "Constitution", href: "/about", open_in_next_tab: false },
        { label: "Past Presidents", href: "/about", open_in_next_tab: false },
        { label: "Bids", href: "/about", open_in_next_tab: false },
    ],
    Resources: [
        { label: "Blog & Adyatan", href: "/blogs-and-news", open_in_next_tab: false },
        { label: "Newsletters", href: "https://drive.google.com/drive/folders/1OHK9ENLpk5_O43cCS-DwRYpKOjRvzreD?usp=sharing", open_in_next_tab: true },
        { label: "Job Listings", href: "https://docs.google.com/spreadsheets/d/1PYYbXaKfgDS5oJYKMijuBBDCu5X162kYx13wJ5-9Ebc/edit?usp=sharing", open_in_next_tab: true },
        { label: "Public Awareness", href: "/public-health-awareness", open_in_next_tab: false },
    ],
    NZUSI: [
        { label: "Apply Online", href: "https://1c4098e6-0cb3-438e-8c36-f2acc1587c38.filesusr.com/ugd/02b867_fd810af167bf4228a16d526ef68be544.pdf", open_in_next_tab: true },
        { label: "About", href: "/about", open_in_next_tab: false },
        { label: "Events & CME", href: "/events", open_in_next_tab: false },
        { label: "Abstract Submission Guidelines", href: "/abstracts-2026/guidelines", open_in_next_tab: false },
        { label: "NZI YouTube", href: "https://www.youtube.com/@nzusioffice7256", open_in_next_tab: true },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-fun-blue-950 border-t border-fun-blue-900">
            {/* Main footer */}
            <div className="w-full lg:px-12 md:px-8 px-4">
                <div className="w-full max-w-7xl mx-auto py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/images/logo/nzusi_logo.png"
                                alt="NZUSI Logo"
                                width={80}
                                height={80}
                                className="w-20 h-auto"
                            />
                        </Link>
                        <p className="text-fun-blue-300 text-sm leading-relaxed max-w-xs mb-6">
                            North Zone Chapter of the Urological Society of India — connecting urologists across Haryana, Punjab, Himachal Pradesh, J&K, Uttarakhand, and Delhi.
                        </p>

                        <div className="space-y-2.5">
                            <a
                                href="mailto:nzusi@example.com"
                                className="flex items-center gap-2.5 text-sm text-fun-blue-400 hover:text-fun-blue-200 transition-colors"
                            >
                                <Mail size={13} />
                                {/* TODO: Replace with actual NZUSI email */}
                                nzusi@usi.org
                            </a>
                            <div className="flex items-start gap-2.5 text-sm text-fun-blue-400">
                                <MapPin size={13} className="mt-0.5 shrink-0" />
                                <span>North Zone, India</span>
                            </div>
                        </div>

                        {/* Social — TODO: Update with actual NZUSI handles */}
                        <div className="flex gap-3 mt-6">
                            {["In", "Tw", "Yt"].map((s) => (
                                <a
                                    key={s}
                                    href="#"
                                    aria-label={s}
                                    className="w-8 h-8 rounded-lg bg-fun-blue-900 hover:bg-fun-blue-700 flex items-center justify-center text-xs font-bold text-fun-blue-400 hover:text-white transition-all duration-200"
                                >
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([group, items]) => (
                        <div key={group}>
                            <p className="text-xs font-semibold tracking-widest uppercase text-fun-blue-500 mb-4">
                                {group}
                            </p>
                            <ul className="space-y-2.5">
                                {items.map((item: Links) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            target={item.open_in_next_tab ? "_blank" : "_self"}
                                            className="text-sm text-fun-blue-300 hover:text-white transition-colors duration-200"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="w-full border-t border-fun-blue-900 lg:px-12 md:px-8 px-4">
                <div className="w-full max-w-7xl mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-fun-blue-600">
                        © {new Date().getFullYear()} North Zone Urological Society of India. All rights reserved | Design & Developed by Wizards Next.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.nzusi.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-fun-blue-600 hover:text-fun-blue-400 flex items-center gap-1 transition-colors"
                        >
                            Old site <ExternalLink size={10} />
                        </a>
                        <Link href="/privacy" className="text-xs text-fun-blue-600 hover:text-fun-blue-400 transition-colors">
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}