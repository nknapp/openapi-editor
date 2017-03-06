/**
 * Utility functions that are used in multiple components
 */

/**
 * Compute display-strings for constraints of primitive JSON values
 * @returns {Array}
 */
export function constraints(schemaOrParameter) {
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
export function minMaxItems(schemaOrParameter) {
  var unique = schemaOrParameter.uniqueItems ? 'unique ' : ''
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

export function multiplicity(parameter) {
  if (!this.parameter.collectionFormat) {
    return
  }
  var name = 'p';
  switch (this.parameter.collectionFormat) {
    case 'csv':
      return `${name}=x1,x2,x3`
    case 'ssv':
      return `${name}=x1 x2 x3`
    case 'tsv':
      return `${name}=x1\\tx2\\tx3`
    case 'pipes':
      return `${name}=x1|x2|x3`
    case 'multi':
      return `${name}=x1&${name}=v2`
    default:
      return `Unknown collection-format ${this.parameter.collectionFormat}`
  }
}

// See https://github.com/OAI/OpenAPI-Specification/blob/3.0.0-rc0/versions/3.0.md#dataTypes
export const dataTypes = [
  { title: "integer", type: "integer", format: "int32", description: "signed 32 bits" },
  { title: "long", type: "integer", format: "int64", description: "signed 64 bits" },
  { title: "float", type: "number", format: "float", description: "" },
  { title: "double", type: "number", format: "double", description: "" },
  { title: "string", type: "string" },
  { title: "byte", type: "string", format: "byte", description: "base64 encoded characters" },
  { title: "binary", type: "string", format: "binary", description: "any sequence of octets" },
  { title: "boolean", type: "boolean" },
  { title: "date", type: "string", format: "date", description: "As defined by full-date - RFC3339" },
  { title: "dateTime", type: "string", format: "date-time", description: "As defined by date-time - RFC3339" },
  {
    title: "password",
    type: "string",
    format: "password",
    description: "Used to hint UIs the input needs to be obscured."
  },
]

// Lookup dictionary for select choices
export const dataTypeByValue = {}


function valueForDataType (objWithTypeAndFormat) {
  return `${objWithTypeAndFormat.type}-${objWithTypeAndFormat.format || 'noformat'}`
}

/**
 * Return the dataTypeObject for a parameter
 * @param param
 * @returns {{}}
 */
export function dataTypeForParam (param) {
  return dataTypeByValue[valueForDataType(param)]
}

// Augment with "value" for select-inputs
dataTypes.forEach(function(dataType) {
  dataType.value = valueForDataType(dataType)
  dataTypeByValue[dataType.value] = dataType
})


