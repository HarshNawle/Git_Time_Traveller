import { Link } from "react-router-dom";
import { Compass, FolderGit2, Plus, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Button asChild className="justify-start">
        <Link to="/explore">
          <Plus className="mr-2 h-4 w-4" />
          Analyze repository
        </Link>
      </Button>

      <Button asChild variant="outline" className="justify-start">
        <Link to="/repositories">
          <FolderGit2 className="mr-2 h-4 w-4" />
          My repositories
        </Link>
      </Button>

      <Button asChild variant="outline" className="justify-start">
        <Link to="/explore">
          <Compass className="mr-2 h-4 w-4" />
          Explore GitHub
        </Link>
      </Button>

      <Button asChild variant="outline" className="justify-start">
        <Link to="/settings">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </Button>
    </div>
  );
}