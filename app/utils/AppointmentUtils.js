
export function removeDashesAndCapitalizeEachWord(str) {
  const words = str.match(/([^-]+)/g) || [];
  words.forEach((word, i) => {
    words[i] = word[0].toUpperCase() + word.slice(1);
  });
  return words.join(' ');
}

export function capitalizeFirstLetter(word) {
  return (word ? (word.charAt(0).toUpperCase().concat(word.slice(1))) : '');
}
