import React from "react";
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
} from "@adobe/react-spectrum";

import { v1 as uuid } from "uuid";
import { Todo } from "./type";

import "./App.css";

function App() {
  const todos: Todo[] = [
    {
      id: uuid(),
      desc: "Learn React",
      isComplete: true,
    },
    {
      id: uuid(),
      desc: "Learn Redux",
      isComplete: true,
    },
    {
      id: uuid(),
      desc: "Learn Redux-ToolKit",
      isComplete: false,
    },
  ];

  return (
    <Provider theme={defaultTheme}>
      <div className="App">
        <Flex gap="size-125" margin="size-100">
          <Text>Todos Updated Count</Text>
          <Divider orientation="vertical" />
          <Text>5</Text>
        </Flex>

        <Divider height="size-10" />

        <header className="App-header">
          <h1>Todo: Redux vs RTK Edition</h1>

          <Form labelPosition="side" labelAlign="start" maxWidth="size-3600">
            <TextField label="Add new" />
            <Button variant="cta">Save</Button>
          </Form>
        </header>

        <Flex
          direction="row"
          gap="size-100"
          justifyContent="space-evenly"
          width="100%"
        >
          <View width="size-3000" backgroundColor="blue-600" flex="1">
            <h2>My Todos:</h2>

            <ListBox aria-label="Alignment">
              {todos.map((todo, i) => (
                <Item key={todo.id}>
                  {i + 1}:{todo.desc}
                </Item>
              ))}
            </ListBox>
          </View>

          <View backgroundColor="blue-600" flex="1">
            <ul className="App__list">
              <h2>Selected Todos:</h2>
            </ul>

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

          <View width="size-3000" backgroundColor="blue-600" flex="1">
            <h2>My Todos:</h2>
          </View>
        </Flex>
      </div>
    </Provider>
  );
}

export default App;
