import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./QueryProvider";


export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {children}
      <Toaster
        position="bottom-right"
      />
    </QueryProvider>
  );
}