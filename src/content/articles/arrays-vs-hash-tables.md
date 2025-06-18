---
title: "How JavaScript Works: Arrays vs Hash Tables"
date: "2021-09-23"
readTime: "9 min read"
description: "Compare Arrays and Hash Tables, their performance characteristics, and when to use each in JavaScript applications."
category: "Data Structures"
---

# How JavaScript Works: Arrays vs Hash Tables

Arrays and Hash Tables (also known as Objects or Maps in JavaScript) are two of the most commonly used data structures. Understanding their differences, performance characteristics, and use cases is crucial for writing efficient code. In this article, we'll explore both data structures and when to use each one.

## Arrays

Arrays are ordered collections of elements that can be accessed by their index. In JavaScript, arrays are dynamic, meaning they can grow or shrink as needed.

### Array Implementation and Operations

```javascript
class CustomArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    return this.data[index];
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  delete(index) {
    const item = this.data[index];
    this.shiftItems(index);
    return item;
  }

  shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }
}
```

### Array Performance Characteristics

1. **Access**: O(1)
   - Direct access to elements by index
   - No iteration needed

2. **Search**: O(n)
   - Need to iterate through elements
   - No built-in search optimization

3. **Insertion/Deletion at End**: O(1)
   - No shifting required
   - Constant time operation

4. **Insertion/Deletion at Beginning/Middle**: O(n)
   - Need to shift elements
   - Performance degrades with array size

## Hash Tables

Hash Tables (Objects in JavaScript) are collections of key-value pairs where keys are unique. They provide fast access to values using keys.

### Hash Table Implementation

```javascript
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    return undefined;
  }

  keys() {
    const keysArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            keysArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    return keysArr;
  }

  values() {
    const valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    return valuesArr;
  }
}
```

### Hash Table Performance Characteristics

1. **Access**: O(1) average case
   - Direct access to values using keys
   - Hash function computes index

2. **Search**: O(1) average case
   - No iteration needed
   - Hash function finds location

3. **Insertion**: O(1) average case
   - No shifting required
   - Constant time operation

4. **Deletion**: O(1) average case
   - No shifting required
   - Constant time operation

## When to Use Each

### Use Arrays When:

1. **Order Matters**
   - Need to maintain element order
   - Sequential access is important

2. **Index-Based Access**
   - Need to access elements by position
   - Random access is required

3. **Iteration**
   - Need to process elements in sequence
   - Simple iteration is sufficient

### Use Hash Tables When:

1. **Key-Value Pairs**
   - Need to associate values with keys
   - Keys are unique

2. **Fast Lookups**
   - Need quick access to values
   - Search performance is critical

3. **No Order Required**
   - Element order doesn't matter
   - Random access by key is needed

## Practical Examples

### Example 1: User Management System

```javascript
// Using Array
class UserArray {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  findUserById(id) {
    return this.users.find(user => user.id === id);
  }
}

// Using Hash Table
class UserHash {
  constructor() {
    this.users = {};
  }

  addUser(user) {
    this.users[user.id] = user;
  }

  findUserById(id) {
    return this.users[id];
  }
}
```

### Example 2: Cache Implementation

```javascript
class Cache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }
}
```

## Best Practices

1. **Choose the Right Data Structure**
   - Consider access patterns
   - Think about performance requirements
   - Evaluate memory usage

2. **Optimize for Common Operations**
   - Use arrays for sequential access
   - Use hash tables for key-based access

3. **Handle Edge Cases**
   - Check for null/undefined values
   - Handle collisions in hash tables
   - Consider array bounds

4. **Memory Management**
   - Be mindful of array size
   - Consider hash table load factor
   - Clean up unused references

## Conclusion

Arrays and Hash Tables are both powerful data structures with different strengths and use cases. Understanding when to use each one is crucial for writing efficient code.

Key points to remember:
- Arrays are better for ordered data and sequential access
- Hash Tables are better for key-value pairs and fast lookups
- Consider performance characteristics for your specific use case
- Choose the right data structure based on your requirements

By mastering these data structures, you'll be better equipped to solve programming problems efficiently and write more performant code. 