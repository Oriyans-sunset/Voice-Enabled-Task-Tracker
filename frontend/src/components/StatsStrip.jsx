const fallbackStats = [
  { label: "To Do", value: "08", caption: "Queued up" },
  { label: "In Progress", value: "03", caption: "Actively moving" },
  { label: "Done", value: "12", caption: "Wrapped this week" },
  { label: "Voice entries", value: "05", caption: "Captured hands-free" },
];

function StatsStrip({ stats = fallbackStats }) {
  return (
    <div className="stats stats-vertical shadow bg-base-100 border border-base-300 w-full lg:stats-horizontal">
      {stats.map((stat) => (
        <div key={stat.label} className="stat">
          <div className="stat-title uppercase tracking-[0.08em]">
            {stat.label}
          </div>
          <div className="stat-value text-primary">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsStrip;
