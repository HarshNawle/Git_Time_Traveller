import { useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authApi } from "@/api/auth";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  const handleGitHubLogin = () => {
    window.location.href = authApi.initiateGitHubOAuth();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5ea] dark:bg-[#050402] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <svg className="size-10 text-green-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="font-mono text-2xl font-black tracking-tight">
              Git History Time Traveller
            </span>
          </a>
        </div>

        {/* Error message */}
        {error === "github_oauth_failed" && (
          <div className="mb-6 p-4 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="size-5" />
              <p className="font-medium">GitHub authentication failed</p>
            </div>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        {error === "session_failed" && (
          <div className="mb-6 p-4 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="size-5" />
              <p className="font-medium">Session error</p>
            </div>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
              Could not establish your session. Please try signing in again.
            </p>
          </div>
        )}

        {/* Sign in button */}
        <Button
          onClick={handleGitHubLogin}
          className="w-full h-12 rounded-xl border-[3px] border-black px-6 font-bold text-black shadow-[3px_3px_0px_#050402] hover:opacity-90 cursor-pointer dark:text-white dark:border-[#f8f5ea] dark:bg-[#050402] dark:shadow-[7px_7px_0px_#000] gap-3"
          size="default"
        >
          <img height="20" width="20" className="dark:bg-white rounded-lg" src="https://unpkg.com/simple-icons@v16/icons/GitHub.svg" />
          <span>Sign in with GitHub</span>
        </Button>

        {/* Features hint */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>By signing in, you can:</p>
          <ul className="mt-3 space-y-1 text-left max-w-xs mx-auto">
            <li className="flex items-center gap-2">🔍 Analyze your GitHub repositories</li>
            <li className="flex items-center gap-2">📊 Visualize commit history & contributors</li>
            <li className="flex items-center gap-2">🔥 Generate code heatmaps & insights</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>This app will request access to your public profile and email.</p>
          <p className="mt-1">We never store your GitHub token.</p>
        </div>
      </div>
    </div>
  );
}