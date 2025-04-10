import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./input";

describe("Component: Input", () => {
  it("should render correctly", () => {
    render(<Input />);

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
  });

  it("should allow user typing", async () => {
    render(<Input />);

    const inputElement = screen.getByRole("textbox");
    
    await userEvent.type(inputElement, "Item");

    expect(inputElement).toHaveValue("Item");
  });
});
