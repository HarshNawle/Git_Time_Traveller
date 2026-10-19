import { Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ExploreRepository {
    id: number;
    fullName: string;
    description?: string | null;
    stars: number;
    url: string;
}

interface ExploreRepositoryCardProps {
    repository: ExploreRepository;
    onAnalyze: (url: string) => void;
}

export default function ExploreRepositoryCard({
    repository,
    onAnalyze,
}: ExploreRepositoryCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <img height="20" width="20" className="dark:bg-white rounded-lg" src="https://unpkg.com/simple-icons@v16/icons/GitHub.svg" />

                    <span className="break-all">{repository.fullName}</span>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
                    {repository.description || "No description available"}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        {repository.stars.toLocaleString()}
                    </span>

                    <Button size="sm" onClick={() => onAnalyze(repository.url)}>
                        Analyze
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}