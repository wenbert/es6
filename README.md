# Next Rapid ES6 Training
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