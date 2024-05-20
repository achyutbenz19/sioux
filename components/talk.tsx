import { Mic } from "lucide-react";
import { Button } from "./ui/button";

const Talk = () => {
  return (
    <div className="h-[650px] items-center justify-center flex">
      <div className="flex h-full items-end">
        <Button className="py-7 rounded-full">
          <Mic />
        </Button>
      </div>
    </div>
  );
};

export default Talk;
