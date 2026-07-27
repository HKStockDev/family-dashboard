import { ReactNode } from "react";

export function Card({
  title,
  icon,
  action,
  children,
  className = "",
  bodyClassName = "",
}: {
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={`flex flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] card-shadow ${className}`}
    >
      {title && (
        <header className="flex items-center justify-between gap-2 px-4 pt-3 pb-1.5 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            {icon && <span className="text-[var(--color-sage-dark)] shrink-0">{icon}</span>}
            <h2 className="font-display text-[13.5px] tracking-wide text-[var(--color-brown-dark)] uppercase truncate">
              {title}
            </h2>
          </div>
          {action}
        </header>
      )}
      <div className={`flex-1 min-h-0 px-4 pb-3 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
