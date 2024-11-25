import { uniq } from 'lodash';

import { normalizeHashtag } from './normalizeHashtag';

export const extractUniqueHashtags = (tweetContent: string): string[] => {
  const hashtags = tweetContent.match(/#[\w\d_]+/g) || [];
  const normalizedHashtags = hashtags.map(normalizeHashtag);
  const uniqueHashtags = uniq(normalizedHashtags);

  return uniqueHashtags;
};
