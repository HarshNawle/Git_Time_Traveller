import {
    ArrowRight,
    Link2,
    Loader2,
  } from "lucide-react";
  
  import {
    useForm,
  } from "react-hook-form";
  
  import {
    zodResolver,
  } from "@hookform/resolvers/zod";
  
  import { useNavigate } from "react-router-dom";
  
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  
  import {
    repositorySchema,
    type RepositoryFormValues,
  } from "@/utils/validation";
  
  import { useSubmitRepoMutation } from "@/hooks/mutations/use-submit-repo";
import { toast } from "sonner";
  
  export function RepoInput() {
    const navigate = useNavigate();
  
    const mutation =
      useSubmitRepoMutation();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RepositoryFormValues>({
      resolver: zodResolver(
        repositorySchema
      ),
      mode: "onChange",
    });
  
    const onSubmit = async (
      values: RepositoryFormValues
    ) => {
      try {
        const job = await mutation.mutateAsync(
          values.url
        );
  
        navigate(`/analyze/${job.id}`);
      } catch {
        // Sonner toast will be added here
        toast.error(
            "Couldn't start analysis. Please try again."
        );
      };
    };
  
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[680px]"
      >
        <div
          className={`
            flex
            flex-col
            overflow-hidden
            rounded-2xl
            border-[3px]
            border-black
            bg-white
            p-1
            shadow-[6px_6px_0px_#09090b]
            sm:flex-row
            ${
              errors.url
                ? "border-red-500"
                : ""
            }
          `}
        >
          <div className="relative flex flex-1 items-center">
            <Link2
              className="
                absolute
                left-4
                size-5
                text-blue-600
              "
            />
  
            <Input
              {...register("url")}
              placeholder="Paste a GitHub repository URL..."
              className="
                h-14
                border-0
                pl-12
                shadow-none
                focus-visible:ring-0
              "
            />
          </div>
  
          <Button
            type="submit"
            disabled={
              mutation.isPending
            }
            className="
              h-14
              rounded-xl
              border-2
              border-black
              bg-gradient-to-r
              from-blue-500
              to-violet-600
              px-8
              font-bold
              text-white
            "
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                Visualize
                <ArrowRight className="ml-2 size-5" />
              </>
            )}
          </Button>
        </div>
  
        {errors.url && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {errors.url.message}
          </p>
        )}
      </form>
    );
  }