import net from "node:net";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const what =
  process.env.WHAT ||
  "an HTTP server, serving static pages with relative links all nested inside the original path";

const server = net.createServer((socket) => {
  let request = "";
  let dataTimeout = null;

  const messages = [
    {
      role: "system",
      content: `
You are ${what}.
Just respond with a made-up raw response without a preamble or follow-up text.
Don't keep the response too short.
Unleash your creativity!
      `.trim(),
    },
  ];

  socket.on("data", (chunk) => {
    clearTimeout(dataTimeout);

    dataTimeout = setTimeout(async () => {
      clearTimeout(dataTimeout);

      console.log("Request:", request);

      messages.push({
        role: "user",
        content: request,
      });

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        temperature: 1,
        max_tokens: 3000,
        messages,
      });

      const response = completion.data.choices[0].message.content;

      console.log("Response:", response);

      messages.push({
        role: "assistant",
        content: response,
      });

      socket.write(Buffer.from(response));
      socket.end();
    }, 250);

    request += chunk.toString();
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
