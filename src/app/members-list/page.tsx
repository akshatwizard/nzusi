"use client";

import { MembersList } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "motion/react";
import {
    MapPin,
    ChevronUp,
    ChevronDown,
    ChevronsUpDown,
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    Users,
    BadgeCheck,
    Shield,
    SlidersHorizontal,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Section, Wrapper } from "@/components/ui/sections";
import { useDebounceValue } from "@/hooks/useDebounce";
import { authService } from "@/services/auth";

const TYPE_COLORS: Record<string, string> = {
    "Full Life": "bg-fun-blue-50 text-fun-blue-700 border border-fun-blue-200",
    Trainee: "bg-amber-50 text-amber-700 border border-amber-200",
    Honorary: "bg-purple-50 text-purple-700 border border-purple-200",
};

const AVATAR_COLORS = [
    "from-fun-blue-600 to-fun-blue-800",
    "from-violet-500 to-violet-700",
    "from-emerald-500 to-emerald-700",
    "from-amber-500 to-amber-700",
    "from-sky-500 to-sky-700",
];

function avatarColor(name: string) {
    const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
}

const col = createColumnHelper<MembersList>();

function getInitials(name: string) {
    return name
        .replace(/^Dr\.?\s*/i, '')
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase()
}

const columns = [
    col.display({
        id: 'serial',
        header: '#',
        enableSorting: false,
        cell: ({ row }) => (
            <span className='text-[12px] font-bold tabular-nums text-zinc-400 block text-right'>
                {pageXOffset + row.index + 1}
            </span>
        ),
    }),
    col.accessor("name", {
        header: "Member",
        cell: ({ row }) => {
            const { name, membership_no, email } = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div
                        className={`w-9 h-9 rounded-full bg-linear-to-br ${avatarColor(getInitials(name))} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}
                    >
                        {getInitials(name)}
                    </div>
                    <div className="min-w-0">
                        <p className="text-fun-blue-950 text-[13px] font-semibold leading-tight truncate">
                            {name}
                        </p>
                        <p className="text-zinc-400 text-[11px] truncate">{email}</p>
                    </div>
                </div>
            );
        },
    }),
    col.accessor("membership_no", {
        header: "Membership No.",
        cell: ({ getValue }) => {
            const val = getValue();
            return val ? (
                <span className="font-mono text-[12px] text-fun-blue-700 bg-fun-blue-50 px-2 py-0.5 rounded-md border border-fun-blue-100">
                    {val}
                </span>
            ) : (
                <span className="text-zinc-300 text-[12px]">—</span>
            );
        },
    }),
    col.accessor("membership_type", {
        header: "Type",
        cell: ({ getValue }) => {
            const type = getValue();

            if (!type) {
                return (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-zinc-50 text-zinc-400 border border-zinc-200">
                        Unknown
                    </span>
                );
            }

            const cls =
                TYPE_COLORS[type.title] ??
                "bg-zinc-50 text-zinc-600 border border-zinc-200";

            return (
                <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cls}`}
                >
                    {type.title}
                </span>
            );
        },
    }),
    col.accessor("city_name", {
        header: "City",
        cell: ({ getValue }) => {
            const city = getValue();
            return city ? (
                <div className="flex items-center gap-1.5 text-zinc-500 text-[12px]">
                    <MapPin size={10} className="text-fun-blue-300 shrink-0" />
                    {city}
                </div>
            ) : (
                <span className="text-zinc-300 text-[12px]">—</span>
            );
        },
    }),
    col.accessor("mobile_no", {
        header: "Mobile",
        cell: ({ getValue }) => {
            const val = getValue();
            return val ? (
                <span className="text-zinc-600 text-[12px] font-medium">{val}</span>
            ) : (
                <span className="text-zinc-300 text-[12px]">—</span>
            );
        },
        enableSorting: false,
    }),
];

function SkeletonRows() {
    return (
        <>
            {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className='animate-pulse border-b border-zinc-100'>
                    <td className='px-4 py-3 w-10'>
                        <div className='h-3 w-6 rounded bg-fun-blue-100 ml-auto' />
                    </td>
                    <td className='px-4 py-3'>
                        <div className='flex items-center gap-3'>
                            <div className='w-9 h-9 rounded-full bg-fun-blue-100 shrink-0' />
                            <div className='space-y-1.5 flex-1'>
                                <div className='h-3 w-32 rounded bg-fun-blue-100' />
                                <div className='h-2.5 w-40 rounded bg-fun-blue-50' />
                            </div>
                        </div>
                    </td>
                    <td className='px-4 py-3'><div className='h-6 w-28 rounded-md bg-fun-blue-50' /></td>
                    <td className='px-4 py-3'><div className='h-6 w-20 rounded-full bg-fun-blue-50' /></td>
                    <td className='px-4 py-3'><div className='h-3 w-24 rounded bg-fun-blue-50' /></td>
                    <td className='px-4 py-3'><div className='h-3 w-24 rounded bg-fun-blue-50' /></td>
                </tr>
            ))}
        </>
    )
}

function SortIcon({ sorted }: { sorted: false | "asc" | "desc" }) {
    if (sorted === "asc")
        return <ChevronUp size={13} className="text-fun-blue-500" />;
    if (sorted === "desc")
        return <ChevronDown size={13} className="text-fun-blue-500" />;
    return <ChevronsUpDown size={13} className="text-zinc-300" />;
}

export default function MembersPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("All");
    const [sorting, setSorting] = useState<SortingState>([]);
    const debouncedSearch = useDebounceValue(search, 400);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, typeFilter]);

    const { data: res, isLoading, isFetching } = useQuery({
        queryKey: ["members_list", page, typeFilter, debouncedSearch],
        queryFn: () => authService.getMembersList({
            page,
            search: debouncedSearch
        }),
        placeholderData: (prev) => prev,
    });

    const members = res?.data ?? [];
    const pagination = res?.pagination;

    const filteredData = useMemo(() => {
        return members.filter((m) => {
            const matchType = typeFilter === "All" || m.membership_type?.title === typeFilter;
            const q = debouncedSearch.toLowerCase();
            const matchSearch =
                !q ||
                m.name.toLowerCase().includes(q) ||
                (m.membership_no?.toLowerCase().includes(q) ?? false) ||
                (m.city_name?.toLowerCase().includes(q) ?? false) ||
                m.email?.toLowerCase().includes(q);
            return matchType && matchSearch;
        });
    }, [members, typeFilter, debouncedSearch]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    });

    const totalMembers = pagination?.total ?? 0;
    const lastPage = pagination?.last_page ?? 1;
    const from = pagination?.from ?? 0;
    const to = pagination?.to ?? 0;

    const memberTypes = [
        "All",
        ...Array.from(
            new Set(
                members
                    .map((m) => m.membership_type?.title)
                    .filter((title): title is string => Boolean(title))
            )
        ),
    ];

    return (
        <main className="w-full min-h-screen bg-fun-blue-50">
            {/* ── HERO ─────────────────────────────────────────────── */}
            <Section className="bg-fun-blue-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-70 rounded-full bg-fun-blue-600/15 blur-[100px]" />
                    <div
                        className="absolute inset-0 opacity-[0.035]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, #c2dcf5 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-fun-blue-700/50 to-transparent" />
                </div>

                <Wrapper className="relative z-10 lg:pt-44 md:pt-40 pt-38">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5">
                                <Users size={11} className="text-fun-blue-300" />
                                <span className="text-fun-blue-200 text-[11px] font-semibold tracking-widest uppercase">
                                    Member Directory · NZUSI
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-4">
                                Our <em className="not-italic text-fun-blue-300">Members</em>
                            </h1>
                            <p className="text-fun-blue-300/80 text-sm leading-relaxed max-w-lg">
                                Urologists, trainees, and honorary members of the North Zone
                                Chapter of the Urological Society of India.
                            </p>
                        </div>

                        {/* Stat cards */}
                        <div className="flex gap-3 flex-wrap shrink-0">
                            {[
                                {
                                    val: totalMembers.toLocaleString(),
                                    label: "Total Members",
                                    icon: Users,
                                },
                                { val: "500+", label: "Full Life", icon: BadgeCheck },
                                { val: "6", label: "States", icon: Shield },
                            ].map(({ val, label, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                                >
                                    <Icon size={14} className="text-fun-blue-400" />
                                    <div>
                                        <p className="text-white font-bold text-lg tabular-nums leading-none">
                                            {val}
                                        </p>
                                        <p className="text-fun-blue-400 text-[11px] mt-0.5">
                                            {label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Wrapper>
            </Section>

            {/* ── TABLE SECTION ────────────────────────────────────── */}
            <Section className="bg-fun-blue-50">
                <Wrapper>
                    {/* Search + Filter bar */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
                        {/* Search */}
                        <div className="relative w-full sm:max-w-xs">
                            <Search
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fun-blue-300"
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search name, city, membership no…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-9 py-2.5 text-[13px] bg-white border border-fun-blue-100 rounded-xl outline-none focus:border-fun-blue-300 focus:ring-2 focus:ring-fun-blue-100 transition-all placeholder:text-zinc-400 text-fun-blue-900 shadow-sm"
                            />
                            <AnimatePresence>
                                {search && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.7 }}
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center transition-colors"
                                    >
                                        <X size={10} className="text-zinc-600" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Type filter */}
                            <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-fun-blue-100 shadow-sm">
                                {memberTypes.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTypeFilter(t ?? "")}
                                        className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${typeFilter === t
                                            ? "bg-fun-blue-950 text-white shadow-sm"
                                            : "text-fun-blue-600 hover:text-fun-blue-900"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            {/* Result count */}
                            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-fun-blue-100 rounded-xl text-[12px] text-fun-blue-500 shadow-sm">
                                <SlidersHorizontal size={11} />
                                {isFetching ? "Loading…" : `${from}–${to} of ${totalMembers}`}
                            </div>
                        </div>
                    </div>

                    {/* Table card */}
                    <div
                        className={`rounded-2xl border border-fun-blue-100 bg-white shadow-sm overflow-hidden transition-opacity duration-200 ${isFetching ? "opacity-70" : ""}`}
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-160">
                                <thead>
                                    {table.getHeaderGroups().map((hg) => (
                                        <tr key={hg.id} className="bg-fun-blue-950">
                                            {hg.headers.map((header) => (
                                                <th
                                                    key={header.id}
                                                    className="text-left px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-fun-blue-300 select-none first:pl-5 last:pr-5"
                                                >
                                                    {header.column.getCanSort() ? (
                                                        <button
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            className="flex items-center gap-1.5 hover:text-fun-blue-100 transition-colors cursor-pointer"
                                                        >
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext(),
                                                            )}
                                                            <SortIcon sorted={header.column.getIsSorted()} />
                                                        </button>
                                                    ) : (
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>

                                <tbody>
                                    {isLoading ? (
                                        <SkeletonRows />
                                    ) : table.getRowModel().rows.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={columns.length}
                                                className="px-4 py-16 text-center text-zinc-400 text-sm"
                                            >
                                                No members match your search.
                                            </td>
                                        </tr>
                                    ) : (
                                        table.getRowModel().rows.map((row, idx) => (
                                            <motion.tr
                                                key={row.id}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.25, delay: idx * 0.025 }}
                                                className="border-b border-zinc-100 last:border-b-0 hover:bg-fun-blue-50/60 transition-colors duration-150"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <td
                                                        key={cell.id}
                                                        className="px-4 py-3 first:pl-5 last:pr-5 align-middle"
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </td>
                                                ))}
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Pagination ──────────────────────────────── */}
                        {pagination && lastPage > 1 && (
                            <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-100 bg-zinc-50/50">
                                {/* Info */}
                                <p className="text-[12px] text-zinc-500 hidden sm:block">
                                    Showing{" "}
                                    <span className="font-semibold text-fun-blue-950">
                                        {from}
                                    </span>
                                    –<span className="font-semibold text-fun-blue-950">{to}</span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-fun-blue-950">
                                        {totalMembers}
                                    </span>{" "}
                                    members
                                </p>

                                {/* Controls */}
                                <div className="flex items-center gap-1.5">
                                    {/* Prev */}
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center hover:bg-fun-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={14} className="text-fun-blue-700" />
                                    </button>

                                    {/* Page numbers */}
                                    {(() => {
                                        const pages: (number | "…")[] = [];
                                        if (lastPage <= 7) {
                                            for (let i = 1; i <= lastPage; i++) pages.push(i);
                                        } else {
                                            pages.push(1);
                                            if (page > 3) pages.push("…");
                                            const start = Math.max(2, page - 1);
                                            const end = Math.min(lastPage - 1, page + 1);
                                            for (let i = start; i <= end; i++) pages.push(i);
                                            if (page < lastPage - 2) pages.push("…");
                                            pages.push(lastPage);
                                        }
                                        return pages.map((p, i) =>
                                            p === "…" ? (
                                                <span
                                                    key={`ellipsis-${i}`}
                                                    className="w-8 flex items-center justify-center text-zinc-400 text-sm"
                                                >
                                                    …
                                                </span>
                                            ) : (
                                                <button
                                                    key={p}
                                                    onClick={() => setPage(p as number)}
                                                    className={`w-8 h-8 rounded-lg text-[13px] font-semibold transition-all border ${page === p
                                                        ? "bg-fun-blue-950 text-white border-fun-blue-950 shadow-sm"
                                                        : "bg-white text-fun-blue-700 border-zinc-200 hover:bg-fun-blue-50"
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ),
                                        );
                                    })()}

                                    {/* Next */}
                                    <button
                                        onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                                        disabled={page === lastPage}
                                        className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center hover:bg-fun-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={14} className="text-fun-blue-700" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </Wrapper>
            </Section>
        </main>
    );
}
