export default function handler(req, res) {
  if (req.method === "POST") {
    const { question } = JSON.parse(req.body);

    const responses = [
      "Конечно, могу помочь!",
      "Интересный вопрос...",
      "Я подумаю над этим.",
      "Попробуем разобраться вместе!"
    ];
    const emotions = ["neutral", "thinking", "happy", "sad"];

    const text = responses[Math.floor(Math.random() * responses.length)];
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];

    res.status(200).json({ text, emotion });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
