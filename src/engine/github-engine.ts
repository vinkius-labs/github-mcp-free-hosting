export interface GithubConfig { token: string; }
const BASE = 'https://api.github.com';

async function fetchGithub(config: GithubConfig, path: string, method = 'GET', body?: any) {
    const opts: RequestInit = {
        method,
        headers: {
            'Authorization': `Bearer ${config.token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'Vinkius-MCP-GitHub'
        }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${BASE}${path}`, opts);
    if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        throw new Error(`GitHub API Error [${res.status}]: ${res.statusText} ${errBody}`);
    }
    return res.status === 204 ? { success: true } : await res.json();
}

function wrapList(type: string, data: any) {
    const items = data.items || (Array.isArray(data) ? data : [data]);
    return { type, items: JSON.stringify(items), items_raw: items };
}

export async function listUserRepos(config: GithubConfig, username: string) {
    return wrapList('repositories', await fetchGithub(config, `/users/${username}/repos?sort=updated`));
}

export async function getRepo(config: GithubConfig, owner: string, repo: string) {
    return wrapList('repository', await fetchGithub(config, `/repos/${owner}/${repo}`));
}

export async function listIssues(config: GithubConfig, owner: string, repo: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return wrapList('issues', await fetchGithub(config, `/repos/${owner}/${repo}/issues${query}`));
}

export async function createIssue(config: GithubConfig, owner: string, repo: string, body: any) {
    return wrapList('issue_created', await fetchGithub(config, `/repos/${owner}/${repo}/issues`, 'POST', body));
}

export async function listPulls(config: GithubConfig, owner: string, repo: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return wrapList('pull_requests', await fetchGithub(config, `/repos/${owner}/${repo}/pulls${query}`));
}

export async function getFileContents(config: GithubConfig, owner: string, repo: string, path: string) {
    return wrapList('file_contents', await fetchGithub(config, `/repos/${owner}/${repo}/contents/${path}`));
}

export async function searchCode(config: GithubConfig, q: string) {
    return wrapList('search_results', await fetchGithub(config, `/search/code?q=${encodeURIComponent(q)}`));
}

export async function searchRepos(config: GithubConfig, q: string) {
    return wrapList('search_results', await fetchGithub(config, `/search/repositories?q=${encodeURIComponent(q)}`));
}

export async function getMyProfile(config: GithubConfig) {
    return wrapList('profile', await fetchGithub(config, '/user'));
}

export async function verifyConnection(config: GithubConfig) {
    return wrapList('account_check', await fetchGithub(config, '/user'));
}

export async function listBranches(config: GithubConfig, owner: string, repo: string) {
    return wrapList('branches', await fetchGithub(config, `/repos/${owner}/${repo}/branches`));
}

export async function listCommits(config: GithubConfig, owner: string, repo: string, sha?: string) {
    const q = sha ? `?sha=${encodeURIComponent(sha)}` : '';
    return wrapList('commits', await fetchGithub(config, `/repos/${owner}/${repo}/commits${q}`));
}

export async function createPullRequest(config: GithubConfig, owner: string, repo: string, body: any) {
    return wrapList('pr_created', await fetchGithub(config, `/repos/${owner}/${repo}/pulls`, 'POST', body));
}

export async function listReleases(config: GithubConfig, owner: string, repo: string) {
    return wrapList('releases', await fetchGithub(config, `/repos/${owner}/${repo}/releases`));
}

export async function getIssue(config: GithubConfig, owner: string, repo: string, number: number) {
    return wrapList('issue', await fetchGithub(config, `/repos/${owner}/${repo}/issues/${number}`));
}

export async function addIssueComment(config: GithubConfig, owner: string, repo: string, number: number, body: string) {
    return wrapList('comment_created', await fetchGithub(config, `/repos/${owner}/${repo}/issues/${number}/comments`, 'POST', { body }));
}

export async function listOrgRepos(config: GithubConfig, org: string) {
    return wrapList('repositories', await fetchGithub(config, `/orgs/${org}/repos?sort=updated`));
}

export async function listStargazers(config: GithubConfig, owner: string, repo: string) {
    return wrapList('stargazers', await fetchGithub(config, `/repos/${owner}/${repo}/stargazers`));
}
