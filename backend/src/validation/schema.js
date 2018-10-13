const schema = (joi) => {
  const autoCompleteReqDataSchema = joi.object().keys({
    query: joi.string().required(),
    field: joi.string().required(),
    limit: joi.number().integer().min(1).max(20)
      .required(),
  })

  const searchReqDataSchema = joi.object().keys({
    query: joi.string().required(),
  })

  return {
    autoComplete: autoCompleteReqDataSchema,
    search: searchReqDataSchema,
  }
}

export default schema
