import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AnalysisPageHeader from "@/components/analysis/AnalysisPageHeader";
import AnalysisProgress from "@/components/analysis/AnalysisProgress";
import RepositoryInfoCard from "@/components/analysis/RepositoryInfoCard";

import { mockAnalysisJob } from "@/utils/mock-analysis";

import type { Repository } from "@/types/repository";

const mockRepository: Repository = {
  id: "demo",
  owner: "vercel",
  name: "next.js",
  fullName: "vercel/next.js",

  description:
    "A React framework for the web, built for the Vercel platform.",

  url: "https://github.com/vercel/next.js",

  defaultBranch: "main",

  estimatedCommits: 12463,

  size: "487 MB",

  createdAt: "Oct 25, 2016",

  topics: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Web Framework",
  ],
};

const AnalysisPage = () => {
  const { repositoryId } = useParams<{
    repositoryId: string;
  }>();

  const navigate = useNavigate();

  useEffect(() => {
    // Temporary frontend-only simulation.
    //
    // Later this will be replaced by:
    //
    // useAnalysisJob(repositoryId)
    //
    // and navigation will happen when:
    //
    // status === "completed"

    if (repositoryId === "demo") {
      const timer = setTimeout(() => {
        // Keep disabled while developing the UI.
        // navigate(`/workspace/${repositoryId}/timeline`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [repositoryId, navigate]);

  return (
    <div className="min-h-[calc(100vh-74px)]">
      <div className="mx-auto max-w-[1250px] px-20 pb-12">
        <AnalysisPageHeader />

        <div className="space-y-5">
          <RepositoryInfoCard
            repository={mockRepository}
          />

          <AnalysisProgress
            job={mockAnalysisJob}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;