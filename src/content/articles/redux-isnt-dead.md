---
title: "Redux Isn't Dead"
date: "Apr 14, 2021"
readTime: "7 min read"
description: "The reports of Redux's death are greatly exaggerated. Learn why Redux is still relevant and when to use it in your React applications."
slug: "redux-isnt-dead"
category: "Frontend"
---

With the rise of other state management solutions like Context API and Zustand, many developers claim that Redux is dead. However, Redux continues to evolve and remains a powerful tool in the React ecosystem.

## Understanding Modern Redux

Redux has evolved significantly with Redux Toolkit (RTK), making it more developer-friendly and reducing boilerplate code.

### Traditional Redux vs Redux Toolkit

```javascript
// Traditional Redux
const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';

const initialState = { value: 0 };

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}
```

```javascript
// Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

## Redux Toolkit Features

### CreateAsyncThunk for API Calls

```javascript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId, thunkAPI) => {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
```

### RTK Query for Data Fetching

```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      transformResponse: (response) => response.data
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      transformResponse: (response) => response.data
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch
      })
    })
  })
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation
} = api;
```

## When to Use Redux

### Complex State Management
```javascript
// Store Configuration
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});
```

### State Persistence
```javascript
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
```

## Performance Optimization

### Selectors with Reselect
```javascript
import { createSelector } from '@reduxjs/toolkit';

const selectItems = state => state.cart.items;
const selectTotalPrice = createSelector(
  selectItems,
  items => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

// In component
const totalPrice = useSelector(selectTotalPrice);
```

### Normalized State Shape
```javascript
import { createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter({
  selectId: user => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: 'idle'
  }),
  reducers: {
    userAdded: usersAdapter.addOne,
    usersReceived: usersAdapter.setAll
  }
});
```

## Redux DevTools Integration

```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger)
});
```

## Best Practices

### Action Types and Action Creators
```javascript
// slice.js
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (text) => ({
        payload: {
          text,
          id: nanoid(),
          completed: false
        }
      })
    }
  }
});
```

### Middleware Usage
```javascript
import { createListenerMiddleware } from '@reduxjs/toolkit';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: todoAdded,
  effect: async (action, listenerApi) => {
    await saveToDatabase(action.payload);
  }
});
```

## Conclusion

Redux remains relevant for:
- Large-scale applications
- Complex state management
- Team collaboration
- Debugging capabilities
- Performance optimization

Key advantages:
- Predictable state updates
- Powerful middleware ecosystem
- Excellent developer tools
- Strong community support
- Battle-tested in production

Rather than being dead, Redux has evolved to meet modern development needs while maintaining its core principles of predictable state management. 