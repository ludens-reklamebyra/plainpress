# plainpress
A plain Wordpress theme with gulp, scss, and browserify.

The theme provides quick development with wordpress on a local host. (For FTP, use a client like FileZilla or remoteFTP-package from ATOM). This is fully specced with gulp as taskrunner, that gives you SCSS and ES6-javascript without any more configuration. Just follow the installation and run-steps down below.

## Install
```
$ git clone git@github.com:ludens-reklamebyra/plainpress.git && cd plainpress
$ npm install
```

## Run

#### Development
Watches SCSS and JS with livereload for faster development.
```
$ npm run dev
```
#### Production
making fontawesome, compiles and minifies
```
$ npm run build
```
#### Font Awesome
`$ npm run fontAwesome`


## Testing javascript
This WP-theme is installed with Mocha and ChaiJS to cover unit tests with javascript.
The unit-tests are also configured with ES6/ES2015.

```
$ npm test
```
* Example:

```javascript
// Import the modules you like
import { expect, should, assert } from 'chai'

describe('your module', () => {
  it('should do something awesome', () => {
    expect('awesome').to.equal('awesome')
  })
})
```
