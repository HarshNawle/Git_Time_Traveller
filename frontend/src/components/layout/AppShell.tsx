import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";

const AppShell = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isTimelinePage = /^\/workspace\/[^/]+\/timeline\/?$/.test(
    location.pathname
  );

  return (
    <div className="min-h-screen font-mono bg-[#f8f5ea] text-[#050402] transition-colors dark:bg-[#050402] dark:text-[#f8f5ea]">
      {!isLandingPage && !isTimelinePage && <Header />}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;