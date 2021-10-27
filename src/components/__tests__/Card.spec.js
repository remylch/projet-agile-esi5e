import Card from "../Card";
import ReactDom from "react-dom";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

test("Render card correctly", () => {
  const { getByTestId } = render(<Card />);
  expect(getByTestId("card")).toBeInTheDocument();
});
