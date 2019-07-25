const createEntitySchema = require('./create-entity-schema')

;(async () => {
  const dataString = await createEntitySchema()

  console.log(dataString)
})()
