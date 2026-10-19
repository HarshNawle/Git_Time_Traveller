import RecentRepositories, {
    type RecentRepository,
  } from "@/components/dashboard/RecentRepositories";
  
  interface RecentAnalysesProps {
    repositories: RecentRepository[];
  }
  
  export default function RecentAnalyses({
    repositories,
  }: RecentAnalysesProps) {
    return <RecentRepositories repositories={repositories} />;
  }