import joi from 'joi'

import schema from './schema'

const schemas = schema(joi)

const schemaValidator = async (object, type) => {
  if (!object) return new Error('Object to be validated not provided.')

  if (!type) return new Error('The schema type is not provided')

  const { error, value } = joi.validate(object, schemas[type])

  if (error) return Promise.reject(error)

  return value
}

export default schemaValidator
