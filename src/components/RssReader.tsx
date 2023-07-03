import React, { useState, useEffect, useRef } from "react";
import { z } from "zod";

const rss2json = "https://api.rss2json.com/v1/api.json?rss_url=";

const urlSchema = z.string().url();
const feedItemSchema = z.object({
  author: z.string(),
  description: z.string(),
  title: z.string(),
  pubDate: z.string(),
  link: z.string().url(),
  content: z.string(),
});
type FeedItem = z.infer<typeof feedItemSchema>;
const rssJsonSchema = z.object({
  status: z.union([z.literal("ok"), z.literal("error")]),
  feed: z.object({
    author: z.string(),
    description: z.string(),
    image: z.string().url(),
    link: z.string().url(),
    title: z.string(),
    url: z.string().url(),
  }),
  items: z.array(feedItemSchema),
});

const RssReader = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [dataExists, setDataExists] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  const resetData = () => {
    setTitle("");
    setFeedItems([]);
    setDataExists(false);
  };

  useEffect(() => {
    if (urlSchema.safeParse(url).success) {
      (async () => {
        fetch(rss2json + url)
          .then((response) => response.text())
          .then((str) => JSON.parse(str.replace(/<[^>]+>|&nbsp;/g, "").trim()))
          .then((data) => {
            if (
              !rssJsonSchema.safeParse(data).success ||
              data.status !== "ok"
            ) {
              throw new Error("invalid data");
            }
            const rssJson = rssJsonSchema.parse(data);
            setTitle(rssJson.feed.title);
            setFeedItems(rssJson.items);
            setDataExists(true);
          })
          .catch((err) => {
            resetData();
            console.error("error fetching data");
          });
      })();
    } else {
      resetData();
    }
  }, [url]);

  return (
    <>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/feed"
      />
      <div id="feed">
        <h1>{title}</h1>
        {feedItems.map((item, index) => (
          <div key={index} className="feed-item">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default RssReader;
