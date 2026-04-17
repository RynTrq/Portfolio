import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import AdvancedHeroOverlay from './AdvancedHeroOverlay';
import GlitchText from './GlitchText';
import HolographicCard from './HolographicCard';
import ParticleField from './ParticleField';
import { heroRoles, heroSignals, heroStats, heroTerminalLines, profile } from '@/data/portfolio';

export default function HeroSection() {
  const [roleText, setRoleText] = useState(heroRoles[0]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18, mass: 0.7 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18, mass: 0.7 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const panelOffsetX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const panelOffsetY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const onMove = (event) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let current = 0;
    const id = setInterval(() => {
      current = (current + 1) % heroRoles.length;
      setRoleText(heroRoles[current]);
    }, 2800);

    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-36">
      <AdvancedHeroOverlay />
      <div className="absolute inset-0 z-[1] hidden md:block">
        <ParticleField />
      </div>

      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute left-[10%] top-[16%] h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />
        <div className="absolute right-[8%] top-[12%] h-56 w-56 rounded-full bg-cyan-300/10 blur-[90px]" />
        <div className="absolute bottom-[14%] left-[35%] h-48 w-48 rounded-full bg-emerald-300/10 blur-[90px]" />
        <div
          className="absolute left-[6%] top-[10%] h-[32rem] w-[32rem] rounded-full border border-primary/10"
          style={{ background: 'radial-gradient(circle at center, rgba(216,255,68,0.05), transparent 68%)' }}
        />
        <div className="absolute right-[10%] top-[22%] h-64 w-64 rounded-full border border-cyan-300/10" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 75% 75% at 50% 45%, transparent 22%, rgba(5, 12, 20, 0.92) 100%)' }}
        />
      </div>

      <motion.div
        className="absolute left-0 right-0 z-[3] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(216,255,68,0.35), rgba(116,230,255,0.18), transparent)' }}
        animate={{ top: ['8%', '88%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformPerspective: 1600 }}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(135px,0.72fr)] items-start gap-3 sm:grid-cols-1 sm:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <div
              data-magnetic
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 font-mono text-[8px] tracking-[0.1em] text-primary uppercase sm:gap-3 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.35em]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              SYSTEM_ONLINE
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            </div>

            <p
              data-magnetic
              className="mt-4 max-w-2xl font-mono text-[8px] leading-relaxed tracking-[0.08em] text-primary/80 uppercase sm:mt-8 sm:text-[11px] sm:tracking-[0.35em]"
            >
              AI-native software, realtime systems, and products built with discipline
            </p>

            <h1 className="mt-2 text-[clamp(1.9rem,8.8vw,2.45rem)] font-semibold leading-[0.88] tracking-[-0.035em] sm:mt-4 sm:text-[clamp(4.5rem,11vw,7rem)] sm:tracking-[-0.04em] lg:text-[clamp(3.5rem,8vw,7rem)] lg:tracking-[-0.08em]">
              <span className="block text-foreground/95">
                <GlitchText text={profile.firstName.toUpperCase()} scrambleDuration={1350} />
              </span>
              <span className="block text-primary glow-text">
                <GlitchText text={profile.lastName.toUpperCase()} delay={160} scrambleDuration={1450} />
              </span>
            </h1>

            <div className="mt-4 flex flex-col items-stretch gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
              <span
                data-magnetic
                className="rounded-full border border-border bg-card/50 px-2 py-1.5 text-center font-mono text-[8px] leading-relaxed tracking-[0.04em] text-foreground sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]"
              >
                {profile.role}
              </span>
              <span
                data-magnetic
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card/50 px-2 py-1.5 text-center font-mono text-[8px] tracking-[0.04em] text-muted-foreground sm:gap-2 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]"
              >
                <MapPin className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
                {profile.location}
              </span>
            </div>

            <div className="mt-3 flex min-h-6 items-center gap-1.5 sm:mt-5 sm:min-h-8 sm:gap-3">
              <span className="font-mono text-[10px] tracking-widest text-primary/60 sm:text-xs">//</span>
              <motion.span
                key={roleText}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45 }}
                className="font-mono text-[9px] leading-relaxed tracking-[0.06em] text-primary glow-text sm:text-base sm:tracking-[0.22em]"
              >
                {roleText}
              </motion.span>
              <span className="font-mono text-[10px] tracking-widest text-primary/60 cursor-blink sm:text-xs">_</span>
            </div>

            <p className="mt-4 max-h-[5.9rem] max-w-2xl overflow-hidden text-[11px] leading-relaxed text-muted-foreground sm:mt-6 sm:max-h-none sm:text-lg">
              <span className="sm:hidden">
                IIIT Delhi CS student building deployed full-stack products, AI/data workflows, backend services, and systems projects.
              </span>
              <span className="hidden sm:inline">{profile.summary}</span>
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
              <motion.button
                data-magnetic
                onClick={() => scrollTo('projects')}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-1 rounded-xl bg-primary px-2 py-2.5 font-mono text-[8px] font-semibold tracking-[0.06em] text-primary-foreground shadow-[0_18px_40px_rgba(216,255,68,0.18)] sm:gap-2 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.24em]"
              >
                <span className="sm:hidden">PROJECTS</span>
                <span className="hidden sm:inline">VIEW_PROJECTS</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </motion.button>
              <motion.button
                data-magnetic
                onClick={() => scrollTo('contact')}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-primary/30 bg-primary/10 px-2 py-2.5 font-mono text-[8px] font-semibold tracking-[0.06em] text-primary transition-colors duration-300 hover:border-primary hover:bg-primary/20 sm:gap-2 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.24em]"
              >
                <span className="sm:hidden">CONTACT</span>
                <span className="hidden sm:inline">START_A_CONVERSATION</span>
              </motion.button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3">
              <HeroLink href={profile.github} icon={Github} label="GITHUB" />
              <HeroLink href={profile.linkedin} icon={Linkedin} label="LINKEDIN" />
              <HeroLink href={`mailto:${profile.email}`} icon={Mail} label="EMAIL" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-12 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.08, duration: 0.55 }}
                >
                  <HolographicCard
                    className="rounded-xl border border-border bg-card/45 p-2.5 backdrop-blur-xl sm:rounded-3xl sm:p-5"
                    intensity={0.5}
                  >
                    <div className="font-mono text-lg font-semibold text-primary glow-text sm:text-3xl">{stat.value}</div>
                    <div className="mt-0.5 font-mono text-[7px] tracking-[0.04em] text-foreground uppercase sm:mt-1 sm:text-[11px] sm:tracking-[0.22em]">
                      {stat.label}
                    </div>
                    <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">{stat.detail}</p>
                  </HolographicCard>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="min-w-0 lg:block" style={{ x: panelOffsetX, y: panelOffsetY }}>
            <HolographicCard
              className="rounded-xl border border-border bg-card/55 p-2.5 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:rounded-[32px] sm:p-6"
              intensity={0.75}
            >
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div>
                  <p className="font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.35em]">MISSION_CONTROL</p>
                  <h2 className="mt-1 text-xs font-semibold tracking-tight sm:mt-2 sm:text-2xl">
                    <span className="sm:hidden">Mission stack</span>
                    <span className="hidden sm:inline">What I bring to the table</span>
                  </h2>
                </div>
                <span
                  data-magnetic
                  className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-[7px] tracking-[0.12em] text-primary uppercase sm:px-3 sm:text-[10px] sm:tracking-[0.28em]"
                >
                  LIVE
                </span>
              </div>

              <div className="mt-3 rounded-xl border border-border bg-background/70 p-2.5 sm:mt-6 sm:rounded-3xl sm:p-5">
                <div className="mb-2 flex items-center gap-1.5 sm:mb-4 sm:gap-2">
                  <div className="h-2 w-2 rounded-full bg-rose-400/70 sm:h-2.5 sm:w-2.5" />
                  <div className="h-2 w-2 rounded-full bg-amber-300/70 sm:h-2.5 sm:w-2.5" />
                  <div className="h-2 w-2 rounded-full bg-emerald-400/70 sm:h-2.5 sm:w-2.5" />
                  <span className="ml-1 truncate font-mono text-[7px] tracking-[0.06em] text-muted-foreground uppercase sm:ml-2 sm:text-[10px] sm:tracking-[0.25em]">
                    portfolio.session
                  </span>
                </div>
                <div className="hidden min-h-[170px] space-y-2 sm:block">
                  {heroTerminalLines.map((line, index) => (
                    <motion.div
                      key={`${line.text}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                      className={`break-words font-mono text-[11px] sm:text-sm ${
                        line.type === 'command'
                          ? 'text-primary'
                          : line.type === 'highlight'
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  <span className="inline-block h-4 w-2 bg-primary cursor-blink" />
                </div>
                <div className="min-h-[86px] space-y-1 sm:hidden">
                  {[
                    { text: '$ whoami', type: 'command' },
                    { text: 'full-stack + ai/data', type: 'output' },
                    { text: '$ mode', type: 'command' },
                    { text: 'deployable systems', type: 'highlight' },
                  ].map((line, index) => (
                    <motion.div
                      key={`${line.text}-${index}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                      className={`break-words font-mono text-[8px] leading-relaxed ${
                        line.type === 'command'
                          ? 'text-primary'
                          : line.type === 'highlight'
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  <span className="inline-block h-3 w-1.5 bg-primary cursor-blink" />
                </div>
              </div>

              <div className="mt-2 grid gap-1.5 sm:mt-6 sm:gap-3">
                {heroSignals.map((signal, index) => (
                  <motion.div
                    key={signal.label}
                    data-magnetic
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.08 }}
                    className="rounded-xl border border-border bg-background/35 p-2 transition-colors duration-300 hover:border-primary/25 sm:rounded-2xl sm:p-4"
                  >
                    <div className="font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.28em]">
                      {signal.label}
                    </div>
                    <h3 className="mt-1 text-[10px] font-semibold leading-snug tracking-tight sm:mt-2 sm:text-lg">{signal.title}</h3>
                    <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">{signal.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-6 sm:gap-3">
                <div
                  data-magnetic
                  className="rounded-xl border border-border bg-background/35 p-2 transition-colors duration-300 hover:border-primary/25 sm:rounded-2xl sm:p-4"
                >
                  <div className="font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.28em]">EDU</div>
                  <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                    <span className="sm:hidden">IIIT Delhi<br />2022-2026</span>
                    <span className="hidden sm:inline">{profile.education}</span>
                  </p>
                </div>
                <div
                  data-magnetic
                  className="rounded-xl border border-border bg-background/35 p-2 transition-colors duration-300 hover:border-primary/25 sm:rounded-2xl sm:p-4"
                >
                  <div className="font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.28em]">STATUS</div>
                  <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                    <span className="sm:hidden">Open roles<br />June 2026</span>
                    <span className="hidden sm:inline">{profile.availability}</span>
                  </p>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        data-magnetic
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ delay: 2.5, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary sm:flex"
      >
        <span className="font-mono text-[9px] tracking-[0.3em]">SCROLL</span>
        <ChevronDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}

function HeroLink({ href, icon: Icon, label }) {
  const isExternal = href.startsWith('http');

  return (
    <motion.a
      data-magnetic
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -3 }}
      className="inline-flex items-center justify-center gap-1 rounded-full border border-border bg-card/40 px-2 py-2 font-mono text-[8px] tracking-[0.04em] text-muted-foreground transition-colors duration-300 hover:border-primary/30 hover:text-primary sm:gap-2 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]"
    >
      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span className="hidden sm:inline">{label}</span>
    </motion.a>
  );
}
