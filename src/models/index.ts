import { defineModel } from '@vurb/core';

export const GithubListModel = defineModel('GithubList', m => {
  m.casts({
    type: m.string('Resource type'),
    items: m.text('JSON array')
  });
});
