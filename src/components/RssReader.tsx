import React, { useState, useEffect, useRef } from "react";
import { z } from "zod";

const urlSchema = z.string().url();
const feedItemSchema = z.object({
  title: z.string(),
  contentSnippet: z.string(),
});
type FeedItem = z.infer<typeof feedItemSchema>;

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
        fetch(url)
          .then((response) => response.text())
          .then((str) =>
            new window.DOMParser().parseFromString(str, "text/xml")
          )
          .then((data) => {
            setDataExists(true);
            setTitle(data.querySelector("title")?.innerHTML || "");
            const items = data.querySelectorAll("item");
            let itemsArr: FeedItem[] = [];
            items.forEach((item) => {
              itemsArr.push({
                title: item.querySelector("title")?.innerHTML || "",
                contentSnippet:
                  item.querySelector("description")?.innerHTML || "",
              });
            });
            setFeedItems(itemsArr);
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
        placeholder="https://onekiji.com/feed.xml"
      />
      <div id="feed" className={dataExists ? "expand" : ""} ref={feedRef}>
        <h1>{title}</h1>
        {feedItems.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>{item.contentSnippet}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default RssReader;
