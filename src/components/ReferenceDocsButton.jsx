import React, { useState } from "react";
import { Button, Link, Tile } from "@carbon/react";

function ReferenceDocsButton({ data }) {
  const [showDocs, setShowDocs] = useState(false);

  const handleClick = () => {
    setShowDocs(true);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {!showDocs ? (
        <Button kind="secondary" onClick={handleClick}>
          {data.button_label || "Get reference documents"}
        </Button>
      ) : (
        <div>
          <h5>Reference Documents</h5>
          <div style={{ display: "grid", gap: "1rem" }}>
            {data.docs.map((doc, index) => (
              <Tile key={index}>
                <p><strong>{doc.metadata.source}</strong></p>
                <p>{doc.page_content}</p> 
              </Tile>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { ReferenceDocsButton };
