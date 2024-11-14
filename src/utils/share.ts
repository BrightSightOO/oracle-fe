export const shareTweet = (content: string) => {
  let twitterParameters = [];
  twitterParameters.push('text=' + encodeURI(content));
  const url = 'https://twitter.com/intent/tweet?' + twitterParameters.join('&');
  window.open(url);
};
