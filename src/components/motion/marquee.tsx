import { clsx } from "clsx";

interface MarqueeProps {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}

export function Marquee({ items, className, duration = 30, reverse = false }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-8">{item}</span>
          <span className="text-moss">✺</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={clsx("flex overflow-hidden whitespace-nowrap", className)}>
      <div
        className="marquee-track flex"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
