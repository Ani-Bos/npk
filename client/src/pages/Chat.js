import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect, useRef } from 'react';

function Chat() {
  const alanBtnRef = useRef({}).current;
  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: "ba95e58d3868c2794fc7e007a825f1712e956eca572e1d8b807a3e2338fdd0dc/stage",
    });
  }, []);

  return (
    <div className="Chat">
    </div>
  );
}

export default Chat;