# TODO
Move "Object-oriented Programming in JavaScript - ES6" into it's own directory.

Rapid Javascript Training https://app.pluralsight.com/player?course=rapid-javascript-training&author=mark-zamoyta&name=rapid-javascript-training-m1&clip=1&mode=live

Rapid ES6 Training https://app.pluralsight.com/library/courses/rapid-es6-training/table-of-contents

Check: https://codeburst.io/es6-tutorial-for-beginners-5f3c4e7960be

# Object-oriented Programming in JavaScript - ES6

Pluralsight URL: https://app.pluralsight.com/library/courses/javascript-es6-object-oriented-programming/exercise-files

## Starting up

```
[wenbert:~/dev/es6-tutorial]$ npm init
...
[wenbert:~/dev/es6-tutorial]$ npm install -save es6-module-loader traceur
...
[wenbert:~/dev/es6-tutorial]$ npm install -save-dev lite-server
```

That should create a `package.json` file that looks something like this:

```json
{
  "name": "drones",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "es6-module-loader": "^0.17.11",
    "traceur": "0.0.111"
  },
  "devDependencies": {
    "lite-server": "^2.3.0"
  }
}
```

The `index.html` file would contain something like this:

```html
<html>
  <head>
    <title>Drones</title>
    <script src="node_modules/traceur/bin/traceur.js"></script>
    <script src="node_modules/es6-module-loader/dist/es6-module-loader-dev.js"></script>
  </head>
  <body>
      <script>
          System.import('src/app.js');
      </script> 
  </body>
</html>
```

The `traceur.js` and `es6-module-loader.dev.js` would be in the `<head>` tag.

Then create the file: `src/app.js`. 

Now in order to kick that off, you need to run light-server from the command line. So you need to add `"dev": "lite-server"` to the `package.json` inside `scripts` . So your `package.json` would now look like this:

```json
{
  "name": "drones",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "lite-server"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "es6-module-loader": "^0.17.11",
    "traceur": "0.0.111"
  },
  "devDependencies": {
    "lite-server": "^2.3.0"
  }
}
```

From there, we should be able to call `npm run dev` from the command line.

```
[wenbert:~/dev/es6-tutorial]$ npm run dev

> drones@1.0.0 dev /Users/wenbert/dev/es6-tutorial
> lite-server
...
Browsersync] Access URLs:
 -------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.88:3000
 -------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.88:3001
 -------------------------------------
[Browsersync] Serving files from: ./
[Browsersync] Watching files...
...
```

Now, take a look at the browser console and you should see the `in app.js` console log.

Now, if you edit `src/app.js` the browser window should auto-refresh.

### ES6 module scope and strict mode

With ES6, the variables inside the modules do not pollute the global namespace. Meaning if you do this in `src/app.js`

```javascript
let droneId = 5;
console.log(window.droneId); //Output: undefined
// In plain old Javascript, that would output "5"
```

Also, modules are automatically put into "strict mode". So if you do this in `src/app.js` you would get an error.

```Javascript
droneId = 5;
console.log(droneId); // Console output: "Variable undefined in strict mode"
```

## Classes

```javascript
class Drone {
    // details here
}

let drone = new Drone();
```

A class with a constructor and some instance properties.

```javascript
class Drone {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

let drone = new Drone('A123', 'Wenbert');

// Access by "dot" notation
console.log(drone.id + ' ' + drone.name);

// Or by brackets
console.log(drone['id'] + ' ' + drone['name']);

```

## Getters and setters

```javascript
class Drone {
    constructor(id, name) {
        // In JS "_" underscore is just a convention
        // "Private" property
        this._id = id;
    }

    get id() { // Looks like a function but we can access it as a property
        return this._id;
    }
    
    set id(value) { // Looks like a function but we can access it as a property
        this._id = value;
    }
}

let drone = new Drone('A123');
drone.id = 'B456'; // Setter invoked

console.log('drone id: ' + drone.id); // Output: B456
```

"_" Underscore in a property in class by convention it means "private".

## Inheritance and Code Organization

```javascript
class Vehicle {

}

class Drone extends Vehicle {

}

class Car extends Vehicle {

}

let c = new Car();
console.log(c instanceof Car); // True
console.log(c instanceof Vehicle); // True
console.log(c instanceof Object); // All classes inherit from this class

```

### The super()

```javascript
class Vehicle {
    constructor() {
        console.log('constructing Vehicle');
    }
}

class Drone extends Vehicle {

}

class Car extends Vehicle {
    constructor() {
        // Makes sure that Vehicle() constructor gets called first.
        // Without this, error: "Derived constructor must call super()"
        super();
        console.log('constructing Car');
    }
}

let c = new Car();
```

Even if you removed `Vehicle::constructor`, you would still get the `Derived constructor must call super()` error. `Vehicle` class does not need a `super()`.

`super()` always have to be the first thing in a constructor. Otherwise, you would get an error.

So like PHP, you can pass parameters or variables to the `super()` function. 

### Over riding functions

```javascript
class Vehicle {
    start() {
        console.log('Starting vehicle');
    }
}

class Car extends Vehicle {
    start() {
        console.log('Starting car');
        super.start();
    }
}

let c = new Car();
c.start();
// Output: "Starting car"
// Output: "Starting vehicle"
```

Just like a normal programming language :)

### Static functions

```javascript
class Vehicle {
    start() {
        console.log('Starting vehicle');
    }

    static getCompanyName() {
        console.log('My Company');
    }
}

class Car extends Vehicle {
    start() {
        console.log('Starting car');
        super.start();
    }

    static getCompanyName() {
        super.getCompanyName();
        console.log('My Other Company');
    }
}

let c = new Car();

Car.getCompanyName();
// Output: "My Company"
// Output: "My Other Company"
```

So, static functions also get inheritance. But classing them, being "static", you need to use the `Class` name rather than the instantiated object. Also, obviously, you won't have access to the properties that get instantiated when the class objected is created.

### Organising classes into files

Previously, we had all 3 classes in 1 file - `app.js`. Now, let's put the classes `Vehicle` and `Car, Drone` inside `src/classes`

```
[wenbert:~/dev]$ cd es6-tutorial
[wenbert:~/dev/es6-tutorial]$ ls
index.html        package-lock.json src
node_modules      package.json
[wenbert:~/dev/es6-tutorial]$ cd src
[wenbert:~/dev/es6-tutorial/src]$ pwd
/Users/wenbert/dev/es6-tutorial/src
[wenbert:~/dev/es6-tutorial/src]$ ls -la
total 8
drwxr-xr-x  4 wenbert  staff  128 13 May 23:02 .
drwxr-xr-x  7 wenbert  staff  224 13 May 09:21 ..
-rw-r--r--  1 wenbert  staff   99 13 May 23:03 app.js
drwxr-xr-x  5 wenbert  staff  160 13 May 23:03 classes
[wenbert:~/dev/es6-tutorial/src]$ cd classes
[wenbert:~/dev/es6-tutorial/src/classes]$ ls -la
total 24
drwxr-xr-x  5 wenbert  staff  160 13 May 23:03 .
drwxr-xr-x  4 wenbert  staff  128 13 May 23:02 ..
-rw-r--r--  1 wenbert  staff   30 13 May 23:03 car.js
-rw-r--r--  1 wenbert  staff   36 13 May 23:03 drone.js
-rw-r--r--  1 wenbert  staff   18 13 May 23:03 vehicle.js
```

So now, the question is how do we load all those files? This is where we use the `export` keyword.

So `Vehicle` class would now look like this:

```javascript
export class Vehicle {

}
```

Then in `Car` class, we also use `export`. But since we are using the `Vehicle` class, we also need to `import` it. 

```javascript
// car.js
import {Vehicle} from './vehicle.js';

export class Car extends Vehicle {

}
```

The same goes for `drone.js`.

So in `app.js`, we also need to use `import`. But this time, take into account that the `app.js` is located in a different directory. So you would have to specify `classes` directory then the `filename`

```javascript
import {Car} from './classes/car.js';
import {Drone} from './classes/drone.js';

let c = new Car();
let d = new Drone();
```

### Creating a Data Service Class

* Create a Data Service Class
* Loading Data
  * For now we just use a .json file
* Creating Constructors
  * It's definitely not in the format that we need. So we need to make sure our classes get the information that they need from the data
* Instantiating Objects
  * Collections - ie: arrays
* Handling Errors
  * A simple error class
* Validating Data
  * Notify users that errors are there
* Querying and Sort Data
* Filtering Data

## User Interface Classes

### Material Design Lite

https://getmdl.io/components/index.html

Install:

```
$ npm install -save material-design-lite
```

And we also need jQuery

```
$ npm install -save jquery
```

Since we use jQuery, we need SystemJS

```
$ npm install -save systemjs
```

The `index.html` will now look like this:

```html
<html>
  <head>
    <title>Drones</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="/node_modules/material-design-lite/dist/material.css">
    
    <script src="node_modules/traceur/bin/traceur.js"></script>
    <!-- <script src="node_modules/es6-module-loader/dist/es6-module-loader-dev.js"></script> -->
    <script src="node_modules/systemjs/dist/system.js"></script>
    <script src="node_modules/material-design-lite/dist/material.js"></script>
  </head>
  <body>
      <script>
          //So that jquery becomes and ES6 module (?)
          System.paths['jquery'] = './node_modules/jquery/dist/jquery.js';
          System.import('src/app.js');
      </script> 
  </body>
</html> 
```

To use, for example, we have `base class` 

```javascript
import $ from 'jquery';

export class BaseElement {

}
```

We don't use `{}` in the import for jQuery.