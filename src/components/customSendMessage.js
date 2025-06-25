import axios from "axios";

// const API_URL = "http://localhost:3001/v1/chat/completions";
// const MODEL = "gpt-3.5-turbo";

async function customSendMessage(request, _options, instance) {
  const userInput = request.input.text;

  try {
    const response = await axios.post('http://localhost:3001/v1/chat/completions',  {
      messages: [
        { role: "system", content: "You are a WatsonX assistant." },
        { role: "user", content: userInput },
      ],
      endpointKey: "watsonx"
    });

    const replyText = response.data?.choices?.[0]?.message?.content;

    instance.messaging.addMessage({
      output: {
        generic: [
          {
            response_type: "text",
            text: replyText || "No response received.",
          },
        ],
      },
    });
  } catch (err) {
    console.error("Error calling backend:", err);
    instance.messaging.addMessage({
      output: {
        generic: [
          {
            response_type: "text",
            text: "Sorry, something went wrong contacting the server.",
          },
        ],
      },
    });
  }
}

export { customSendMessage };
