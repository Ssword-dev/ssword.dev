import {
  Card,
  CardTitle,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ssword/ui/client";
import { ListCollapse, List } from "lucide-react";
export default function WebstackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <ListCollapse className="mr-2 inline-block" />
            Web Stack Tutorials
          </CardTitle>
          <CardDescription>
            Guides and resources for building modern web applications.
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Accordion type="single" collapsible>
            <AccordionItem value="stack">
              <AccordionTrigger>What is a web stack?</AccordionTrigger>
              <AccordionContent>
                A web stack is a collection of technologies used together to
                build and run web applications, such as frontend frameworks,
                backend servers, and databases.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
    </div>
  );
}
