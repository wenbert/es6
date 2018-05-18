# ES6
Next Rapid ES6 Training https://app.pluralsight.com/library/courses/rapid-es6-training/table-of-contents

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

Anything in the `catch`

------------------

Check: https://codeburst.io/es6-tutorial-for-beginners-5f3c4e7960be

## Object-oriented Programming in JavaScript - ES6
See: https://github.com/wenbert/es6/blob/master/object-oriented-programming-in-javascript-es6/README.md

I moved it to that directory because: https://github.com/wenbert/es6/issues/1
