import Draw from "@/components/draw";
import Talk from "@/components/talk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <main className="flex p-6 flex-col items-center md:mt-16 mt-10 justify-center">
      <Tabs
        defaultValue="Talk"
        className="w-full sm:w-[80%] mt-8 text-center space-y-6"
      >
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="Talk">
            Talk
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Draw">
            Draw
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Draw">
          <Draw />
        </TabsContent>
        <TabsContent value="Talk">
          <Talk />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Home;
