---
title: "Understanding Primitive Data Types in Rust"
description: "Rust primitive types can be grouped into scalar and compound data types. Let's review what they are, how they're used, and their limitations."
date: "Sep 2, 2022"
readTime: "5 min read"
---

Rust's type system is one of its strongest features, providing memory safety and preventing many common programming errors at compile time. Let's dive deep into Rust's primitive data types and understand how to use them effectively.

## Scalar Types

Scalar types represent a single value. Rust has four primary scalar types:

### 1. Integers

Rust provides several integer types with different sizes:

```rust
// Signed integers
let x: i8 = -128;    // -128 to 127
let x: i16 = 32767;  // -32768 to 32767
let x: i32 = 2147483647; // Default integer type
let x: i64 = 9223372036854775807;
let x: i128 = 170141183460469231731687303715884105727;

// Unsigned integers
let x: u8 = 255;     // 0 to 255
let x: u16 = 65535;  // 0 to 65535
let x: u32 = 4294967295;
let x: u64 = 18446744073709551615;
let x: u128 = 340282366920938463463374607431768211455;
```

### 2. Floating-Point Numbers

Rust has two floating-point types:

```rust
let x: f32 = 3.14;  // Single precision
let x: f64 = 3.14159265359;  // Double precision (default)

// Scientific notation
let x = 2.0e5;  // 200000.0
```

### 3. Booleans

The boolean type has two possible values:

```rust
let t: bool = true;
let f: bool = false;

// Used in control flow
if t {
    println!("This will print");
}
```

### 4. Characters

Rust's char type represents a Unicode scalar value:

```rust
let c: char = 'z';
let z: char = 'ℤ';
let heart_eyed_cat: char = '😻';

// Characters are 4 bytes each
assert_eq!(std::mem::size_of::<char>(), 4);
```

## Compound Types

Compound types can group multiple values into one type.

### 1. Tuples

Tuples group together values of different types:

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);

// Destructuring
let (x, y, z) = tup;
println!("y is: {}", y);

// Accessing elements
let five_hundred = tup.0;
let six_point_four = tup.1;
```

### 2. Arrays

Arrays have fixed length and same-type elements:

```rust
let months = ["January", "February", "March"];
let numbers: [i32; 5] = [1, 2, 3, 4, 5];

// Initialize array with same value
let zeros = [0; 10];  // Creates [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// Accessing elements
let first = numbers[0];
```

## Type Inference and Conversion

### Type Inference

Rust can often infer types:

```rust
let guess = 42;  // i32 by default
let pi = 3.14;   // f64 by default
```

### Type Conversion

Explicit type conversion using `as`:

```rust
let x = 42.9 as i32;  // x = 42
let y = 65 as u8 as char;  // y = 'A'

// Safe conversion methods
let x: u16 = 256;
let y: u8 = x.try_into().unwrap_or(0);
```

## Memory Considerations

### Size and Alignment

```rust
// Size of types in bytes
println!("Size of i32: {}", std::mem::size_of::<i32>());  // 4
println!("Size of char: {}", std::mem::size_of::<char>());  // 4
println!("Size of bool: {}", std::mem::size_of::<bool>());  // 1
```

### Stack vs Heap

Primitive types are stack-allocated:

```rust
let x = 42;  // Stored on stack
let y = Box::new(42);  // Stored on heap
```

## Best Practices

### 1. Type Selection

Choose appropriate types for your data:

```rust
// Good: Using appropriate types
let age: u8 = 25;  // Can't be negative, won't exceed 255
let temperature: f64 = 98.6;  // Needs decimal precision
let is_active: bool = true;

// Bad: Using oversized types
let age: i64 = 25;  // Wasteful, i8 or u8 would suffice
```

### 2. Error Handling

Handle numeric operations safely:

```rust
// Safe arithmetic
let result = 255_u8.checked_add(1);  // Returns None
let result = 255_u8.saturating_add(1);  // Returns 255
let result = 255_u8.wrapping_add(1);  // Returns 0
```

### 3. Type Conversion

Use explicit conversions when needed:

```rust
let x: i32 = 42;
let y: i64 = i64::from(x);  // Safer than 'as'
let z: u8 = x.try_into().unwrap_or(0);  // Handle conversion failure
```

## Conclusion

Understanding Rust's primitive types is crucial for writing efficient and safe code. Choose appropriate types for your data, handle conversions carefully, and leverage the type system to prevent errors at compile time. 