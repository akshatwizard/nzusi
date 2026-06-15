"use client";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  Variant,
  Variants,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DesktopMenu from "./desktop.menu";
import MobileMenu from "./mobile.menu";
import Login from "../login";
import { ChevronRight, LogOut, Mail, User, UserRound } from "lucide-react";
import { useAuth } from "@/context/auth_context";
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/generate-initials";
import RegisterModal from "../abstracts_reg_modal";

export default function Header() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean | null>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const { isAuthenticated, user, logout, loading, isMounted } = useAuth();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 50) {
      setScrolled(true);
    } else {
      setScrolled(null);
    }
  });

  const containerVariants: Variants = {
    hide: {
      opacity: 0,
      y: 30,
      scale: 0.98,
      pointerEvents: "none",
      // transition: {
      //   when: "afterChildren",
      //   staggerChildren: 0.1,
      //   staggerDirection: -1,
      // },
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: "auto",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.8,
        bounce: 0.4,
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };
  const itemVariants: Variants = {
    hide: {
      opacity: 0,
      y: -10,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setShowOptions(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 z-40 w-full md:h-auto ${scrolled ? "h-16" : "h-20"}  lg:px-12 md:px-8 px-4 ${scrolled ? "bg-fun-blue-950/20 backdrop-blur border-b border-white/6" : "bg-transparent border-b border-white/0"} transition-colors duration-300 ease-in-out`}
      >
        <nav className="relative w-full max-w-7xl mx-auto flex items-center py-1 h-full gap-1.5">
          <Link href={"/"} className="relative shrink-0" aria-label="Logo">
            <Image
              src={"/images/logo/nzusi_logo.png"}
              alt="North Zone chapter of Urological Society of India"
              width={128}
              height={125}
              priority
              className={`${scrolled ? "lg:w-18 md:w-16 w-14" : "lg:w-30 md:w-24 w-19"} h-auto transition-all duration-300 ease-in-out'`}
            />
            <span className="sr-only">
              North Zone chapter of Urological Society of India Logo
            </span>
          </Link>

          <DesktopMenu openModal={() => setModalOpen(true)} />

          <div className="max-md:flex-1 relative flex items-center justify-end gap-2 h-full">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  isAuthenticated
                    ? setShowOptions((prev) => !prev)
                    : setIsLoginOpen(true)
                }
                disabled={!isMounted}
                className="flex items-center gap-1 bg-fun-blue-600 hover:bg-fun-blue-500 text-fun-blue-50 font-semibold text-sm px-3 h-10 leading-0 rounded-lg border border-fun-blue-400/40 transition-all duration-200 cursor-pointer"
              >
                <User size={14} />
                {!isMounted || loading ? (
                  <span className="w-14 h-3.5 bg-fun-blue-400/40 rounded-full animate-pulse" />
                ) : isAuthenticated ? (
                  (user?.name?.split(" ")[0] ?? "Account")
                ) : (
                  "Login"
                )}
              </button>
              <AnimatePresence>
                {showOptions && user && (
                  <motion.div
                    className="absolute z-20 mt-7 top-full right-0 p-4 min-w-60 max-w-64 bg-white backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 space-y-5"
                    variants={containerVariants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full shrink-0 bg-fun-blue-100 border border-fun-blue-200 flex items-center justify-center font-semibold text-fun-blue-600 text-sm select-none">
                        {getInitials(user?.name ?? "")}
                      </div>

                      <div className="flex-1 flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {user?.name}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail size={12} className="text-gray-400" />
                          {user?.email}
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Actions */}
                    <div className="flex flex-col gap-1">
                      <motion.button
                        variants={itemVariants}
                        onClick={() => (
                          router.push(
                            `/profile/${user?.name.toLocaleLowerCase().split(" ").join("-")}`,
                          ),
                          setShowOptions(false)
                        )}
                        className="cursor-pointer group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <span>Profile</span>
                        <ChevronRight
                          size={14}
                          className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                        />
                      </motion.button>

                      <motion.button
                        variants={itemVariants}
                        onClick={() => (
                          router.push("/members-list"),
                          setShowOptions(false)
                        )}
                        className="cursor-pointer group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <span>Others Members</span>
                        <ChevronRight
                          size={14}
                          className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                        />
                      </motion.button>

                      <motion.button
                        variants={itemVariants}
                        onClick={() => (logout(), setShowOptions(false))}
                        className="cursor-pointer group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        <span>Logout</span>
                        <LogOut
                          size={14}
                          className="text-red-500 group-hover:scale-110 transition-transform"
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              aria-label="Open menu"
              className="md:hidden relative h-full w-12 cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <motion.span
                className="w-full h-px absolute left-1/2 -translate-x-1/2 top-[43%] bg-white inline-block"
                animate={
                  openMenu
                    ? { top: "50%", rotate: 45 }
                    : { top: "43%", rotate: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                className="w-full h-px absolute left-1/2 -translate-x-1/2 top-[57%] bg-white inline-block"
                animate={
                  openMenu
                    ? { top: "50%", rotate: -45 }
                    : { top: "57%", rotate: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </button>
          </div>
        </nav>
      </motion.header>
      <MobileMenu
        isOpen={openMenu}
        onClose={() => setOpenMenu(false)}
        openModal={() => setModalOpen(true)}
      />
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <AnimatePresence>
        {modalOpen && <RegisterModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
