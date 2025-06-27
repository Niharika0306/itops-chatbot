import axios from "axios";

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
    // const docs = response.data?.docs || [];
    const docs = [{"name": "Doc 1", "link": "https://www.ibm.com/docs/en/power10/9105-22A?topic=overview-hmc-operations"},
       {"name": "Doc 2", "link": "https://www.ibm.com/docs/en/power10/9105-22A?topic=overview-hmc-operations"}]

    // Main text response
    instance.messaging.addMessage({
      output: {
        generic: [
          {
            response_type: "text",
            text: replyText || "No response received.",
          },
          {
            response_type: "user_defined",
            user_defined: {
              user_defined_type: "reference_docs_button",
              docs,
              original_text: replyText,
              button_label: "Get reference documents",
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error("Error contacting RAG server:", err);
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
