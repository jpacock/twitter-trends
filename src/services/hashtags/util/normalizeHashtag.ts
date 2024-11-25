export const normalizeHashtag = (hashtag: string): string => {
  return hashtag.toLowerCase().replace(/[^a-z0-9_]/g, '');
};
