import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./QueryProvider";
import { AuthInitializer } from "@/components/auth/AuthInitializer";


export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthInitializer />
      {children}
      <Toaster
        position="bottom-right"
      />
    </QueryProvider>
  );
}