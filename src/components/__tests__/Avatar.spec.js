import { render, screen, cleanup } from "@testing-library/react";

import Avatar from "../Avatar";

test("should render component", () => {
  render(<Avatar />);
});
