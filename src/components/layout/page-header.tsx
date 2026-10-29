import React from "react";

interface PageHeaderProps {
  title: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}

/** Big title on the left, supporting text bottom-aligned on the right, so wide screens stay balanced. */
export function PageHeader({ title, aside, className = "" }: PageHeaderProps) {
  return (
    <header className={`grid lg:grid-cols-12 gap-10 lg:gap-12 items-end ${className}`}>
      <h1 className="lg:col-span-8 text-[15vw] sm:text-[11vw] lg:text-[8.5vw] leading-[0.86] tracking-[-0.06em] font-medium">
        {title}
      </h1>
      {aside && <div className="lg:col-span-4 lg:pb-[1vw] text-lg text-paper-dim leading-relaxed space-y-4">{aside}</div>}
    </header>
  );
}
