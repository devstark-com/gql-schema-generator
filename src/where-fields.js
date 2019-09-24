module.exports = {
  id: (name) => {
    return `\t${name}: id\n` +
    `\t${name}_not: id\n` +
    `\t${name}_in: [id]\n` +
    `\t${name}_not_in: [id]\n`
  },

  uuid: (name) => {
    return `\t${name}: uuid\n` +
    `\t${name}_not: uuid\n` +
    `\t${name}_in: [uuid]\n` +
    `\t${name}_not_in: [uuid]\n`
  },

  string: (name) => {
    return `\t${name}: String\n` +
    `\t${name}_not: String\n` +
    `\t${name}_contains: String\n` +
    `\t${name}_not_contains: String\n` +
    `\t${name}_starts_with: String\n` +
    `\t${name}_not_starts_with: String\n` +
    `\t${name}_ends_with: String\n` +
    `\t${name}_not_ends_with: String\n` +
    `\t${name}_lt: String\n` +
    `\t${name}_lte: String\n` +
    `\t${name}_gt: String\n` +
    `\t${name}_gte: String\n` +
    `\t${name}_in: [String]\n` +
    `\t${name}_not_in: [String]\n`
  },

  json: (name) => {
    return `\t${name}: json\n` +
    `\t${name}_not: json\n` +
    `\t${name}_contains: json\n` +
    `\t${name}_not_contains: json\n` +
    `\t${name}_starts_with: json\n` +
    `\t${name}_not_starts_with: json\n` +
    `\t${name}_ends_with: json\n` +
    `\t${name}_not_ends_with: json\n` +
    `\t${name}_lt: json\n` +
    `\t${name}_lte: json\n` +
    `\t${name}_gt: json\n` +
    `\t${name}_gte: json\n` +
    `\t${name}_in: [json]\n` +
    `\t${name}_not_in: [json]\n`
  },

  integer: (name) => {
    return `\t${name}: Integer\n` +
    `\t${name}_not: Integer\n` +
    `\t${name}_lt: Integer\n` +
    `\t${name}_lte: Integer\n` +
    `\t${name}_gt: Integer\n` +
    `\t${name}_gte: Integer\n` +
    `\t${name}_in: [Integer]\n` +
    `\t${name}_not_in: [Integer]\n`
  },

  float: (name) => {
    return `\t${name}: Float\n` +
    `\t${name}_not: Float\n` +
    `\t${name}_lt: Float\n` +
    `\t${name}_lte: Float\n` +
    `\t${name}_gt: Float\n` +
    `\t${name}_gte: Float\n` +
    `\t${name}_in: [Float]\n` +
    `\t${name}_not_in: [Float]\n`
  },

  boolean: (name) => {
    return `\t${name}: Boolean\n` +
    `\t${name}_not: Boolean\n`
  },

  datetime: (name) => {
    return `\t${name}: DateTime\n` +
    `\t${name}_not: DateTime\n` +
    `\t${name}_in: [DateTime]\n` +
    `\t${name}_not_in: [DateTime]\n` +
    `\t${name}_lt: DateTime\n` +
    `\t${name}_lte: DateTime\n` +
    `\t${name}_gt: DateTime\n` +
    `\t${name}_gte: DateTime\n`
  },

  date: (name) => {
    return `\t${name}: Date\n` +
    `\t${name}_not: Date\n` +
    `\t${name}_in: [Date]\n` +
    `\t${name}_not_in: [Date]\n` +
    `\t${name}_lt: Date\n` +
    `\t${name}_lte: Date\n` +
    `\t${name}_gt: Date\n` +
    `\t${name}_gte: Date\n`
  },

  time: (name) => {
    return `\t${name}: Time\n` +
    `\t${name}_not: Time\n` +
    `\t${name}_in: [Time]\n` +
    `\t${name}_not_in: [Time]\n` +
    `\t${name}_lt: Time\n` +
    `\t${name}_lte: Time\n` +
    `\t${name}_gt: Time\n` +
    `\t${name}_gte: Time\n`
  },

  enum: (name) => {
    return `\t${name}: Enum\n` +
    `\t${name}_not: Enum\n` +
    `\t${name}_in: [Enum]\n` +
    `\t${name}_not_in: [Enum]\n`
  },

  array: (name, type) => {
    return `\t${name}_contains: ${type}\n` +
    `\t${name}_contains_every: [${type}]\n` +
    `\t${name}_contains_some: [${type}]\n`
  },

  manyRelation: (name, type) => {
    return `\t${name}_every: ${type}WhereInput\n` +
    `\t${name}_some: ${type}WhereInput\n` +
    `\t${name}_none: ${type}WhereInput\n` +
    `\t${name}_is_null: Boolean\n`
  },

  oneRelation: (name, type) => {
    return `\t${name}: ${type}WhereInput\n`
  }
}
