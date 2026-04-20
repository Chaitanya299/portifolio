export interface RepoStats {
  name: string;
  description: string;
  language: string;
  url: string;
}

export async function fetchRepoDetails(repoName: string): Promise<RepoStats | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    console.error("GITHUB_USERNAME is not defined in environment variables");
    return null;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
      headers: token ? { Authorization: `token ${token}` } : {},
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      name: data.name,
      description: data.description,
      language: data.language,
      url: data.html_url
    };
  } catch (error) {
    console.error(`Error fetching repo details for ${repoName}:`, error);
    return null;
  }
}
