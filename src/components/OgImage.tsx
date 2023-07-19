import satori from "satori";
import sharp from "sharp";

export async function getOgImage(title: string) {
  const [width, height] = [1200, 630];
  const fontData = (await getFontData()) as ArrayBuffer;
  const japaneseFontData = (await getFontData(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700"
  )) as ArrayBuffer;
  const fontSize = 50;
  const svg = await satori(
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "#dcdcdc",
        padding: "20px",
        fontFamily: "Atkinson Hyperlegible, Noto Sans JP, sans-serif",
        color: "#5a5a5a",
      }}
    >
      <h1
        style={{
          fontSize: `${fontSize}px`,
          textAlign: "center",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          position: "absolute",
          bottom: "5px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <img
          src="data:image/png;base64,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AAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAFCAAAAABQgAAAAAAABQgAAAAAUIAAAAAAAAUIAAAAAFCAAAAAAAAF/D+u8rn5xuWx3gAAAABJRU5ErkJggg=="
          height={48}
          width={48}
        />
        One Kiji
      </p>
    </main>,
    {
      width: width,
      height: height,
      fonts: [
        {
          name: "Atkinson Hyperlegible",
          data: fontData,
          style: "normal",
        },
        {
          name: "Noto Sans JP",
          data: japaneseFontData,
          style: "normal",
        },
      ],
    }
  );
  return await sharp(Buffer.from(svg)).png().toBuffer();
}

async function getFontData(
  API = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@700"
) {
  const css = await (
    await fetch(API, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) return;

  return await fetch(resource[1]).then((res) => res.arrayBuffer());
}
