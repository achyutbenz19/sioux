import Draw from "@/components/draw";
import Talk from "@/components/talk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <main className="flex flex-col w-full items-center mt-16 justify-center">
      <h1 className="text-3xl font-semibold">Sioux</h1>
      <Tabs
        defaultValue="Draw"
        className="w-[80%] border rounded-md py-4 text-center mt-10 space-y-6"
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
