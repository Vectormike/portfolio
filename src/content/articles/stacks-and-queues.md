---
title: "How JavaScript Works: Stacks and Queues + tips for efficient implementation"
date: "2021-10-14"
readTime: "11 min read"
description: "Learn about Stacks and Queues data structures, their implementations, and best practices for efficient usage in JavaScript."
category: "Data Structures"
---

# How JavaScript Works: Stacks and Queues + tips for efficient implementation

In this article, we will look at Stacks and Queues, which are common data structures that have a lot of real-world use cases. They are both linear data structures that have elements next to each other. You can think of a Stack as a pile of plates placed on a table, each plate being on top of the other. Also, think of a Queue as a line of people at the airport waiting for their turn to get a boarding pass, each individual linearly following another one.

## Stacks

Stacks are linear data structures that allow operations only on one end, meaning that all basic operations like insertion can only be done at the ends of the structure. This is because of the concept of **Last in First Out (LIFO)** where the last data placed will be the first data to be removed.

### Stack Implementation

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}
```

### Common Use Cases for Stacks

1. **Function Call Stack**: JavaScript uses a call stack to keep track of function calls
2. **Undo Operations**: Stacks are perfect for implementing undo functionality
3. **Expression Evaluation**: Stacks are used to evaluate expressions
4. **Browser History**: The back button in browsers uses a stack

## Queues

Queues are linear data structures that follow the **First in First Out (FIFO)** principle. The first element added to the queue will be the first one to be removed.

### Queue Implementation

```javascript
class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  enqueue(element) {
    this.items[this.backIndex] = element;
    this.backIndex++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }

  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[this.frontIndex];
  }

  isEmpty() {
    return this.frontIndex === this.backIndex;
  }

  size() {
    return this.backIndex - this.frontIndex;
  }

  clear() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }
}
```

### Common Use Cases for Queues

1. **Task Scheduling**: Operating systems use queues to schedule tasks
2. **Print Queue**: Printers use queues to manage print jobs
3. **Message Queues**: Used in distributed systems for communication
4. **Event Loop**: JavaScript's event loop uses a queue for handling events

## Performance Considerations

### Stack Performance
- Push: O(1)
- Pop: O(1)
- Peek: O(1)
- Search: O(n)

### Queue Performance
- Enqueue: O(1)
- Dequeue: O(1)
- Peek: O(1)
- Search: O(n)

## Best Practices

1. **Choose the Right Data Structure**
   - Use Stack for LIFO operations
   - Use Queue for FIFO operations

2. **Memory Management**
   - Clear stacks and queues when they're no longer needed
   - Be mindful of stack overflow in recursive operations

3. **Error Handling**
   - Always check for empty stacks/queues before operations
   - Implement proper error handling for edge cases

4. **Optimization**
   - Use appropriate initial capacity for large collections
   - Consider using typed arrays for better performance

## Example: Implementing a Task Scheduler

```javascript
class TaskScheduler {
  constructor() {
    this.taskQueue = new Queue();
    this.isProcessing = false;
  }

  addTask(task) {
    this.taskQueue.enqueue(task);
    if (!this.isProcessing) {
      this.processTasks();
    }
  }

  async processTasks() {
    this.isProcessing = true;
    while (!this.taskQueue.isEmpty()) {
      const task = this.taskQueue.dequeue();
      try {
        await task();
      } catch (error) {
        console.error('Task failed:', error);
      }
    }
    this.isProcessing = false;
  }
}
```

## Example: Implementing Undo/Redo

```javascript
class UndoRedoManager {
  constructor() {
    this.undoStack = new Stack();
    this.redoStack = new Stack();
  }

  do(action) {
    this.undoStack.push(action);
    this.redoStack.clear();
  }

  undo() {
    if (!this.undoStack.isEmpty()) {
      const action = this.undoStack.pop();
      this.redoStack.push(action);
      return action;
    }
    return null;
  }

  redo() {
    if (!this.redoStack.isEmpty()) {
      const action = this.redoStack.pop();
      this.undoStack.push(action);
      return action;
    }
    return null;
  }
}
```

## Conclusion

Stacks and Queues are fundamental data structures that are widely used in programming. Understanding their characteristics and use cases is essential for writing efficient code. While they may seem simple, they are powerful tools when used appropriately.

Remember to:
- Choose the right data structure for your use case
- Consider performance implications
- Implement proper error handling
- Follow best practices for memory management

By mastering these data structures, you'll be better equipped to solve complex programming problems and write more efficient code. 