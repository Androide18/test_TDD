import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App, { Todo, TodoForm, useTodos } from "./App";

configure({ adapter: new Adapter() });

describe("App", () => {
  describe("Todo", () => {
    it("ejecuta completeTodo cuando pincho Complete", () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isComplete: true,
        text: "Hola",
      };
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );
      wrapper.find("button").at(0).simulate("click");
      expect(completeTodo.mock.calls).toEqual([[5]]);
    });
    it("ejecuta removeTodo cuando pincho Remove", () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isComplete: true,
        text: "Hola",
      };
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );
      wrapper.find("button").at(1).simulate("click");
      expect(removeTodo.mock.calls).toEqual([[5]]);
    });
  });
});

describe("TodoForm", () => {
  it("llamar a AddTodo cuando el formulario tiene un valor", () => {
    const addTodo = jest.fn();
    const prevent = jest.fn();
    const wrapper = shallow(<TodoForm addTodo={addTodo} />);
    wrapper
      .find("input")
      .simulate("change", { target: { value: "mi nuevo todo!" } });
    wrapper.find("form").simulate("submit", { preventDefault: prevent });
    expect(addTodo.mock.calls).toEqual([["mi nuevo todo!"]]);
    expect(prevent.mock.calls).toEqual([[]]);
  });
});




