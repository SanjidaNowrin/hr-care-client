import { render, screen, cleanup } from "@testing-library/react";
import ReactDOM from 'react-dom';
import EmployeeDashboardHome from "./EmployeeDashboardHome";


// test("should render", () => {
//     render(<EmployeeDashboardHome />);
//     const page = screen.getByText("Present");
//     expect(page).toHaveLength(1);
// })


test('h4 tag find', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<EmployeeDashboardHome />, container);
    // eslint-disable-next-line testing-library/no-node-access
    const h4 = container.querySelectorAll('h4');
    expect(h4).toHaveLength(2);

})