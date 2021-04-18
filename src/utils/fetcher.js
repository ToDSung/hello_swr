export const fetcher = (url) => {
  console.log('fetching ...'); // ADD
  return fetch(url)
    .then(r => r.json())
}