import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const count = await db('articles').where('id', +req.params.id).del()

    res.json({ deleted: !!count })
  } catch (error) {
    res.json({ error })
  }
}