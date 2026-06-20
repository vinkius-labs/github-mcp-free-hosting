import { defineCredentials } from '@mcpfusion/core';

export const credentials = defineCredentials({
    GITHUB_PERSONAL_ACCESS_TOKEN: {
        label: 'GitHub PAT',
        description: 'Your GitHub Personal Access Token (classic or fine-grained).',
        placeholder: 'ghp_your_token',
        type: 'api_key',
        required: true,
        sensitive: true,
        group: 'Code',
        docs_url: 'https://github.com/settings/tokens'
    }
});
