import { render, screen, cleanup } from "@testing-library/react";
import ReactDOM from 'react-dom';
import AddCourse from './AddCourse';
import userEvent from '@testing-library/user-event';

test('Input field length', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<AddCourse />, container);
    // eslint-disable-next-line testing-library/no-node-access
    const input = container.querySelectorAll('input');
    expect(input).toHaveLength(7);
    expect(input[0].name).toBe('name');

})
test("Input field value", () => {
    render(<AddCourse />);
    const titleInput = screen.getByLabelText(/Course Title/i);
    expect(titleInput.value).toBe("");
})

test("Input  value check", () => {
    render(<AddCourse />);
    const numberInput = screen.getByLabelText(/price/i);
    userEvent.type(numberInput, "10");
    expect(numberInput.value).toBe("10");
})