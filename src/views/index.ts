import { createPresenter, ui } from '@mcpfusion/core';
import { GithubListModel } from '../models/index.js';

interface GithubData {
    type?: string;
    items_raw?: Record<string, any>[];
}

export const GithubPresenter = createPresenter('Github')
  .schema(GithubListModel as any)
  .rules([])
  .limit(100)
  .ui((data: unknown) => {
    const d = data as GithubData;
    let text = `🐙 **GitHub: ${String(d.type || 'RESOURCES').toUpperCase()}**\n\n`;
    const items = d.items_raw || [];
    if (!items.length) text += `> No records found.\n`;
    for (const i of items) {
      text += `- **${i.full_name || i.title || i.name || i.login || 'Record'}**\n`;
      if (i.state) text += `  - State: ${i.state}\n`;
      if (i.description) text += `  - Description: ${i.description}\n`;
      if (i.stargazers_count !== undefined) text += `  - Stars: ⭐ ${i.stargazers_count}\n`;
      if (i.html_url) text += `  - URL: ${i.html_url}\n`;
    }
    return [ui.markdown(text)];
  });
