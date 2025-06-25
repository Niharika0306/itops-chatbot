import { MessageResponseTypes } from "@carbon/ai-chat";

const HISTORY = [
  {
    message: {
      id: "1",
      input: { text: "text 1", message_type: "text" },
    },
    time: new Date().toISOString(),
  },
  {
    message: {
      id: "2",
      output: {
        generic: [
          {
            text: new Array(40).fill("words from history").join(" "),
            response_type: MessageResponseTypes.TEXT,
          },
        ],
      },
    },
    time: new Date().toISOString(),
  },
  {
    message: {
      id: "3",
      input: { text: "some more words from history", message_type: "text" },
    },
    time: new Date().toISOString(),
  },
  {
    message: {
      id: "4",
      output: {
        generic: [
          {
            text: new Array(100).fill("more words").join(" "),
            response_type: MessageResponseTypes.TEXT,
          },
        ],
      },
    },
    time: new Date().toISOString(),
  },
];

async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function customLoadHistory(instance) {
  await sleep(3000);
  return HISTORY;
}

export { customLoadHistory };
