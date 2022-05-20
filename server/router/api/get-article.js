import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const article = await db.select().from('articles').where({ id: +req.params.id }).first()

    res.json({ article })
  } catch (error) {
    res.json({ error })
  }
}