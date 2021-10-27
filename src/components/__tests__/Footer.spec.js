import Footer from "../Footer";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

test("Render the footer", () => {
  render(<Footer />);
  const el = screen.getByTestId("footer");
  expect(el).toMatchSnapshot("<h6>");
});

test("Render the text in the footer", () => {
  render(<Footer />);
  const el = screen.getByTestId("title-footer");
  expect(el).toHaveTextContent("SYNTAX MAP");
});
