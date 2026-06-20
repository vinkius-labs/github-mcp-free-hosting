# GitHub MCP Free Hosting Showcase

This repository serves as a **showcase** to demonstrate how incredibly simple and fast it is to deploy an MCP server on [Vinkius Cloud](https://vinkius.com). 

Built using the powerful [@mcpfusion/core](https://github.com/vinkius-labs/mcpfusion) framework, this project illustrates the modern approach to creating secure, edge-native MCP servers with zero friction.

🚀 **Ready to use?** If you just want to add GitHub tools to your AI agent immediately, you can use the hosted version here:  
👉 **[vinkius.com/mcp/github](https://vinkius.com/mcp/github)**

## About Vinkius Cloud

[Vinkius Cloud](https://vinkius.com) is the premier platform for deploying MCP (Model Context Protocol) servers. It provides an enterprise-grade execution environment designed for performance, security, and developer experience.

- **Edge-Native Architecture**: Your MCP servers run inside V8 isolate sandboxes globally, delivering sub-40ms cold starts.
- **Secure by Default**: Built-in DLP (Data Loss Prevention) redaction, Ed25519 signed audit chains, and an instant kill switch.
- **Zero Friction Deployment**: No complex DevOps required. You can deploy your MCP tools to production in seconds.
- **Massive Ecosystem**: Powering over 4,000+ MCP servers in production, including integrations with Salesforce, Stripe, Slack, OpenAI, and more.

## Available Tools

This GitHub MCP server exposes a comprehensive suite of tools for AI agents to interact with GitHub seamlessly:

* **Repositories**
  * `list_user_repositories`: Retrieves all public repositories for a specific user.
  * `list_org_repositories`: Retrieves all repositories belonging to an organization.
  * `get_repository_details`: Fetches detailed configuration and attributes.
  * `search_github_repositories`: Finds repositories matching a search query.
* **Issues & Pull Requests**
  * `list_repo_issues`: Retrieves issues for a specific repository.
  * `get_issue_details`: Fetches full issue details including comments and assignees.
  * `create_new_issue`: Opens a new issue.
  * `add_issue_comment`: Posts a new comment on an existing issue or PR.
  * `list_pull_requests`: Retrieves pull requests.
  * `create_pull_request`: Opens a new pull request.
* **Code & History**
  * `get_file_contents`: Retrieves the contents of a file or directory.
  * `search_github_code`: Finds specific code snippets across GitHub.
  * `list_branches`: Returns all branches with their latest commit SHA.
  * `list_commits`: Returns commit history, optionally filtered by branch or SHA.
  * `list_releases`: Returns published releases, tags, and assets.
* **Users & Social**
  * `get_my_github_profile`: Retrieves metadata for the authenticated user.
  * `list_stargazers`: Returns users who have starred a repository.
* **System**
  * `verify_api_connection`: Checks GitHub API connectivity.

## Deployment

To deploy this MCP Server to Vinkius Edge infrastructure, run:

```bash
npm run deploy
```
*(This executes `mcpfusion deploy` under the hood)*

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

## About MCP Fusion

[MCP Fusion](https://github.com/vinkius-labs/mcpfusion) is the TypeScript framework for secure MCP servers. It enforces security at the architectural level, ensuring raw data never reaches an LLM without passing through a typed egress firewall. 
