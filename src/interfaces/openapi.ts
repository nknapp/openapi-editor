export interface SwaggerObject {
  /**
   * The version number
   */
  swagger: string
  /**
   *
   */
  info: InfoObject,
  host?: string,
  basePath?: string,
  schemes?: string[],
  consumes?: string[],
  produces?: string[],
  paths: PathsObject

}

export interface InfoObject {

}

export interface PathsObject {
  [ path: string]: PathItemObject
}

export interface PathItemObject {
  get?: OperationObject
  post?: OperationObject
  'delete'?: OperationObject
  options?: OperationObject
  head?: OperationObject
  patch?: OperationObject
}

export interface OperationObject {

}