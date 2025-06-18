---
title: "How JavaScript Works: Lists vs Blockchain + implementation practices"
date: "2021-10-22"
readTime: "10 min read"
description: "Compare Linked Lists and Blockchain data structures, their implementations, and practical use cases in JavaScript."
category: "Data Structures"
---

# How JavaScript Works: Lists vs Blockchain + implementation practices

In this article, we will be making a comparison between two interesting data structures: Lists and Blockchain. You might be wondering how and why we are comparing a Blockchain to a List? If you have an idea of Blockchain before now, you should know that there are a few similarities between Lists — Linked List to be more precise — and Blockchain.

## List Data Structure

List is a common and simple data structure. It is a collection of different elements in an ordered manner. List is an Abstract data type(ADT) which means it is just a model where you can have your own implementation. When we say that a List is just a model, it means it is a structure with specific features where you can make your own implementation.

The mandatory functionality in a List is to add and remove elements. It is more like a Set but a Set has more restrictions. Duplicate elements are not allowed in Sets.

### Array List Implementation

This is the most common implementation of a List. Note that we are not talking about Array but Array List — they are different. Array List grows and shrinks/reduces automatically while an Array has a fixed size and cannot increase after it has already been declared.

```javascript
class ArrayList {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  remove(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  get(index) {
    return this.items[index];
  }

  size() {
    return this.items.length;
  }
}
```

### Linked List Implementation

Linked Lists are our focus. A linear structure that consists of a group of nodes in a sequence. Each node holds the data and the address of the next node. The important thing to note is that each node has a pointer to the next available node.

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(data) {
    const node = new Node(data);
    
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return null;
    
    if (index === 0) {
      this.head = this.head.next;
      this.length--;
      return;
    }
    
    let current = this.head;
    let previous = null;
    let count = 0;
    
    while (count < index) {
      previous = current;
      current = current.next;
      count++;
    }
    
    previous.next = current.next;
    this.length--;
  }
}
```

## Blockchain

Blockchain is a set of blocks in a serialized and ordered manner which continuously grows as more records are added. It has only the ability to append data to the chain; updating and deleting previous blocks/nodes is not possible.

It has similarities to a Linked List, but a Linked List has a pointer function while the Blockchain has a hash function. The hash function creates a hash for each block such that the previous block uses it to recognize the next block.

### Block Implementation

```javascript
const crypto = require('crypto');

class Block {
  constructor(timestamp, data, previousHash = '') {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(this.timestamp + JSON.stringify(this.data) + this.previousHash)
      .digest('hex');
  }
}
```

### Blockchain Implementation

```javascript
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
```

## List vs Blockchain Comparison

1. **Structure**:
   - List: Linear structure with nodes pointing to each other
   - Blockchain: Linear structure with blocks linked by hashes

2. **Data Modification**:
   - List: Can add, remove, and modify data
   - Blockchain: Can only append data, no modification or deletion

3. **Security**:
   - List: No built-in security features
   - Blockchain: Uses cryptographic hashing for data integrity

4. **Use Cases**:
   - List: General-purpose data structure for various applications
   - Blockchain: Distributed ledger, cryptocurrency, smart contracts

## Conclusion

While both Lists and Blockchain are data structures, they serve different purposes and have different characteristics. Lists are more flexible and general-purpose, while Blockchain provides immutability and security through cryptographic hashing.

The choice between using a List or implementing a Blockchain depends on your specific requirements. If you need a simple, flexible data structure, a List is appropriate. If you need immutability, security, and distributed consensus, then Blockchain is the way to go.

Remember that these are just basic implementations. Real-world applications often require more sophisticated features and optimizations. Always consider your specific use case and requirements when choosing a data structure. 