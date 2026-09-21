export default async function handler(req, res) {
  try {
    const update = req.body;

    if (update?.message?.chat?.id) {
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
            text: "🎬 MastiFlix Player is working!"
          })
        }
      );
    }

    return res.status(200).json({
      ok: true
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
