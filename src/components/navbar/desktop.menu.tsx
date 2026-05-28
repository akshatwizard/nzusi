"use client";

import { Menu } from "@/constant/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function DesktopMenu({ openModal }: { openModal: () => void }) {
  const currentPath = usePathname();

  const [hovered, setHovered] = useState<number | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const activePath = (pathname: string) => {
    if (pathname === "#") return false;

    return currentPath === pathname || currentPath.startsWith(`${pathname}/`);
  };

  return (
    <div className="flex-1 hidden md:flex items-center gap-1 h-10 justify-end">
      {Menu.map((item, idx) => {
        const hasSubmenu = item.subMenu && item.subMenu.length > 0;

        const isActive = activePath(item.path);

        const isHovered = hovered === idx;

        return (
          <div
            key={item.name}
            className="relative h-full"
            onMouseEnter={() => {
              setHovered(idx);

              if (hasSubmenu) {
                setOpenSubmenu(idx);
              }
            }}
            onMouseLeave={() => {
              setHovered(null);
              setOpenSubmenu(null);
            }}
          >
            {/* MAIN NAV ITEM */}
            {hasSubmenu ? (
              <button
                type="button"
                className={`relative px-1.5 h-full w-max font-medium text-sm flex items-center gap-1 transition-colors cursor-pointer ${isActive ? "text-fun-blue-400" : "text-white"
                  }`}
              >
                <span>{item.name}</span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${openSubmenu === idx ? "rotate-180" : ""
                    }`}
                />
              </button>
            ) : (
              <Link
                href={item.path}
                target={item.path.startsWith("https") ? "_blank" : "_self"}
                className={`relative px-1.5 h-full w-max font-medium text-sm flex items-center transition-colors ${isActive ? "text-fun-blue-400" : "text-white"
                  }`}
              >
                <span>{item.name}</span>
              </Link>
            )}

            {/* ACTIVE LINE */}
            <AnimatePresence mode="popLayout">
              {(isActive || isHovered) && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-x-0 rounded-full h-0.5 bottom-0 bg-linear-to-r from-transparent via-fun-blue-500 to-transparent"
                  transition={{
                    type: "tween",
                    ease: [0.22, 1, 0.36, 1],
                    duration: 0.5,
                  }}
                />
              )}
            </AnimatePresence>

            {/* SUBMENU */}
            <AnimatePresence>
              {hasSubmenu && openSubmenu === idx && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute top-full left-0 mt-3 min-w-55 rounded-xl border border-white/20 bg-fun-blue-900/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-2">
                    {item.subMenu?.map((subItem) => {
                      const subActive =
                        subItem.path && activePath(subItem.path);

                      return subItem.path ? (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className={`flex items-center px-4 py-3 rounded-xl text-sm transition-all ${subActive
                              ? "bg-fun-blue-500/15 text-fun-blue-400"
                              : "text-white hover:bg-white/5"
                            }`}
                        >
                          {subItem.name}
                        </Link>
                      ) : (
                        <button
                          key={subItem.name}
                          type="button"
                          onClick={openModal}
                          className="w-full text-left flex items-center px-4 py-3 rounded-xl text-sm text-white hover:bg-white/5 transition-all"
                        >
                          {subItem.name}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
