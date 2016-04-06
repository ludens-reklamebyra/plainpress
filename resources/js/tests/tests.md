## Testing javascript with MochaJS

```javascript
import { expect } from 'chai'
import yourModule from '../yourModulesFolder'

describe('yourModule', () => {
  it('should return something', () => {
    expect(yourModule).toEqual('something')
  })
})

```
