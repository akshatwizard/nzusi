"use client";

import { Menu } from "@/constant/menu";
import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  openModal: () => void;
};

export default function MobileMenu({ isOpen, onClose, openModal }: Props) {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const toggleSubmenu = (idx: number) => {
    setOpenSubmenu((prev) => (prev === idx ? null : idx));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 bg-fun-blue-400/20 backdrop-blur-sm z-40"
          />

          {/* SIDEBAR */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
            className="md:hidden fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white p-5 shadow-xl rounded-r-3xl flex flex-col overflow-y-auto"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-fun-blue-950">Menu</h2>

              <button
                onClick={onClose}
                className="size-10 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* MENU */}
            <motion.div
              className="mt-8 flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {Menu.map((item, idx) => {
                const hasSubmenu = item.subMenu && item.subMenu.length > 0;

                return (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: -20,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                      },
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="rounded-2xl overflow-hidden border border-zinc-100"
                  >
                    {/* MAIN ITEM */}
                    {hasSubmenu ? (
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(idx)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white text-zinc-700 hover:bg-zinc-50 transition"
                      >
                        <span className="font-medium">{item.name}</span>

                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            openSubmenu === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={onClose}
                        className="flex items-center px-4 py-3 bg-white text-zinc-700 hover:bg-zinc-50 transition font-medium"
                      >
                        {item.name}
                      </Link>
                    )}

                    {/* SUBMENU */}
                    <AnimatePresence>
                      {hasSubmenu && openSubmenu === idx && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="overflow-hidden bg-zinc-50"
                        >
                          <div className="p-2 flex flex-col gap-1">
                            {item.subMenu?.map((subItem) => {
                              return subItem.path ? (
                                <Link
                                  key={subItem.name}
                                  href={subItem.path}
                                  target={subItem.open_in_new_tab && subItem.open_in_new_tab ? "_blank" : "_self"}
                                  onClick={onClose}
                                  className="px-4 py-2.5 rounded-xl text-sm text-zinc-600 hover:bg-white hover:text-fun-blue-500 transition"
                                >
                                  {subItem.name}
                                </Link>
                              ) : (
                                <button
                                  key={subItem.name}
                                  onClick={openModal}
                                  type="button"
                                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-zinc-600 hover:bg-white hover:text-fun-blue-500 transition"
                                >
                                  {subItem.name}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
