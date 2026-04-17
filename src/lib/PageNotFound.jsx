import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '@/data/portfolio';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1) || 'home';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16 text-foreground sm:px-6">
      <div className="grid w-full max-w-3xl grid-cols-[minmax(0,0.9fr)_minmax(118px,0.7fr)] items-center gap-3 rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-xl sm:block sm:rounded-3xl sm:p-10 sm:text-center">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[8px] tracking-[0.08em] text-primary uppercase sm:px-4 sm:text-[10px] sm:tracking-[0.35em]">
            {profile.brand}// navigation fault
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:mt-5 sm:text-4xl">
            That route does not exist in this build.
          </h1>
          <p className="mt-3 max-h-[6rem] max-w-xl overflow-hidden text-xs leading-relaxed text-muted-foreground sm:mx-auto sm:mt-4 sm:max-h-none sm:text-base">
            The path <span className="font-mono text-foreground">/{pageName}</span> is outside the portfolio surface.
            Head back to the main experience to continue exploring.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 sm:mt-8 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.25em]"
          >
            <ArrowLeft className="h-4 w-4" />
            RETURN_HOME
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-background/50 p-4 text-center sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
          <div className="font-mono text-5xl font-semibold text-primary glow-text sm:text-8xl">404</div>
          <div className="mt-3 font-mono text-[8px] tracking-[0.16em] text-muted-foreground uppercase sm:hidden">
            route_fault
          </div>
        </div>
      </div>
    </div>
  );
}
