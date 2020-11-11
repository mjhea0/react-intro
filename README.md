# Intro to React

Quick intro to [React](https://reactjs.org/).

### Contents

1. [What is React?](https://github.com/mjhea0/react-intro#what-is-react)
1. [Project setup](https://github.com/mjhea0/react-intro#project-setup)
1. [Lint the code](https://github.com/mjhea0/react-intro#lint-the-code)
1. [Add a cat](https://github.com/mjhea0/react-intro#add-a-cat)
1. [React setup](https://github.com/mjhea0/react-intro#react-setup)
1. [Webpack setup](https://github.com/mjhea0/react-intro#webpack-setup)

### Objectives

By the end of this tutorial, you should be able to:

1. Explain what React is and how it compares to Angular and Vue
1. Set up a modern React environment with Babel and Webpack
1. Create and render a React component in the browser

## What is React?

> YOUR TURN: What is React? How does it compare to Angular and Vue?

## Project setup

Create a new project directory:

```sh
$ mkdir react-intro
$ cd react-intro
$ npm init -y
```

Install gulp and babel:

```sh
$ npm install --save-dev gulp@4.0.2 gulp-babel@8.0.0 @babel/core@7.12.1 @babel/preset-env@7.12.1
```

> YOUR TURN: What's babel? What does `@babel/preset-env` do?


Create a *gulpfile.js* file in the project root:

```javascript
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', (done) => {
  gulp.src(['src/**/*.js'])
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('lib'));
  done();
});
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
$ npm start

> react-intro@0.0.0 start /react-intro
> gulp build && node lib/index.js

[18:00:21] Using gulpfile ~/react-intro/gulpfile.js
[18:00:21] Starting 'build'...
[18:00:22] Finished 'build' after 361 ms
hello, world!
```

> YOUR TURN: What happened?

## Lint the code

Install:

```sh
$ npm install --save-dev eslint@7.13.0 eslint-config-airbnb@18.2.1
$ npm install --save-dev eslint-plugin-import@2.22.1 eslint-plugin-jsx-a11y@6.4.1
$ npm install --save-dev eslint-plugin-react@7.21.5 gulp-eslint@6.0.0
```

> YOUR TURN: Why lint? What do those packages do?

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
gulp.task('lint', (done) => {
  gulp.src([
    'gulpfile.js',
    'src/**/*.js',
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  done();
});
```

Make sure to add the dependency:

```javascript
const eslint = require('gulp-eslint');
```

Then add the `lint` task to the `build`:

```javascript
gulp.task('build', gulp.series('lint', (done) => {
  gulp.src(['src/**/*.js'])
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('lib'));
  done();
}));
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

> YOUR TURN: Why are we ignoring it?

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

> YOUR TURN: What's happening here?

## React setup

Install:

```sh
$ npm install --save react@17.0.1 react-dom@17.0.1 prop-types@15.7.2
```

> YOUR TURN: What's React DOM?

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

> YOUR TURN: What's bundle.js?

Add a `div` to the *index.html* file, just above the `script` tag:

```html
<div class="app"></div>
```

Create a new file in "src" called *client.jsx*:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Cat from './cats';

const catMeow = new Cat('Browser Cat').meow();

const App = (props) => {
  const { message } = props;
  return (
    <div>
      The cat says:&nbsp;
      { message }
    </div>
  );
};

App.propTypes = {
  message: PropTypes.string.isRequired,
};

ReactDOM.render(<App message={catMeow} />, document.querySelector('.app'));
```

> YOUR TURN: Is that HTML in a JS file? Why? What's JSX? Also, what does @babel/preset-react do?

To process the *.jsx* file, install:

```sh
$ npm install --save-dev @babel/preset-react@7.12.5
```

Add the preset to the `build` task in *gulpfile.js*:

```javascript
gulp.task('build', gulp.series('lint', (done) => {
  gulp.src(['src/**/*.js'])
    .pipe(babel({ presets: ['@babel/preset-env', '@babel/preset-react'] }))
    .pipe(gulp.dest('lib'));
  done();
}));
```

Finally, update the `lint` task to handle *.jsx* files:

```javascript
gulp.task('lint', (done) => {
  gulp.src([
    'gulpfile.js',
    'src/**/*.js',
    'src/**/*.jsx',
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  done();
});
```

Run the linter:

```sh
$ ./node_modules/.bin/gulp lint
```

You should see the following error:

```sh
/react-intro/src/client.jsx
  22:44  error  'document' is not defined  no-undef
```

> YOUR TURN: Why did we get this error?

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
$ npm install --save-dev webpack@5.4.0 webpack-cli@4.2.0 babel-loader@8.2.1
```

> YOUR TURN: What's webpack? What does babel-loader do? Why all these damn tools?!?!

Then add *webpack.config.js* to the project root:

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ]
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
}
```

Update the `start` script in *package.json*:

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
