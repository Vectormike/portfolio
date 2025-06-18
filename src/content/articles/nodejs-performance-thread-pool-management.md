---
title: "How JavaScript Works: Nodejs Performance And Thread Pool Management"
date: "Jul 25, 2022"
readTime: "7 min read"
description: "A deep dive into Node.js performance, thread pool management, and the role of libuv in asynchronous operations."
slug: "nodejs-performance-thread-pool-management"
category: "Nodejs"
---

# How JavaScript Works: Nodejs Performance And Thread Pool Management

If you stumbled on this article, you are probably one of those Engineers who like to pay much attention to performance and optimizations in Nodejs. And this brings us to the topic of Thread Pool Management. It is a common belief that Nodejs has two threads:

* The main thread — performs asynchronous operations.
* The thread pool — performs asynchronous I/O operations.

Our focus will be on the thread pool that handles heavy tasks that are CPU intensive, file operations, child processes, pipes, signal handling, polling, and more. And all these are done using a library called the libuv library.

To better understand this article, basic knowledge of JavaScript and how the Nodejs runtime works is required.

## The Runtime environment

Before we move into the primary goal of this article, it would be beneficial to have a refresher on the Nodejs runtime even though we already know how it works. Nodejs, in a nutshell, is the V8 engine and some other libraries that handle I/O operations.

It is important to note that Nodejs is related to JavaScript, but it is an environment that allows your JavaScript code to run outside the browser.

Also, Nodejs is open-source software, introduced to the public in 2009 by Ryan Dahl at a JSConf, and it immediately became the most loved tool for building servers and IoT-related things.

The Nodejs runtime is asynchronous. Consequently, it does not wait for tasks to be complete but sends them to a specific thread and starts processing the next request. And this makes Nodejs servers highly scalable when compared to others.

Nodejs also does not buffer data, but it handles them in chunks, which is great for performance.

Another good thing is that Nodejs ships with a package manager — NPM. And the NPM houses all the Node modules you might need to build your application.

The Nodejs runtime has a wide range of applications. And this is why you have this article. The fact that it is widely adopted increases the concern for its performance. And this brings us to why and what the thread pool offers.

We are all aware of the main thread with the event loop, but most of us do not realize we can provide our Node app with multithreaded capabilities.

However, since Nodejs gives support for asynchronous operations, there are still some synchronous tasks that block the main thread until completed. The libuv provides a pool of other threads for some synchronous operations where it can distribute CPU loads.

## The Libuv library and its job

Nodejs has a few dependencies that provide certain features. They include the V8, llhttp, libuv, c-ares and OpenSSL. But libuv is what we will learn about in this article.

The libuv library is a C library that was created to abstract and handle asynchronous non-blocking I/O operations like:

* Asynchronous file operations
* Asynchronous DNS resolution
* Child process
* Signal handling
* Named pipes
* Timers
* Asynchronous TCP and UDP sockets
* Thread pooling

This library is responsible for providing Nodejs with multithreading or the ability to provide a pool of threads in a Nodejs process for synchronous tasks to ride on. The thread pool consists of four threads, created to handle heavy-duty tasks that shouldn't be on the main thread. And with this set-up, our application is not blocked by these tasks.

Some APIs — as listed below, use the thread pool created by libuv:

* dns.lookup()
* All zlib APIs that are synchronous
* All fs APIs that are synchronous except fs.FSWatcher()
* Asynchronous crypto APIs

The above list can be further categorized into CPU-intensive operations and I/O-intensive operations.

In summary, the libuv is one of the reasons why Nodejs applications always scale. If our Nodejs application had only the event loop where we would put in operations that are CPU and I/O intensive?

For example, a file compression in the event loop will make our application struggle to death. But to handle this, libuv will simply spin up a new thread. A new thread is also needed when reading a file system asynchronously. And this is because this I/O heavy task will slow down the main thread. However, synchronous file systems are mostly done on the main thread.

This libuv library enables us to increase the threads from the default 4 to 1024 threads. The reason for this is whenever one of the APIs or tasks running in any of the four threads takes a longer time, the performance of the other threads reduces. And this is the main reason for this article.

## Increasing performance

Since we know the performance challenges we encounter without the thread pool, to improve performance, we need to increase the number of threads by utilizing the thread pool.

Ideally, your server will be running on a machine that has logical cores, and these cores will have the threads run on them. So, if for instance, you have 4 threads running on a machine with enough cores it will be performant to increase the threads to suit the number of cores. But this is only advisable when you have a Nodejs application needing it.

To be clear, adjusting the number of threads can be done manually by setting the `UV_THREADPOOL_SIZE` environment to a number greater than 4. But this can be done dynamically by setting it based on the CPU count of your server. But because a server can be deployed to multiple machines, the number of threads is changed dynamically by setting it based on the CPU count of your server. And the number of threads will only be increased at your server's start-up time.

While this is a great way to increase the performance of your application, it still has a downside.

You might dynamically or manually increase the threads and still not use them — wasting resources. So identifying which code will use the thread pool now becomes important.

## Code samples using the main thread and thread pool

We will look at some code samples that use either the main thread or the thread pool. And this should give you an idea of how things should play out when managing the number of threads in your server.

This is a very simple HTTP server that gets executed on the main thread because it is a network operation, and they never use the thread pool except for the `dns.lookup()` stated earlier. So, it is advisable to remove all code executions that can block the server.

Another similar example is shown below:

In the above example, the file is read asynchronously, and this is where the thread pool comes in handy. So, there is no blockage in this operation.

But if we read files synchronously, our code will be blocked. Since the file will have to be completely read before the server returns a response. Take a look at an example below.

We will elaborate on the main thread and the thread pool with a final example below:

In the example above, `axios.get()` performs a DNS lookup to the URL to fetch the data. And this operation uses threading as we had explained earlier.

The callbacks — `.then()` is a network operation that occurs in the main thread.

The main reason for these examples is for you to identify the operations that will block code execution and also be handled by the libuv using the thread pool.

Finally, with this, you should also be able to determine if you need to increase the number of threads used by your Nodejs application.

## Conclusion

The first thing to note is that your code in Nodejs is single-threaded. And this does not mean that Node is running on a single thread. The question 'is Node single-threaded?' is always confusing because Node runs on V8 and Libuv.

And the Libuv library is what handles async and sync I/O using threads. Most people never consider Nodejs as multithreaded, and it has always been easier to explain it as single-threaded. But we cannot still ignore the fact that our code still blocks other code.

The Libuv library does a very excellent job of maintaining concurrency.

And if you need more illustrations on how the event loop works in Nodejs, I suggest you read post #4 of our JavaScript series.

Even if you feel like the scalability decisions have been made, it's always necessary to verify that this is indeed true and your users have a great experience with your product. Having code that blocks the sever operations slows your website. And this will make users leave without a doubt.

A solution like SessionStack will help you determine and further optimize the experience of your users by allowing you to replay their journeys as videos, showing you how your users experience your product. You can quickly determine whether your product is performing according to their expectations or not. If something is wrong, you can explore all of the technical details from the user's browser such as the network, debug information, and everything about their environment so that you can easily understand the problem and resolve it.

There is a free trial if you'd like to give SessionStack a try.

SessionStack replaying a session

Interested in more about JavaScript? Check out all "How JavaScript works" publications here.

[Source](https://medium.com/sessionstack-blog/how-javascript-works-nodejs-performance-and-thread-pool-management-dd8ce558f51d)
