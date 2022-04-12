import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure, mount } from "enzyme";
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

  describe("custom hook: useTodos", () => {
    it("addTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook} />;
      };
      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      props.addTodo("texto de prueba");
      props = wrapper.find("div").props();
      expect(props.todos[0]).toEqual({
        text: "texto de prueba",
      });
    });

    it("completeTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook} />;
      };
      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      props.completeTodo(0);
      props = wrapper.find("div").props();
      expect(props.todos[0]).toEqual({ text: "Todo 1", isCompleted: true });
    });

    it("removeTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook} />;
      };
      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      props.removeTodo(0);
      props = wrapper.find("div").props();
      expect(props.todos).toEqual([
        { text: "Todo 2", isCompleted: false },
        { text: "Todo 3", isCompleted: false },
      ]);
    });

    it("App", () => {
      const wrapper = mount(<App />);
      const prevent = jest.fn();
      wrapper
        .find("input")
        .simulate("change", { target: { value: "mi nuevo todo!" } });
      wrapper.find("form").simulate("submit", { preventDefault: prevent });
      const respuesta = wrapper
        .find(".todo")
        .at(0)
        .text()
        .includes("mi nuevo todo!");
      expect(respuesta).toEqual(true);
      expect(prevent.mock.calls).toEqual([[]]);
    });
  });
});
