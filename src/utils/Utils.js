export const formatFirstLetterUpper = (name) => {
  return name
    .split('-')
    .map((s) => s[0].toUpperCase() + s.substring(1))
    .join(' ');
};

export const formatWeight = (weight) => {
  return `${weight / 10.0} Kg`;
};
