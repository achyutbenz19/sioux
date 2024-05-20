import "server-only";
import { createAI, createStreamableValue } from "ai/rsc";
import dotenv from "dotenv";
import { transcribeAudio } from "@/utils/transcriber";
dotenv.config();

async function action(obj: FormData): Promise<any> {
  "use server";
  const streamable = createStreamableValue();
  (async () => {
    const formData = obj;
    const audioBlob = formData.get("audio");
    const timestamp = Date.now();

    const transcription = await transcribeAudio(audioBlob as Blob, timestamp);
    streamable.update({ transcription: transcription });

    streamable.done({ status: "done" });
  })();
  return streamable.value;
}

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  text: string;
  id?: string;
}[] = [];

export const AI = createAI({
  actions: { action },
  initialAIState,
  initialUIState,
});
