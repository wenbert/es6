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

Check: https://codeburst.io/es6-tutorial-for-beginners-5f3c4e7960be

## Object-oriented Programming in JavaScript - ES6
See: https://github.com/wenbert/es6/blob/master/object-oriented-programming-in-javascript-es6/README.md

I moved it to that directory because: https://github.com/wenbert/es6/issues/1
