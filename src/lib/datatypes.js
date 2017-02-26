/**
 * Utility functions that are used in multiple components
 */

/**
 * Compute display-strings for constraints of primitive JSON values
 * @returns {Array}
 */
export function constraints (schemaOrParameter) {
  var p = schemaOrParameter
  var result = []
  if (p.minimum) {
    result.push(`x ${p.exclusiveMinimum ? '>' : '\u2265'} ${p.minimum}`)
  }
  if (p.maximum) {
    result.push(`x ${p.exclusiveMaximum ? '>' : '\u2264'} ${p.maximum}`)
  }
  if (p.pattern) {
    result.push(`x ~ /${p.pattern}/`)
  }
  if (p.multipleOf) {
    result.push(`x \u2208 ${p.multipleOf}\u2124`)
  }
  if (p.enum) {
    result.push(`x = ${p.enum.map((v) => JSON.stringify(v)).join('|\u200b')}`)
  }
  if (p.minLength) {
    result.push(`x.length \u2265 ${p.minLength}`)
  }
  if (p.maxLength) {
    result.push(`x.length \u2264 ${p.maxLength}`)
  }
  return result
}

/**
 * Compute display strings for item-number constraints on arrays
 * @returns {string}
 */
export function minMaxItems (schemaOrParameter) {
  var unique = schemaOrParameter.uniqueItems ? 'unique ': ''
  var max = schemaOrParameter.maxItems
  var min = schemaOrParameter.minItems
  if (min && max) {
    return `${min} - ${max} ${unique}items`
  }
  if (min) {
    return `\u2265 ${min} ${unique}items`
  }
  if (max) {
    return `\u2264 ${max} ${unique}items`
  }
}
