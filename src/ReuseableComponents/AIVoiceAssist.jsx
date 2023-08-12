import React, { useCallback, useEffect } from "react";
import { browserName } from "react-device-detect";

const speech = speechSynthesis;

var voiceAssist;
var voiceText;

export const AIVoiceAssist = ({ name }) => {
  const populateVoiceList = useCallback(() => {
    const voice = speech.getVoices(); // now should have an array of all voices

    const newUtterance = new SpeechSynthesisUtterance();

    console.log(voice);

    if (browserName === "Safari") {
      voiceAssist = voice.at(51);
      voiceText = `Hello ${name}, welcome to our integrated and interactive environment of AI, my name is samantha and I'm your personal voice assistant`;
    } else if (browserName === "Chrome") {
      voiceAssist = voice.at(146);
      voiceText = `Hello ${name}, welcome to our integrated and interactive environment of AI, my name is William and I'm your personal voice assistant`;
    }

    newUtterance.voice = voiceAssist;
    newUtterance.rate = 1.0;
    newUtterance.text = voiceText;
    speechSynthesis.speak(newUtterance);
  }, [name]);

  useEffect(() => {
    populateVoiceList();
    speech.onvoiceschanged = () => populateVoiceList();
  }, [populateVoiceList]);

  return <></>;
};
