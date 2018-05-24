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

## ES6 Modules and Classes

Module loading do not work in browsers yet. But in this module, we can setup so that we can load modules in browsers.

* Module Basics
* Named Exports
* Classes 
* extends and super
* Constructor Function Properties
* Static Members
* new.target


### Setting up a Dev environment

To start using Babel and ES6, we probably need to do these:
https://www.sitepoint.com/es6-babel-webpack/

*REASON: Pluralsight tutorial is outdated.*

#### Npm, http-server
```
npm init -y
npm install babel-cli babel-preset-env --save-dev
```

`package.json` would have something like this:
```json
"devDependencies": {
  "babel-cli": "^6.26.0",
  "babel-preset-env": "^1.6.1"
}
```

In `package.json` add this `build` line
```json
"scripts": {
  "build": "babel src -d public"
},
```

Now create a `.babelrc` file:
```json
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        }
      }
    ]
  ]
}
```

Try to run `npm run build`. 

##### Webpack

Now let's install webpack.

`npm install webpack webpack-cli --save-dev`

In `package.json` modify the `build` line to:
```json
"scripts": {
  "build": "webpack --config webpack.config.js"
},
```

Then create a `webpack.config.js` file.
```javascript
const path = require("path");

module.exports = {
  mode: 'development',
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  }
};
```
Try to run `npm run build` again.

##### Babel

Now we install Babel.

`npm install babel-loader babel-core --save-dev`

You `webpack.config.js` should now look like this:
```javascript
const path = require("path");

module.exports = {
  mode: 'development',
  entry: "./src/js/base.js",
  output: {
    //path: path.resolve(__dirname, "public"),
    path: path.resolve(__dirname),
    filename: "base.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  }
};
```

Run `npm run build` yet again.

##### The index.html

Bring it to the browser with this HTML file.
```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Webpack & Babel Demonstration</title>
  </head>
  <body>
    <main>
    Welcome!
    </main>
    <script src="./base.js" charset="utf-8"></script>
  </body>
</html>

```

##### Adding a file watch

Now let's add a `watch` so that we don't have to run `npm run build` everytime we change something.

So, add this `watch` line in `package.json`
```json
"scripts": {
  "watch": "webpack --watch",
  "build": "webpack --config webpack.config.js"
},
```

Then run `npm run watch`

##### Automatic browser refresh

Finally, we setup automatic browser refresh.

Run `npm install webpack-dev-server --save-dev`

Then in `package.json` add the `start` line.
```json
"scripts": {
  "watch": "webpack --watch",
  "start": "webpack --watch & webpack-dev-server --open-page 'webpack-dev-server'",
  "build": "webpack --config webpack.config.js"
},
```

Now, run `npm start`.

### Entry point
For this tutorial, we have `./src/js/base.js` as an entry point. That gets compiled into `./base.js` (found in the root level). 

So if we had `npm run watch` and `npm start` running, every time we modify `./src/js/base.js`, the browser auto-refreshes.

Modify `./src/js/base.js` to something like this and hit save.
```javascript
console.log('You are in base.js');
```
Keep an eye on your browser, it should auto-refresh and display the log message.

So from now on, every time we edit the edit, we assume that we are editting a file inside `./src/js/...`. The `./base.js` found in the root is not to be touched since that is generated by Webpack.

### How are modules loaded?
So let's try to check how are modules loaded.

File: base.js
```javascript
console.log('starting in base');
import { projectId } from './module1.js';
console.log('ending in base');
```

File: module.js
```javascript
export let projectId = 99;
console.log('in module1');
```

Save and check browser. 

Output:
```
in module1
starting in base
ending in base
```

So we were expecting to have `starting in base` as the first output. But in reality, Javascript "hoists" the `import` lines to the top. This is so that all dependencies are loaded before everything.

#### Defaults
File: base.js
```javascript
import { default as myProjectName } from './module1.js';
console.log(myProjectName);
```

File: module1.js
```javascript
export let projectId = 99;
let projectName = 'BuildIt';
export default projectName;
```

We can have 1 default. Note that there are several ways to export and import `default`.

##### Default with wildcard *
File: base.js
```javascript
import * as values from './module1.js';
console.log(values);
```

File: module1.js
```javascript
let projectId = 99;
let projectName = 'BuildIt';
export { projectId, projectName };
```

Output:
```
{projectId: 99, projectName: "BuildIt", __esModule: true}
```

That is an object! Note that using a wildcard (*) an alias is required - in this instance, it is `values` in `base.js`

#### Named Exports in Modules

You can also export an object and when you do so, you are free to modify the contents of it.

File: base.js
```javascript
import { project, showProject } from './module1.js';
project.projectId = 8000;
showProject();
console.log(project.projectId);
```

File: module1.js
```javascript
export let project = { projectId: 99 };

export function showProject() {
  console.log(project.projectId);
}
```

Output:
```
8000
8000
```

Exporting functions.

File: base.js
```javascript
import { showProject, updateFunction } from './module1.js';
showProject();
updateFunction();
showProject();
```

File: module1.js
```javascript
export function showProject() { console.log('in original'); }

export function updateFunction() {
  showProject = function () { console.log('in updated'); };
}
```

Output:
```
in original
in updated
```

So when were exporting a function, we are only export the "name" of the function. We are not exporting the actual function. That is why it's called "Named" exports. So everything executes as expected.

#### Class Fundamentals
A lot like other programming languages but not yet in the same level.
There is no class type. Class is still a function.

For example:
```javascript
class Task {

}
console.log(typeof Task); // Output: function
```

However, if you instantiate a class, the instantiated object, is ummm an object type.
```javascript
class Task {
  showId() {
    console.log('99');
  }
}
let task = new Task();
console.log(typeof task); // Output: object
console.log(task instanceof Task); // Output: true
task.showId(); // Output: 99
```

Now, let take a look at this one:
```javascript
console.log(task.showId === Task.prototype.showId); // Output: true
```
So adding a method to a class is similar to adding that method to the prototype object. Same in ES5. We just have a new syntax for it.

Constructor is basically adding a `constructor` function in the class.
```javascript
...
    constructor() {
        console.log('constructing Task');
    }
...
```

However, if you do this, you will get a syntax error.

```javascript
class Task {
  let taskId = 9000; // Do this and get a syntax error
  constructor() {
    console.log('constructing Task');
  }
  showId() {
    console.log('99');
  }
}
let task = new Task();
```

Why??? Don't know yet. But for now, the Class body is not the place to declare variables.

Classes are not "hoisted". Remember hoisting? 

Let's say if we have this:

```javascript
let task = new Task();

class Task {
  constructor() {
    console.log('constructing Task');
  }
}
```

We will get an error: `Error: Use before declaration`.

You can also create a class and assign it to a variable.

```javascript
let newClass = class Task {
  constructor() {
    console.log('constructing Task');
  }
};

new newClass(); // Output: constructing Task
```

When creating a class, we are not polluting the global namespace. Take a look at this example:

```javascript
class Task { }
console.log(window.Task === Task); // Output: false
```

#### extends and super

```javascript
class Project {
  constructor() {
    console.log('constructing Project');
  }
}

class SoftwareProject extends Project {
}

let p = new SoftwareProject(); // Output: constructing Project 
```

Take a look at this one, even though the child class does not have a constructor, it will pass the param to the parent class.

```javascript
class Project {
  constructor(name) {
    console.log('constructing Project: ' + name);
  }
}

class SoftwareProject extends Project {

}

let p = new SoftwareProject('Foobar'); // Output: constructing Project: Foobar
```

So let's have an example, where both classes have constructors.

```javascript
class Project {
  constructor() {
    console.log('constructing Project');
  }
}

class SoftwareProject extends Project {
  constructor() {
    super(); // If you remove this, you get an error.
             // ReferenceError: this is not defined
    console.log('constructing SoftwareProject');
  }
}

let p = new SoftwareProject();

/* Output
constructing Project
constructing SoftwareProject
*/
```

`super()` is called first and then `console.log('constructing SoftwareProject')`. Always call `super()` if you have a constructor in the child class.

Rule of thumb: If you extend a class, the child class will need to call `super()` in the constructor.

Inheritance and "over riding" work as expected.

If you want to call the the parent class method within the child class, it is possible by doing something like: `super.getTask()`. It would be like calling `parent::getTask()` in PHP.

Another interesting way to create an object is use `setPrototypeOf()`. You create 2 objects, then set which one is child and parent. Like this:

```javascript
let project = {
  getTaskCount() { return 50; }
}

let softwareProject = {
  getTaskCount() {
    return super.getTaskCount() + 7;
  }
}

Object.setPrototypeOf(softwareProject, project);
console.log(softwareProject.getTaskCount()); // 57
```

#### Properties for Class Intances
```javascript
class Project {
  constructor() { this.location = 'Cebu'; }
}

class SoftwareProject extends Project {
  constructor() {
    super();
  }
}

let p = new SoftwareProject();
console.log(p.location); // Cebu
```

We can access properties across parent-child.

```javascript
class Project {
  constructor() { this.location = 'Cebu'; }
}

class SoftwareProject extends Project {
  constructor() {
    super(); // Remember, always call this!
    this.location = this.location + ' Beach'; // Here, we call parent's property
  }
}

let p = new SoftwareProject();
console.log(p.location); // Cebu Beach
```

#### Static Members
```javascript
  class Project {
  static getDefaultId() {
    return 0;
  }
}
console.log(Project.getDefaultId()); // 0
```

#### new.target
This is used to refer back to the child object FROM the parent object. For example:

```javascript
class Project {
  constructor() {
    console.log(new.target.getDefaultId()); // Calls to child object
  }
}

class SoftwareProject extends Project {
  static getDefaultId() { return 99; }
}

var p = new SoftwareProject(); // 99 
```

### Symbols
> A symbol is a unique and immutable data type and may be used as an identifier for object properties. - Mozilla Developer Network

```javascript
let eventSymbol = Symbol('resize event');
console.log(typeof eventSymbol); // symbol
console.log(typeof eventSymbol.toString()); // Symbol('resize event')
```

Symbol is a new type in ES6.

```javascript
const CALCULATE_EVENT_SYMBOL = Symbol('calculate event');
console.log(CALCULATE_EVENT_SYMBOL.toString()); // Symbol('calculate event')
```

```javascript
let s = Symbol.('event');
let s2 = Symbol.('event');
console.log(s === s2); // false - no "for"
```

Using Symbol.for

```javascript
let s = Symbol.for('event');
let s2 = Symbol.for('event');
console.log(s.toString()); // Symbol('event')
console.log(s === s2); // true

let description = Symbol.keyFor(s);
console.log(description); // event
```

##### What do we use this for???

```javascript
let article = {
  title: 'Whiteface Mountain',
  [Symbol.for('article')]: 'My Article'
}

let value = article[Symbol.for('article')];
console.log(value); // My Article
```

So is this like a "global" string / unique indentifier? I don't know enough yet.

##### Well-known symbols
```javascript
let Blog = function() {
  
};
Blog.prototype[Symbol.toStringTag] = 'Blog Class';
let blog = new Blog();
console.log(blog.toString()); // [object Blog Class]
```
Google is your friend. Search for "MDN Symbols"

#### Object
##### Object.setPrototypeOf
```javascript
let a = {
  x: 1
};
let b = {
  y: 2
};
Object.setPrototypeOf(a, b);
console.log(a.y); // 2
// Note: Y does not exist in a. But we "extend" b
```

##### Object.assign
```javascript
let a = {a: 1}, b = {b: 2};

let target = {};
Object.assign(target, a, b);
console.log(target); // {a: 1, b: 2}
```
So `Object.assign` will populate `target` with `a` and `b`.

##### String extensions
```javascript
let title = 'Santa Barbara Surf Riders';
console.log(title.startsWith('Santa')); //true
console.log(title.endsWith('Riders')); //true
console.log(title.includes('ba')); //true
```

#### Number extensions
....

# Rapid Javascript Training

https://github.com/wenbert/es6/blob/master/rapid-javascript-training/README.md

Rapid Javascript Training in Pluralsight https://app.pluralsight.com/player?course=rapid-javascript-training&author=mark-zamoyta&name=rapid-javascript-training-m1&clip=1&mode=live

# Object-oriented Programming in JavaScript - ES6

See: https://github.com/wenbert/es6/blob/master/object-oriented-programming-in-javascript-es6/README.md

I moved it to that directory because: https://github.com/wenbert/es6/issues/1

# To check

https://codeburst.io/es6-tutorial-for-beginners-5f3c4e7960be

https://youtu.be/7_2CJs_VZk4