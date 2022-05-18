export const up = (knex, Promise) => {
  return knex.schema.createTable('articles', function(table) {
    table.increments('id').primary()
    table.string('heading').defaultTo('Untitled article')
    table.string('content', 10000)
    table.timestamp('created_at').defaultTo(null)
    table.timestamp('updated_at').defaultTo(null)
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable('articles')
}