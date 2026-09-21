const queue = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { file_id } = req.body || {};

    if (!file_id) {
      return res.status(400).json({
        ok: false,
        error: "file_id required"
      });
    }

    queue.push({
      file_id,
      added_at: new Date().toISOString()
    });

    return res.status(200).json({
      ok: true,
      message: "Video added to queue",
      queue_length: queue.length
    });
  }

  return res.status(200).json({
    ok: true,
    queue
  });
}
