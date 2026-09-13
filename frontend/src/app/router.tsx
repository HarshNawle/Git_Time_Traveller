import AppShell from "@/components/layout/AppShell";
import AnalysisPage from "@/pages/AnalysisPage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import ContributorsPage from "@/pages/ContributorsPage";
import HeatmapPage from "@/pages/HeatmapPage";
import LandingPage from "@/pages/LandingPage";
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
          path: "/auth/github/callback",
          element: <AuthCallbackPage />,
        },
  
        {
          path: "/analyze/:jobId",
          element: <AnalysisPage />,
        },
  
        {
          path: "/repo/:jobId/timeline",
          element: <TimelinePage />,
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
          path: "/my-repos",
          element: <MyReposPage />,
        },
  
        {
          path: "/settings",
          element: <SettingsPage />,
        },
  
        {
          path: "*",
          element: <LandingPage />,
        },
      ],
    },
  ]);