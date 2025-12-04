import { Outlet } from "react-router-dom";
import icon from "../assets/icon.png";

function MainLayout() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-20 border-b border-base-300 bg-base-100/80 backdrop-blur">
        <div className="navbar max-w-6xl mx-auto px-4">
          <div className="navbar-start">
            <div className="flex items-center gap-3">
              <div className="p rounded-md bg-success/10 border border-success/40">
                <img
                  src={icon}
                  alt="Taskify logo"
                  className="w-8 h-8 rounded-md object-contain"
                />
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
