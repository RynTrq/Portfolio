import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, ChevronRight, Code, Cpu } from 'lucide-react';
import HolographicCard from './HolographicCard';
import { experienceEntries } from '@/data/portfolio';

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="experience" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(216,255,68,0.03), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10 flex items-center gap-3 sm:mb-16 sm:gap-4">
            <span className="font-mono text-xs tracking-widest text-primary">002</span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-widest">OPERATIONAL_VELOCITY</span>
          </div>

          <h2 className="mb-8 font-mono text-2xl font-bold text-foreground sm:mb-12 sm:text-4xl">
            Experience <span className="text-primary glow-text">Archive</span>
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="grid grid-cols-2 gap-2 pb-1 sm:gap-3 sm:pb-0 lg:flex lg:flex-col">
              {experienceEntries.map((entry, index) => (
                <motion.button
                  key={entry.company}
                  data-magnetic
                  onClick={() => setActiveIdx(index)}
                  whileHover={{ x: 3 }}
                  className={`rounded-2xl border p-3 text-left font-mono text-[10px] transition-all duration-300 sm:p-4 sm:text-xs ${
                    activeIdx === index
                      ? 'border-primary bg-primary/5 text-primary shadow-[0_0_24px_rgba(216,255,68,0.06)]'
                      : 'border-border bg-card/20 text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Cpu className="h-3 w-3" />
                    <span className="text-[9px] uppercase tracking-widest">{entry.type}</span>
                  </div>
                  <p className="mt-1 text-xs text-foreground sm:text-sm">{entry.company}</p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground sm:text-[10px]">{entry.period}</p>
                  {activeIdx === index ? (
                    <motion.div layoutId="tab-indicator" className="mt-2 h-0.5 w-full rounded-full bg-primary" />
                  ) : null}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <HolographicCard className="overflow-hidden rounded-2xl border border-border bg-card/30" intensity={0.5}>
                <div className="relative border-b border-border p-4 sm:p-6">
                  <div
                    className="absolute left-0 right-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(216,255,68,0.3), transparent)' }}
                  />
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-mono text-xl font-bold text-foreground">
                        {experienceEntries[activeIdx].title}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-primary">{experienceEntries[activeIdx].company}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                        {experienceEntries[activeIdx].project}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {experienceEntries[activeIdx].period}
                    </div>
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {experienceEntries[activeIdx].summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experienceEntries[activeIdx].impact.map((metric) => (
                      <span
                        key={metric}
                        data-magnetic
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] tracking-wider text-primary"
                      >
                        ◆ {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 p-4 sm:p-6">
                  {experienceEntries[activeIdx].bullets.map((bullet, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="group flex items-start gap-3"
                    >
                      <ChevronRight className="mt-1.5 h-3 w-3 flex-shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                      <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
                        {bullet}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid gap-6 px-4 pb-4 sm:grid-cols-2 sm:px-6 sm:pb-6">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Code className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                        TECH_STACK
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experienceEntries[activeIdx].tools.map((tool) => (
                        <span
                          key={tool}
                          data-magnetic
                          className="rounded-lg border border-border bg-secondary px-2.5 py-1 font-mono text-[10px] text-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Cpu className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                        WORK_STYLE
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Strong fit for work that needs clear reasoning, fast execution, and careful engineering around
                      data-heavy or AI-assisted systems.
                    </p>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
