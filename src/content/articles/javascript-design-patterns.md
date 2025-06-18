---
title: "How JavaScript Works: Design Patterns + 4 Best Practices"
date: "2021-06-17"
readTime: "8 min read"
description: "Explore creational, structural, and behavioral design patterns in JavaScript, along with best practices for implementation."
category: "Programming Concepts"
---

# How JavaScript Works: Design Patterns + 4 Best Practices

Design patterns are reusable solutions to common programming problems. In this article, we'll explore different types of design patterns in JavaScript and learn best practices for implementing them.

## Types of Design Patterns

### 1. Creational Patterns

#### Singleton Pattern

```javascript
class Singleton {
  static instance;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// Usage
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
```

#### Factory Pattern

```javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

class UserFactory {
  static createUser(name, role) {
    switch (role) {
      case 'admin':
        return new User(name, 'Administrator');
      case 'user':
        return new User(name, 'Regular User');
      default:
        throw new Error('Invalid role');
    }
  }
}

// Usage
const admin = UserFactory.createUser('John', 'admin');
const user = UserFactory.createUser('Jane', 'user');
```

### 2. Structural Patterns

#### Adapter Pattern

```javascript
class OldAPI {
  getData() {
    return 'old format data';
  }
}

class NewAPI {
  fetchData() {
    return 'new format data';
  }
}

class APIAdapter {
  constructor(newAPI) {
    this.newAPI = newAPI;
  }

  getData() {
    return this.newAPI.fetchData();
  }
}

// Usage
const newAPI = new NewAPI();
const adapter = new APIAdapter(newAPI);
console.log(adapter.getData()); // 'new format data'
```

#### Decorator Pattern

```javascript
class Coffee {
  cost() {
    return 5;
  }
}

class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }
}

class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 2;
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }
}

// Usage
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.cost()); // 8
```

### 3. Behavioral Patterns

#### Observer Pattern

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log('Received update:', data);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify('Hello Observers!');
```

#### Strategy Pattern

```javascript
class PaymentStrategy {
  pay(amount) {
    throw new Error('pay method must be implemented');
  }
}

class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using credit card`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  executePayment(amount) {
    this.strategy.pay(amount);
  }
}

// Usage
const creditCard = new CreditCardStrategy();
const paypal = new PayPalStrategy();

const payment = new PaymentContext(creditCard);
payment.executePayment(100);
```

## Best Practices

### 1. Keep It Simple

```javascript
// Bad: Over-engineered pattern
class ComplexFactory {
  static createInstance(type, options) {
    // Complex logic
  }
}

// Good: Simple and clear
class SimpleFactory {
  static create(type) {
    return new type();
  }
}
```

### 2. Use Modern JavaScript Features

```javascript
// Bad: Old-style pattern
function Singleton() {
  if (Singleton.instance) {
    return Singleton.instance;
  }
  Singleton.instance = this;
}

// Good: Modern class syntax
class Singleton {
  static #instance;
  
  static getInstance() {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }
}
```

### 3. Implement Error Handling

```javascript
class Factory {
  static create(type) {
    try {
      if (!type) {
        throw new Error('Type is required');
      }
      return new type();
    } catch (error) {
      console.error('Factory creation failed:', error);
      throw error;
    }
  }
}
```

### 4. Document Your Patterns

```javascript
/**
 * Factory Pattern Implementation
 * Creates instances of different types of vehicles
 * @class VehicleFactory
 */
class VehicleFactory {
  /**
   * Creates a new vehicle instance
   * @param {string} type - The type of vehicle to create
   * @returns {Vehicle} A new vehicle instance
   * @throws {Error} If the vehicle type is invalid
   */
  static createVehicle(type) {
    // Implementation
  }
}
```

## When to Use Design Patterns

1. **Singleton**
   - When you need a single instance of a class
   - For managing global state
   - In configuration management

2. **Factory**
   - When object creation is complex
   - When you need to create different types of objects
   - For dependency injection

3. **Observer**
   - For event handling
   - In real-time updates
   - For loose coupling between components

4. **Strategy**
   - When you have multiple algorithms
   - For runtime algorithm selection
   - In payment processing systems

## Conclusion

Design patterns are powerful tools for writing maintainable and scalable code. However, they should be used judiciously and only when they solve a specific problem.

Remember to:
- Choose patterns based on your specific needs
- Keep implementations simple and clear
- Use modern JavaScript features
- Document your pattern usage
- Consider performance implications
- Test pattern implementations thoroughly

By following these best practices, you can effectively use design patterns to create robust and maintainable JavaScript applications. 