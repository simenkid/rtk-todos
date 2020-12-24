import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Provider,
  defaultTheme,
  ActionButton,
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
  editTodoActionCreator,
  selectedTodoIdActionCreator,
  toggleTodoActionCreator,
  deleteTodoActionCreator,
} from "./redux-toolkit";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: State) => state.todos);
  const selectedTodoId = useSelector((state: State) => state.selectedTodoId);
  const editedCount = useSelector((state: State) => state.counter);

  // hooks for private state
  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [editTodoInput, setEditTodoInput] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  let selectedTodo =
    (selectedTodoId && todos.find((todo) => todo.id === selectedTodoId)) ||
    null;

  const handleCreateNewTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTodoInput.length) return;

    dispatch(createTodoActionCreator({ desc: newTodoInput }));
    setNewTodoInput("");
  };

  const handleNewInputChange = (value: string): void => {
    setNewTodoInput(value);
  };

  const handleSelectedTodos = (todosId: string[]): void => {
    setIsEditMode(false);
    setEditTodoInput("");

    const selectedId = todosId[0] || "";
    dispatch(selectedTodoIdActionCreator({ id: selectedId }));
  };

  const handleEditInputChange = (value: string): void => {
    setEditTodoInput(value);
  };

  const handleEdit = (): void => {
    console.log(selectedTodo);

    if (!selectedTodo) return;

    setEditTodoInput(selectedTodo.desc);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isEditMode) {
    }
  }, [isEditMode]);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!editTodoInput.length || !selectedTodoId) {
      handleCancelUpdate();
      return;
    }

    dispatch(
      editTodoActionCreator({ id: selectedTodoId, desc: editTodoInput })
    );
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleCancelUpdate = (e?: React.MouseEvent): void => {
    e?.preventDefault();

    setIsEditMode(false);
    setEditTodoInput("");
  };

  const todoDoneStyling = (isComplete: boolean) =>
    isComplete ? { textDecoration: "line-through" } : {};

  const handleToggle = (): void => {
    if (!selectedTodoId || !selectedTodo) return;

    dispatch(
      toggleTodoActionCreator({
        id: selectedTodoId,
        isComplete: !selectedTodo.isComplete,
      })
    );
  };

  const handleDelete = (): void => {
    if (!selectedTodoId || !selectedTodo) return;

    dispatch(deleteTodoActionCreator({ id: selectedTodoId }));
  };

  return (
    <Provider theme={defaultTheme}>
      <Content height="100%">
        <Flex gap="size-125" minHeight="size-400" alignItems="center">
          <Text marginStart="size-85">Todos Updated Count</Text>
          <Divider orientation="vertical" width="size-25" />
          <Text>{editedCount}</Text>
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
            <Heading level={2}>My Todos:</Heading>
            <ListBox
              width="100%"
              items={todos}
              selectionMode="single"
              aria-label="Alignment"
              onSelectionChange={(selected) =>
                handleSelectedTodos(Array.from(selected) as string[])
              }
            >
              {(todo) => (
                <Item key={todo.id} textValue={todo.desc}>
                  <Text UNSAFE_style={todoDoneStyling(todo.isComplete)}>
                    {todo.desc}
                  </Text>
                </Item>
              )}
            </ListBox>
          </View>

          <View
            backgroundColor="gray-75"
            maxWidth="size-4600"
            padding="size-200"
            flex="1"
          >
            <Heading level={2}>Selected Todos:</Heading>
            {selectedTodo === null ? (
              <Text>No Todo Selected</Text>
            ) : (
              <Text>{selectedTodo.desc}</Text>
            )}

            <Flex direction="row" gap="size-125" alignItems="baseline">
              <ActionButton onPress={handleEdit}>Edit</ActionButton>
              <ActionButton onPress={handleToggle}>Toggle</ActionButton>
              <ActionButton onPress={handleDelete}>Delete</ActionButton>
            </Flex>

            {isEditMode ? (
              <Form
                labelPosition="top"
                labelAlign="start"
                maxWidth="size-3600"
                onSubmit={handleUpdate}
              >
                <TextField
                  id="edit-todo"
                  label="Edit todo"
                  autoFocus={true}
                  onChange={handleEditInputChange}
                  value={editTodoInput}
                />
                <ActionButton type="submit">Update</ActionButton>
                <ActionButton
                  onPress={() => {
                    handleCancelUpdate();
                  }}
                >
                  Cancel
                </ActionButton>
              </Form>
            ) : (
              ""
            )}
          </View>
        </Flex>
      </Content>
    </Provider>
  );
}

export default App;
