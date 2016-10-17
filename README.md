# Learn-JS
Internal projects for introducing backenders to javascript

## Getting started

If you start your adventure with front-end development from scratch you may want to read those additional resources:
* [NodeJS](https://nodejs.org/en/) JavaScript runtime
* [npm](https://www.npmjs.com/) package management for JavaScript

Then:

* First time do `npm install`
* To get the program running `npm start`
* To start tests `npm test`
* Use `npm clean` to get rid of old files
* To validate your project for correctness use `npm lint`
* Create a distributable version with `npm dist`
 
For more aliases check `npm` docs and `package.json` in the repo. 

## Stack 

* Creating components: [React.js](https://facebook.github.io/react/) 5 minute [primer](http://putaindecode.io/en/articles/js/react/)
* Handling state: [Redux](http://redux.js.org/) 5 minute [primer](http://redux.js.org/docs/basics/DataFlow.html)
* Building modules: [Webpack](https://webpack.github.io/)
* Supporting ES2015: [Babel](https://babeljs.io/)

Project was generated with [Yeoman](http://yeoman.io/)

## Project structure
+ `cfg`: various configuration files
+ `coverage`: generated test coverage reports
+ `dist`: for generated distributions
+ `src`: source code
  + `actions`: directory to put your [flux actions](https://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html). Actions are JS objects describing (marking and holding payload) an event that did happen in the app causing an update to stores
  + `components`: UI components written with jsx and React go here
  + `config`: configuration files for UI 
  + `containers`: folder for top level components, they describe how things work
  + `reducers`: place for [redux reducers](http://redux.js.org/docs/basics/Reducers.html). `reducer, a pure function with (state, action) => state signature. It describes how an action transforms the state into the next state.`
  + `sources`: folder for flux datasources
  + `stores`: for flux stores holding application state as an JS object. Store's `API is { subscribe, dispatch, getState }`
  + `styles`: for regular CSS
+ `test`: test source code root

## Generating code
+ `yo react-webpack-redux:reducer my/namespaced/reducers/name`
+ `yo react-webpack-redux:action my/namespaced/actions/name`
+ `yo react-webpack-redux:component my/namespaced/components/name`
+ `yo react-webpack-redux:container my/namespaced/container/Name`

## Changelog
+ `Week 1`: Added readme
