import React from "react";
import { CustomResponseExample } from "./CustomResponseExample.jsx";

function renderUserDefinedResponse(state, instance) {
  const { messageItem } = state;

  if (messageItem) {
    switch (messageItem.user_defined?.user_defined_type) {
      case "my_unique_identifier":
        return (
          <CustomResponseExample
            data={messageItem.user_defined}
          />
        );
      default:
        return undefined;
    }
  }

  return undefined;
}

export { renderUserDefinedResponse };
