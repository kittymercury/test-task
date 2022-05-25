import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const article = await db.select().from('articles').where({ id: +req.params.id }).first()

    if (!req.body.heading) {
      return res.json({ error: 'Heading must be provided' })
    }

    const attributes = {
      created_at: article.created_at ? article.created_at : new Date()
    }

    if (req.body.heading) {
      attributes.heading = req.body.heading
    }

    if (req.body.content) {
      attributes.content = req.body.content
    }

    if (article.created_at) {
      if (article.heading !== req.body.heading || req.body.content !== article.content) {
        attributes.updated_at = new Date()
      }
    }

    const [ updatedArticle ] = await db('articles').where({ id: +req.params.id }).update(attributes).returning('*')
    
    res.json(updatedArticle)
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}