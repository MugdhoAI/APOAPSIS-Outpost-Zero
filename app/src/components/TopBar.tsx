import type { ReactNode } from "react";

type TopBarProps = {
  children?: ReactNode;
};

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2.4" fill="currentColor" />
              <ellipse
                cx="8"
                cy="8"
                rx="6.4"
                ry="3.2"
                stroke="currentColor"
                strokeWidth="1.1"
                transform="rotate(-24 8 8)"
              />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">Outpost Zero</span>
            <span className="brand-sub">Mission trainer</span>
          </span>
        </div>
        <div className="topbar-meta">
          <span className="topbar-note">Team APOAPSIS · NASA Space Apps 2026</span>
          {children}
        </div>
      </div>
    </header>
  );
}
