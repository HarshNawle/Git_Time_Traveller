import { githubRequest } from "./github.client.js";
import { GithubRepository, githubRepositorySchema } from "./schema/repository.schema.js";


export async function getGithubRepository(
  owner: string,
  repoName: string
): Promise<GithubRepository> {
  const data = await githubRequest<unknown>(
    `/repos/${owner}/${repoName}`
  );

  const repository = githubRepositorySchema.parse(data);

  return repository;
}
