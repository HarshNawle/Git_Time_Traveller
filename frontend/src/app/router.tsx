import AppShell from "@/components/layout/AppShell";
import AnalysisPage from "@/pages/AnalysisPage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import ContributorsPage from "@/pages/ContributorsPage";
import DashboardPage from "@/pages/DashboardPage";
import ExplorePage from "@/pages/ExplorePage";
import HeatmapPage from "@/pages/HeatmapPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import MyReposPage from "@/pages/MyReposPage";
import SettingsPage from "@/pages/SettingsPage";
import TimelinePage from "@/pages/TimelinePage";
import {
  createBrowserRouter,
} from "react-router-dom";


export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/auth/github/callback",
        element: <AuthCallbackPage />,
      },

      {
        path: "/analyze/:jobId",
        element: <AnalysisPage />,
      },

      {
        path: "/workspace/:repositoryId/timeline",
        element: <TimelinePage />,
      },

      {
        path: "/dashboard",
        element: <DashboardPage />,
      },

      {
        path: "/repo/:jobId/heatmap",
        element: <HeatmapPage />,
      },

      {
        path: "/repo/:jobId/contributors",
        element: <ContributorsPage />,
      },

      {
        path: "/explore",
        element: <ExplorePage />,
      },

      {
        path: "/my-repos",
        element: <MyReposPage />,
      },
      {
        path: "/my-repos/:repositoryId",
        element: <MyReposPage />,
      },
      {
        path: "/my-repos/:repositoryId/timeline",
        element: <TimelinePage />,
      },
      {
        path: "/my-repos/:repositoryId/heatmap",
        element: <HeatmapPage />,
      },
      {
        path: "/my-repos/:repositoryId/contributors",
        element: <ContributorsPage />,
      },

      {
        path: "/settings",
        element: <SettingsPage />,
      },

    ],
  },
]);