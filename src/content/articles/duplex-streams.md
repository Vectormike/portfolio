---
title: "Creating Duplex streams in Node.js"
date: "2021-09-15"
readTime: "4 min read"
description: "Duplex streams are a fundamental category of streams in Node.js. However, they're often misunderstood, including the Duplex stream."
---

Duplex streams are a fundamental category of streams in Node.js. However, they're often misunderstood, including the Duplex stream. This type of stream is hybrid, meaning it expects a read and write method while it's implemented.

## What are Duplex Streams?

A Duplex stream is a stream that implements both the Readable and Writable stream interfaces. Think of it as a two-way stream where data can flow in both directions. A good real-world example would be a TCP socket, where you can both send and receive data.

## Creating a Duplex Stream

Here's how you can create a basic Duplex stream:

```javascript
const { Duplex } = require('stream');

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    this.data = [];
  }

  _write(chunk, encoding, callback) {
    this.data.push(chunk);
    callback();
  }

  _read(size) {
    const chunk = this.data.shift();
    if (chunk) {
      this.push(chunk);
    } else {
      this.push(null);
    }
  }
}
```

## Understanding the Implementation

### The _write Method

The `_write` method is called when data is written to the stream. It takes three arguments:
- `chunk`: The data to be written
- `encoding`: The encoding of the data (if it's a string)
- `callback`: A function to be called when the write is complete

### The _read Method

The `_read` method is called when the consumer wants to read data from the stream. It takes one argument:
- `size`: A suggestion for how much data to read

## Using the Duplex Stream

Here's an example of how to use our Duplex stream:

```javascript
const myDuplex = new MyDuplex();

// Writing to the stream
myDuplex.write('Hello');
myDuplex.write('World');

// Reading from the stream
myDuplex.on('data', (chunk) => {
  console.log(chunk.toString()); // Will output: Hello, then World
});
```

## Common Use Cases

1. **TCP Sockets**: Network connections where data flows both ways
2. **Transform Streams**: Processing data while it's being transferred
3. **Pass-through Streams**: Monitoring or modifying data as it passes through

## Best Practices

1. **Error Handling**: Always handle potential errors
```javascript
myDuplex.on('error', (error) => {
  console.error('Stream error:', error);
});
```

2. **Backpressure**: Respect the backpressure mechanism
```javascript
if (!myDuplex.write(data)) {
  // Wait for 'drain' event before writing more
  myDuplex.once('drain', writeMore);
}
```

3. **Cleanup**: Properly destroy streams when done
```javascript
myDuplex.on('end', () => {
  myDuplex.destroy();
});
```

## Conclusion

Duplex streams are powerful tools in Node.js for handling bidirectional data flow. They're particularly useful in networking applications and data transformation scenarios. Understanding how to implement and use them properly can greatly enhance your Node.js applications. 