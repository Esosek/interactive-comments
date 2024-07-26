import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Homepage", () => {
  test('renders "Hello Worlds!"', () => {
    render(<Home />);
    const headerElement = screen.getByText("Hello World!");
    expect(headerElement).toBeInTheDocument();
  });
});
