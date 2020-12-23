import * as React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Provider,
  defaultTheme,
  Button,
  Text,
  Divider,
  Flex,
  Form,
  TextField,
  View,
  ListBox,
  Item,
  Heading,
  Content,
} from "@adobe/react-spectrum";

import { State } from "./type";

import "./App.css";

import {
  createTodoActionCreator,
  // editTodoActionCreator,
  // toggleTodoActionCreator,
  // deleteTodoActionCreator,
  // selectedTodoActionCreator,
} from "./redux-toolkit";
import { combineReducers } from "@reduxjs/toolkit";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: State) => state.todos);
  //const selectedTodoId = useSelector((state: State) => state.selectedTodo);
  //const editedCount = useSelector((state: State) => state.counter);

  // hooks for private state
  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [editTodoInput, setEditTodoInput] = useState<string>("");
  // const selectedTodo =
  //   (selectedTodoId && todos.find((todo) => todo.id === selectedTodoId)) ||
  //   null;

  const handleCreateNewTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTodoInput.length) return;

    dispatch(createTodoActionCreator({ desc: newTodoInput }));
    setNewTodoInput("");
  };

  const handleNewInputChange = (value: string): void => {
    setNewTodoInput(value);
  };

  return (
    <Provider theme={defaultTheme}>
      <Content height="100%">
        <Flex gap="size-125" minHeight="size-400" alignItems="center">
          <Text marginStart="size-85">Todos Updated Count</Text>
          <Divider orientation="vertical" width="size-25" />
          <Text>5 {editTodoInput}</Text>
        </Flex>

        <Divider height="size-10" />

        <Flex direction="column" alignItems="center" justifyContent="center">
          <Heading level={1}>Todo: Redux vs RTK Edition</Heading>

          <Form
            labelPosition="side"
            labelAlign="start"
            maxWidth="size-3600"
            onSubmit={handleCreateNewTodo}
          >
            <Flex direction="row" gap="size-125" alignItems="baseline">
              <TextField
                id="new-todo"
                label="Add_new"
                placeholder="Somthing to do..."
                onChange={handleNewInputChange}
                value={newTodoInput}
                flex="2"
              />
              <Button variant="cta" type="submit" flex="1">
                Create
              </Button>
            </Flex>
          </Form>
        </Flex>

        <Flex
          direction="row"
          gap="size-100"
          justifyContent="space-evenly"
          width="100%"
          height="100%"
        >
          <View
            backgroundColor="gray-75"
            maxWidth="size-4600"
            flex="1"
            padding="size-200"
          >
            <h2>My Todos:</h2>
            {todos.toString()}
            <ListBox width="100%" items={todos} selectionMode="single">
              {(todo) => <Item>{todo.desc}</Item>}
            </ListBox>
          </View>

          <View
            backgroundColor="gray-75"
            maxWidth="size-4600"
            padding="size-200"
            flex="1"
          >
            <h2>Selected Todos:</h2>

            <Button variant="primary" onPressUp={() => {}}>
              Edit
            </Button>
            <Button variant="primary" onPressUp={() => {}}>
              Toggle
            </Button>
            <Button variant="primary" onPressUp={() => {}}>
              Delete
            </Button>
          </View>
        </Flex>
      </Content>
    </Provider>
  );
}

export default App;
