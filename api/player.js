export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MastiFlix Player</title>

  <style>
    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100%;
      background: #000;
      color: #fff;
      font-family: Arial, sans-serif;
    }

    .header {
      padding: 18px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }

    .player-box {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      background: #000;
    }

    video {
      width: 100%;
      max-height: 75vh;
      display: block;
      background: #000;
    }

    .message {
      text-align: center;
      padding: 25px 15px;
      color: #aaa;
      font-size: 15px;
    }
  </style>
</head>

<body>

  <div class="header">
    🎬 MastiFlix Player
  </div>

  <div class="player-box">
    <video
      id="player"
      controls
      playsinline
      preload="metadata"
    ></video>
  </div>

  <div class="message" id="message">
    MastiFlix Player Ready
  </div>

  <script>
    const player = document.getElementById("player");
    const message = document.getElementById("message");

    message.textContent = "MastiFlix Player Ready";
  </script>

</body>
</html>
  `);
}
