---
title: "How JavaScript Works: Implementation of gRPC in a Nodejs application"
date: "2022-04-21"
readTime: "14 min read"
description: "Learn about implementing gRPC in Node.js applications, including protocol buffers, service definitions, and different communication patterns."
category: "Backend"
---

# How JavaScript Works: Implementation of gRPC in a Nodejs application

Before we get to gRPC, we had REST, the most popular and most familiar architectural style for building APIs which are used for Web applications and connecting microservices. It also provides a request and response model of communication using the HTTP 1.1 protocol. gRPC on the other hand works with a client response model of communication but uses the HTTP 2 protocol.

## Prerequisites

Below are the requirements to fully understand and implement gRPC in Nodejs:

1. A Basic understanding of Nodejs
2. A basic understanding of building APIs
3. Nodejs 12 or above should be installed

## The Concept of gRPC

One of the hardest things about software applications these days is building the APIs. We need to think about the endpoints and if they should follow the REST standards, the data model of the API(JSON, XML, etc), how we can handle errors with these endpoints, and even how we could scale these endpoints to handle a thousand requests. Building an API should be more about the data than the above. And this is where the gRPC framework comes in.

gRPC is a free and open-source Remote Procedure Call(RPC) framework developed by Google and can run in any environment. It is built on HTTP/2 which supports streaming. It is language-independent, has low latency, and makes client communication easier because you don't have to focus on implementing the HTTP server, HTTP client, thread and asynchronous model and all of that. Rather the focus is on the business logic because the gRPC framework handles these for you. It uses Protobuf over JSON and XML which is a binary format. And this is much better and faster.

## Methods of Communication

gRPC supports four types of service methods:

1. **Unary RPC**: A client makes a request to the server and waits synchronously for a response.
2. **Server streaming RPC**: A client makes a request to the server and gets a stream of responses.
3. **Client streaming RPC**: A client sends a stream of messages to the server and waits for a response.
4. **Bidirectional streaming RPC**: Both client and server send a stream of messages to each other.

## Implementation Steps

### 1. Setting Up the Project

First, create a new directory and initialize a Node.js project:

```bash
mkdir grpc-nodejs
cd grpc-nodejs
npm init -y
```

Install the required dependencies:

```bash
npm install @grpc/grpc-js @grpc/proto-loader
```

### 2. Creating the Protocol Buffer Definition

Create a `proto` file to define your service and message types:

```protobuf
syntax = "proto3";

package book;

service BookService {
  rpc CreateBook (CreateBookRequest) returns (Book);
  rpc ReadBooks (ReadBooksRequest) returns (stream Book);
}

message Book {
  string id = 1;
  string title = 2;
  string author = 3;
}

message CreateBookRequest {
  string title = 1;
  string author = 2;
}

message ReadBooksRequest {
  string author = 1;
}
```

### 3. Implementing the Server

Create a `server.js` file:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./book.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const books = [];

const server = new grpc.Server();

server.addService(bookProto.BookService.service, {
  createBook: (call, callback) => {
    const book = {
      id: Date.now().toString(),
      title: call.request.title,
      author: call.request.author
    };
    books.push(book);
    callback(null, book);
  },
  readBooks: (call) => {
    books.forEach(book => {
      if (book.author === call.request.author) {
        call.write(book);
      }
    });
    call.end();
  }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server running on port 50051');
});
```

### 4. Implementing the Client

Create a `client.js` file:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./book.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const client = new bookProto.BookService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Create a book
client.createBook({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Created book:', response);
});

// Read books by author
const call = client.readBooks({ author: 'F. Scott Fitzgerald' });
call.on('data', (book) => {
  console.log('Received book:', book);
});
call.on('end', () => {
  console.log('Stream ended');
});
```

## Pros and Cons

### Pros
- Very performant and fast in data exchange because of its use of Protocol buffers
- Provides automatic code generation
- One client library works for all languages
- Supports streaming both server and client

### Cons
- Hard to implement
- No browser support because gRPC uses HTTP/2 underhood which our browsers currently do not work with

## Conclusion

gRPC is a powerful framework for building high-performance, scalable APIs. While it may be more complex to implement than REST, its benefits in terms of performance and flexibility make it an excellent choice for microservices architecture and real-time applications.

Remember that while using gRPC, it's important to know that the best practices are still evolving, unlike a paradigm like REST where most of these have been standardized. Always complement your implementation with proper testing to ensure a great user experience. 