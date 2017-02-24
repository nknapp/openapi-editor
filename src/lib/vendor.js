import pickBy from 'lodash.pickby'
/**
 * Returns all vendor-extensions of an object
 * @param object
 */
export function vendor(object) {
  return pickBy(object, (value, key) => key.lastIndexOf('x-', 0) === 0)
}

/**
 * Returns all non-vendor-extension property of an object
 * @param object
 * @returns {Object}
 */
export function nonVendor(object) {
  return pickBy(object, (value, key) => key.lastIndexOf('x-', 0) !== 0)
}


