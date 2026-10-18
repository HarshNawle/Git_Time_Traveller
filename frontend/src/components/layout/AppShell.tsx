import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import AnalysisHeader from "@/components/analysis/AnalysisHeader";

const AppShell = () => {
  const location = useLocation();

  const pathname = location.pathname;

  const isAnalysisPage = pathname.startsWith("/analyze/");

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
      {/* Global Header with GitHub auth */}
      {!isAnalysisPage && <Header />}

      {/* Analysis Navbar */}
      {isAnalysisPage && <AnalysisHeader />}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;