import Header from "./Header";
import {render, screen} from "@testing-library/react";

beforeEach(() => render(<Header/>))

test("Renders add task button", () => {
    const addTaskBtn = screen.getByRole("button", {text : /add task/i});
    expect(addTaskBtn).toBeInTheDocument();
})