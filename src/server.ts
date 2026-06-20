#!/usr/bin/env node
import { startServer } from '@mcpfusion/core';
import { f } from './mcpfusion.js';
import { credentials } from './credentials.js';
import * as tools from './agents/github/api.tool.js';

async function main() {
  const r = f.registry();
  
  for (const tool of Object.values(tools)) {
    if (tool && typeof (tool as any).getName === 'function') {
      r.register(tool as any);
    }
  }

  await startServer({
    name: 'github-mcp',
    version: '1.0.0',
    registry: r,
    credentials
  });
}

main().catch(console.error);
