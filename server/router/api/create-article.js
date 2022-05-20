import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const [ article ] = await db('articles').insert({ created_at: new Date() }).returning(['id', 'heading', 'content', 'created_at', 'updated_at'])

    res.json({ article })
  } catch (error) {
    res.json({ error })
  }
}