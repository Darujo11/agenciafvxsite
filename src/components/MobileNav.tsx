import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

interface Ancora {
  href: string;
  label: string;
}

interface Props {
  ancoras: readonly Ancora[];
  whatsappUrl: string;
  whatsappLabel: string;
}

export default function MobileNav({ ancoras, whatsappUrl, whatsappLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="text-text relative z-10 flex h-10 w-10 items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-bg fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
              >
                <button
                  type="button"
                  aria-label="Fechar menu"
                  onClick={() => setOpen(false)}
                  className="text-text absolute top-5 right-6 flex h-10 w-10 items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <nav className="flex flex-col items-center gap-6">
                  {ancoras.map((ancora, i) => (
                    <motion.a
                      key={ancora.href}
                      href={ancora.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display text-text hover:text-accent text-3xl transition-colors"
                    >
                      {ancora.label}
                    </motion.a>
                  ))}
                </nav>
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 * ancoras.length,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-accent text-bg rounded-full px-8 py-3 text-sm font-medium"
                >
                  {whatsappLabel}
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
