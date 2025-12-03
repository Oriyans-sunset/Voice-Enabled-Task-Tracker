import FilterBar from "../components/FilterBar";
import SectionHeader from "../components/SectionHeader";
import StatsStrip from "../components/StatsStrip";
import TaskBoardPreview from "../components/TaskBoardPreview";
import TaskComposerCard from "../components/TaskComposerCard";
import TaskListPreview from "../components/TaskListPreview";
import VoiceCaptureCard from "../components/VoiceCaptureCard";

const highlightTags = [
  "Hands-free capture",
  "AI field parsing",
  "Kanban + list views",
  "Filters & search",
];

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
  {
    title: "Draft QA checklist",
    status: "To Do",
    priority: "Medium",
    due: "Fri · 2:00 PM",
    assignee: "QA",
  },
  {
    title: "Refine dashboard copy",
    status: "In Progress",
    priority: "Low",
    due: "Today · 4:30 PM",
    assignee: "Product",
  },
  {
    title: "Sync with backend team",
    status: "Done",
    priority: "Medium",
    due: "Yesterday",
    assignee: "Frontend",
  },
];

const stats = [
  { label: "Voice tasks", value: "05", caption: "Parsed from spoken input" },
  { label: "High priority", value: "04", caption: "Need attention" },
  { label: "Due soon", value: "03", caption: "Today · Tomorrow" },
  { label: "Completed", value: "12", caption: "Wrapped this week" },
];

const voiceExampleFields = [
  {
    label: "Title",
    value: "Review the pull request for the authentication module",
  },
  { label: "Priority", value: "High" },
  { label: "Due Date", value: "Tomorrow · 6:00 PM" },
  { label: "Status", value: "To Do (default)" },
];

function Home() {
  return (
    <div className="space-y-12">
      <section className="grid gap-6 lg:grid-cols-2">
        <VoiceCaptureCard />
        <TaskComposerCard />
      </section>

      <section className="space-y-4">
        <StatsStrip stats={stats} />
      </section>

      <section className="space-y-4">
        <SectionHeader title="Kanban-style Board" actionSlot={<FilterBar />} />
        <TaskBoardPreview board={previewBoard} />
      </section>

      <section className="space-y-4">
        <SectionHeader title="List view" />
        <TaskListPreview tasks={previewList} />
      </section>
    </div>
  );
}

export default Home;
