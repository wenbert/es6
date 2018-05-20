## Rapid Javascript Training
Rapid Javascript Training https://app.pluralsight.com/player?course=rapid-javascript-training&author=mark-zamoyta&name=rapid-javascript-training-m1&clip=1&mode=live

Note that this course is not ES6.

### Hoisting

Javascript runs in 2 passes. The first pass, it set variables to `undefined`. The second pass it will execute the code.

Normally, Javascript would complain that `productId` is is not defined.

```javascript
console.log(productId); //Error
```

But since Javascript does a "first" pass, then a "second" pass on the code, by the time we log `productId` below, it would have already known about `var productId`. Hence no error.

```javascript
console.log(productId); //Undefined - no error though
var productId = '9000';
```

That is why we define variables upfront first because "hoisting" *causes a lot of bugs*.

```javascript
showProduct();

var showProduct = function() {
    console.log('Showing a Product');
}
```

The code above will output `TypeError: showProduct is not a function`. This is because in the first pass, the compiler will set the `showProduct` variable to `undefined`. Then in the second pass, it will think that `showProduct()` is an `undefined` variable - hence the `... is not a function` error. 

To avoid this problem always have function declaration before the usage.

BUT, if we do it like this, it will execute normally. 

```javascript
showProduct();

function showProduct() {
    console.log('Showing a product'); 
}
```
This is because in the first pass, the compiler will find out that it's a function. And in the second pass, it will know it's a function and call it properly. Take note that is a GLOBAL function.

TLDR; Javascript runs in 2 passes. In the first pass, it sets variables into `undefined`.

### null

```javascript
var productId = null;
console.log(typeof productId); // object

console.log(typeof null); // object

console.log(undefined == null); // true
console.log(undefined === null); // false, obviously
```

### Global scope

```javascript
var productId = '123';

console.log(productId); // 123
console.log(window.productId); // 123 
// In nodejs use global object instead of window object

console.log(this === window); // true in browser
```

```javascript
var description = 'hardware';

function updateProduct() {
    description = 'updated propduct';
}

updateProduct();
console.log(description); // hardware
```
This is because `var description` is set in `global scope`. And inside the `updatedProduct` it is also accessing a the global scope.

To avoid bugs like these, set the `description` as `var description` to make have it only scoped within the function.

Important: Avoid polluting the `global` namespace.

### function scope
```javascript
function updateProduct() {
    var description = 'updated product';
    var updatedProductId = function() {
        console.log(description);
    }

    updateProductId();
}

updatedProduct();

//Output: updated product
```
That is an example of a function within a function. The inner or child function will have the scope of the parent function.

The rule is that Javascript will look-up first within it's current function scope. If the variable is not found within it's own function scope, it will go one step up to it's parent function. If still not there, it will go up to the grandparent until it reaches the global namespace.

And when it can't find it in the global namespace, we get a `ReferenceError: <var> is not defined`

### block scope
```javascript
'use strict';

try {
    throw 'somethingBlockLevelVar';
}
catch (blockLevelVar) {
    console.log(blockLevelVar);
    // It is in scope in this block
}

console.log(blockLevelVar); // Error not defined.
```

Anything in the `catch` block param will only be scoped within that block.


## Operatos

### Addition
Working with floating points...
```javascript
var total = 5.1 + 3.3;
console.log(total); // 8.399999;
console.log(total.toFixed(2)); // 8.40 Good
```

Also `+` is used to concatenate a string. Javascript would always try to concat strings.

```javascript
var id = 2000 + 'PRD';
console.log(id); // 2000PRD

var id = 'PRD' + undefined;
console.log(id) // PRDundefined

var id = 2000 + undefined;
console.log(id); // NaN
```

### Substraction
Javascript puts variables in numeric context.
```javascript
var total = 3.8 - 2.1;
console.log(total.toFixed(3)); // 1.700

var total = "300" - "200";
console.log(total); // 100 
// Remember, it takes the numeric context of 300 and 200

var total = "PRD300" - "ITEM200";
console.log(total); // NaN

var total = 300 - undefined;
console.log(total); // NaN
// Any opearation with NaN will result in NaN

var total = 300 - null;
console.log(total); // 300

var total = 300 - "";
console.log(total); // 300
// The numeric context of "" is 0
```

`valueOf` property. (Why is this here?)

```javascript
var obj = {
    valueOf: function() { 
        return 100;
    }
};
var total = 300 - obj;
console.log(total); // 100
// "valueOf" is special.
```

### Multication, division
```javascript
var total = 4 * "XYZ";
console.log(total); // NaN

var total = 9 / 0;
console.log(total); // Infinity
// No exception thrown

var total = 9 / "   3   ";
console.log(total); // 3
// "   3   " numeric value is 3
```

## Unary operators
`++` or `--`;

```javascript
var level = 5;
var nextLevel = ++level;
console.log(nextLevel); // 6
console.log(level); // 6

//BUT

var level = 5;
var nextLevel = level++;
console.log(nextLevel); // 5
console.log(level); // 6
```

 If we do the suffix (`level++`), the value of `level` is only changed after the line executes.

 So...

 ```javascript
 var level = 5;
 var base = 10;
 var nextLevel = level-- * base;
 console.log(nextLevel); // 50 because (5 * 10)

 var nextLevel = --level * base;
 console.log(nextLevel); // 40 because (4 * 10)
 ```

### Bitwise operators
For binary numbers
`&&`, `|`, `^`
`<<`, `>>`

### Boolean operatos
`!`
```javascript
var value = !99;
console.log(value); //false

var value = !0;
console.log(value); //true

var value = !"";
console.log(value); //true

var value = !" ";
console.log(value); //false

var value = !new Object();
console.log(value); //false

var value = !null;
console.log(value); //true

var value = !undefined;
console.log(value); //true

var value = !NaN;
console.log(value); //true

var value = !!false; //bang-bang shortcut convert to boolean
console.log(value); //false
```
etc.

### Equality operators
```javascript
if (true == 1)
    console.log('true');
else
    console.log('false');

//Output: true
```

BUT
```javascript
if (true == 2)
    console.log('true');
else
    console.log('false');

// You would think that it would be true but not in Javascript
// Output: false 
```



## Reference types

* Objects
* Arrays
* Dates
* Regexes
* Functions
* Primitives (via Wrappers) ???

### Primitive Type Storage

```Javascript
var n = 42;
var a = n;
// a will copy the value 42 from n
// the value of stored twice
```

 ### Reference Type Storage

```javascript
var foo = {
    name: "Jill"
}

var bar = foo;
// bar will point to the same memory location of foo
// value is not copied. they both just point to the same location that contains the value

// Setting this
bar.name = "Jack";

// Obviously...
console.log(bar.name); // Jack
console.log(foo.name); // Jack
// Since they just point to the same location in memory

```



### Arrays

```Javascript
var a1 = [1, 2, 3];
var a2 = a1;
a1[0] = 99;
console.log(a2[0]); // 99 - because arrays are reference types
```

This is different from PHP because:

```javascript
$ php -a
php > $a = [1,2,3];
php > $b = $a;
php > $b[0] = 99;
php > var_dump($b);
array(3) {
  [0]=>
  int(99)
  [1]=>
  int(2)
  [2]=>
  int(3)
}
php > var_dump($a);
array(3) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
}
```

See that arrays in PHP are not by reference? So when you assign `$b = $a;` the copy of the array is set to `$b`. So modifying each one will not affect each other.

#### Sorting gotchas

```javascript
var ratings = [4, 1, 3, 2, 10];
ratings.sort();
console.log(ratings.toString()); // 1, 10, 2, 3, 4 
// WTF. It is sorting by string
```

To correctly sort this, we need to do something like this:

```javascript
var ratings = [4, 1, 3, 2, 10];
ratings.sort(function (value1, value2) {
   return value1 - value2; 
});
console.log(ratings.toString()); // 1, 2, 3, 4, 10
// Yisss
```

### Date Fundamentals

Date start from epoch 0. `Jan 1, 1970`

Keyword: `MDN Date` (Mozilla Developers Network)

### Regular Expressions

x_X

```javascript
var blogText = "Sam I Am";
var pattern = /m/g;
var result = pattern.exec(blogText);
while (result) {
    console.log(result.index);
    result = patten.exec(blogText)
}
/*
Output:
2
7
*/
```

Obviously more to this...

## Objects, JSON, and Prototypes

```javascript
var project = {
    name: 'Project Phoenix',
    team: ['Foo', 'Bar'],
};
consoel.log(project.name);    // Project Phoenix
console.log(project['name']); // Project Phoenix

console.log(project.team[0]); // Foo
// So on, and so forth...
```

How does the Javascript engine resolve function names?

```javascript
var project = anyObject;
project.someFunction();
```

All JS objects sort of inherit from `prototype`.

```javascript
project.someFunction();
project.prototype.someFunction();
project.prototype.prototype.someFunction();
project.prototype.prototype.prototype.someFunction();
// etc.
// Until we hit undefined
```

### Working with Prototypes

```javascript
var project = {
    name: 'Project Phoenix'
};
console.log(project.toString());
```

Guess where `toString()` is found? Yep, inside Prototype.

* `hasOwnProperty()`, `isPrototypeOf()`
* `object.Create()`, `object.defineProperty()`

Every object is going to have Prototype attached to it.

*Note: This seem to deal with something I might not use quite often. So I will skim through the videos quickly.*

### Object.defineProperty()

`writable`, `enumerable`, `configurable`

## Functions

* Function Expressions
* Constructor Functions
* The "this" keyword
* Calling Function (call and apply)
* Closures
* IIFE's

### Naming Function Expressions

```javascript
var hireEmployee = function myHireEmployeeFn(name) {
    throw ('Error');
}
var action = hireEmployee;
action('JJ');
// Uncaught Error - myHireEmployeeFn
// As opposed to just seeing hireEmployee
// Makes debugging easier
```

So, instead of using anoymous functions, give it a name - ie: `myHireEmployeeFn`

### Constructor Functions

```javascript
console.log(typeof Object); // function
// it's a function not an object
```

So let's create a simple object

```javascript
var Employee = function(name, boss) {
    this.name = name;
    this.boss = boss;
};
var newEmployee = new Employee('JJ', 'JD Hogg');
console.log(typeof newEmployee); // object
console.log(newEmployee.name);
```

No public, private variables yet.

```javascript
var Employee = function (name) {
    this.name = name;
}
var e1 = newEmployee('Foo');
var e2 = newEmployee('Bar');
console.log(e1 === e2); // false - not the same object
console.log(e1.__proto__ == e2.__proto__); // true
```

Using a prototype to prevent duplicates.

```javascript
var Employee = function (name) {
    this.name = name;
    this.giveRaise = function() {
        
    }
}
var e1 = newEmployee('Foo');
var e2 = newEmployee('Bar');
console.log(e1.giveRaise === e2.giveRaise); // false
```

Since `e1.giveRaise` is not equal to `e2.giveRaise`, if we create 100,000 objects. That would be a problem because this function would be duplicated 100,000 times.

We should take out the `giveRaise` function and add it to the prototype.

```javascript
var Employee = function(name) {
    this.name = name;
    this.salary = 50000;
}
Employee.prototype.giveRaise = function(raise) {
    this.salary += raise;
};
var e1 = newEmployee('Foo');
var e2 = newEmployee('Bar');
e1.giveRaise(100000);
console.log(e1.salary); // 150000
console.log(e2.salary); // 50000
// So they are still separate objects but the `giveRaise` function exists only once
```

So now, if we had a 100,000 objects, our `giveRaise` function only exists once.

### The "this" Keyword

```javascript
console.log(this); // object
console.log(this === window) // true

var employee = {
    name: 'Jeff',
    updateSalary: function() {
        console.log(this);
    }
};
employee.updateSalary(); // Object {name: "Jeff"}
// because `this` was called inside the function
```

### Calling Functions

`call`, `apply`

### Closures

Functions that persist.

### IIFES OR Immediately Invoked Function Expressions

```javascript
(function () {
    console.log('Executed!');
})();
```

Prevents pollution of the global namespace. For example:

```javascript
(function () {
    var employee = 'John';
})();
console.log(employee); // Uncaught ReferenceError: employee is not defined
```

Some realworld examples:

```javascript
var app = {};
(function (ns) {
    ns.name = 'None';
})(app);
console.log(app.name); // None
```

```javascript
var app = {};
var jQuery = {};

(function (ns, $) {
    ns.name = 'None';
    console.log($ === jQuery); // true
})(app, jQuery);
```

Ok, let's end it here. Let's go to ES6 now.
