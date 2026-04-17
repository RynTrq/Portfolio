import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import HolographicCard from './HolographicCard';
import { skillCategories, tooling } from '@/data/portfolio';

function RadialSkillChart({ skills, color }) {
  const cx = 150;
  const cy = 150;
  const r = 100;
  const count = skills.length;
  const points = skills.map((skill, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    const len = (skill.level / 100) * r;
    return { x: cx + Math.cos(angle) * len, y: cy + Math.sin(angle) * len };
  });
  const gridPoints = (fraction) =>
    skills
      .map((_, index) => {
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
        return `${cx + Math.cos(angle) * r * fraction},${cy + Math.sin(angle) * r * fraction}`;
      })
      .join(' ');
  const polygonPoints = points.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-[220px] sm:max-w-[260px]">
      {[0.25, 0.5, 0.75, 1].map((fraction) => (
        <polygon
          key={fraction}
          points={gridPoints(fraction)}
          fill="none"
          stroke="rgba(216,255,68,0.08)"
          strokeWidth="1"
        />
      ))}

      {skills.map((_, index) => {
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2;

        return (
          <line
            key={index}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(angle) * r}
            y2={cy + Math.sin(angle) * r}
            stroke="rgba(216,255,68,0.1)"
            strokeWidth="1"
          />
        );
      })}

      <motion.polygon
        points={polygonPoints}
        fill={`${color}22`}
        stroke={color}
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {points.map((point, index) => (
        <motion.circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={3}
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.5 }}
        />
      ))}

      {skills.map((skill, index) => {
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
        const lx = cx + Math.cos(angle) * (r + 20);
        const ly = cy + Math.sin(angle) * (r + 20);

        return (
          <text
            key={skill.name}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(226,232,240,0.7)"
            fontSize="8"
            fontFamily="IBM Plex Mono, monospace"
          >
            {skill.name}
          </text>
        );
      })}
    </svg>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(0);
  const category = skillCategories[activeCategory];

  return (
    <section id="skills" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10 flex items-center gap-3 sm:mb-16 sm:gap-4">
            <span className="font-mono text-xs tracking-widest text-primary">004</span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-widest">COGNITIVE_STACK</span>
          </div>

          <h2 className="mb-4 font-mono text-2xl font-bold text-foreground sm:text-4xl">
            Technical <span className="text-primary glow-text">Architecture</span>
          </h2>
          <p className="mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground">
            My strongest edge is not one tool. It is the ability to move across product, full-stack, AI, and
            systems layers without losing clarity.
          </p>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="grid grid-cols-2 gap-2 pb-1 sm:gap-3 sm:pb-0 lg:col-span-2 lg:flex lg:flex-col">
              {skillCategories.map((item, index) => (
                <motion.button
                  key={item.id}
                  data-magnetic
                  onClick={() => setActiveCategory(index)}
                  whileHover={{ x: 4 }}
                  className={`rounded-2xl border px-3 py-3 text-left font-mono text-[10px] tracking-[0.04em] transition-all duration-300 sm:px-5 sm:py-4 sm:text-xs sm:tracking-wider ${
                    activeCategory === index
                      ? 'border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(216,255,68,0.08)]'
                      : 'border-border bg-card/20 text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{item.label}</span>
                    <span className="text-[8px] opacity-50 sm:text-[10px]">{item.skills.length} skills</span>
                  </div>
                  <p className="mt-2 max-h-[3.9rem] overflow-hidden text-[9px] leading-relaxed text-muted-foreground sm:max-h-none sm:text-[11px]">{item.signal}</p>
                </motion.button>
              ))}
            </div>

            <div className="lg:col-span-3">
              <HolographicCard className="rounded-2xl border border-border bg-card/30 p-4 sm:rounded-[28px] sm:p-6">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[10px] tracking-widest text-primary uppercase">{category.id}</span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{category.label}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{category.signal}</p>

                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <RadialSkillChart skills={category.skills} color={category.color} />

                    <div className="flex flex-col justify-center gap-3">
                      {category.skills.map((skill, index) => (
                        <div key={skill.name} className="group">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="font-mono text-xs text-foreground transition-colors group-hover:text-primary">
                              {skill.name}
                            </span>
                            <span className="font-mono text-[10px] text-primary">{skill.level}%</span>
                          </div>
                          <div className="h-0.5 overflow-hidden rounded-full bg-secondary">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                              className="h-full rounded-full"
                              style={{ background: `linear-gradient(90deg, ${category.color}99, ${category.color})` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </HolographicCard>
            </div>
          </div>

          <div className="mt-12">
            <p className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              TOOLING_ECOSYSTEM
            </p>
            <div className="flex flex-wrap gap-2">
              {tooling.map((tool) => (
                <motion.span
                  key={tool}
                  data-magnetic
                  whileHover={{ scale: 1.06, borderColor: 'hsl(74 100% 63%)', color: 'hsl(74 100% 63%)' }}
                  className="cursor-default rounded-lg border border-border bg-card/30 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
