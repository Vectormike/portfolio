---
title: "How JavaScript Works: Streams and their use cases"
date: "2022-03-15"
readTime: "12 min read"
description: "Explore Node.js streams, their types, and practical use cases for handling data efficiently in your applications."
category: "Node.js"
---

# How JavaScript Works: Streams and their use cases

Streams are one of the fundamental concepts that power Node.js applications. They are objects that let you read data from a source or write data to a destination continuously. In Node.js, there are four types of streams:

1. Readable - Used for read operations
2. Writable - Used for write operations
3. Duplex - Used for both read and write operations
4. Transform - A type of duplex stream where the output is computed based on input

## Why Use Streams?

Streams are particularly useful when dealing with large amounts of data. Instead of loading the entire file into memory, streams allow you to process data in chunks, which is more memory efficient. Here are some key benefits:

- Memory efficiency: You don't need to load large amounts of data in memory
- Time efficiency: You can start processing data as soon as you have it, rather than waiting for the entire payload
- Composable: You can pipe streams together to create powerful data processing pipelines

## Types of Streams

### 1. Readable Streams

Readable streams are used for read operations. Here's an example of reading a file using streams:

```javascript
const fs = require('fs');

const readableStream = fs.createReadStream('input.txt');

readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString());
});

readableStream.on('end', () => {
  console.log('Finished reading');
});

readableStream.on('error', (error) => {
  console.error('Error:', error);
});
```

### 2. Writable Streams

Writable streams are used for write operations. Here's an example of writing to a file:

```javascript
const fs = require('fs');

const writableStream = fs.createWriteStream('output.txt');

writableStream.write('Hello, World!\n');
writableStream.write('This is a test.\n');
writableStream.end();

writableStream.on('finish', () => {
  console.log('Finished writing');
});

writableStream.on('error', (error) => {
  console.error('Error:', error);
});
```

### 3. Duplex Streams

Duplex streams are both readable and writable. Here's an example using a TCP server:

```javascript
const net = require('net');

const server = net.createServer((socket) => {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');
```

### 4. Transform Streams

Transform streams are a type of duplex stream where the output is computed based on input. Here's an example of a custom transform stream:

```javascript
const { Transform } = require('stream');

class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const uppercase = new UppercaseTransform();

process.stdin
  .pipe(uppercase)
  .pipe(process.stdout);
```

## Common Use Cases

### 1. File Processing

Streams are perfect for processing large files:

```javascript
const fs = require('fs');
const { Transform } = require('stream');

class LineNumberTransform extends Transform {
  constructor() {
    super();
    this.lineNumber = 1;
  }

  _transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\n');
    const numberedLines = lines.map(line => 
      `${this.lineNumber++}: ${line}`
    ).join('\n');
    this.push(numberedLines);
    callback();
  }
}

fs.createReadStream('input.txt')
  .pipe(new LineNumberTransform())
  .pipe(fs.createWriteStream('output.txt'));
```

### 2. HTTP Response Streaming

Streams are commonly used in HTTP responses:

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const fileStream = fs.createReadStream('large-file.txt');
  fileStream.pipe(res);
});

server.listen(3000);
```

### 3. Data Compression

Streams can be used for data compression:

```javascript
const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
```

## Best Practices

1. Always handle errors in streams
2. Use the `pipeline` function for multiple streams
3. Consider using the `stream.promises` API for async/await support
4. Be mindful of backpressure
5. Use appropriate stream types for your use case

## Conclusion

Streams are a powerful feature in Node.js that enable efficient data processing. They are particularly useful when dealing with large files, real-time data, or when you need to process data in chunks. By understanding the different types of streams and their use cases, you can write more efficient and scalable Node.js applications.

Remember to always handle errors and consider backpressure when working with streams. The Node.js streams API provides a robust foundation for building data processing pipelines, and with practice, you can create sophisticated data processing applications. 