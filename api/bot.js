export default async function handler(req, res) {
  try {
    const update = req.body;

    if (update?.message?.video) {
      const video = update.message.video;
      const fileId = video.file_id;
      const chatId = update.message.chat.id;

      await fetch(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: `✅ Video received!\n\nFile ID:\n${fileId}`
          })
        }
      );
    }

    return res.status(200).json({
      ok: true
    });

  } catch (error) {
    console.error("BOT ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
