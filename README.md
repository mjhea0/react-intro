# Intro to React

Quick intro to [React](https://facebook.github.io/react/)...

**Contents:**

1. [What is React?](https://github.com/mjhea0/react-intro#what-is-react)
1. [Project setup](https://github.com/mjhea0/react-intro#project-setup)
1. [Lint the code](https://github.com/mjhea0/react-intro#lint-the-code)
1. [Add a cat](https://github.com/mjhea0/react-intro#add-a-cat)
1. [React setup](https://github.com/mjhea0/react-intro#react-setup)
1. [Webpack setup](https://github.com/mjhea0/react-intro#webpack-setup)

**Objectives:**

1. Explain what React is and how it compares to Angular
1. Set up a modern React environment with Babel and Webpack

## What is React?

> YOU: What is React? How does it compare to Angular?

## Project setup

Create a new project directory:

```sh
$ mkdir react-intro
$ cd react-intro
$ npm init -y
```

Install gulp and babel:

```sh
$ npm install --save-dev gulp@3.9.1 gulp-babel@6.1.2 babel-preset-latest@6.16.0
```

> YOU: What's babel? What does `babel-preset-latest` do?

Then add the following to *package.json*:

```json
"babel": {
  "presets": [
    "latest"
  ]
}
```

Create a *gulpfile.js* in the project root:

```javascript
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () =>
  gulp.src(['src/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('lib'))
);
```

Now add a "src" and "lib" folder, and then add an *index.js* file to the "src" to test babel:

```javascript
console.log('hello, world!');
```

Finally, add a `start` script to *package.json*:

```json
"scripts": {
  "start": "gulp build && node lib/index.js"
},
```

Sanity Check:

```sh
npm start

> react-intro@0.0.0 start /react-intro
> gulp build && node lib/index.js

[10:46:26] Using gulpfile ~/react-intro/gulpfile.js
[10:46:26] Starting 'build'...
[10:46:26] Finished 'build' after 615 ms
hello, world!
```

> You: What happened?

## Lint the code

Install:

```sh
$ npm install --save-dev eslint@3.7.1 eslint-config-airbnb@12.0.0
$ npm install --save-dev eslint-plugin-import@2.0.0 eslint-plugin-jsx-a11y@2.2.2
$ npm install --save-dev eslint-plugin-react@6.3.0 gulp-eslint@3.0.1
```

> You: Why lint? What do those packages do?

Add the config to *package.json*:

```json
"eslintConfig": {
  "extends": "airbnb",
  "plugins": [
    "import"
  ]
},
```

Update *gulpfile.js* with a new task:

```javascript
gulp.task('lint', () =>
  gulp.src([
    'gulpfile.js',
    'src/**/*.js',
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);
```

Make sure to add the dependency:

```javascript
const eslint = require('gulp-eslint');
```

Then add the `lint` task to the `build`:

```javascript
gulp.task('build', ['lint'], () =>
  gulp.src(['src/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('lib'))
);
```

Run the linter:

```sh
$ npm start
```

You should see a warning:

```sh
/react-intro/src/index.js
  1:1  warning  Unexpected console statement  no-console

✖ 1 problem (0 errors, 1 warning)
```

Ignore it.

> You: What are we ignoring it?

## Add a cat

Within "src" add a new file called *cats.js*:

```javascript
class Cat {
  constructor(name) {
    this.name = name;
  }
  meow() {
    return `Meow meow, I am ${this.name}`;
  }
}

module.exports = Cat;
```

Then add a "dist" folder with an *index.html* file:

```html
<!doctype html>
<html>
  <head>
    <title>React Intro</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

Update *index.js*:

```javascript
const Cat = require('./cats');

const toby = new Cat('Toby');
console.log(toby.meow());
```

Run `npm start`:

```sh
Meow meow, I am Toby
```

> You: What's happening here? What's bundle.js?

## React setup

Install:

```sh
npm install --save react@15.3.2 react-dom@15.3.2
```

> You: What's react dom?

Add a `div` to the *index.html*:

```html
<div class="app"></div>
```

Create a new file in "src" called *client.jsx*:

```javascript
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Cat from './cats';

const catMeow = new Cat('Browser Cat').meow();

const App = props => (
  <div>
    The cat says: {props.message}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

ReactDOM.render(<App message={catMeow} />, document.querySelector('.app'));
```

> You: Is that HTML in a JS file? Why? What's JSX? Also, what does babel-preset-react do?

To process the *.jsx* file, install:

```sh
$ npm install --save-dev babel-preset-react@6.16.0
```

Update the `babel` field in *package.json*:

```json
"babel": {
  "presets": [
    "latest",
    "react"
  ]
},
```

Finally, update the `lint` task to handle *.jsx* files:

```javascript
gulp.task('lint', () =>
  gulp.src([
    'src/**/*.js',
    'src/**/*.jsx',
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);
```

Run the linter:

```sh
$ gulp lint
```

You should see the following error:

```sh
/react-intro/src/client.jsx
  17:44  error  'document' is not defined  no-undef
```

> You: Why did we get this error?

To correct this, update the `eslintConfig` in *package.json*:

```javascript
"eslintConfig": {
  "extends": "airbnb",
  "plugins": [
    "import"
  ],
  "env": {
    "browser": true
  }
},
```

## Webpack setup

Install:

```sh
$ npm install --save-dev webpack@1.13.2 babel-loader@6.2.5
```

> You: What's webpack? What does babel-loader do? Why all these damn tools?!?!

Then add *webpack.config.js* to the project root:

```javascript
module.exports = {
  entry: './src/client.jsx',
  output: {
    path: './dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
```

Update the `start` script to *package.json*:

```json
"start": "gulp lint && webpack"
```

Run:

```sh
$ npm start
```

Then open the *index.html* file within "dist" in your browser. You should see:

```
The cat says: Meow meow, I am Browser Cat
```
