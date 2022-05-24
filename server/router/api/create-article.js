import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const [ article ] = await db('articles').insert({}).returning('*')

    res.json(article)
  } catch (error) {
    res.json({ error })
  }
}