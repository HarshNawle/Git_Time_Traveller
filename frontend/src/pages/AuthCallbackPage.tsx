import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { authApi } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSession, setStatus } = useAuthStore();

  const loginStatus = searchParams.get("login");
  const error = searchParams.get("error");

  // Guard to prevent duplicate execution (React StrictMode in dev)
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Skip if already executed
    if (hasRunRef.current) {
      return;
    }
    hasRunRef.current = true;

    const handleCallback = async () => {
      // If there's an error from the OAuth flow
      if (error) {
        console.error("OAuth error:", error);
        setStatus("anonymous");
        navigate("/login?error=github_oauth_failed");
        return;
      }

      // If login was successful, exchange refresh token for access token
      if (loginStatus === "success") {
        try {
          setStatus("loading");

          // Get access token from refresh token cookie
          console.log("Calling /api/auth/refresh...");
          const refreshResponse = await authApi.refreshAccessToken();
          console.log("Refresh response:", refreshResponse);

          const { accessToken } = refreshResponse;

          // Fetch user profile
          console.log("Calling /api/auth/me...");
          const user = await authApi.getMe(accessToken);
          console.log("User profile:", user);

          // Store session in auth store
          setSession(accessToken, user);

          // Redirect to my-repos page
          navigate("/my-repos", { replace: true });
        } catch (err) {
          console.error("Auth callback failed:", err);
          setStatus("anonymous");
          navigate("/login?error=session_failed");
        }
      } else {
        // No login status - might be a direct visit to this page
        navigate("/", { replace: true });
      }
    };

    handleCallback();
  }, [loginStatus, error, navigate, setSession, setStatus]);

  // Show loading state while processing
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5ea] dark:bg-[#050402]">
      <div className="text-center p-8">
        {loginStatus === "success" && (
          <>
            <div className="mx-auto mb-4 size-16 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
              <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#050402] dark:text-[#f8f5ea] mb-2">
              Signing you in...
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Redirecting to your repositories
            </p>
            <Loader2 className="mx-auto mt-6 size-8 animate-spin text-green-600" />
          </>
        )}

        {error && (
          <>
            <div className="mx-auto mb-4 size-16 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/30">
              <AlertCircle className="size-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#050402] dark:text-[#f8f5ea] mb-2">
              Sign in failed
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Something went wrong with GitHub authentication.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <img height="16" width="16" className="dark:bg-white rounded" src="https://unpkg.com/simple-icons@v16/icons/GitHub.svg" />
              Try again
            </Button>
          </>
        )}

        {!loginStatus && !error && (
          <>
            <Loader2 className="mx-auto mb-4 size-12 animate-spin text-green-600" />
            <h2 className="text-xl font-bold text-[#050402] dark:text-[#f8f5ea]">
              Processing...
            </h2>
          </>
        )}
      </div>
    </div>
  );
}