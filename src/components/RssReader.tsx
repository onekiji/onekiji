import React, { useEffect, useState } from "react";
import { z } from "zod";

import { Dialog } from "@headlessui/react";

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
    image: z.string(),
    link: z.string(),
    title: z.string(),
    url: z.string(),
  }),
  items: z.array(feedItemSchema),
});

const RssReader = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [dataExists, setDataExists] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get("url");
    if (urlParam) {
      setUrl(urlParam);
    }
  }, []);

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
            console.error("error fetching data", err);
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
      {dataExists && (
        <div id="feed">
          <h1>{title}</h1>
          {feedItems.map((item, index) => (
            <FeedItemComponent key={index} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default RssReader;

const FeedItemComponent = ({ item }: { item: FeedItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="feed-item">
      <button onClick={() => setIsOpen(true)}>
        <h2>{item.title}</h2>
        <p>
          <time>{new Date(item.pubDate).toDateString()}</time>
        </p>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          style={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "var(--darkwhite)",
          }}
        >
          <Dialog.Panel className="dialog-panel">
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
            ></button>
            <article>
              <Dialog.Title>{item.title}</Dialog.Title>
              <Dialog.Description>{item.content}</Dialog.Description>
            </article>
          </Dialog.Panel>
        </Dialog>
      </button>
    </div>
  );
};
