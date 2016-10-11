![Preview](./assets/images/Group.png)

A plain Wordpress theme with gulp, scss, browserify and babel.

The theme provides quick development with wordpress on a local host. (For FTP, use a client like FileZilla or remoteFTP-package from ATOM). This is fully specced with gulp as taskrunner, that gives you SCSS and ES6-javascript without any more configuration. Just follow the installation and run-steps down below.

## Install
```
$ git clone git@github.com:ludens-reklamebyra/plainpress.git && cd plainpress
$ npm install
```

## Run
Default (lints, compiles, and watches php, sass, and js):
```
$ npm run dev
```
Compile (making fontawesome, compiles and minifies):
```
$ npm run build
```
Font Awesome
`$ npm run fontAwesome`

## Testing

This WP-theme is installed with Mocha and ChaiJS to cover unit tests with javascript. The unit-tests are also configured with ES6/ES2015.

`$ npm test`

Example:

```js
// Import the modules you like
import { expect, should, assert } from 'chai'

describe('your module', () => {
  it('should do something awesome', () => {
    expect('awesome').to.equal('awesome')
  })
})
```
