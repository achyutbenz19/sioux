"use client";
import { useState, useEffect } from "react";
import * as fal from "@fal-ai/serverless-client";
import Image from "next/image";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

const seed = Math.floor(Math.random() * 100000);
const baseArgs = {
  sync_mode: true,
  strength: 0.99,
  seed,
};

export default function Draw() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [sceneData, setSceneData] = useState<any>(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [_appState, setAppState] = useState<any>(null);
  const [excalidrawExportFns, setexcalidrawExportFns] = useState<any>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [Comp, setComp] = useState<any>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setComp(comp.Excalidraw));
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((module) =>
      setexcalidrawExportFns({
        exportToBlob: module.exportToBlob,
        serializeAsJSON: module.serializeAsJSON,
      }),
    );
  }, []);

  const { send } = fal.realtime.connect("110602490-sdxl-turbo-realtime", {
    connectionKey: "realtime-nextjs-app",
    onResult(result) {
      if (result.error) return;
      setImage(result.images[0].url);
    },
  });

  async function getDataUrl(appState = _appState) {
    const elements = excalidrawAPI.getSceneElements();
    if (!elements || !elements.length) return;
    const blob = await excalidrawExportFns.exportToBlob({
      elements,
      exportPadding: 0,
      appState,
      quality: 0.5,
      files: excalidrawAPI.getFiles(),
      getDimensions: () => {
        return { width: 400, height: 400 };
      },
    });
    return await new Promise((r) => {
      let a = new FileReader();
      a.onload = r;
      a.readAsDataURL(blob);
    }).then((e: any) => e.target.result);
  }

  return (
    <div className="w-full">
      <div className="w-full mt-10 items-center h-full justify-center flex flex-col text-center mb-4">
        <span className="flex text-lg items-center justify-center h-full mb-2">
          Image prompt
        </span>
        <Input
          className="w-full mb-8 sm:w-[60%] md:w-[70%]"
          placeholder="masterpice, best quality, A cinematic shot of a baby raccoon wearing an intricate italian priest robe"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="flex w-full md:flex-row flex-col justify-between">
        <div className="w-full h-[400px]">
          {isClient && excalidrawExportFns ? (
            <Comp
              excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
              onChange={async (elements: any, appState: any) => {
                const newSceneData = excalidrawExportFns.serializeAsJSON(
                  elements,
                  appState,
                  excalidrawAPI.getFiles(),
                  "local",
                );
                if (newSceneData !== sceneData) {
                  setAppState(appState);
                  setSceneData(newSceneData);
                  let dataUrl = await getDataUrl(appState);
                  send({
                    ...baseArgs,
                    image_url: dataUrl,
                    prompt: input,
                  });
                }
              }}
            />
          ) : (
            <span className="h-full items-center text-neutral-400 justify-center flex">
              Loading...
            </span>
          )}
        </div>
        <div className={cn("w-full", image && "border-l-2")}>
          {image ? (
            <Image
              src={image!}
              width={400}
              height={400}
              className="w-full h-[400px]"
              alt="image"
            />
          ) : (
            <span className="h-full items-center text-neutral-400 justify-center flex">
              Start drawing!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
