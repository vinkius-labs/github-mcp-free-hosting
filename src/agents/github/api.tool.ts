import { f } from '../../vurb.js';
import { requireCredential } from '@vurb/core';
import { GithubPresenter } from '../../views/index.js';
import { 
    listUserRepos, 
    getRepo, 
    listIssues, 
    createIssue, 
    listPulls, 
    getFileContents, 
    searchCode, 
    searchRepos, 
    getMyProfile, 
    verifyConnection,
    listBranches,
    listCommits,
    createPullRequest,
    listReleases,
    getIssue,
    addIssueComment,
    listOrgRepos,
    listStargazers
} from '../../engine/github-engine.js';

function gc() { 
    return { token: requireCredential('GITHUB_PERSONAL_ACCESS_TOKEN') }; 
}

export const listReposTool = f.query('list_user_repositories')
  .describe('List user repos.')
  .instructions('Retrieves all public repositories for a specific GitHub username.')
  .withString('username', 'GitHub username')
  .returns(GithubPresenter)
  .handle(async (i) => await listUserRepos(gc(), i.username));

export const getRepoTool = f.query('get_repository_details')
  .describe('Get repo metadata.')
  .instructions('Fetches detailed configuration and attributes for a specific repository.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .returns(GithubPresenter)
  .handle(async (i) => await getRepo(gc(), i.owner, i.repo));

export const listIssuesTool = f.query('list_repo_issues')
  .describe('List repo issues.')
  .instructions('Retrieves a list of issues for a specific repository.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .withOptionalString('state', 'Filter by state (open, closed, all)')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await listIssues(gc(), i.owner, i.repo, i));

export const createIssueTool = f.mutation('create_new_issue')
  .describe('Open an issue.')
  .instructions('Creates a new issue in a specific GitHub repository.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .withString('title', 'Issue title')
  .withOptionalString('body', 'Issue description')
  .returns(GithubPresenter)
  .handle(async (i) => {
      const { owner, repo, ...body } = i;
      return await createIssue(gc(), owner, repo, body);
  });

export const listPullsTool = f.query('list_pull_requests')
  .describe('List pull requests.')
  .instructions('Retrieves a list of pull requests for a specific repository.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .withOptionalString('state', 'Filter by state (open, closed, all)')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await listPulls(gc(), i.owner, i.repo, i));

export const getFileTool = f.query('get_file_contents')
  .describe('Read file content.')
  .instructions('Retrieves the contents of a specific file or directory in a repository.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .withString('path', 'Path to file/directory')
  .returns(GithubPresenter)
  .handle(async (i) => await getFileContents(gc(), i.owner, i.repo, i.path));

export const searchCodeTool = f.query('search_github_code')
  .describe('Search code snippets.')
  .instructions('Finds specific code snippets across GitHub using the search API.')
  .withString('query', 'Search query')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await searchCode(gc(), i.query));

export const searchReposTool = f.query('search_github_repositories')
  .describe('Search all repos.')
  .instructions('Finds repositories across GitHub matching a specific query.')
  .withString('query', 'Search query')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await searchRepos(gc(), i.query));

export const getMyProfileTool = f.query('get_my_github_profile')
  .describe('Get user identity.')
  .instructions('Retrieves metadata for the authenticated GitHub user.')
  .returns(GithubPresenter)
  .handle(async () => await getMyProfile(gc()));

export const checkApiStatusTool = f.query('verify_api_connection')
  .describe('Check connection.')
  .instructions('Retrieves basic metadata to verify GitHub API connectivity.')
  .returns(GithubPresenter)
  .handle(async () => await verifyConnection(gc()));

export const listOrgReposTool = f.query('list_org_repositories')
  .describe('List organization repositories.')
  .instructions('Retrieves all repositories belonging to a specific GitHub organization using the /orgs/ endpoint.')
  .withString('org', 'Organization name')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await listOrgRepos(gc(), i.org));

export const listBranchesTool = f.query('list_branches')
  .describe('List repository branches.')
  .instructions('Returns all branches in a repository with their latest commit SHA and protection status.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await listBranches(gc(), i.owner, i.repo));

export const listCommitsTool = f.query('list_commits')
  .describe('List recent commits.')
  .instructions('Returns commit history for a repository. Optionally filter by branch name or SHA.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .withOptionalString('sha', 'Branch name or commit SHA to list from')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await listCommits(gc(), i.owner, i.repo, i.sha));

export const createPRTool = f.mutation('create_pull_request')
  .describe('Create a pull request.')
  .instructions('Opens a new pull request. Requires the head branch (your changes) and base branch (merge target).')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .withString('title', 'PR title')
  .withString('head', 'Head branch (source of changes)')
  .withString('base', 'Base branch (merge target, e.g. main)')
  .withOptionalString('body', 'PR description')
  .returns(GithubPresenter)
  .handle(async (i) => {
      const { owner, repo, ...body } = i;
      return await createPullRequest(gc(), owner, repo, body);
  });

export const listReleasesTool = f.query('list_releases')
  .describe('List repository releases.')
  .instructions('Returns published releases with tag names, assets, and release notes.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await listReleases(gc(), i.owner, i.repo));

export const getIssueTool = f.query('get_issue_details')
  .describe('Get a specific issue by number.')
  .instructions('Fetches full issue details including body, labels, assignees, and comments count.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .withNumber('number', 'Issue number')
  .returns(GithubPresenter)
  .handle(async (i) => await getIssue(gc(), i.owner, i.repo, i.number));

export const addCommentTool = f.mutation('add_issue_comment')
  .describe('Add a comment to an issue or PR.')
  .instructions('Posts a new comment on an existing issue or pull request. Supports markdown formatting.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .withNumber('number', 'Issue or PR number')
  .withString('body', 'Comment text (markdown supported)')
  .returns(GithubPresenter)
  .handle(async (i) => await addIssueComment(gc(), i.owner, i.repo, i.number, i.body));

export const listStargazersTool = f.query('list_stargazers')
  .describe('List repository stargazers.')
  .instructions('Returns users who have starred a repository. Useful for popularity tracking.')
  .withString('owner', 'Repo owner')
  .withString('repo', 'Repo name')
  .egress(2 * 1024 * 1024)
  .returns(GithubPresenter)
  .handle(async (i) => await listStargazers(gc(), i.owner, i.repo));
