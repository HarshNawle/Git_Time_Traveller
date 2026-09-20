import { Outlet, useLocation } from "react-router-dom";
// import { Header } from "./Header";
import AnalysisHeader from "@/components/analysis/AnalysisHeader";
// import { WorkspaceTopBar } from "../workspace/WorkspaceTopBar";

const AppShell = () => {
  const location = useLocation();

  const pathname = location.pathname;

  // const isLandingPage = pathname === "/";

  const isAnalysisPage = pathname.startsWith("/analyze/");

  // const isWorkspacePage = pathname.startsWith("/workspace/");

  return (
    <div
      className="
        min-h-screen
        font-mono
        bg-[#f8f5ea]
        text-[#050402]
        transition-colors
        dark:bg-[#050402]
        dark:text-[#f8f5ea]
      "
    >
      {/* Landing Navbar */}
      {/* {isLandingPage && <Header />} */}

      {/* Analysis Navbar */}
      {isAnalysisPage && <AnalysisHeader />}

      {/* Workspace Navbar */}
      {/* {isWorkspacePage && <WorkspaceTopBar />} */}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;