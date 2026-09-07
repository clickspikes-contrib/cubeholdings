import { stats } from "@/data/projects";
import { CountUp } from "./count-up";

const ITEMS = [
  { n: stats.total, suffix: "+", l: "Projects delivered & underway" },
  { n: stats.apartments, suffix: "+", l: "Apartments planned" },
  { n: stats.areas, suffix: "", l: "Prime Dhaka addresses" },
  {
    n: new Date().getFullYear() - stats.since,
    suffix: "+",
    l: "Years building",
  },
];

export function StatsStrip() {
  return (
    <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
      {ITEMS.map((s, i) => (
        <div
          key={s.l}
          className={`px-4 lg:px-8 ${
            i > 0 ? "lg:border-l lg:border-[var(--line)]" : ""
          } ${i % 2 === 1 ? "border-l border-[var(--line)] lg:border-l" : ""}`}
        >
          <dt className="display text-[clamp(2rem,4.5vw,3rem)] tabular-nums">
            <CountUp value={s.n} suffix={s.suffix} />
          </dt>
          <dd className="mt-2 text-[0.8125rem] leading-snug text-[var(--muted)]">
            {s.l}
          </dd>
        </div>
      ))}
    </dl>
  );
}
