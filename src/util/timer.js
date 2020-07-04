export default () => {
  const time = Date.now();
  return { start: () => ({ end: () => Date.now() - time }) };
};
