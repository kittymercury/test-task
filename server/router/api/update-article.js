import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const article = await db.select().from('articles').where({ id: +req.params.id }).first()

    const attributes = {
      ...article,
      heading: req.body.heading ? req.body.heading : article.heading,
      content: req.body.content ? req.body.content : article.content,
      updated_at: new Date()
    }

    const [ updatedArticle ] = await db('articles').where({ id: +req.params.id }).update(attributes).returning(['id', 'heading', 'content', 'created_at', 'updated_at'])
    
    res.json({ updatedArticle })
  } catch (error) {
    res.json({ error })
  }
}