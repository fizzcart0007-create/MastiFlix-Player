import { put, head } from "@vercel/blob";

const QUEUE_FILE = "queue.json";

async function getQueue() {
  try {
    const blob = await head(QUEUE_FILE);
    const response = await fetch(blob.url);
    return await response.json();
  } catch {
    return [];
  }
}

async function saveQueue(queue) {
  await put(
    QUEUE_FILE,
    JSON.stringify(queue),
    {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json"
    }
  );
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const queue = await getQueue();

      return res.status(200).json({
        ok: true,
        queue
      });
    }

    if (req.method === "POST") {
      const { file_id } = req.body || {};

      if (!file_id) {
        return res.status(400).json({
          ok: false,
          error: "file_id required"
        });
      }

      const queue = await getQueue();

      queue.push({
        file_id,
        added_at: new Date().toISOString()
      });

      await saveQueue(queue);

      return res.status(200).json({
        ok: true,
        message: "Video added to queue",
        queue_length: queue.length
      });
    }

    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });

  } catch (error) {
    console.error("QUEUE ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
