import { render, screen, cleanup } from "@testing-library/react";

import Avatar from "../Avatar";

afterEach(() => {
  cleanup();
});

test("should render avatar component with url", () => {
  render(<Avatar url="/test" />);
  const image = screen.getByTestId("avatar");
  expect(image).toBeInTheDocument();
});

test("should render avatar component with icon", () => {
  render(<Avatar url={null} />);
  const image = screen.getByTestId("userIcon");
  expect(image).toBeInTheDocument();
});
