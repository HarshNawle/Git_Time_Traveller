import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import AnalysisPageHeader from "@/components/analysis/AnalysisPageHeader";
import AnalysisProgress from "@/components/analysis/AnalysisProgress";
import AnalysisSkeleton from "@/components/analysis/AnalysisSkeleton";
import AnalysisError from "@/components/analysis/AnalysisError";
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

  const [searchParams] = useSearchParams();

  const state = searchParams.get("state");

  // --------------------------------
  // TEST LOADING STATE
  // --------------------------------

  if (state === "loading") {
    return <AnalysisSkeleton />;
  }

  // --------------------------------
  // TEST ERROR STATE
  // --------------------------------

  if (state === "error") {
    return (
      <AnalysisError
        message="We couldn't analyze this repository. Please check the repository URL and try again."
        onRetry={() => {
          navigate(`/analyze/${repositoryId}?state=loading`);
        }}
        onGoBack={() => {
          navigate("/");
        }}
      />
    );
  }

  // --------------------------------
  // NORMAL ANALYSIS PAGE
  // --------------------------------

  return (
    <div className="min-h-[calc(100vh-74px)]">
      <div className="mx-auto max-w-[1250px] px-6 pb-12">
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