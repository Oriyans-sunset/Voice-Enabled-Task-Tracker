function SectionHeader({ label, title, subtitle, actionSlot }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
      <div className="space-y-1">
        {label ? <p className="eyebrow text-primary/80">{label}</p> : null}
        <h2 className="text-2xl font-semibold">{title}</h2>
        {subtitle ? <p className="text-base-content/70">{subtitle}</p> : null}
      </div>
      {actionSlot ? <div className="w-full md:w-auto">{actionSlot}</div> : null}
    </div>
  );
}

export default SectionHeader;
