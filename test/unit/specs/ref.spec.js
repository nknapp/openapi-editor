import {resolveRef} from 'src/lib/ref'

describe('The resolveRef-function', () => {
  it('if should resolve a json-reference', () => {
    let object = {
      "a": {
        "b": 2,
        "c": [1, 2, 3]
      }
    }
    expect(resolveRef(object, "#/a/b")).to.equal(2)
  })

  it('it should resolved json-references with url-encoded chars', () => {
    let object = {
      "a": {
        "/b": 2,
        "c": [1, 2, 3]
      }
    }
    expect(resolveRef(object, "#/a/%2Fb")).to.equal(2)
  })


})
