import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App runtime error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="w-full max-w-2xl rounded-3xl border border-border bg-card/70 p-8 sm:p-10 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mt-6 font-mono text-2xl sm:text-3xl text-foreground">
            The portfolio hit a runtime issue.
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            I prevented the app from collapsing into a blank screen. Reload once to retry. If this appears again,
            the message below will help pinpoint the failing component.
          </p>
          <div className="mt-6 rounded-2xl border border-border bg-background/60 p-4 text-left">
            <div className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase">Runtime Message</div>
            <p className="mt-3 break-words font-mono text-xs text-muted-foreground">
              {this.state.error?.message || 'Unknown runtime error'}
            </p>
          </div>
          <button
            onClick={this.handleReload}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-mono text-xs font-semibold tracking-[0.24em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            <RotateCcw className="h-4 w-4" />
            RELOAD_APP
          </button>
        </div>
      </div>
    );
  }
}
