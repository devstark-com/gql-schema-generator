const fs = require('fs')
const createEntitySchema = require('./create-entity-schema')

;(async () => {
  const { newType, name } = await createEntitySchema()

  fs.writeFileSync(`./${name.toLowerCase()}.gql`, newType)

  console.log('File for new type successfully created!')
})()
