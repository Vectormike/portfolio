export interface Article {
  title: string;
  date: string;
  readTime: string;
  description: string;
  slug: string;
  category: string;
}

export const articles: Article[] = [
  {
    title: "5 top Go web frameworks",
    date: "Apr 3, 2025",
    readTime: "15 min read",
    description: "Looking for the best Go frameworks? Compare the top 8 Go web frameworks for 2025, including Gin, Fiber, Echo, and Beego, with pros, cons, and performance insights.",
    slug: "go-web-frameworks",
    category: "Go"
  },
  {
    title: "5 Rust Game Engines To Consider For Your Next Project",
    date: "Dec 22, 2023",
    readTime: "6 min read",
    description: "Let's look at five popular Rust game engines and discuss how to choose the best option for your next project.",
    slug: "rust-game-engines",
    category: "Rust"
  },
  {
    title: "What is a proxy, and how does it work in Node.js?",
    date: "May 23, 2023",
    readTime: "7 min read",
    description: "Using a proxy server in Node.js can decrease security risks, improve anonymity, load balance, cache, and even increase browsing speed.",
    slug: "proxy-in-nodejs",
    category: "Node.js"
  },
  {
    title: "React Native vs. Swift for iOS Development",
    date: "Jan 24, 2023",
    readTime: "7 min read",
    description: "Compare building an iOS app using React Native vs. Swift, including which has better performance and the faster development lifecycle.",
    slug: "react-native-vs-swift",
    category: "Mobile Development"
  },
  {
    title: "Understanding Primitive Data Types in Rust",
    date: "Sep 2, 2022",
    readTime: "5 min read",
    description: "Rust primitive types can be grouped into scalar and compound data types. Let's review what they are, how they're used, and their limitations.",
    slug: "rust-primitives",
    category: "Rust"
  },
  {
    title: "How to Market Make and Transact with Hashflow",
    date: "Jul 29, 2022",
    readTime: "6 min read",
    description: "Learn how traders are connected with pinpoints on the Hashflow token, how it works differently from others, how to market make, and how to trade.",
    slug: "hashflow-trading",
    category: "Blockchain"
  },
  {
    title: "How JavaScript Works: Implementation of gRPC in a Nodejs application",
    date: "Apr 21, 2022",
    readTime: "14 min read",
    description: "Learn about implementing gRPC in Node.js applications, including protocol buffers, service definitions, and different communication patterns.",
    slug: "grpc-nodejs-implementation",
    category: "Backend"
  },
  {
    title: "Node.js Logging Best Practices: Essential Guide",
    date: "Mar 31, 2022",
    readTime: "5 min read",
    description: "Understand your application with more clarity and reduce errors in Node.js by following these logging best practices.",
    slug: "nodejs-logging-practices",
    category: "Node.js"
  },
  {
    title: "Managing Decentralized Data with Ceramic",
    date: "Mar 30, 2022",
    readTime: "4 min read",
    description: "Learn about the Ceramic protocol as we look at the core components, consensus mechanism, and what it really offers.",
    slug: "ceramic-decentralized-data",
    category: "Blockchain"
  },
  {
    title: "How JavaScript Works: Streams and their use cases",
    date: "Mar 15, 2022",
    readTime: "12 min read",
    description: "Explore Node.js streams, their types, and practical use cases for handling data efficiently in your applications.",
    slug: "nodejs-streams-use-cases",
    category: "Node.js"
  },
  {
    title: "Is Go Overtaking Node.js?",
    date: "Mar 16, 2022",
    readTime: "4 min read",
    description: "See how Go and Node.js approach different situations, understand their scalability, and answer the question, 'Is Go overtaking Node.js.'",
    slug: "go-vs-nodejs",
    category: "Backend"
  },
  {
    title: "How JavaScript Works: Building a child process in Node.js",
    date: "Feb 28, 2022",
    readTime: "10 min read",
    description: "Master the art of creating and managing child processes in Node.js for better performance and parallel processing.",
    slug: "nodejs-child-processes",
    category: "Node.js"
  },
  {
    title: "Using Redis Pub/Sub With Node.js",
    date: "Feb 22, 2022",
    readTime: "4 min read",
    description: "Learn about the pub/sub pattern and how to implement it in a Node.js application using Redis and other alternatives.",
    slug: "redis-pubsub-nodejs",
    category: "Node.js"
  },
  {
    title: "Developing Terra Smart Contracts",
    date: "Jan 3, 2022",
    readTime: "8 min read",
    description: "Learn how to can develop smart contracts and deploy them to the Terra blockchain network to create decentralized apps.",
    slug: "terra-smart-contracts",
    category: "Blockchain"
  },
  {
    title: "How JavaScript Works: Deploying a Nodejs application with Kubernetes",
    date: "Sep 28, 2022",
    readTime: "8 min read",
    description: "A comprehensive guide on deploying Node.js applications using Kubernetes, covering container orchestration, Docker setup, and Kubernetes deployment configurations.",
    slug: "nodejs-kubernetes-deployment",
    category: "DevOps"
  },
  {
    title: "Top 5 Decentralized App Development Frameworks",
    date: "Nov 19, 2021",
    readTime: "11 min read",
    description: "We compare popular decentralized frameworks used by blockchain engineers, including benefits, disadvantages, and networks.",
    slug: "dapp-frameworks",
    category: "Blockchain"
  },
  {
    title: "How JavaScript Works: Lists vs Blockchain + implementation practices",
    date: "Oct 22, 2021",
    readTime: "10 min read",
    description: "Compare Linked Lists and Blockchain data structures, their implementations, and practical use cases in JavaScript.",
    slug: "lists-vs-blockchain",
    category: "Data Structures"
  },
  {
    title: "How JavaScript Works: Stacks and Queues + tips for efficient implementation",
    date: "Oct 14, 2021",
    readTime: "11 min read",
    description: "Learn about Stacks and Queues data structures, their implementations, and best practices for efficient usage in JavaScript.",
    slug: "stacks-and-queues",
    category: "Data Structures"
  },
  {
    title: "Comparing Go Debugging Tools",
    date: "Oct 5, 2021",
    readTime: "7 min read",
    description: "Learn about a few popular Go debugging tools by looking at their installations, debugging processes, and pros and cons.",
    slug: "go-debugging-tools",
    category: "Go"
  },
  {
    title: "How JavaScript Works: Introduction to Graphs and Trees",
    date: "Sep 30, 2021",
    readTime: "12 min read",
    description: "Explore Graphs and Trees data structures, their types, and practical implementations in JavaScript applications.",
    slug: "graphs-and-trees",
    category: "Data Structures"
  },
  {
    title: "How JavaScript Works: Arrays vs Hash Tables",
    date: "Sep 23, 2021",
    readTime: "9 min read",
    description: "Compare Arrays and Hash Tables, their performance characteristics, and when to use each in JavaScript applications.",
    slug: "arrays-vs-hash-tables",
    category: "Data Structures"
  },
  {
    title: "Creating Duplex streams in Node.js",
    date: "Aug 13, 2021",
    readTime: "2 min read",
    description: "Duplex streams are a fundamental category of streams in Node.js. Learn how to create and implement them into a Node.js app.",
    slug: "duplex-streams",
    category: "Node.js"
  },
  {
    title: "How JavaScript Works: Dockerizing a Node.js Application",
    date: "Jul 22, 2021",
    readTime: "7 min read",
    description: "Learn how to containerize your Node.js applications using Docker, including best practices for development, testing, and deployment.",
    slug: "dockerizing-nodejs",
    category: "DevOps"
  },
  {
    title: "Grand Central Dispatch Tutorial",
    date: "Jun 25, 2021",
    readTime: "3 min read",
    description: "With Grand Central Dispatch, learn how to execute heavy task operations in the background, keeping main threads running smoothly.",
    slug: "grand-central-dispatch",
    category: "iOS"
  },
  {
    title: "How JavaScript Works: High-Performing Code + 8 Optimization Tips",
    date: "Jun 24, 2021",
    readTime: "7 min read",
    description: "Discover common performance pitfalls and learn 8 practical tips to optimize your JavaScript code for better performance.",
    slug: "javascript-optimization-tips",
    category: "JavaScript"
  },
  {
    title: "How JavaScript Works: Design Patterns + 4 Best Practices",
    date: "Jun 17, 2021",
    readTime: "8 min read",
    description: "Explore creational, structural, and behavioral design patterns in JavaScript, along with best practices for implementation.",
    slug: "javascript-design-patterns",
    category: "Programming Concepts"
  },
  {
    title: "How JavaScript Works: Functional Style and Comparison",
    date: "Jun 10, 2021",
    readTime: "6 min read",
    description: "Understand functional programming in JavaScript and how it compares to other programming paradigms.",
    slug: "javascript-functional-style",
    category: "Programming Concepts"
  },
  {
    title: "Understanding Protocols in Swift",
    date: "Jun 4, 2021",
    readTime: "3 min read",
    description: "See how Swift's protocol-oriented programming makes building objects easier and more efficient for developers.",
    slug: "swift-protocols",
    category: "iOS"
  },
  {
    title: "What to expect from Crystal 1.0",
    date: "Apr 21, 2021",
    readTime: "4 min read",
    description: "Get started with an overview of Crystal 1.0, a new frontend language inspired by Ruby with the power of C.",
    slug: "crystal-one-overview",
    category: "Programming Languages"
  },
  {
    title: "Redux Isn't Dead",
    date: "Apr 14, 2021",
    readTime: "7 min read",
    description: "The reports of Redux's death are greatly exaggerated. Learn why Redux is still relevant and when to use it in your React applications.",
    slug: "redux-isnt-dead",
    category: "Frontend"
  },
  {
    title: "Use Cases for Visual Programming Environments Today",
    date: "Mar 1, 2021",
    readTime: "4 min read",
    description: "Illustrating programming concepts in a VPE provides valuable solutions for multimedia creation, business intelligence, and even video game development.",
    slug: "visual-programming-environments",
    category: "Programming Tools"
  },
  {
    title: "What is Vlang? An Introduction",
    date: "Feb 25, 2021",
    readTime: "3 min read",
    description: "V, aka 'Vlang,' has a more readable and simpler syntax than many other frameworks, making it clean and easy to use.",
    slug: "vlang-introduction",
    category: "Programming Languages"
  },
  {
    title: "What is railway oriented programming?",
    date: "Dec 16, 2020",
    readTime: "4 min read",
    description: "This guide explains railway oriented programming in simple terms and shows you how to more efficiently approach error handling in your codebase.",
    slug: "railway-oriented-programming",
    category: "Programming Concepts"
  },
  {
    title: "Deno Alternatives to Popular Node Projects",
    date: "Dec 7, 2020",
    readTime: "6 min read",
    description: "Here, you can learn about some Deno alternatives to the most popular Node projects used during development.",
    slug: "deno-node-alternatives",
    category: "JavaScript"
  },
  {
    title: "Frustrations with Rails",
    date: "Nov 30, 2020",
    readTime: "4 min read",
    description: "Ruby on Rails has a lot of pros, but it also has its fair share of cons — namely, poor performance and high CPU usage. Find out what's so frustrating about Rails and how to improve your experience with the framework.",
    slug: "rails-frustrations",
    category: "Backend"
  },
  {
    title: "Laravel vs. AdonisJs: Which should you use?",
    date: "Nov 20, 2020",
    readTime: "5 min read",
    description: "Compare Laravel and AdonisJs with this tutorial highlighting the best and worst features of each framework.",
    slug: "laravel-vs-adonisjs",
    category: "Backend"
  }
]; 