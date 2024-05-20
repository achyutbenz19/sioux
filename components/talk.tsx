"use client";
import { Mic } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { readStreamableValue, useActions } from "ai/rsc";
import { motion } from "framer-motion";
import { AI } from "@/app/actions";

const Talk = () => {
  const { action } = useActions<typeof AI>();
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
    setRecording(!recording);
  };

  const startRecording = () => {
    setTranscription("");
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const options = { mimeType: "audio/webm" };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        (event: BlobEvent) => {
          chunksRef.current.push(event.data);
        },
      );
      mediaRecorderRef.current.start();
    });
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.addEventListener("stop", async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob);
        const streamableValue = await action(formData);
        for await (const message of readStreamableValue<any>(streamableValue)) {
          if (message && message.transcription)
            setTranscription(message.transcription);
        }
        chunksRef.current = [];
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[460px] mb-20">hi</div>
      <div className="relative flex flex-col items-center">
        {recording && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute bottom-full mb-4 tracking-wider text-lg"
          >
            Listening...
          </motion.div>
        )}
        <div className="bottom-full w-full mb-4">{transcription}</div>
        <Button
          onClick={toggleRecording}
          className={cn(
            "flex items-center py-7 border transition-all duration-300 rounded-full justify-center w-16 h-16",
            recording && "bg-accent",
          )}
        >
          <Mic />
        </Button>
      </div>
    </div>
  );
};

export default Talk;
