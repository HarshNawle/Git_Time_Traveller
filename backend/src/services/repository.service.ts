import { db } from "../db/client.js";
import { repositories } from "../db/index.js";
import { githubRepositorySchema } from "../github/schema/repository.schema.js";
import { repositoryInputSchema } from "../validators/repository.validator.js"


const createRepository = async (url:string) => {
    // validate user input
    const input = repositoryInputSchema.parse({
        url,
    });

    // extract owner and repository name
    const githubUrl = new URL(input.url);

    const [owner, repoName] = githubUrl.pathname.replace(/^\/|\/$/g, "").split("/");

    if(!owner || !repoName) {
        throw new Error("Invalid Github repository URL");
    }

    // Fetch repository from Github
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}`,
        {
            headers: {
                Accept: "application/vnd.github+json",
            },
        }
    );

    if(!response.ok) {
        throw new Error("Failed to fetch repository from Github");
    }

    const data = await response.json();

    // validate github response
    const githubRepository = githubRepositorySchema.parse(data);

    // Check if repository already exists 
    const existingRepository = await db.query.repositories.findFirst({
        where: (repositories, { eq }) => eq(repositories.githubId, githubRepository.id)
    });

    if(existingRepository) {
        return existingRepository;
    }

    // Store repository in PostgreSQL
    const [repository] = await db
    .insert(repositories)
    .values({
        githubId: githubRepository.id,
        name: githubRepository.name,
        fullName: githubRepository.full_name,
        url: githubRepository.html_url,
        owner: githubRepository.owner.login,
        defaultBranch: githubRepository.default_brach,
        sourceType: 'github'
    })
    .returning()

    return repository

}