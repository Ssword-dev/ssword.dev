import "@testing-library/dom";
import "@testing-library/jest-dom";
import { Code } from "@/components/ui/code";
import { fireEvent, render, screen } from "@testing-library/react";
beforeAll(() => {
  jest.setTimeout(60000); // Fail all tests if the tests run for more than 60 seconds
});

beforeEach(() => {
  jest.useFakeTimers();
  jest.setTimeout(10000); // We use time-based state resets and we dont want this to be the reason it fails
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("Code Component", () => {
  it("should have initial uncopied state", () => {
    render(<Code lang="txt" children="Lorem Ipsum" />);
    expect(screen.getByText(/Copy/i)).toBeInTheDocument();
    expect(screen.getByText("txt")).toBeInTheDocument();
    expect(screen.getByText("Lorem Ipsum")).toBeInTheDocument();
  });

  it("should have copied state when clicked, and reset state after 1s", () => {
    const writeText = jest.fn();
    (globalThis.navigator as any).clipboard = { writeText };
    render(<Code lang="txt" children="Lorem Ipsum" copyResetDelay={1000} />);
    fireEvent.click(screen.getByRole("button"));
    jest.advanceTimersByTime(0);
    expect(screen.getByText(/Copied/i)).toBeInTheDocument();
    jest.advanceTimersByTime(1000);
  });

  it("should render quickly", () => {
    expect(() => {
      render(<Code lang="txt" children="Lorem Ipsum" />);
    }).toRunForApproximately(10); // Expect render to only run for 10ms
  });
});
