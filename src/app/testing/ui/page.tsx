"use client";
import {
  Button,
  Input,
  Card,
  Tabs,
  Code,
  Frame,
  TabsTrigger,
  TabsContent,
  TabsList,
  Skeleton,
} from "@ssword/ui/client";

export default function Page() {
  return (
    <main className="flex justify-center py-10">
      <Card className="flex w-full max-w-3xl flex-col gap-6 p-6">
        <section className="flex flex-col gap-4">
          <Frame
            orientation="landscape"
            dimensionalRatio="16:9"
            background="muted"
            accent="accent"
            className="w-full items-center justify-center overflow-hidden rounded-md"
          >
            {/*src="https://www.w3schools.com/html/mov_bbb.mp4"**/}
            <Skeleton className="h-full w-full object-cover" />
          </Frame>
          <div className="flex items-center justify-between">
            <Button variant="outline">Previous</Button>
            <span className="text-muted-foreground text-sm">Sample Video</span>
            <Button>Next</Button>
          </div>
        </section>

        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            <p className="text-sm leading-relaxed">
              This is a sample video player using the <code>Frame</code> layout
              and other UI components like <code>Card</code>, <code>Tabs</code>,
              and <code>Button</code>.
            </p>
          </TabsContent>

          <TabsContent value="code" className="mt-4">
            <Code lang="html">{`<video src="..." controls />`}</Code>
          </TabsContent>
        </Tabs>
      </Card>
    </main>
  );
}
