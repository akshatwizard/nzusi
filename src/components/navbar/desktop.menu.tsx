"use client";

import { Menu, MenuType } from "@/constant/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";

type SubMenuItemType = NonNullable<
  NonNullable<(typeof Menu)[number]["subMenu"]>[number]["subMenu"]
>[number];

type SubMenuWithNested = NonNullable<(typeof Menu)[number]["subMenu"]>[number];

function NestedSubmenu({ items, openModal }: {
  items: SubMenuItemType[];
  openModal: () => void;
}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [flyDirection, setFlyDirection] = useState<"right" | "left">("right");

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;
      setFlyDirection(spaceRight >= 220 ? "right" : "left");
    }
  };

  return (
    <div
      ref={triggerRef}
      className="relative group/nested"
      onMouseEnter={handleMouseEnter}
    >
      <button
        type="button"
        className="w-full text-left flex items-center justify-between cursor-pointer px-4 py-3 rounded-xl text-sm text-white hover:bg-white/5 transition-all"
      >
        <span>Bidding</span>
        <ChevronRight size={12} className="opacity-60" />
      </button>

      {/* NESTED FLYOUT */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: flyDirection === "right" ? 8 : -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: flyDirection === "right" ? 8 : -8 }}
          transition={{ duration: 0.18 }}
          className={`absolute top-0 ${flyDirection === "right" ? "left-full ml-1" : "right-full mr-1"
            } min-w-52 rounded-xl border border-white/20 bg-fun-blue-900/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50 hidden group-hover/nested:block`}
        >
          <div className="p-2">
            {items.map((subItem) =>
              subItem.path && subItem.path !== "#" ? (
                <Link
                  key={subItem.name}
                  href={subItem.path}
                  target={subItem.open_in_new_tab ? "_blank" : "_self"}
                  className="flex items-center px-4 py-3 rounded-xl text-sm text-white hover:bg-white/5 transition-all"
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
              )
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type Props = {
  menu: MenuType[];
  openModal: () => void;
};

export default function DesktopMenu({ openModal, menu }: Props) {
  const currentPath = usePathname();

  const [hovered, setHovered] = useState<number | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const activePath = (pathname: string) => {
    if (pathname === "#") return false;
    return currentPath === pathname || currentPath.startsWith(`${pathname}/`);
  };

  return (
    <div className="flex-1 hidden lg:flex items-center gap-1 h-10 justify-end">
      {menu.map((item, idx) => {
        const hasSubmenu = item.name !== "Blogs & News" && item.subMenu && item.subMenu.length > 0;
        const isActive = activePath(item.path);
        const isHovered = hovered === idx;

        return (
          <div
            key={item.name}
            className="relative h-full"
            onMouseEnter={() => {
              setHovered(idx);
              if (hasSubmenu || item.name === "Blogs & News") setOpenSubmenu(idx);
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
                {
                  item.name === "Blogs & News" && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${openSubmenu === idx ? "rotate-180" : ""
                        }`}
                    />
                  )
                }
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
              {((item.name === "Blogs & News" && openSubmenu === idx) || hasSubmenu && openSubmenu === idx) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-0.5 min-w-60 rounded-xl border border-white/20 bg-fun-blue-900/95 backdrop-blur-xl shadow-2xl z-50"
                >
                  <div className="p-2">
                    {item.subMenu?.map((subItem: SubMenuWithNested) => {
                      const subActive = subItem.path && activePath(subItem.path);
                      const hasNestedSubmenu =
                        subItem.subMenu && subItem.subMenu.length > 0;

                      // Item with a nested submenu — render flyout trigger
                      if (hasNestedSubmenu) {
                        return (
                          <NestedSubmenu
                            key={subItem.name}
                            items={subItem.subMenu!}
                            openModal={openModal}
                          />
                        );
                      }

                      // Item with a path — render as link
                      if (subItem.path) {
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.path}
                            target={
                              subItem.open_in_new_tab ? "_blank" : "_self"
                            }
                            className={`flex items-center px-4 py-3 rounded-xl text-sm transition-all ${subActive
                              ? "bg-fun-blue-500/15 text-fun-blue-400"
                              : "text-white hover:bg-white/5"
                              }`}
                          >
                            {subItem.name}
                          </Link>
                        );
                      }

                      // Item with no path and no nested submenu — modal trigger
                      return (
                        <button
                          key={subItem.name}
                          type="button"
                          onClick={openModal}
                          className="w-full text-left flex items-center justify-between cursor-pointer px-4 py-3 rounded-xl text-sm text-white hover:bg-white/5 transition-all"
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