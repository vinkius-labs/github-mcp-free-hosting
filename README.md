# GitHub MCP Free Hosting Showcase

This repository serves as a **showcase** to demonstrate how incredibly simple and fast it is to deploy an MCP server on [Vinkius Cloud](https://vinkius.com). 

Built using the powerful [@mcpfusion/core](https://github.com/vinkius-labs/mcpfusion) framework, this project illustrates the modern approach to creating secure, edge-native MCP servers with zero friction.

## Features

- **Built with MCP Fusion**: Takes full advantage of TypeScript-first, secure-by-default architecture provided by [MCP Fusion](https://github.com/vinkius-labs/mcpfusion).
- **Edge-Ready**: Designed to be deployed on V8 isolates with sub-40ms cold starts.
- **Showcase Repository**: A working, real-world example of GitHub integration via MCP, ready to be inspected and deployed.

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

MCP Fusion is the TypeScript framework for secure MCP servers. It enforces security at the architectural level, ensuring raw data never reaches an LLM without passing through a typed egress firewall. 

Learn more at [github.com/vinkius-labs/mcpfusion](https://github.com/vinkius-labs/mcpfusion).
