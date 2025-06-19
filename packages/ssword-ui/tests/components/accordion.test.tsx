import "@testing-library/dom";
import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

describe("Accordion Component", () => {
  it("should make the accordion content visible when clicked", () => {
    render(
      <Accordion type="single" id="subject" role="menu">
        <AccordionItem value="ii-1" data-testid="accordion-item">
          <AccordionTrigger data-testid="accordion-trigger">
            What is the meaning of testing?
          </AccordionTrigger>
          <AccordionContent data-testid="accordion-content">
            Testing is the act of testing a code to make sure it works.
            Especially for Big Projects
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByTestId("accordion-trigger")).toBeInTheDocument();

    // click interaction

    fireEvent.click(screen.getByTestId("accordion-trigger"));
    jest.advanceTimersByTime(40); // advance just incase
    expect(screen.getByTestId("accordion-content")).toBeInTheDocument();
    expect(screen.getByTestId("accordion-content")).toBeVisible();
  });
});
