const inquirer = require('inquirer')
const fs = require('fs')

module.exports = async () => {
  inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))

  const data = await inquirer.prompt([{
    type: 'input',
    name: 'typeName',
    message: 'Specify new type name >',
    default: 'User',
    validate: (input) => input ? true : 'Type name required'
  }, {
    name: 'typeFields',
    type: 'fuzzypath',
    excludePath: nodePath => ['node_modules', '.git', '.DS_Store'].some(path => nodePath.startsWith(path)),
    itemType: 'file',
    message: 'Select your type file >',
    suggestOnly: false,
    filter: parseSelectedType
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

function parseSelectedType (pathToFile) {
  const specifiedType = fs.readFileSync(pathToFile).toString()

  let typeParts = specifiedType.split('\n')
  typeParts.pop()
  typeParts.shift()

  typeParts = typeParts.map(part => part.replace(/(,|!)/g, ''))

  return typeParts.map(part => {
    const [name, type] = part.split(':')
    return {
      name: name.trim(),
      type: type.trim()
    }
  })
}
