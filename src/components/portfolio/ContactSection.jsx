import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import HolographicCard from './HolographicCard';
import { contactFacts, contactLinks, profile } from '@/data/portfolio';

const TERMINAL_LINES = [
  { text: '$ current_status', type: 'command' },
  { text: 'open to serious full-stack, product, and AI engineering work', type: 'highlight' },
  { text: '$ preferred_energy', type: 'command' },
  { text: 'high ownership, fast iteration, strong engineering standards', type: 'output' },
  { text: '$ ping', type: 'command' },
  { text: "let's build something that actually matters.", type: 'highlight' },
];

const ICONS = {
  mail: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
};

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10 flex items-center gap-3 sm:mb-16 sm:gap-4">
            <span className="font-mono text-xs tracking-widest text-primary">006</span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-widest">COMM_PROTOCOL</span>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="font-mono text-2xl font-bold leading-tight text-foreground sm:text-4xl">
                Let&apos;s build the <span className="text-primary glow-text">next sharp thing</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                I&apos;m most interested in work that combines ambitious product thinking with solid engineering:
                AI systems, full-stack software, realtime collaboration, and tools developers actually enjoy using.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:block sm:space-y-3">
                {contactFacts.map((fact) => (
                  <HolographicCard
                    key={fact.label}
                    className="rounded-2xl border border-border bg-card/35 p-3 sm:p-4"
                    intensity={0.35}
                  >
                    <div className="font-mono text-[8px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.28em]">{fact.label}</div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{fact.value}</p>
                  </HolographicCard>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  data-magnetic
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-mono text-xs font-semibold tracking-[0.16em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 sm:tracking-[0.24em]"
                >
                  <Send className="h-4 w-4" />
                  EMAIL_ME
                </a>
                <a
                  data-magnetic
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-xs font-semibold tracking-[0.16em] text-primary transition-colors duration-300 hover:border-primary hover:bg-primary/20 sm:tracking-[0.24em]"
                >
                  LINKEDIN
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <HolographicCard className="overflow-hidden rounded-2xl border border-border bg-card/45 sm:rounded-[28px]" intensity={0.55}>
              <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-2 min-w-0 truncate font-mono text-[10px] tracking-[0.12em] text-muted-foreground sm:ml-3 sm:tracking-[0.22em]">
                  terminal — raiyaan@system
                </span>
              </div>

              <div className="p-4 sm:p-8">
                <TerminalAnimation />

                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2">
                  {contactLinks.map((item) => (
                    <ContactLink key={item.label} {...item} />
                  ))}
                </div>
              </div>
            </HolographicCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TerminalAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((current) => {
        if (current >= TERMINAL_LINES.length) {
          clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const lines = TERMINAL_LINES.slice(0, visibleCount).filter(Boolean);

  return (
    <div className="min-h-[150px] space-y-1 sm:min-h-[160px]">
      {lines.map((line, index) => {
        if (!line) {
          return null;
        }

        return (
          <motion.div
            key={`${line.text}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`break-words font-mono text-xs sm:text-sm ${
              line.type === 'command'
                ? 'text-primary'
                : line.type === 'highlight'
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {line.text}
          </motion.div>
        );
      })}
      <span className="inline-block h-4 w-2 bg-primary cursor-blink" />
    </div>
  );
}

function ContactLink({ icon, label, value, href }) {
  const Icon = ICONS[icon];
  const isExternal = href.startsWith('http');

  if (!Icon) {
    return null;
  }

  return (
    <a
      data-magnetic
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-2 rounded-2xl border border-border p-2.5 transition-all duration-300 hover:border-primary/30 sm:gap-3 sm:p-3"
    >
      <div className="rounded-xl bg-secondary p-2 transition-colors group-hover:bg-primary/10">
        <Icon className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
      </div>
      <div className="min-w-0">
        <span className="font-mono text-[7px] tracking-[0.08em] text-muted-foreground uppercase sm:text-[9px] sm:tracking-widest">{label}</span>
        <p className="break-words font-mono text-[9px] text-foreground sm:text-xs">{value}</p>
      </div>
      <ArrowUpRight className="ml-auto hidden h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary xs:block" />
    </a>
  );
}
