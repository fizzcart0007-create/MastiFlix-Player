export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MastiFlix Player</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #000;
      color: #fff;
      font-family: Arial, sans-serif;
      min-height: 100vh;
    }

    .header {
      padding: 16px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }

    video {
      width: 100%;
      max-height: 75vh;
      background: #000;
      display: block;
    }

    .message {
      text-align: center;
      padding: 25px;
      color: #aaa;
    }
  </style>
</head>

<body>

  <div class="header">
    🎬 MastiFlix
  </div>

  <video
    id="player"
    controls
    playsinline
    preload="metadata"
  ></video>

  <div class="message">
    MastiFlix Player Ready
  </div>

</body>
</html>
  `);
}
