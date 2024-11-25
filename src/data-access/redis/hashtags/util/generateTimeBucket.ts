export const generateTimeBucket = () => {
  const now = new Date();
  return now.toISOString();
};
