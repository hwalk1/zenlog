import { useState, useEffect } from "react";
import textToSpeech from "../elevenlabs/init";
import React from "react";

const AudioPlayer = ({ text }) => {
  // Define a state variable to hold the audio URL
  const [audioURL, setAudioURL] = useState("");

  // Define a function to fetch the audio data and set the URL state variable
  const handleAudioFetch = async () => {
    // Call the textToSpeech function to generate the audio data for the text "Hello welcome"
    console.log(text);
    const data = await textToSpeech(text);
    // Create a new Blob object from the audio data with MIME type 'audio/mpeg'
    const blob = new Blob([data], { type: "audio/mpeg" });
    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
    // Set the audio URL state variable to the newly created URL
    setAudioURL(url);
  };

  // Use the useEffect hook to call the handleAudioFetch function once when the component mounts
  useEffect(() => {
    handleAudioFetch();
  }, []);

  // Render an audio element with the URL if it is not null
  return (
    <div>
      {audioURL && (
        <audio autoPlay controls>
          <source src={audioURL} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;
