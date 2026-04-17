import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, BookOpen, Target, Trophy } from 'lucide-react';
import HolographicCard from './HolographicCard';
import { achievements } from '@/data/portfolio';

const ICONS = [Target, Award, Trophy, BookOpen, Target, Trophy];

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="relative px-4 py-16 sm:px-6 sm:py-24" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10 flex items-center gap-3 sm:mb-12 sm:gap-4">
            <span className="font-mono text-xs tracking-widest text-primary">005</span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-widest">ACHIEVEMENT_LOG</span>
          </div>

          <div className="mb-10 max-w-2xl">
              <h2 className="font-mono text-2xl font-bold text-foreground sm:text-4xl">
              Wins, <span className="text-primary glow-text">proof points</span>, and range
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              I care about outcomes, but I also care about the habits behind them: discipline, curiosity, and
              following through on hard work across academics, engineering, and competition.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {achievements.map((achievement, index) => {
              const Icon = ICONS[index];

              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <HolographicCard className="group rounded-2xl border border-border bg-card/30 p-3 transition-all duration-300 hover:border-primary/30 sm:rounded-[24px] sm:p-5" intensity={0.45}>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="rounded-xl bg-secondary p-2 transition-colors group-hover:bg-primary/10">
                        <Icon className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                      </div>
                      <div>
                        <span className="font-mono text-[7px] tracking-[0.08em] text-primary/70 sm:text-[9px] sm:tracking-[0.2em]">{achievement.tag}</span>
                        <h4 className="mt-1 font-mono text-[11px] font-semibold text-foreground sm:text-sm">{achievement.title}</h4>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{achievement.detail}</p>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
