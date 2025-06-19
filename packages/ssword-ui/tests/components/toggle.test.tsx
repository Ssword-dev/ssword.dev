import "@testing-library/dom";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Toggle } from "@/components/ui/toggle";
describe("Toggle Component", () => {
  it("should render normally", () => {
    render(
      <Toggle data-testid="toggle">
        <span>Test</span>
      </Toggle>,
    );

    expect(screen.getByTestId("toggle")).toBeInTheDocument();
  });

  it("should be disabled when disabled props is true", () => {
    render(
      <Toggle data-testid="toggle" disabled>
        <span>Test</span>
      </Toggle>,
    );

    expect(screen.getByTestId("toggle")).toBeDisabled();
  });
});
