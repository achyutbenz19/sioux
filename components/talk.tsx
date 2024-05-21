"use client";
import { Gauge, Mic } from "lucide-react";
import { Button } from "./ui/button";
import * as fal from "@fal-ai/serverless-client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { readStreamableValue, useActions } from "ai/rsc";
import { motion } from "framer-motion";
import { AI } from "@/app/actions";
import Image from "next/image";

function randomSeed() {
  return Math.floor(Math.random() * 10000000).toFixed(0);
}

fal.config({
  proxyUrl: "/api/proxy",
});

const INPUT_DEFAULTS = {
  _force_msgpack: new Uint8Array([]),
  enable_safety_checker: true,
  image_size: "square_hd",
  sync_mode: true,
  num_images: 1,
  num_inference_steps: "2",
};

const Talk = () => {
  const { action } = useActions<typeof AI>();
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [image, setImage] = useState<null | string>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [inferenceTime, setInferenceTime] = useState<number | null>(null);
  const timer = useRef<any | undefined>(undefined);

  const connection = fal.realtime.connect("fal-ai/fast-lightning-sdxl", {
    connectionKey: "lightning-sdxl",
    throttleInterval: 64,
    onResult: (result) => {
      const blob = new Blob([result.images[0].content], { type: "image/jpeg" });
      setImage(URL.createObjectURL(blob));
      setInferenceTime(result.timings.inference);
    },
  });

  const handleOnChange = async (prompt: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setPrompt(prompt);
    const input = {
      ...INPUT_DEFAULTS,
      prompt: prompt,
      seed: Number(randomSeed()),
    };
    connection.send(input);
    timer.current = setTimeout(() => {
      connection.send({ ...input, num_inference_steps: "4" });
    }, 500);
  };

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
          if (message && message.transcription) {
            setTranscription(message.transcription);
            handleOnChange(message.transcription);
          }
        }
        chunksRef.current = [];
      });
    }
    if (typeof window !== "undefined") {
      window.document.cookie = "fal-app=true; path=/; samesite=strict; secure;";
    }
    connection.send({
      ...INPUT_DEFAULTS,
      num_inference_steps: "4",
      prompt: prompt,
      seed: Number(randomSeed()),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-6 h-[400px] mb-20">
        {image && (
          <Image
            src={image}
            alt="img"
            className="h-full rounded w-full"
            height={100}
            width={100}
          />
        )}
        {!image && (
          <div className="w-full text-lg text-neutral-400 h-full items-center flex justify-center">
            Start speaking!
          </div>
        )}
      </div>
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
      <div className="text-lg mt-10 hidden md:block md:text-sm absolute md:bottom-16 md:right-16 text-neutral-400">
        {inferenceTime && (
          <div className="flex space-x-2 items-end h-full flex-row">
            <Gauge className="h-5 w-5" />
            <span>{inferenceTime.toFixed(3)}s</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Talk;
