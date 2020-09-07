---

title: State Management in React
date: 2020-02-05 00:00 UTC
author: Afam Agbodike
tags: javascript, react
fa: fa-laptop
summary_img: state-management-in-react/react-state-management.jpg

---

React uses your application state and business logic to determine a user's page content. This makes how we work with data important. If your application becomes difficult to manage, it's because state management may have become cumbersome. Some kinds of state are:

- Model data - data persisted on your server, like a list of students, an individual student, the student's admission ID, etc.
- View state - the state that affects how to display your model data, like if the list of students is sorted or filtered.
- Session/authorization state - if the user logged in or authorized to access a given resource.
- Communication state - the state while retrieving the model data from the API, like loading or error responses.
- Location state - where the user is in the application.

![Where do I keep state?](/images/blog/state-management-in-react/image1.png)

Some examples of tools used for keeping your state manageable when it's no longer a simple application include Redux or Mobx, but the snippets in this article will be with pure React. 

State can be stored in the following places with React:

### Class-based state

One classic way to hold on to state in a React application is in the constructor of a class component:

```react
import React, { Component } from 'React'

Class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
}
```

We can add a few methods in this class to increment decrement and reset this state:

```react
Class Counter extends Component {
  ...
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }
  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }
  reset = () => {
    this.setState({ count: 0 });
  }
}
```

These methods can be bound to buttons that fire off the changes:

```react
Class Counter extends Component {
  ...
  render() {
    const { count } = this.state;
    return (
      <div>
        <p> { count } </p>
        <section>
          <button onClick={ this.increment }> Increment </button>
          <button onClick={ this.decrement }> Decrement </button>
          <button onClick={ this.reset }> Reset </button>
        </section>
      </div>
    )
  }
}
```

`setState` calls are asynchronous as React batches them up, figures the result and efficiently makes the change. React merges all the objects passed to `setState` calls and if it finds duplicate keys, the last one wins. This means that if we rewrite our increment method to:

```react
 increment = () => {
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });
  console.log(this.state.count);
}
```

0 will be printed to the console and this.state.count will eventually be set to 1. 

`setState` can also be passed a function. The function will receive two arguments: the state and props of the class.

```react
increment = () => {
  this.setState((prevState, prevProps) => {
    if (prevState.count >= 5) return ;
    return { count: prevState.count + 1 };
 });
}
```

If we change our increment method to:

```react
increment = () => {
  this.setState((prevState) => ({ count: prevS tate.count + 1 }));
  this.setState((prevState) => ({ count: prev S tate.count + 1 }));
  this.setState((prevState) => ({ count: prevS tate.count + 1 }));
}
```

state.count will be set to 3. Functions cannot be merged, so React does not batch the `setState` calls in the snippet above. Using a different syntax can yield varying results.

`setState` takes an extra argument (a callback function) apart from the object or functions we have seen above, which it calls after the state has updated. The callback function receives no arguments. If we change our increment method to:

```react
increment = () => {
  this.setState({ count: this.state.count + 1 }, () => {
    console.log(this.state.count)
 });
}
```

1 will be printed to the console when it is first called.

There is no need to duplicate data from props in class-based state. Class-based state should be used to store data utilized for rendering.

### Hooks State

![Hook up to state](/images/blog/state-management-in-react/hooking-react.jpg)

Hooks give us a way to manage state in functional components. The `useState` hook receives an initial value and returns an array containing the value and a function to update the value.

```react
import React, { useState } from 'React'
const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  return (
    <div>
      <p> { count } </p>
      <section>
        <button onClick={ increment }> Increment </button>
        <button onClick={ decrement }> Decrement </button>
        <button onClick={ reset }> Reset </button>
      </section>
    </div>
 )
}
```

The `useState` hook is also asynchronous and queued up by React. This means that if we rewrite our increment method to:

```react
increment = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
  console.log(count);
}
```

0 will be printed to the console and count will eventually be set to 1. 

`useState` can also receive a function as an argument like `setState`. But, the function will only receive the piece of state it can update and must return a value.

```react
increment = () => {
  setCount((prevCount) => {
    if (prevCount >= 5) return prevCount;
    return prevCount + 1 ;
  })
}
```

If we change our increment method to:

```react
increment = () => {
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1));
  setCount((prevCount) => prevCount + 1));
}
```

count will be set to 3. This is the exact behaviour we get with `setState`.

The `useState` hook doesn't have the extra argument of a callback function. A way to do this would be by using a `useEffect` hook. You can read more on [useEffect here](https://reactjs.org/docs/hooks-effect.html)

```react
const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  useEffect(() => {
    console.log(count);
  }, [count])
 ...
}
```

The above snippets show similarities and subtle differences between class-based state and hook state if you ever decide to refactor your components. Finally, you can abstract repeated state management patterns into custom hooks to reuse across your application. The custom hook below retrieves a value from `localStorage` and updates it whenever the value changes.

```react
import React, { useState, useEffect } from 'React';
const useLocalStorage = (initialState, key) => {
  const getStateFromLocalStorage = () => {
    const storage = localStorage.getItem(key);
    if (storage) return JSON .parse(storage)[value];
    return initialState;
  }

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON .stringify({ value }));
  }, [value])

  return [value, setValue]
}

const Counter = () => {
  const [count, setCount] = useLocalStorage(0 , 'count' );
 ...
}
```

### Reducers

A reducer is a function that takes two arguments - the current state and an object that may update the state. React provides a `useReducer` hook we can use for managing state. The `useReducer` hook provides a simpler version of what Redux provides for use in functional components. 

`useReducer` allows us to do complicated state management in a much easier way than wiring together `useState` and custom hooks. We can divide the management of our state from the components rendering the state leading to better separation of concerns.

```react
import { useReducer } from 'React' ;
import id from 'uuid/v4'

const ADD_TODO = 'ADD_TODO' ;
const COMPLETE_TODO = 'COMPLETE_TODO' ;
// You can use plain strings, but constants help avoid typographical errors

const reducer = (state, action) => {
  if (action.type = = = ADD_TODO) {
    return [action.payload, ...state];
  }

  if (action.type === COMPLETE_TODO) {
    return state.map(todo => {
      if (todo.id === action.payload.id) {
        return {...todo, completed: !todo.completed };
      }
      return grudge;
    });
  }
  return state;
}

const Todos = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  const addTodo = ({ title, description }) => {
    dispatch({
      type: ADD_TODO,
      payload: {
        title,
        description,
        completed: false ,
        id: id()
      }
    })
  }

  const toggleCompleted = (id) => {
    dispatch({
      type: COMPLETE_TODO,
      payload: {
        id
      }
    })
  }
 ... // omitted for brevity
}
```

`useReducer` receives the reducer function to use and its initial state as arguments and returns the current state and a dispatch function to update the state whenever it changes. The object passed to dispatch must contain a **type** property. It is convention but not mandatory to point to the value with the payload key. You can also wrap your functions dispatching an action in a `useCallback` if you observe excess re-rendering. You can learn more about `useCallback` here.

### Context

The Context API helps avoid the dangers of props drilling when you have nested components. It allows us to pass data through the components tree it wraps without having to pass props down at every level.

```react
import React, { useReducer, createContext } from 'React' ;
import initialState from './initialState' ;
import id from 'uuid/v4'

export const TodoContext = createContext();

const ADD_TODO = 'ADD_TODO' ;

const COMPLETE_TODO = 'COMPLETE_TODO' ;
const reducer = (state, action) => {
  if (action.type === ADD_TODO) {
    return [action.payload, ...state];
  }

  if (action.type === COMPLETE_TODO) {
    return state.map(todo => {
      if (todo.id === action.payload.id) {
        return {...todo, completed: !todo.completed };
     }
      return grudge;
   });
  }
  return state;
}

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  const addTodo = ({ title, description }) => {
    dispatch({
      type: ADD_TODO,
      payload: {
        title,
        description,
        completed: false ,
        id: id()
      }
    })
  }

  const toggleCompleted = (id) => {
    dispatch({
      type: COMPLETE_TODO,
      payload: {
        id
      }
    })
  }

  const value = { todos, addTodo, toggleCompleted }

  return (
    <Todo.Provider value={ value }>
     { children }
    </Todo.Provider>
  )
}
```

A context provider takes one prop called value (use an object or array if you want to pass many values) which it makes available to all its children.

```react
import React, { useContext } from 'React' ;
import ReactDOM from 'react-dom' ;
import { TodoProvider, TodoContext } from './TodoContext' ;
const Todo = ({ todo }) => {
  const { toggleCompleted } = useContext(TodoContext);
  const onComplete = () => toggleCompleted(todo.id);

  return (
   <article>
     <h3>{ todo.title }</h3>
     <p>{ todo.description }</p>
     <div>
       <label>
         <input
           type="checkbox"
           checked={ todo.completed }
           onChange={ onComplete }
         />
         Completed
       </label>
     </div>
   </article>
  )
}

const Todos = () => {
  const { todos } = useContext(TodoContext);
  return (
    <section>
      <h2>Todos</h2>
      { todos.map(todo => (<Todo key={ todo.id } todo={ todo } />))}
    </section>
  )
}

const App = () => (
  <TodoProvider>
    <Todos />
  </TodoProvider>
)
```

The children components can access the values of the context provider using the `useContext` hook.

If we think more about our application state, we would be encouraged to separate it out of our UI which makes it easier to unit test and feed data to our application in a declarative way.
