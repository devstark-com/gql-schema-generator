const inquirer = require('inquirer')

module.exports = async () => {
  const data = await inquirer.prompt([{
    type: 'input',
    name: 'typeName',
    message: 'Specify new type name >',
    default: 'User',
    validate: (input) => input ? true : 'Type name required'
  }, {
    type: 'editor',
    name: 'typeFields',
    message: `Specify new type fields in format: ${'field:type, filed1:type, ...'.cyan}\n` +
      `  ${'Id:ID!, createAt:DateTime!'.cyan} and ${'updatedAt:DateTime!'.cyan} will be added by default.\n` +
      `  You may prevent adding this fields by ${'noId, noCreatedAt'.cyan} and ${'noUpdatedAt'.cyan} >`,
    default: 'name: String,\nage: Integer,\nparent: User',
    validate: (input) => input ? true : 'At least one field is required',
    filter: (input) => input.replace(/\n/g, '').split(',').map(s => {
      const [name, type] = s.split(':')

      if (!type) return { name }

      return {
        name: name.trim(),
        type: type.trim()
      }
    })
  }, {
    type: 'checkbox',
    name: 'oneRelations',
    message: 'Which of fields has ONE relation >',
    choices: (prevAnswers) => prevAnswers.typeFields.map(f => f.name),
    when: (prevAnswers) => areUncommonTypesSpecified(prevAnswers.typeFields)
  }, {
    type: 'checkbox',
    name: 'manyRelations',
    message: 'Which of fields has MANY relations >',
    choices: (prevAnswers) => prevAnswers.typeFields.map(f => f.name),
    when: (prevAnswers) => areUncommonTypesSpecified(prevAnswers.typeFields)
  }, {
    type: 'checkbox',
    name: 'unique',
    message: 'Which of fields unique >',
    choices: (prevAnswers) => prevAnswers.typeFields.map(f => f.name)
  }])

  const defaultFields = {
    noId: data.typeFields.findIndex(f => f.name.toLowerCase() === 'noid'),
    createdAt: data.typeFields.findIndex(f => f.name.toLowerCase() === 'createdat'),
    updatedAt: data.typeFields.findIndex(f => f.name.toLowerCase() === 'updatedat')
  }

  if (~defaultFields.noId) data.typeFields.splice(defaultFields.noId, 1)
  else data.typeFields.unshift({ name: 'id', type: 'ID', unique: true, auto: true })

  if (~defaultFields.createdAt) data.typeFields.splice(defaultFields.createdAt, 1)
  else data.typeFields.push({ name: 'createdAt', type: 'DateTime', auto: true })

  if (~defaultFields.updatedAt) data.typeFields.splice(defaultFields.updatedAt, 1)
  else data.typeFields.push({ name: 'updatedAt', type: 'DateTime', auto: true })

  if (data.oneRelations) {
    data.oneRelations.forEach(r => {
      const fieldIndex = data.typeFields.findIndex(f => f.name === r)
      data.typeFields[fieldIndex].relation = 'one'
    })
  }

  if (data.manyRelations) {
    data.manyRelations.forEach(r => {
      const fieldIndex = data.typeFields.findIndex(f => f.name === r)
      data.typeFields[fieldIndex].relation = 'many'
    })
  }

  if (data.unique) {
    data.unique.forEach(u => {
      const fieldIndex = data.typeFields.findIndex(f => f.name === u)
      data.typeFields[fieldIndex].unique = true
    })
  }

  return data
}

const areUncommonTypesSpecified = (typeFields) => {
  return typeFields.some(f => {
    if (!f.type) return false

    return ![
      'string',
      'int',
      'float',
      'boolean',
      'id',
      'date',
      'datetime',
      'uuid',
      'json'
    ].includes(f.type.toLowerCase())
  })
}
