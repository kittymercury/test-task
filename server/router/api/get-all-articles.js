import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const articles = await db('articles')

    res.json(articles)
  } catch (error) {
    res.json({ error })
  }
}