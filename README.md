# Rapid ES6 Training

https://app.pluralsight.com/library/courses/rapid-es6-training/table-of-contents

ECMAScript 2015 == ES6

* Backwards compatible with ES5.
* ES6 Modules and Classes
* New types
* Iterators, Generators and Promises
* etc.

This course at least requires some kind of Javascript background. Author suggested https://github.com/wenbert/es6/blob/master/rapid-javascript-training/README.md 

### Compatibility Table

https://kangax.github.io/compat-table/es6/

## New ES6 Syntax

* Let, const, Block Scoping
* Arrow Functions `=>`
* Default Function Parameters
* Rest and Spread `…`
* Object Literal Extensions
* `for … of` Loop
* Octal and Binary Literals
* Template Literals
* Destructuring 

### let, const and Block Scoping

#### let

`let` = no more hoisting????

```javascript
`use strict`;
console.log(productId); // undefined - due to hoisting (remember this? Previous course)
var productId = 12;
```

Now let's use `let`

```javascript
`use strict`;
console.log(productId); // ReferenceError: productId is not defined
let productId = 12;
```

#### Block Scoping

```javascript
'use strict';
let productId = 12;
{
    let productId = 2000;
}
console.log(productId); // Output: 12
// Because block scoping. So when the block terminates, the variable is out of scope.
```

Some real-world examples 

```javascript
'use script';
let productId = 42;
for (let productId = 0; productId < 10; productId++) {
    
}
console.log(productId); // Output: 42
// For PHP, this would be 10
```

Now let's do that piece of code in PHP:

```php
$ php -a
Interactive shell

php > $foo = 42;
php > for ($foo = 0; $foo < 10; $foo++) {
php {     echo $foo;
php { }
0123456789
php > var_dump($foo);
int(10)
```

#### const

```javascript
'use script';
const MARKUP_PCT = 100;
console.log(MARKUP_PCT); // 100. You can't update this, etc. Duh! Constant.
```

### Arrow Functions `=>`

```javascript
'use strict';
var getPrice = () => 5.99;
console.log(typeof getPrice); // Output: function
console.log(getPrice()); // Output: 5.99
```

Another example:

```javascript
'use strict';
var getPrice = count => count * 4.00;
console.log(getPrice(2)); // Output: 8
```

Now, with 2 parameters:

```javascript
'use strict';
var getPrice = (count, tax) => count * 4.00 * (1 + tax);
console.log(getPrice(2, 0.7)); // Output: 8.56
```

Now, we have a block:

```javascript
'use strict';
var getPrice = (count, tax) => {
    var price = count * 4.00;
    price *= (1 + tax);
    return price; // specify return
}
console.log(getPrice(2, .07)); // Output: 8.56 still...
```

Arrow functions might save us a few keystrokes but the real purpose is:

```javascript
'use strict';
document.addEventListener('click', function() {
   console.log(this); // document
});
```

To:

```javascript
'use strict';
document.addEventListener('click', () => console.log(this)); // Window {...}
```

We get the `Window` object.

Another one with ES5 code.

```javascript
'use strict';
var invoice = {
    number: 123,
    process: function() {
        console.log(this);
    }
};
invoice.process(); 
/* ES5 Output:
Object {
	number: 123
}
*/
```

Now with arrow function in ES6.

```javascript
'use strict';
var invoice = {
    number: 123,
    process: () => console.log(this)
}
invoice.process();
/* ES6 Output:
Window {...}
*/
```

Arrow functions can't be in new line. That would result in error.

Functions declared with "fat arrow", we do not have access to the `prototype`. Remember prototypes from previous course?

```java
'use strict';
var getPrice = () => 5.99;
consoel.log(getPrice.hasOwnProperty("prototype")); // false
```

### Default Function Parameters

In ES5, function parameters would be set to `undefined`.

In ES6:

```java
'use strict';
var getProduct = function(productId = 1000, type='software') {
    console.log(productId + ', ' + type);
};
getProduct(undefined, 'hardware'); // 1000, hardware
// Just like PHP but instead of passing "null", we pass "undefined" to use the default value
```

But we can also do this:

```javascript
'use strict';
var getTotal = function(price, tax = price * 0.07) {
    console.log(price + tax);
};
console.log(5.00); // 5.35
```

So that works. The `function(price, tax = price * 0.07)` has it's own "scope" within that line. You can even make the `0.07` into a variable and it would still work. You can even use `functions` to get `0.07`.

### Rest and Spread

Spread means spreading out the elements of an array.

Seems to be similar to the Python one. https://stackoverflow.com/questions/1769403/understanding-kwargs-in-python

#### Rest example

```javascript
'use strict';
var showCategories = function (productId, ...categories) {
    console.log(categories);
}
showCategories(123, 'search', 'adverstising');
/*
Output: 
['search', 'advertising']
*/
```

If there are no parameters, then `categories` will still be an array. ie: `[]`

#### Spread example

```javascript
'use strict';
var prices = [12, 20, 18];
var maxPrice = Math.max(...prices);
console.log(maxPrice); // Output: 20
```

So essentially, this took `prices` array and made it into a list of parameters for `Math.max()`

Another one:

```javascript
'use strict';
var codeArray = ['A', ...'BCD', 'E'];
console.log(codeArray);
/* Output:
['A', 'B', 'C', 'D', 'E']
*/
```

And **NOT** what I expected:

```
[
    'A'
    ['B','C','D],
    'E'
]
// Not this! Because it "spreads" it out and not "explode" as in PHP
```

### Object Literal Extensions

```javascript
'use strict';
var price = 5.99, quantity = 30;
var productView = {
    price,             // This part here would have been: "price: price"
    quantity,          // and this would have been: "quantity: quantity"
    				   // See: https://github.com/wenbert/es6/blob/master/rapid-javascript-training/README.md#objects-json-and-prototypes
    calculateValue() { // No need to specify "function"
    	return this.price * this.quantity; //59.9000...
	}
};
console.log(productView);
/* Output:
{
	price: 5.99,
	quantity: 30
	...
}
*/
```

Some gotchas: The `calculateValue()` below will act as an arrow function. Where as the `price` and `quantity` in the `calculateValue()` refers to the one OUTSIDE the object block. For example:

```javascript
'use strict';
var price = 5.99, quantity = 10;
var productView = {
    price: 7.99,
    quantity: 1,
    calculateValue() {
        return this.price * this.quantity; // This will not be 7.99
    }
}
console.log(productView.calculateValue());
// Output is 59.90000000
```

So have a look at arrow functions again. So keep that in mind.

#### Dynamic properties: field and method names

As a field:

```javascript
'use strict';
var field = 'dynamicField';
var price = 5.99;
var productView = {
    [field]: price //Just put variable in brackets [ ]
};
console.log(productView); // {dynamiceField: 5.99}
```

As a method:

```javascript
'use strict';
var method = 'doIt';
var productView = {
    [method + "-001"]() {
        console.log('in a method');
    }
}
productView['doIt-001'](); // The call with brackets and parenthesis to indicate a function call
// Output: "in a method"
```

These also work with getters and setters:

```javascript
'use strict';
var identity = 'productId';
var productView = {
    get [identity] () { return true; },
    set [identity] (value) { }
};
console.log(productView.productId); // true
```

#### for … of Loops

```javascript
'use strict';
var categories = ['hardware', 'software', 'vaporware'];
for (var item of categories) {
    console.log(item);
}
```

This would also iterate over strings. Or basically anything that is "iterable".

#### Octals and Binary Literals

X_X

```javascript
'use strict';
// Octal
var value = 0o10;
console.log(value); // 8

// Binary
var value = 0b10;
console.log(value); // 2
```

#### Template Literals

Using backticks (left to number 1) to quote strings so that you can use variables in between. For example:

```javascript
'use strict';
let invoiceNum = '1350';
console.log(`Invoice Number: ${invoiceNum}`);
console.log(`Invoice Number: ${"INV" + invoiceNum}`); // Also works!
```

To escape the parsing of the variable, use a backslash. `\${invoiceNum}`.

This also allows us to specify new lines in a string.

```javascript
'use strict';
let message = `A
B
C
`;
console.log(message);
/* Output
A
B
C
*/
```

We can also do this - calling a function by passing an interpolated string.

```javascript
'use strict';

function processInvoice(segments, ...values) {
    console.log(segments);
    consoel.lg(values);
}

let invoiceNum = '1350';
let amount = '2000';
processInvoice `Invoice: ${invoiceNum} for ${amount}`;
/* Output:
['Invoice: ', ' for ', '']
[1350, 2000]
*/
```

So the `values` that are spread out are the interpolated variables.

#### Destructuring

Breaking down or destructuring… But this is similar to PHP `list()` function. http://php.net/manual/en/function.list.php

```php
$info = array('coffee', 'brown', 'caffeine');
// Listing all the variables
list($drink, $color, $power) = $info;
```

So it looks like this in ES6:

```javascript
'use strict';
let salary = ['32000', '50000', '75000'];
let [low, average, high] = salary;
console.log(average); // 50000
console.log(low); // 32000
```

You can also do this:

```javascript
'use strict';
let salary = ['32000', '50000', '75000'];
let [low, ...remaining] = salary; // Using a rest parameter
console.log(remaining); // ['50000', '75000']
// Cool
```

You can have "default values". And even have nested arrays inside. For example:

```javascript
'use strict';
let salary = ['32000', '50000', ['88000', '99000']];
let [low, average, [actualLow, actualHigh]] = salary;
console.log(actualLow); // 88000
```

So you would think it would become a nested array, but it won't. It actually "destructured" from the nested array.

You can also pass this as function parameters.  You can also do this for objects. Instead of `[]` we use `{}` for objects.

We can also rename the properties when destructing.

```javascript
'use strict';
let salary = {
    low: '123',
    average: '456',
    high: '999'
};

// let { low: newLow, average: newAverage, high: newHigh } = salary;

// OR

let newLow, newAverage, newHigh;
// We encapsulate with () because Javascript will not understand it.
({ low: newLow, average: newAverage, high: newHigh } = salary);

console.log(newHigh) // 999
```

Careful though, it seems that it should be `high` but it is the other way around, the new name on the right side while the old name is on the left side.

#### Advanced Destructuring

Google is my friend.

# Rapid Javascript Training

https://github.com/wenbert/es6/blob/master/rapid-javascript-training/README.md

Rapid Javascript Training in Pluralsight https://app.pluralsight.com/player?course=rapid-javascript-training&author=mark-zamoyta&name=rapid-javascript-training-m1&clip=1&mode=live

# Object-oriented Programming in JavaScript - ES6

See: https://github.com/wenbert/es6/blob/master/object-oriented-programming-in-javascript-es6/README.md

I moved it to that directory because: https://github.com/wenbert/es6/issues/1

# To check

https://codeburst.io/es6-tutorial-for-beginners-5f3c4e7960be

https://youtu.be/7_2CJs_VZk4