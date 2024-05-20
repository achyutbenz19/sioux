import { Mic } from "lucide-react";
import { Button } from "./ui/button";

const Talk = () => {
  return (
    <div className="h-[500px] items-center justify-center flex">
      <div className="absolute bottom-0 mb-16">
        <Button className="py-7 rounded-full">
          <Mic />
        </Button>
      </div>
    </div>
  );
};

export default Talk;
