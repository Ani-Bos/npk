import { useState } from 'react'
// import dotenv from 'dotenv'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import { ThemeProvider } from "styled-components";

// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you're talking to a farmer"
}

const theme = {
  background: "#C9FF8F",
  headerBgColor: "#197B22",
  headerFontSize: "20px",
  botBubbleColor: "#0F3789",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#FF5733",
  userFontColor: "white",
};


function TemplateChat() {
  // dotenv.config()
  console.log(process.env.REACT_APP_APIKEY)
  const API_KEY = process.env.REACT_APP_APIKEY;
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatBot for NPK",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        setMessages([...chatMessages, {
          message: data?.choices[0]?.message?.content,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
      });
  }
  const [showChat, setShowChat] = useState(false);
  const handleToggleChat = () => {
    setShowChat(!showChat);
  };
  return (
    <div className="container m-auto">
      <div>
        {showChat ? (
          <img
            src="Images/maki_cross.svg"
            className="h-16 w-16"
            onClick={handleToggleChat}
            alt="Close Icon"
          />
        ) : (
          <img
            src="Images/wechat.png"
            className="h-16 w-16"
            onClick={handleToggleChat}
            alt="Chat Icon"
          />
        )}
      </div>
      {showChat && (<div className="px-4 rounded-md" style={{ height: "50vh" }}>
        {/* <ThemeProvider theme={theme}> */}
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? <TypingIndicator content="Bot is typing" /> : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
          </MainContainer>
        {/* </ThemeProvider> */}
      </div>
    )}      
    </div>
  );
}
export default TemplateChat;
