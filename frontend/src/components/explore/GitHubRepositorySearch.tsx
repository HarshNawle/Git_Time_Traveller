import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GitHubRepositorySearchProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function GitHubRepositorySearch({
  onSearch,
  loading = false,
}: GitHubRepositorySearchProps) {
  const [query, setQuery] = useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query.trim());
      }}
    >
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search GitHub repositories..."
        aria-label="Search GitHub repositories"
      />

      <Button type="submit" disabled={loading || !query.trim()}>
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
}