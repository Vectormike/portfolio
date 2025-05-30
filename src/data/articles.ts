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
    date: "26th September, 2021",
    readTime: "9 min read",
    description: "Looking for the top Go frameworks for the web? You came to the right place. Go is a multiparadigm, statically-typed, and compiled programming language designed by Google.",
    slug: "go-web-frameworks",
    category: "Go"
  },
  {
    title: "Creating Duplex streams in Node.js",
    date: "15th September, 2021",
    readTime: "4 min read",
    description: "Duplex streams are a fundamental category of streams in Node.js. However, they're often misunderstood, including the Duplex stream.",
    slug: "duplex-streams",
    category: "Node.js"
  },
  {
    title: "React Native vs. Swift for iOS development",
    date: "21st May, 2021",
    readTime: "7 min read",
    description: "If you're looking to build an iOS app, you've got a fair number of languages to work with. React Native and Swift are two such tools to do so.",
    slug: "react-native-vs-swift",
    category: "Mobile Development"
  },
  {
    title: "What to expect from Crystal 1.0",
    date: "23rd April, 2021",
    readTime: "7 min read",
    description: "Crystal is a Ruby-like programming language with the power of C. Ruby/Rails developers especially should try this language because of its similarity to Ruby in syntax and pure elegance.",
    slug: "crystal-1-0",
    category: "Crystal"
  },
  {
    title: "What is Vlang? An introduction",
    date: "28th February, 2021",
    readTime: "5 min read",
    description: "If you've managed to end up at this article, it's probably because you either have no idea what Vlang is or want to know more.",
    slug: "what-is-vlang",
    category: "V Language"
  },
  {
    title: "What is a proxy, and how does it work in Node.js?",
    date: "1st January, 2021",
    readTime: "6 min read",
    description: "In this article, we will take a deep dive into proxy servers, including what they are, their benefits, what types are available, and their potential drawbacks.",
    slug: "proxy-in-nodejs",
    category: "Node.js"
  },
  {
    title: "What is railway oriented programming?",
    date: "17th December, 2020",
    readTime: "6 min read",
    description: "I recently stumbled upon Scott Wlaschin's talk on railway oriented programming where he talked about an epic new way of handling errors using the functional approach.",
    slug: "railway-oriented-programming",
    category: "Programming Concepts"
  },
  {
    title: "How to deploy an AdonisJs application to DigitalOcean",
    date: "30th October, 2020",
    readTime: "6 min read",
    description: "The AdonisJs framework, highly focused on speed and stability, was created as an alternative to other frameworks in the Node.js ecosystem.",
    slug: "deploy-adonisjs-digitalocean",
    category: "DevOps"
  },
  {
    title: "Heard of JSON Patching?",
    date: "8th April, 2020",
    readTime: "2 min read",
    description: "Have you heard about JSON Patch? The first time I came across this 'dude' was in an interview, and it took me hours to actually understand why I'd ever want to be needing this for.",
    slug: "json-patching",
    category: "Web Development"
  },
  {
    title: "Docker Simplified I",
    date: "26th December, 2019",
    readTime: "4 min read",
    description: "In this article, we will be looking at Docker Simplified I: Introduction. What the hell is Docker? Why Docker? Docker Components. Docker Tools.",
    slug: "docker-simplified",
    category: "DevOps"
  }
]; 