import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ChatContainer,
  ChatCustomElement,
  BusEventType,
  FeedbackInteractionType,
  CornersType,
  MinimizeButtonIconType,
  PublicConfig,
} from "@carbon/ai-chat";
import "./App.scss"
import HeaderNav from "./Header.jsx"
import { Theme, Content } from "@carbon/react";
import { customLoadHistory } from "./customLoadHistory.js";
import { customSendMessage } from "./customSendMessage.js";
import { renderUserDefinedResponse } from "./renderUserDefinedResponse.js";

const config = {
  messaging: {
    customSendMessage,
    customLoadHistory
  },
  headerConfig: {
    hideMinimizeButton: true,
    minimizeButtonIconType: undefined,
  },
  themeConfig: {
    corners: CornersType.SQUARE,
  },
  layout: {
    // showFrame: false,
    hasContentMaxWidth: false,
  },
  openChatByDefault: true,
};

function App() {
  const [chatInstance, setChatInstance] = useState();

  function onBeforeRender(instance) {
    instance.on({ type: BusEventType.FEEDBACK, handler: feedbackHandler });
    setChatInstance(instance);

    instance.messaging.addMessage({
      output: {
        generic: [
          {
            response_type: "text",
            text: "Hi, I’m your IT Support Assistant! Ask me anything about IBM systems.",
          },
        ],
      },
    });
  }

  function feedbackHandler(event) {
    if (event.interactionType === FeedbackInteractionType.SUBMITTED) {
      const { message, messageItem, ...reportData } = event;
      setTimeout(() => {
        window.alert(JSON.stringify(reportData, null, 2));
      });
    }
  }

  return (
      <React.Fragment>
        <Theme theme="white">
          <Theme theme="g90"> 
            <HeaderNav />    
          </Theme>
          <Content id="main-content">
            <div className="app-main-content">
              <ChatCustomElement
                config={config}
                className="fullScreen"
                onBeforeRender={onBeforeRender}
                renderUserDefinedResponse={renderUserDefinedResponse}
              />
            </div>
          </Content>
        </Theme>
      </React.Fragment>
  );
}

export default App;
// const root = createRoot(document.querySelector("#root"));
// root.render(<App />);
