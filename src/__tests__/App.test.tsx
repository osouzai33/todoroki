import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App.tsx";

describe("App", () => {
    test("アプリタイトルが表示されている", () => {
        render(<App />);
        expect(
            screen.getByRole("heading", { name: "Todoroki" }),
        ).toBeInTheDocument();
    });

    test("ToDoを追加できる", () => {
        render(<App />);

        const input = screen.getByPlaceholderText("What needs to be done?");
        const button = screen.getByText("+ New Task");

        fireEvent.change(input, { target: { value: "テストタスク" } });
        fireEvent.click(button);

        const list = screen.getByTestId("list");
        expect(within(list).getByText("テストタスク")).toBeInTheDocument();
    });

    test("TODOを完了にすることができる", () => {
        render(<App />);

        const input = screen.getByPlaceholderText("What needs to be done?");
        const button = screen.getByText("+ New Task");

        fireEvent.change(input, { target: { value: "完了テストタスク" } });
        fireEvent.click(button);

        const checkboxes = screen.getAllByRole("checkbox");
        const lastCheckbox = checkboxes[checkboxes.length - 1];
        fireEvent.click(lastCheckbox);

        expect(lastCheckbox).toBeChecked();
    });
});
