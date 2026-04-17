import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BrainCircuit, Cpu, GraduationCap, Mail, MapPin, Phone, Workflow } from 'lucide-react';
import HolographicCard from './HolographicCard';
import GlitchText from './GlitchText';
import { aboutParagraphs, focusAreas, profile } from '@/data/portfolio';

const FOCUS_ICONS = [BrainCircuit, Workflow, Cpu];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32" ref={ref}>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent origin-top"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10 flex items-center gap-3 sm:mb-16 sm:gap-4">
            <span className="font-mono text-xs text-primary tracking-widest">001</span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-widest">ABOUT_SYSTEM</span>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-12">
            <div className="space-y-6">
              <h2 className="font-mono text-2xl font-bold leading-tight text-foreground sm:text-4xl">
                Engineering with{' '}
                <span className="text-primary glow-text">
                  <GlitchText text="taste" />
                </span>{' '}
                and systems depth
              </h2>

              {aboutParagraphs.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.7 }}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                data-magnetic
                className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card/40 p-4 font-mono text-xs sm:rounded-3xl sm:p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-1 text-[10px] text-muted-foreground/50">identity.rs</span>
                </div>
                <div className="min-w-max space-y-1 text-[11px]">
                  <div><span className="text-primary">struct</span> <span className="text-foreground">Engineer</span> {'{'}</div>
                  <div className="ml-4"><span className="text-muted-foreground">name:</span> <span className="text-yellow-300/80">"{profile.fullName}"</span>,</div>
                  <div className="ml-4"><span className="text-muted-foreground">focus:</span> <span className="text-yellow-300/80">"Full-stack + AI/Data + Systems"</span>,</div>
                  <div className="ml-4"><span className="text-muted-foreground">university:</span> <span className="text-yellow-300/80">"IIIT Delhi"</span>,</div>
                  <div className="ml-4"><span className="text-muted-foreground">status:</span> <span className="text-primary">Status::OpenToWork</span>,</div>
                  <div>{'}'}</div>
                </div>
              </motion.div>

              <div className="grid gap-3 xs:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {focusAreas.map((area, index) => {
                  const Icon = FOCUS_ICONS[index];

                  return (
                    <motion.div
                      key={area.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.85 + index * 0.1, duration: 0.6 }}
                    >
                      <HolographicCard className="h-full rounded-2xl border border-border bg-card/35 p-3 sm:rounded-3xl sm:p-5">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="mt-3 font-mono text-[11px] tracking-[0.08em] text-foreground uppercase sm:mt-4 sm:text-sm sm:tracking-[0.18em]">
                          {area.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">{area.detail}</p>
                      </HolographicCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>

              <div className="grid gap-3 xs:grid-cols-2 lg:block lg:space-y-3">
              {[
                { icon: GraduationCap, label: 'EDUCATION', value: 'B.Tech Computer Science', detail: 'IIIT Delhi • 2022–2026' },
                { icon: MapPin, label: 'LOCATION', value: profile.location, detail: 'Remote, hybrid, or on-site' },
                { icon: Mail, label: 'PRIMARY', value: profile.email, detail: profile.altEmail },
                { icon: Phone, label: 'PHONE', value: profile.phone, detail: 'WhatsApp Available' },
              ].map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.12, duration: 0.6 }}
                >
                  <HolographicCard className="group rounded-xl border border-border bg-card/40 p-4" intensity={0.8}>
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-secondary p-2 transition-colors group-hover:bg-primary/10">
                        <card.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
                          {card.label}
                        </span>
                        <p className="mt-0.5 break-words font-mono text-sm text-foreground">{card.value}</p>
                        <p className="break-words font-mono text-xs text-muted-foreground">{card.detail}</p>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <HolographicCard className="rounded-xl border border-border bg-card/40 p-4" intensity={0.8}>
                  <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
                    WORKING_LANGUAGES
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['English (Fluent)', 'Hindi (Native)', 'Urdu (Conversational)'].map((language) => (
                      <span
                        key={language}
                        className="rounded-lg border border-border bg-secondary px-2 py-1 font-mono text-xs text-foreground"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </HolographicCard>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
