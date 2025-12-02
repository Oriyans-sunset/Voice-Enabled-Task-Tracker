import { Outlet } from "react-router-dom";

function MainLayout() {
  const navClass = ({ isActive }) =>
    `btn btn-sm md:btn-md btn-ghost rounded-full ${
      isActive
        ? "bg-base-200 text-primary font-semibold"
        : "text-base-content/70 hover:text-base-content"
    }`;

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-20 border-b border-base-300 bg-base-100/80 backdrop-blur">
        <div className="navbar max-w-6xl mx-auto px-4">
          <div className="navbar-start">
            <div className="flex items-center gap-3">
              <div className="btn btn-primary btn-sm md:btn-md btn-square text-base-100 font-black">
                TT
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">Taskify</p>
                <p className="text-xs text-base-content/60">
                  Voice-Enabled Task Tracker
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
