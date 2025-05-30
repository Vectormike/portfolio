---
title: "What is railway oriented programming?"
date: "2020-12-17"
readTime: "6 min read"
description: "I recently stumbled upon Scott Wlaschin's talk on railway oriented programming where he talked about an epic new way of handling errors using the functional approach."
---

I recently stumbled upon Scott Wlaschin's talk on railway oriented programming where he talked about an epic new way of handling errors using the functional approach. In this article, we'll explore this concept and see how it can make our error handling more elegant and maintainable.

## Understanding Railway Oriented Programming

Railway Oriented Programming (ROP) is a functional programming concept that uses a railway track metaphor to visualize and handle the flow of data through a series of operations, particularly focusing on error handling.

### The Two-Track System

Imagine two parallel tracks:
1. **Success Track**: The happy path where everything works as expected
2. **Failure Track**: The error path where something has gone wrong

```typescript
type Result<T, E> = {
  success: boolean;
  data?: T;
  error?: E;
};
```

## Basic Implementation

Here's a simple implementation of the ROP pattern:

```typescript
class Railway<T, E> {
  constructor(private readonly value: Result<T, E>) {}

  static success<T, E>(data: T): Railway<T, E> {
    return new Railway({ success: true, data });
  }

  static failure<T, E>(error: E): Railway<T, E> {
    return new Railway({ success: false, error });
  }

  map<U>(fn: (data: T) => U): Railway<U, E> {
    if (!this.value.success) {
      return new Railway(this.value);
    }
    return Railway.success(fn(this.value.data!));
  }

  bind<U>(fn: (data: T) => Railway<U, E>): Railway<U, E> {
    if (!this.value.success) {
      return new Railway(this.value);
    }
    return fn(this.value.data!);
  }
}
```

## Practical Example

Let's look at a real-world example of user registration:

```typescript
interface User {
  email: string;
  password: string;
}

type ValidationError = {
  field: string;
  message: string;
};

// Validation function
const validateEmail = (email: string): Railway<string, ValidationError> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
    ? Railway.success(email)
    : Railway.failure({ field: 'email', message: 'Invalid email format' });
};

// Password validation
const validatePassword = (password: string): Railway<string, ValidationError> => {
  return password.length >= 8
    ? Railway.success(password)
    : Railway.failure({ field: 'password', message: 'Password too short' });
};

// User creation
const createUser = (user: User): Railway<User, ValidationError> => {
  return validateEmail(user.email)
    .bind(() => validatePassword(user.password))
    .map(() => user);
};
```

## Benefits of Railway Oriented Programming

### 1. Cleaner Error Handling
Instead of try-catch blocks everywhere:

```typescript
// Traditional approach
try {
  const validEmail = validateEmail(user.email);
  const validPassword = validatePassword(user.password);
  return createUser(user);
} catch (error) {
  handleError(error);
}

// Railway approach
return createUser(user)
  .map(saveToDatabase)
  .map(sendWelcomeEmail);
```

### 2. Composability
Functions can be easily chained together:

```typescript
const registerUser = (userData: UserData): Railway<User, Error> => {
  return validateInput(userData)
    .bind(createUser)
    .bind(saveToDatabase)
    .bind(sendWelcomeEmail);
};
```

### 3. Type Safety
The compiler helps catch potential errors:

```typescript
type DatabaseError = {
  code: number;
  message: string;
};

const saveToDatabase = (user: User): Railway<User, DatabaseError> => {
  // Implementation
};
```

## Advanced Patterns

### 1. Error Recovery
```typescript
class Railway<T, E> {
  recover(fn: (error: E) => T): Railway<T, never> {
    if (this.value.success) {
      return Railway.success(this.value.data!);
    }
    return Railway.success(fn(this.value.error!));
  }
}
```

### 2. Combining Multiple Results
```typescript
const combine = <T, E>(railways: Railway<T, E>[]): Railway<T[], E> => {
  const results = railways.map(r => r.value);
  const failure = results.find(r => !r.success);
  
  if (failure) {
    return Railway.failure(failure.error!);
  }
  
  return Railway.success(results.map(r => r.data!));
};
```

## Conclusion

Railway Oriented Programming offers several benefits:
- Clear separation of success and failure paths
- Type-safe error handling
- Composable operations
- Reduced complexity in error handling logic

While it may take some time to get used to this pattern, it can significantly improve the robustness and maintainability of your code, especially in complex applications where error handling is crucial. 