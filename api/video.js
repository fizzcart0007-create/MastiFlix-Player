import { get } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({
        ok: false,
        error: "Token missing"
      });
    }

    // Get private video information from Blob
    const result = await get(`play/${token}.json`, {
      access: "private",
      useCache: false
    });

    const text = await new Response(result.stream).text();
    const data = JSON.parse(text);

    const fileId = data.file_id;

    if (!fileId) {
      return res.status(404).json({
        ok: false,
        error: "Video not found"
      });
    }

    // Get Telegram file path
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${encodeURIComponent(fileId)}`
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      return res.status(500).json({
        ok: false,
        error: "Telegram file not found"
      });
    }

    const filePath = telegramData.result.file_path;

    const videoUrl =
      `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;

    return res.status(200).json({
      ok: true,
      video_url: videoUrl
    });

  } catch (error) {
    console.error("VIDEO ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: "Unable to load video"
    });
  }
}
