---
title: "How JavaScript Works: Introduction to Graphs and Trees"
date: "2021-09-30"
readTime: "12 min read"
description: "Explore Graphs and Trees data structures, their types, and practical implementations in JavaScript applications."
category: "Data Structures"
---

# How JavaScript Works: Introduction to Graphs and Trees

Graphs and Trees are fundamental data structures that are widely used in computer science and software development. They are particularly useful for representing hierarchical data and relationships between objects. In this article, we'll explore both data structures and their implementations in JavaScript.

## Trees

A Tree is a hierarchical data structure consisting of nodes connected by edges. Each node can have zero or more child nodes, but only one parent node (except for the root node). The topmost node is called the root, and nodes without children are called leaves.

### Binary Tree Implementation

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // In-order traversal (Left -> Root -> Right)
  inOrderTraversal(node = this.root) {
    if (node) {
      this.inOrderTraversal(node.left);
      console.log(node.value);
      this.inOrderTraversal(node.right);
    }
  }

  // Pre-order traversal (Root -> Left -> Right)
  preOrderTraversal(node = this.root) {
    if (node) {
      console.log(node.value);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }

  // Post-order traversal (Left -> Right -> Root)
  postOrderTraversal(node = this.root) {
    if (node) {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      console.log(node.value);
    }
  }
}
```

### Common Tree Types

1. **Binary Search Tree (BST)**
   - Left subtree contains only nodes with values less than the root
   - Right subtree contains only nodes with values greater than the root
   - Both left and right subtrees must also be binary search trees

2. **AVL Tree**
   - Self-balancing binary search tree
   - Height difference between left and right subtrees is at most 1

3. **Red-Black Tree**
   - Self-balancing binary search tree
   - Each node is either red or black
   - Root is always black
   - Red nodes cannot have red children

## Graphs

A Graph is a data structure consisting of a set of vertices (nodes) connected by edges. Graphs can be directed or undirected, and edges can have weights.

### Graph Implementation

```javascript
class Graph {
  constructor() {
    this.vertices = new Map();
  }

  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.vertices.has(vertex1) || !this.vertices.has(vertex2)) {
      throw new Error('Vertex not found');
    }
    this.vertices.get(vertex1).push(vertex2);
    this.vertices.get(vertex2).push(vertex1); // For undirected graph
  }

  // Breadth-First Search
  bfs(startVertex) {
    const visited = new Set();
    const queue = [startVertex];
    visited.add(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();
      console.log(vertex);

      const neighbors = this.vertices.get(vertex);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  // Depth-First Search
  dfs(startVertex) {
    const visited = new Set();
    this._dfsHelper(startVertex, visited);
  }

  _dfsHelper(vertex, visited) {
    visited.add(vertex);
    console.log(vertex);

    const neighbors = this.vertices.get(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this._dfsHelper(neighbor, visited);
      }
    }
  }
}
```

### Common Graph Types

1. **Undirected Graph**
   - Edges have no direction
   - If A is connected to B, then B is connected to A

2. **Directed Graph**
   - Edges have direction
   - If A is connected to B, B might not be connected to A

3. **Weighted Graph**
   - Edges have weights
   - Useful for representing distances or costs

## Practical Applications

### Tree Applications

1. **File System**
   - Directory structure
   - File hierarchy

2. **DOM Tree**
   - HTML document structure
   - Element relationships

3. **Expression Trees**
   - Mathematical expressions
   - Compiler syntax trees

### Graph Applications

1. **Social Networks**
   - Friend connections
   - Follow relationships

2. **Maps and Navigation**
   - Road networks
   - Shortest path algorithms

3. **Dependency Resolution**
   - Package dependencies
   - Build systems

## Example: Implementing a File System Tree

```javascript
class FileNode {
  constructor(name, isDirectory = false) {
    this.name = name;
    this.isDirectory = isDirectory;
    this.children = new Map();
    this.parent = null;
  }

  addChild(child) {
    child.parent = this;
    this.children.set(child.name, child);
  }

  removeChild(name) {
    const child = this.children.get(name);
    if (child) {
      child.parent = null;
      this.children.delete(name);
    }
  }

  getPath() {
    const path = [];
    let current = this;
    while (current) {
      path.unshift(current.name);
      current = current.parent;
    }
    return path.join('/');
  }
}
```

## Example: Implementing a Social Network Graph

```javascript
class SocialNetwork {
  constructor() {
    this.users = new Map();
  }

  addUser(userId) {
    if (!this.users.has(userId)) {
      this.users.set(userId, new Set());
    }
  }

  addFriendship(user1, user2) {
    if (!this.users.has(user1) || !this.users.has(user2)) {
      throw new Error('User not found');
    }
    this.users.get(user1).add(user2);
    this.users.get(user2).add(user1);
  }

  getFriends(userId) {
    return Array.from(this.users.get(userId) || []);
  }

  getMutualFriends(user1, user2) {
    const friends1 = this.users.get(user1);
    const friends2 = this.users.get(user2);
    return Array.from(friends1).filter(friend => friends2.has(friend));
  }
}
```

## Conclusion

Trees and Graphs are powerful data structures that are essential for many programming tasks. Understanding their characteristics and implementations is crucial for solving complex problems efficiently.

Key points to remember:
- Choose the right data structure for your use case
- Consider the performance implications of different operations
- Implement proper error handling and edge cases
- Use appropriate traversal algorithms for your needs

By mastering these data structures, you'll be better equipped to handle complex data relationships and build more efficient applications. 