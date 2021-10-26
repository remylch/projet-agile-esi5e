import { render, screen, cleanup } from "@testing-library/react";
import Navbar from "../Navbar";
import { MemoryRouter, useHistory } from "react-router-dom";

afterEach(() => {
  cleanup();
});

test("should render navbar with a user logged in", () => {
  const user = { photoURL: "fnjeklfz" };
  render(
    <MemoryRouter>
      <Navbar user={user} />
    </MemoryRouter>,
  );
  const btnLogout = screen.getByTestId("logout-btn");
  expect(btnLogout).toBeInTheDocument();
});

test("should render navbar with a user logged out", () => {
  const user = { photoURL: "fnjeklfz" };
  render(
    <MemoryRouter>
      <Navbar user={undefined} />
    </MemoryRouter>,
  );
  const btnLogin = screen.getByTestId("login-btn");
  expect(btnLogin).toBeInTheDocument();
});
