import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigationItems, profile } from '@/data/portfolio';

const SECTION_IDS = navigationItems.map((item) => item.id);

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const id of [...SECTION_IDS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 300) {
          setActiveSection(id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled
              ? 'border-b border-border bg-background/75 backdrop-blur-2xl'
              : 'bg-transparent'
          }`}
        />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <button
            data-magnetic
            onClick={() => scrollTo('#hero')}
            className="font-mono text-xs font-bold tracking-[0.22em] text-primary glow-text sm:text-sm sm:tracking-[0.35em]"
          >
            {profile.brand}//
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                data-magnetic
                onClick={() => scrollTo(item.href)}
                className={`font-mono text-[11px] tracking-[0.2em] transition-all duration-300 hover:text-primary ${
                  activeSection === item.id ? 'text-primary glow-text' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              data-magnetic
              onClick={() => scrollTo('#contact')}
              className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.2em] text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              LET&apos;S_TALK
            </button>
          </div>

          <button
            data-magnetic
            className="rounded-full border border-border bg-card/40 p-2 text-foreground lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-stretch justify-center gap-3 bg-background/95 px-5 pt-20 backdrop-blur-2xl sm:items-center sm:gap-8"
          >
            {navigationItems.map((item, i) => (
              <motion.button
                key={item.href}
                data-magnetic
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(item.href)}
                className="rounded-2xl border border-border bg-card/25 px-5 py-4 text-center font-mono text-sm tracking-[0.18em] text-foreground transition-colors hover:text-primary sm:border-0 sm:bg-transparent sm:text-lg sm:tracking-[0.25em]"
              >
                {item.label}
              </motion.button>
            ))}
            <button
              data-magnetic
              onClick={() => scrollTo('#contact')}
              className="rounded-2xl border border-primary/30 bg-primary px-5 py-4 font-mono text-xs font-semibold tracking-[0.2em] text-primary-foreground sm:rounded-full sm:py-3 sm:tracking-[0.25em]"
            >
              CONTACT_NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
