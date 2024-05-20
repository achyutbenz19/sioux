import { toFile } from "openai";
import Groq from "groq-sdk";
import OpenAI from "openai";

const groq = new Groq();
const openai = new OpenAI();
const whisperModelProvider = "openai";
const whisperModel = "whisper-1";

export const transcribeAudio = async (audioBlob: Blob, timestamp: number) => {
  try {
    let transcription;
    if (whisperModelProvider === "openai") {
      transcription = await openai.audio.transcriptions.create({
        file: await toFile(audioBlob, `audio-${timestamp}.wav`),
        model: whisperModel,
      });
    } else if (whisperModelProvider === "groq") {
      transcription = await groq.audio.transcriptions.create({
        file: await toFile(audioBlob, `audio-${timestamp}.wav`),
        model: whisperModel,
      });
    } else {
      throw new Error("Invalid whisper model");
    }
    return transcription.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return "Error transcribing audio. Please try again later.";
  }
};
