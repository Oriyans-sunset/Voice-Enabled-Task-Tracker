const samplePrompt =
  '"Create a high priority task to review the pull request for the authentication module by tomorrow evening."';

const parsedFields = [
  { label: "Title", value: "Review PR for authentication module" },
  { label: "Priority", value: "High" },
  { label: "Due Date", value: "Tomorrow · 6:00 PM" },
  { label: "Status", value: "To Do (default)" },
];

function VoiceCaptureCard() {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="badge badge-primary badge-outline">Voice capture</span>
          <span className="flex items-center gap-2 text-sm text-success font-semibold">
            <span className="badge badge-xs badge-success"></span>
            Recorder idle
          </span>
        </div>
        <div className="space-y-2">
          <h3 className="card-title text-2xl">Capture a task by speaking</h3>
          <p className="text-base-content/70">
            Tap record and describe what needs to happen. Wire your speech-to-text and parsing logic later to populate
            the task form automatically.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary">
            Start recording
          </button>
          <button type="button" className="btn btn-outline">
            Stop
          </button>
        </div>
        <div className="rounded-xl border border-dashed border-base-300 bg-base-200/60 p-4 space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-base-content/70">Example prompt</p>
          <p className="font-semibold leading-relaxed">{samplePrompt}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {parsedFields.map((field) => (
              <div key={field.label} className="rounded-lg bg-base-100 border border-base-300 p-3 space-y-1">
                <p className="text-xs uppercase tracking-[0.1em] text-base-content/60">{field.label}</p>
                <p className="font-semibold">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceCaptureCard;
