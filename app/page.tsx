import Draw from "@/components/draw";
import Talk from "@/components/talk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <main className="flex p-6 flex-col items-center mt-10 justify-center">
      <Tabs
        defaultValue="Draw"
        className="w-full sm:w-[80%] mt-8 text-center space-y-6"
      >
        <TabsList>
          <TabsTrigger value="Draw">Draw</TabsTrigger>
          <TabsTrigger value="Talk">Talk</TabsTrigger>
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
