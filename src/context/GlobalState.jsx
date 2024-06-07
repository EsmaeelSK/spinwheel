import React, { useState } from "react";
import { context } from "./context";

const GlobalState = ({ children }) => {
  // Authentication
  const [openLoginModal, setOpenLoginModal] = useState(true);

  // Type
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  return (
    <context.Provider
      value={{
        openLoginModal,
        setOpenLoginModal,
        text, 
        setText,
        isTyping, 
        setIsTyping,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalState;
