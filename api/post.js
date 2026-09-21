const CHANNEL_ID = "-1004372527859";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST" && req.method !== "GET") {
      return res.status(405).json({
        ok: false,
        error: "Method not allowed"
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Post API is ready",
      channel_id: CHANNEL_ID
    });

  } catch (error) {
    console.error("POST ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
