import ptr from 'json-ptr'
/**
 * Resolve a reference (internal or external) from a ref-url
 *
 * TODO: "External is not yet implemented"
 *
 * @param obj
 * @param $ref
 */
export function resolveRef(obj, $ref) {
  return ptr.get(obj, $ref)
}

export function storeRef(obj, $ref, value) {
  console.log("arguments", arguments)
  ptr.set(obj, $ref, value)
}
