import FilterBar from "../components/FilterBar";
import SectionHeader from "../components/SectionHeader";
import StatsStrip from "../components/StatsStrip";
import TaskBoardPreview from "../components/TaskBoardPreview";
import TaskComposerCard from "../components/TaskComposerCard";
import TaskListPreview from "../components/TaskListPreview";
import VoiceCaptureCard from "../components/VoiceCaptureCard";

const highlightTags = ["Hands-free capture", "AI field parsing", "Kanban + list views", "Filters & search"];

const previewBoard = {
  "To Do": [
    {
      title: "Review authentication PR",
      summary: "Validate happy-path and edge cases before merge",
      priority: "High",
      due: "Tomorrow · 6:00 PM",
      owner: "You",
    },
    {
      title: "Draft QA checklist",
      summary: "Document test plan for release candidate",
      priority: "Medium",
      due: "Fri · 2:00 PM",
      owner: "QA",
    },
  ],
  "In Progress": [
    {
      title: "Refine dashboard copy",
      summary: "Clarify CTA labels in the composer module",
      priority: "Low",
      due: "Today · 4:30 PM",
      owner: "Product",
    },
  ],
  Done: [
    {
      title: "Sync with backend team",
      summary: "Confirm payload for parsed voice tasks",
      priority: "Medium",
      due: "Yesterday",
      owner: "Frontend",
    },
  ],
};

const previewList = [
  {
    title: "Review authentication PR",
    status: "To Do",
    priority: "High",
    due: "Tomorrow · 6:00 PM",
    assignee: "You",
  },
  { title: "Draft QA checklist", status: "To Do", priority: "Medium", due: "Fri · 2:00 PM", assignee: "QA" },
  {
    title: "Refine dashboard copy",
    status: "In Progress",
    priority: "Low",
    due: "Today · 4:30 PM",
    assignee: "Product",
  },
  { title: "Sync with backend team", status: "Done", priority: "Medium", due: "Yesterday", assignee: "Frontend" },
];

const stats = [
  { label: "Voice tasks", value: "05", caption: "Parsed from spoken input" },
  { label: "High priority", value: "04", caption: "Need attention" },
  { label: "Due soon", value: "03", caption: "Today · Tomorrow" },
  { label: "Completed", value: "12", caption: "Wrapped this week" },
];

const voiceExampleFields = [
  { label: "Title", value: "Review the pull request for the authentication module" },
  { label: "Priority", value: "High" },
  { label: "Due Date", value: "Tomorrow · 6:00 PM" },
  { label: "Status", value: "To Do (default)" },
];

function Home() {
  return (
    <div className="space-y-12">
      <section className="card bg-gradient-to-br from-sky-500/15 via-base-200 to-amber-400/10 border border-base-300 shadow-2xl">
        <div className="card-body grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <p className="eyebrow text-primary/80">Voice-enabled task tracker</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Speak tasks, let the tracker do the typing</h1>
            <p className="prose-muted max-w-2xl">
              Capture tasks by voice, parse the details automatically, and keep work moving in board or list views. Wire
              up your APIs later — the UI scaffolding is ready.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary">
                Start voice capture
              </button>
              <button type="button" className="btn btn-outline">
                Add task manually
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {highlightTags.map((tag) => (
                <div key={tag} className="badge badge-outline badge-lg border-dashed border-base-300 text-base">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="card bg-base-100/70 border border-base-300 shadow-xl">
            <div className="card-body space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Example voice prompt</p>
              <p className="text-lg font-semibold leading-relaxed">
                "Create a high priority task to review the pull request for the authentication module by tomorrow
                evening."
              </p>
              <div className="space-y-2">
                {voiceExampleFields.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-xl bg-base-200/80 px-4 py-3 border border-base-300"
                  >
                    <span className="badge badge-neutral badge-outline">{item.label}</span>
                    <span className="font-semibold text-base-content/90 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <VoiceCaptureCard />
        <TaskComposerCard />
      </section>

      <section className="space-y-4">
        <SectionHeader
          label="Snapshot"
          title="Workspace at a glance"
          subtitle="See how tasks will surface once you wire up persistence and logic."
        />
        <StatsStrip stats={stats} />
      </section>

      <section className="space-y-4">
        <SectionHeader
          label="Board"
          title="Kanban-style preview"
          subtitle="Drag-and-drop ready columns for To Do, In Progress, and Done."
          actionSlot={<FilterBar />}
        />
        <TaskBoardPreview board={previewBoard} />
      </section>

      <section className="space-y-4">
        <SectionHeader
          label="List"
          title="Compact list view"
          subtitle="Scan tasks quickly, update fields inline, and search across title or description."
        />
        <TaskListPreview tasks={previewList} />
      </section>
    </div>
  );
}

export default Home;
