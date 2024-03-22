export const formatFirstLetterUpper = (name) => {
  return name
    .split('-')
    .map((s) => s[0].toUpperCase() + s.substring(1))
    .join(' ')
    .split('_')
    .map((s) => s[0].toUpperCase() + s.substring(1))
    .join(' ');
};

export const formatGenTitle = (gen) => {
  let [start, end] = gen.split('-');
  return start[0].toUpperCase() + start.slice(1) + ' ' + end.toUpperCase();
};
