require('colors')

const collectData = require('./collect-data')
const whereFields = require('./where-fields')

module.exports = async () => {
  const data = await collectData()

  // type
  let newType = `type ${data.typeName} {\n`

  data.typeFields.forEach(f => {
    if (f.relation) {
      if (f.relation === 'one') newType += `\t${f.name}: ${f.type}\n`
      if (f.relation === 'many') newType += `\t${f.name}: [${f.type}!]!\n`
    } else newType += `\t${f.name}: ${f.type}!\n`
  })

  newType += '}\n'

  // create input
  newType += `\ninput ${data.typeName}CreateInput {\n`

  data.typeFields.forEach(f => {
    if (['createdat', 'updatedat', 'id'].includes(f.name.toLowerCase())) return
    newType += `\t${f.name}: ${f.type}${f.relation ? '!' : ''}\n`
  })

  newType += '}\n'

  // update input
  newType += `\ninput ${data.typeName}UpdateInput {\n`

  data.typeFields.forEach(f => {
    if (['createdat', 'updatedat', 'id'].includes(f.name.toLowerCase())) return
    newType += `\t${f.name}: ${f.type}\n`
  })

  newType += '}\n'

  // where unique input
  newType += `\ninput ${data.typeName}WhereUniqueInput {\n`

  data.typeFields.forEach(f => {
    if (f.unique) newType += whereFields[f.type.toLowerCase()](f.name, f.type) + '\n'
  })

  newType += '}\n'

  // where input
  newType += `\ninput ${data.typeName}WhereInput {\n` +
    `\tAND: [${data.typeName}WhereInput]\n` +
    `\tOR: [${data.typeName}WhereInput]\n\n`

  data.typeFields.forEach(f => {
    if (f.relation) newType += whereFields[`${f.relation.toLowerCase()}Relation`](f.name, f.type)
    else newType += whereFields[f.type.toLowerCase()](f.name, f.type)

    newType += '\n'
  })

  newType += '}\n'

  // sort enum (input)
  newType += `\nenum ${data.typeName}OrderByInput {\n`

  data.typeFields.forEach(f => {
    if (f.relation) return

    newType += `\t${f.name}_asc\n`
    newType += `\t${f.name}_desc\n`
  })

  newType += '}\n'

  return {
    newType,
    name: data.typeName
  }
}
