import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function FooterSection() {
  return (
    <footer className="border-t border-border px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.24em]">
            <span className="text-primary">{profile.brand}//</span> © {new Date().getFullYear()} {profile.fullName}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            Designed and engineered around real work, not template filler.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 xs:grid-cols-3 sm:flex sm:items-center sm:gap-4">
          <FooterLink href={profile.github} icon={Github} label="GitHub" />
          <FooterLink href={profile.linkedin} icon={Linkedin} label="LinkedIn" />
          <FooterLink href={`mailto:${profile.email}`} icon={Mail} label="Email" />
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, icon: Icon, label }) {
  return (
    <a
      data-magnetic
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/35 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-muted-foreground transition-colors duration-300 hover:border-primary/30 hover:text-primary sm:tracking-[0.2em]"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
