import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers3,
  Orbit,
  Sparkles,
} from 'lucide-react';
import FooterSection from '@/components/portfolio/FooterSection';
import GridOverlay from '@/components/portfolio/GridOverlay';
import HolographicCard from '@/components/portfolio/HolographicCard';
import MagneticCursor from '@/components/portfolio/MagneticCursor';
import ParticleField from '@/components/portfolio/ParticleField';
import ScrollDepthScene from '@/components/portfolio/ScrollDepthScene';
import PageNotFound from '@/lib/PageNotFound';
import { profile } from '@/data/portfolio';
import { getProjectCaseStudy } from '@/data/projectLibrary';

const ENTRY_ANIMATION = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const project = getProjectCaseStudy(slug);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!project) {
      return;
    }

    document.title = `${project.title} | ${profile.fullName}`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', project.deck);
    }
  }, [project]);

  if (!project) {
    return <PageNotFound />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <GridOverlay />
      <ScrollDepthScene />
      <MagneticCursor />
      <CaseStudyNav project={project} />

      <main className="relative z-10">
        <CaseStudyHero project={project} />
        <OverviewSection project={project} />
        <GallerySection project={project} />
        <CallToActionSection project={project} />
      </main>

      <FooterSection />
    </div>
  );
}

function CaseStudyNav({ project }) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex items-center gap-4">
          <Link
            data-magnetic
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground transition-colors duration-300 hover:border-primary/30 hover:text-primary sm:px-4 sm:text-[11px] sm:tracking-[0.2em]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">BACK_TO_PORTFOLIO</span>
            <span className="xs:hidden">BACK</span>
          </Link>
          <div className="hidden md:block">
            <div className="font-mono text-[10px] tracking-[0.35em] text-primary uppercase">{project.eyebrow}</div>
            <div className="mt-1 text-sm text-muted-foreground">{project.title}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CaseStudyButton
            href={project.repoUrl}
            icon={Github}
            label="REPOSITORY"
          />
          {project.liveUrl ? (
            <CaseStudyButton href={project.liveUrl} icon={ExternalLink} label="LIVE_SITE" />
          ) : (
            <span className="hidden rounded-full border border-border bg-card/35 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground sm:inline-flex">
              LIVE_URL_PENDING
            </span>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

function CaseStudyHero({ project }) {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-40">
      <div className="absolute inset-0 z-[1] hidden md:block opacity-70">
        <ParticleField />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute left-[8%] top-[16%] h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-[10%] top-[12%] h-56 w-56 rounded-full bg-cyan-300/10 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[34%] h-52 w-52 rounded-full bg-emerald-300/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-[minmax(0,0.92fr)_minmax(132px,0.8fr)] items-start gap-3 sm:grid-cols-1 sm:gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)] lg:items-center lg:gap-10">
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 font-mono text-[8px] tracking-[0.1em] text-primary uppercase sm:gap-3 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.34em]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {project.status}
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          <div className="mt-4 font-mono text-[8px] leading-relaxed tracking-[0.08em] text-primary/75 uppercase sm:mt-8 sm:text-[11px] sm:tracking-[0.34em]">
            {project.domain}
          </div>

          <h1 className="mt-2 max-w-4xl text-[clamp(1.85rem,8.4vw,2.45rem)] font-semibold leading-[0.94] tracking-[-0.035em] sm:mt-4 sm:text-[clamp(4rem,10vw,6rem)] sm:tracking-[-0.045em] lg:text-[clamp(3.15rem,7vw,6rem)] lg:tracking-[-0.07em]">
            {project.title}
          </h1>

          <p className="mt-2 font-mono text-[8px] leading-relaxed tracking-[0.06em] text-muted-foreground uppercase sm:mt-3 sm:text-[12px] sm:tracking-[0.22em]">
            {project.subtitle}
          </p>

          <p className="mt-4 max-h-[4.6rem] max-w-2xl overflow-hidden text-[11px] leading-relaxed text-foreground/90 sm:mt-8 sm:max-h-none sm:text-xl">
            {project.headline}
          </p>

          <p className="mt-3 max-h-[5.4rem] max-w-2xl overflow-hidden text-[10px] leading-relaxed text-muted-foreground sm:mt-5 sm:max-h-none sm:text-base">
            {project.deck}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-7 sm:gap-2">
            {project.ribbons.map((item) => (
              <span
                key={item}
                data-magnetic
                className="rounded-full border border-border bg-card/40 px-2 py-1 font-mono text-[8px] tracking-[0.06em] text-foreground sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.18em]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {project.heroStats.map((stat) => (
              <HolographicCard
                key={stat.label}
                className="rounded-xl border border-border bg-card/45 p-2.5 sm:rounded-[24px] sm:p-5"
                intensity={0.5}
              >
                <div className="font-mono text-lg font-semibold text-primary glow-text sm:text-2xl">{stat.value}</div>
                <div className="mt-1 font-mono text-[7px] tracking-[0.04em] text-foreground uppercase sm:mt-2 sm:text-[10px] sm:tracking-[0.22em]">
                  {stat.label}
                </div>
                <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">{stat.detail}</p>
              </HolographicCard>
            ))}
          </div>
        </motion.div>

        <HeroVisual project={project} />
      </div>
    </section>
  );
}

function HeroVisual({ project }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.7 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.7 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const offsetLeft = useTransform(springX, [-0.5, 0.5], [-24, 16]);
  const offsetRight = useTransform(springX, [-0.5, 0.5], [16, -24]);
  const offsetY = useTransform(springY, [-0.5, 0.5], [-18, 18]);
  const inverseOffsetY = useTransform(offsetY, (value) => -value);
  const softOffsetY = useTransform(offsetY, (value) => value * 0.65);
  const inverseSoftOffsetY = useTransform(offsetY, (value) => -value * 0.55);

  const gallery = project.gallery.slice(0, 3);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <div className="grid gap-2 sm:mt-10 sm:gap-4 lg:hidden">
        {gallery.map((item, index) => (
          <VisualCard key={item.title} item={item} compact={index > 0} priority={index === 0} />
        ))}
      </div>

      <motion.div
        onMouseMove={handlePointerMove}
        onMouseLeave={resetPointer}
        className="relative hidden min-h-[640px] lg:block"
        style={{ rotateX, rotateY, transformPerspective: 1800 }}
      >
        <motion.div className="absolute inset-x-12 top-12" style={{ y: offsetY }}>
          <VisualCard item={gallery[0]} priority />
        </motion.div>

        {gallery[1] ? (
          <motion.div className="absolute left-0 top-[55%] w-[38%]" style={{ x: offsetLeft, y: offsetY }}>
            <VisualCard item={gallery[1]} compact />
          </motion.div>
        ) : null}

        {gallery[2] ? (
          <motion.div className="absolute right-0 top-10 w-[36%]" style={{ x: offsetRight, y: inverseOffsetY }}>
            <VisualCard item={gallery[2]} compact />
          </motion.div>
        ) : null}

        <motion.div
          className="absolute bottom-10 right-8 w-56"
          style={{ x: offsetRight, y: softOffsetY }}
        >
          <FloatingSignal
            icon={Layers3}
            eyebrow="SYSTEM_MAP"
            title="Product + backend + runtime"
            copy="Each case study is structured around interaction design, architecture, and execution behavior."
          />
        </motion.div>

        <motion.div
          className="absolute bottom-24 left-[18%] w-52"
          style={{ x: offsetLeft, y: inverseSoftOffsetY }}
        >
          <FloatingSignal
            icon={Orbit}
            eyebrow="WHY_IT_HITS"
            title="One product, multiple depths"
            copy="UI craft, systems thinking, and shipping discipline all show up together."
          />
        </motion.div>
      </motion.div>
    </>
  );
}

function FloatingSignal({ icon: Icon, eyebrow, title, copy }) {
  return (
    <HolographicCard className="rounded-2xl border border-border bg-card/55 p-4 backdrop-blur-xl sm:rounded-[26px] sm:p-5" intensity={0.45}>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="font-mono text-[10px] tracking-[0.14em] text-primary uppercase sm:tracking-[0.26em]">{eyebrow}</div>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
    </HolographicCard>
  );
}

function OverviewSection({ project }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div {...ENTRY_ANIMATION}>
          <SectionHeader
            index="01"
            eyebrow="PROJECT_BREAKDOWN"
            title="The thinking underneath the surface"
            copy="Each deployed build is documented like a shipped product: what the interface does, what the backend owns, and why the execution model matters."
          />
        </motion.div>

        <div className="mt-10 grid grid-cols-[minmax(0,0.95fr)_minmax(132px,0.8fr)] gap-3 sm:mt-12 sm:grid-cols-1 sm:gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(320px,1.22fr)]">
          <motion.div {...ENTRY_ANIMATION}>
            <HolographicCard className="rounded-2xl border border-border bg-card/45 p-3 sm:rounded-[30px] sm:p-7" intensity={0.5}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-primary sm:tracking-[0.26em]">
                  WHY_THIS_PROJECT
                </div>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>

              <div className="mt-4 max-h-[18rem] space-y-4 overflow-hidden sm:mt-6 sm:max-h-none sm:space-y-5">
                {project.overview.map((paragraph) => (
                  <p key={paragraph} className="text-xs leading-relaxed text-muted-foreground sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-3">
                <SignalBlock label="Role" value="Product, frontend, backend, and systems execution" />
                <SignalBlock label="Focus" value="Strong software depth wrapped in polished product motion" />
              </div>
            </HolographicCard>
          </motion.div>

          <div className="grid gap-2 sm:gap-5 md:grid-cols-3">
            {project.architecture.map((item) => (
              <motion.div key={item.title} {...ENTRY_ANIMATION}>
                <HolographicCard className="h-full rounded-xl border border-border bg-card/35 p-2.5 sm:rounded-[28px] sm:p-6" intensity={0.45}>
                  <div className="font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.28em]">{item.title}</div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">{item.description}</p>

                  <div className="mt-3 hidden space-y-3 sm:mt-6 sm:block">
                    {item.points.map((point) => (
                      <div key={point} className="flex items-start gap-2">
                        <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
                      </div>
                    ))}
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4 lg:grid-cols-4">
          {project.buildHighlights.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <HolographicCard className="rounded-xl border border-border bg-card/30 p-3 sm:rounded-[26px] sm:p-5" intensity={0.4}>
                <div className="font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.26em]">BUILD_NOTE_0{index + 1}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">{item}</p>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ project }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div {...ENTRY_ANIMATION}>
          <SectionHeader
            index="02"
            eyebrow="VISUAL_ARCHIVE"
            title="Interface states and interaction surfaces"
            copy="The deployed projects are presented like product walkthroughs, with each screen supporting a specific part of the story."
          />
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-1 sm:gap-6 lg:grid-cols-2">
          {project.gallery.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={index === 0 ? 'lg:col-span-2' : ''}
            >
              <VisualCard item={item} compact={index > 0} priority={index === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToActionSection({ project }) {
  return (
    <section className="px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <motion.div {...ENTRY_ANIMATION}>
          <HolographicCard className="overflow-hidden rounded-2xl border border-border bg-card/45 p-4 sm:rounded-[34px] sm:p-10" intensity={0.6}>
            <div className="pointer-events-none absolute inset-0 opacity-80">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="absolute -left-24 top-10 h-48 w-48 rounded-full bg-primary/10 blur-[90px]" />
              <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-cyan-300/10 blur-[90px]" />
            </div>

            <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_minmax(112px,0.72fr)] gap-3 sm:flex sm:flex-col sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="font-mono text-[8px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.32em]">NEXT_STEP</div>
                <h2 className="mt-3 text-lg font-semibold tracking-tight sm:mt-4 sm:text-4xl">
                  Want to inspect the product itself?
                </h2>
                <p className="mt-3 max-h-[7rem] max-w-2xl overflow-hidden text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:max-h-none sm:text-base">
                  The case study captures the design and system thinking. The repository shows the implementation depth.
                  The live deployment opens the product surface directly when the project has a hosted Railway build.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                <CaseStudyButton href={project.repoUrl} icon={Github} label="OPEN_REPOSITORY" large />
                {project.liveUrl ? (
                  <CaseStudyButton href={project.liveUrl} icon={ExternalLink} label="VISIT_LIVE_SITE" large />
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/50 px-5 py-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground sm:tracking-[0.22em]">
                    LIVE_URL_PENDING
                  </span>
                )}
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}

function VisualCard({ item, compact = false, priority = false }) {
  return (
    <HolographicCard
      className={`overflow-hidden rounded-xl border border-border bg-card/50 sm:rounded-[32px] ${compact ? 'p-2 sm:p-3' : 'p-2 sm:p-5'}`}
      intensity={priority ? 0.7 : 0.55}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-background/85 sm:rounded-[26px]">
        <div className="flex items-center gap-1.5 border-b border-border px-2 py-2 sm:gap-2 sm:px-4 sm:py-3">
          <div className="h-2 w-2 rounded-full bg-rose-400/70 sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-amber-300/70 sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-emerald-400/70 sm:h-2.5 sm:w-2.5" />
          <span className="ml-1 min-w-0 truncate font-mono text-[7px] tracking-[0.06em] text-muted-foreground uppercase sm:ml-2 sm:text-[10px] sm:tracking-[0.22em]">
            {item.title}
          </span>
        </div>

        {item.image ? (
          <div className="relative">
            <img
              src={item.image}
              alt={item.title}
              className={`w-full object-cover object-top ${compact ? 'h-[120px] sm:h-[240px]' : 'h-[150px] sm:h-[460px]'}`}
              loading={priority ? 'eager' : 'lazy'}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
          </div>
        ) : (
          <ConceptFrame concept={item.concept} compact={compact} />
        )}

        <div className="border-t border-border bg-card/40 px-2 py-2 sm:px-5 sm:py-4">
          <div className="font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.28em]">{item.title}</div>
          <p className="mt-1 max-h-[3.1rem] overflow-hidden text-[9px] leading-relaxed text-muted-foreground sm:mt-2 sm:max-h-none sm:text-sm">{item.caption}</p>
        </div>
      </div>
    </HolographicCard>
  );
}

function ConceptFrame({ concept, compact }) {
  const accent = concept?.accent ?? '#74E6FF';

  return (
    <div
      className={`relative overflow-hidden ${compact ? 'min-h-[120px] sm:min-h-[240px]' : 'min-h-[150px] sm:min-h-[460px]'}`}
      style={{
        background: `radial-gradient(circle at 18% 18%, ${accent}25, transparent 24%), radial-gradient(circle at 82% 16%, rgba(216,255,68,0.16), transparent 22%), linear-gradient(180deg, rgba(10,18,28,0.96) 0%, rgba(8,14,22,0.98) 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(216,255,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(116,230,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between gap-3 p-3 sm:gap-6 sm:p-8">
        <div className="grid gap-3 sm:gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:px-3 sm:text-[10px] sm:tracking-[0.28em]">
              {concept?.eyebrow}
            </div>
            <h3 className="mt-2 max-h-[3.5rem] max-w-xl overflow-hidden text-sm font-semibold tracking-tight text-foreground sm:mt-4 sm:max-h-none sm:text-3xl">
              {concept?.title}
            </h3>
            <p className="mt-2 hidden max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:block sm:text-base">
              {concept?.description}
            </p>

            <div className="mt-3 hidden flex-wrap gap-2 sm:mt-6 sm:flex">
              {concept?.chips?.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-foreground sm:tracking-[0.18em]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden gap-3 sm:grid">
            <ConceptMiniPanel accent={accent} title="Primary view" lines={4} />
            <ConceptMiniPanel accent="#D8FF44" title="System detail" lines={3} />
            <ConceptMiniPanel accent="#86FBA8" title="Runtime signal" lines={2} />
          </div>
        </div>

        <div className="hidden gap-3 sm:grid md:grid-cols-3">
          <ConceptStat accent={accent} label="Interaction" value="Tight loop" />
          <ConceptStat accent="#D8FF44" label="System depth" value="Real backend ownership" />
          <ConceptStat accent="#86FBA8" label="Outcome" value="Shippable product surface" />
        </div>
      </div>
    </div>
  );
}

function ConceptMiniPanel({ accent, title, lines }) {
  return (
    <div className="rounded-2xl border border-border bg-card/55 p-4 backdrop-blur-xl sm:rounded-[24px]">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase sm:tracking-[0.24em]" style={{ color: accent }}>
        {title}
      </div>
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={`${title}-${index}`} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            <div
              className="h-2 rounded-full bg-white/10"
              style={{ width: `${72 - index * 10}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ConceptStat({ accent, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-card/45 p-4 sm:rounded-[22px]">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase sm:tracking-[0.24em]" style={{ color: accent }}>
        {label}
      </div>
      <div className="mt-3 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

function SectionHeader({ index, eyebrow, title, copy }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tracking-widest text-primary">{index}</span>
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-widest">{eyebrow}</span>
      </div>

      <div className="mt-6 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{copy}</p>
      </div>
    </div>
  );
}

function SignalBlock({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-2.5 sm:rounded-[22px] sm:p-4">
      <div className="font-mono text-[7px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.26em]">{label}</div>
      <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">{value}</p>
    </div>
  );
}

function CaseStudyButton({ href, icon: Icon, label, large = false }) {
  return (
    <a
      data-magnetic
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-primary/10 font-mono tracking-[0.14em] text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:tracking-[0.2em] ${
        large ? 'px-3 py-2.5 text-[9px] sm:px-5 sm:py-3 sm:text-[11px]' : 'px-3 py-2 text-[10px] sm:px-4'
      }`}
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
      <span className={large ? '' : 'hidden sm:inline'}>{label}</span>
    </a>
  );
}
