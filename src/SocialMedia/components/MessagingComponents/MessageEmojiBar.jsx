import React from "react";
import EmojiPicker from "emoji-picker-react";

export const MessageEmojiBar = ({ onEmojiSelect }) => {
  return <EmojiPicker onEmojiClick={onEmojiSelect} />;
};
