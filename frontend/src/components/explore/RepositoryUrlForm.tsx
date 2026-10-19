import { useState, type FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useSubmitRepo } from "@/hooks/mutations/use-submit-repo";

export default function RepositoryUrlForm() {
    const [url, setUrl] = useState("");
    // const navigate = useNavigate();
    //   const mutation = useSubmitRepo();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const normalizedUrl = url.trim();

        if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(normalizedUrl)) {
            toast.error("Enter a valid public GitHub repository URL.");
            return;
        }

        // mutation.mutate(
        //   { url: normalizedUrl },
        //   {
        //     onSuccess: (result) => {
        //       // Adapt this to your actual mutation response.
        //       const jobId = result?.id;

        //       if (jobId) {
        //         navigate(`/analysis/${jobId}`);
        //       } else {
        //         toast.success("Repository submitted successfully.");
        //       }
        //     },
        //     onError: () => {
        //       toast.error("Unable to submit the repository.");
        //     },
        //   },
        // );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
                <img height="20" width="20" className="dark:bg-white rounded-lg" src="https://unpkg.com/simple-icons@v16/icons/GitHub.svg" />


                <Input
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://github.com/owner/repository"
                    className="pl-9"
                    type="url"
                    required
                />
            </div>

            {/* <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Analyze repository
            </Button> */}
        </form>
    );
}