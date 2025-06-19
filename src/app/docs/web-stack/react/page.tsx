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
  Tooltip,
  TooltipContent,
  Code,
} from "@ssword/ui/client";
import SourceCode from "../../../data/react-introductory-sample.tsx";
import Image from "next/image";

export default function IntroductionToReact() {
  return (
    <>
      <Card>
        <CardTitle>Basic Introduction to React</CardTitle>
        <CardDescription>
          React is a popular JavaScript library for building user interfaces
          using reusable components.
        </CardDescription>
        <CardContent className="gap-6">
          <p>
            With React, you can compose complex UIs from small, isolated pieces
            of code called <strong>components</strong>. It efficiently updates
            and renders the right components when your data changes.
          </p>
          <Code lang="react-jsx">
            <SourceCode />
          </Code>
          <p className="mt-6">
            Internally, ReactDOM handles the render processes (Reconciliation
            and Fibers)
            <br />
            while React handles state management
          </p>
        </CardContent>
      </Card>
    </>
  );
}
