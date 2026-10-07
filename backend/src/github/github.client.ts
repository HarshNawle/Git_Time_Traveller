// const GITHUB_API_URL = "https://api.github.com";

// export async function githubRequest<T>(
//     endpoint: string,
//     options?: RequestInit
// ) : Promise<T> {
//     const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
//         ...options,
//         headers: {
//             Accept: "application/vnd.github+json",
//             "X-GitHub-Api-Version" : "2022-11-28",
//             ...options?.headers,
//         },
//     });

//     if(!response.ok) {
//         const errorBody = await response.text();

//         throw new Error(
//             `GitHub API Error: ${response.status} ${response.statusText} _ ${errorBody}`
//         );
//     }

//     return response.json as Promise<T>;
// }

const GITHUB_API_URL = "https://api.github.com";

export async function githubRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "Git-Time-Traveller",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
      ...options?.headers,
    },
    signal: options?.signal ?? AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `GitHub API Error: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  return (await response.json()) as T;
}