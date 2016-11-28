const google = require('googleapis');
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.KEY,
});

const q = {
  // Web Not Bombs
  // https://www.youtube.com/channel/UCmqmf7pjXAOtkYZiUzN6-Iw
  channelId: 'UCmqmf7pjXAOtkYZiUzN6-Iw',
  part: 'snippet,id',
  order: 'date',
  maxResults: 20,
};

function shortenSnippet({ publishedAt, title }) {
  return { publishedAt, title };
}

youtube.search.list(q, function (err, list) {
  if (err) {
    return console.error(err, 'failed to list channel videos');
  }

  // list.items.forEach(i => console.log(i));
  list.items.forEach(({ id, snippet }) => {
    console.log({ id, snippet: shortenSnippet(snippet) });
  });
});
