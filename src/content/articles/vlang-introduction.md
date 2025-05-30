---
title: "What is Vlang? An Introduction"
date: "Feb 25, 2021"
readTime: "3 min read"
description: "V, aka 'Vlang,' has a more readable and simpler syntax than many other frameworks, making it clean and easy to use."
slug: "vlang-introduction"
category: "Programming Languages"
---

V (also known as Vlang) is a statically typed compiled programming language designed for building maintainable software. Let's explore its key features and capabilities.

## Introduction to V

V is designed with simplicity and performance in mind, offering:
- Fast compilation
- Zero dependencies
- Hot code reloading
- Native cross-platform development
- Memory safety without garbage collection

## Basic Syntax

### Hello World
```v
fn main() {
    println('Hello, V!')
}
```

### Variables and Types
```v
// Type inference
name := 'John'      // string
age := 25          // int
height := 1.85     // f64

// Explicit typing
mut count: int = 0
is_valid: bool = true

// Constants
const (
    pi = 3.14159
    max_value = 100
)
```

## Control Structures

### Conditionals
```v
fn check_number(n int) string {
    if n < 0 {
        return 'negative'
    } else if n > 0 {
        return 'positive'
    } else {
        return 'zero'
    }
}

// Match expression
match number {
    1 { println('one') }
    2 { println('two') }
    else { println('other') }
}
```

### Loops
```v
// For loop
for i := 0; i < 5; i++ {
    println(i)
}

// While style
mut x := 0
for x < 5 {
    x++
}

// Iterator style
numbers := [1, 2, 3, 4, 5]
for num in numbers {
    println(num)
}
```

## Functions and Methods

```v
// Basic function
fn add(x int, y int) int {
    return x + y
}

// Multiple return values
fn divide_and_remainder(x int, y int) (int, int) {
    return x / y, x % y
}

// Method on type
struct Point {
mut:
    x int
    y int
}

fn (p Point) distance_from_origin() f64 {
    return math.sqrt(p.x * p.x + p.y * p.y)
}
```

## Structs and Interfaces

```v
// Struct definition
struct User {
    name string
    age  int
mut:
    email string
}

// Interface
interface Animal {
    name string
    make_sound() string
}

struct Dog {
    name string
}

fn (d Dog) make_sound() string {
    return 'woof'
}
```

## Arrays and Maps

```v
// Arrays
numbers := [1, 2, 3, 4, 5]
mut fruits := ['apple', 'banana']
fruits << 'orange'    // Append

// Fixed size array
fixed := [5]int{init: 0}

// Maps
mut ages := map[string]int{}
ages['John'] = 25
ages['Alice'] = 30
```

## Error Handling

```v
// Option type
fn divide(x f64, y f64) ?f64 {
    if y == 0 {
        return error('division by zero')
    }
    return x / y
}

// Usage
if result := divide(10, 2) {
    println(result)
} else {
    println(err)
}
```

## Concurrency

```v
// Spawning concurrent tasks
fn expensive_computation() int {
    time.sleep(2 * time.second)
    return 42
}

fn main() {
    handle := spawn expensive_computation()
    result := handle.wait()
    println(result)
}
```

## Modules and Imports

```v
// math.v
module math

pub fn square(x int) int {
    return x * x
}

// main.v
import math

fn main() {
    println(math.square(5))
}
```

## Web Development

```v
// Simple web server
import vweb

struct App {
    vweb.Context
}

fn (app &App) index() vweb.Result {
    return app.text('Hello from V!')
}

fn main() {
    vweb.run<App>(8080)
}
```

## File Operations

```v
// Reading file
content := os.read_file('example.txt') or {
    println('Failed to read file: $err')
    return
}

// Writing file
os.write_file('output.txt', 'Hello, V!') or {
    println('Failed to write file: $err')
    return
}
```

## Best Practices

1. Memory Management
```v
// V automatically frees memory
struct Resource {
    data string
}

fn use_resource() {
    r := Resource{
        data: 'example'
    }
    // Automatically freed when out of scope
}
```

2. Error Handling
```v
fn process_data() ? {
    file := os.open('data.txt')?
    content := file.read_to_string()?
    // Process content
}
```

## Conclusion

V offers:
- Simple and clean syntax
- Fast compilation
- Memory safety
- Built-in testing
- Cross-platform support
- Growing ecosystem

Key advantages:
- Zero dependencies
- Hot code reloading
- Native cross-compilation
- Performance
- Safety guarantees

For more information, visit the [V Programming Language Documentation](https://vlang.io/docs). 