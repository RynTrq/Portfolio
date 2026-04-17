import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Github } from 'lucide-react';
import HolographicCard from './HolographicCard';
import { profile } from '@/data/portfolio';
import { projects } from '@/data/projectLibrary';

const STATUS_STYLE = {
  DEPLOYED: 'border-primary/20 bg-primary/10 text-primary',
  IN_PROGRESS: 'border-yellow-400/20 bg-yellow-400/10 text-yellow-300',
  COMPLETE: 'border-border bg-secondary text-muted-foreground',
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  const handleCardOpen = (project, event) => {
    if (!project.hasDetailPage) {
      return;
    }

    if (event.target.closest('a, button')) {
      return;
    }

    navigate(`/projects/${project.slug}`);
  };

  const handleCardKeyDown = (project, event) => {
    if (!project.hasDetailPage) {
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    navigate(`/projects/${project.slug}`);
  };

  return (
    <section id="projects" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10 flex items-center gap-3 sm:mb-16 sm:gap-4">
            <span className="font-mono text-xs tracking-widest text-primary">003</span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-widest">PROJECT_ARCHIVE</span>
          </div>

          <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-mono text-2xl font-bold text-foreground sm:text-4xl">
                Built <span className="text-primary glow-text">Systems</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                A selection of projects where product thinking, AI workflows, and systems engineering meet in
                real software.
              </p>
            </div>

            <a
              data-magnetic
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 self-stretch rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:self-start sm:tracking-[0.2em]"
            >
              GITHUB_ARCHIVE
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                viewport={{ once: true }}
                className={project.featured ? 'md:col-span-2 xl:col-span-2' : ''}
              >
                <HolographicCard
                  className={`h-full rounded-2xl border border-border bg-card/35 p-3 transition-colors duration-300 hover:border-primary/30 sm:rounded-[28px] sm:p-6 ${
                    project.hasDetailPage ? 'cursor-pointer' : ''
                  }`}
                  intensity={0.65}
                  role={project.hasDetailPage ? 'link' : undefined}
                  tabIndex={project.hasDetailPage ? 0 : undefined}
                  onClick={(event) => handleCardOpen(project, event)}
                  onKeyDown={(event) => handleCardKeyDown(project, event)}
                >
                  <div>
                    <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="font-mono text-[8px] tracking-[0.08em] text-primary uppercase sm:text-[10px] sm:tracking-[0.3em]">
                          {project.domain}
                        </div>
                        <h3 className="mt-2 text-sm font-semibold tracking-tight text-foreground sm:mt-3 sm:text-2xl">
                          {project.title}
                        </h3>
                        <p className="mt-1 font-mono text-[8px] tracking-[0.06em] text-muted-foreground uppercase sm:text-[11px] sm:tracking-[0.18em]">
                          {project.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 sm:flex-col sm:items-end">
                        <div className="flex items-center gap-2">
                          {project.repoUrl ? (
                            <a
                              data-magnetic
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${project.title} GitHub repository`}
                              className="relative z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          ) : null}
                          {project.liveUrl ? (
                            <a
                              data-magnetic
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${project.title} live deployment`}
                              className="relative z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : null}
                          <span className="font-mono text-[8px] tracking-[0.08em] text-muted-foreground/60 sm:text-[10px] sm:tracking-[0.25em]">
                            0{index + 1}
                          </span>
                        </div>

                        <span
                          className={`rounded-full border px-2 py-1 font-mono text-[7px] tracking-[0.08em] sm:px-3 sm:text-[10px] sm:tracking-[0.22em] ${STATUS_STYLE[project.status]}`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 max-h-[4.5rem] max-w-2xl overflow-hidden text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:max-h-none sm:text-sm">
                      {project.summary}
                    </p>

                    <div className="mt-3 hidden flex-wrap gap-2 sm:mt-5 sm:flex">
                      {project.outcomes.map((outcome) => (
                        <span
                          key={outcome}
                          data-magnetic
                          className="rounded-full border border-border bg-background/40 px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-foreground sm:tracking-[0.18em]"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 hidden space-y-2 sm:mt-6 sm:block">
                      {project.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: project.accent }} />
                          <p className="text-sm leading-relaxed text-muted-foreground">{bullet}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 sm:mt-6">
                      <div className="mb-2 font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
                        Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            data-magnetic
                            className="rounded-lg border border-border bg-secondary px-2 py-1 font-mono text-[8px] text-foreground sm:px-2.5 sm:text-[10px]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
