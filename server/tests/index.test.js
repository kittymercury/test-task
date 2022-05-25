const axios = require('axios')
const lodash = require('lodash')

describe('REST API', () => {
  describe('GET /articles', () => {
    it('Should return all articles', async () => {
      const result = await axios.get('http://server:2000/articles')

      expect(result.status).toEqual(200)
      expect(lodash.isArray(result.data)).toEqual(true)
    })
  })

  describe('POST /article', () => {
    it('Should post article', async () => {
      const result = await axios.post('http://server:2000/article')
      
      expect(result.status).toEqual(200)
      expect(result.data).toHaveProperty('id')
      expect(result.data.heading).toEqual('Untitled article')
      expect(result.data.content).toBeNull()
      expect(result.data.created_at).toBeNull()
      expect(result.data.updated_at).toBeNull()
    })
  })

  describe('GET /article', () => {
    it('Should get one article', async () => {
      const article = await axios.post('http://server:2000/article')
      const result = await axios.get(`http://server:2000/article/${article.data.id}`)
      
      expect(result.status).toEqual(200)
      expect(result.data.id).toEqual(article.data.id)
      expect(result.data.heading).toEqual(article.data.heading)
      expect(result.data.content).toEqual(article.data.content)
      expect(result.data.created_at).toEqual(article.data.created_at)
      expect(result.data.updated_at).toEqual(article.data.updated_at)
    })
  })

  describe('PUT /article', () => {
    it('Should return error if no heading provided', async () => {
      const article = await axios.post('http://server:2000/article')
      const result = await axios.put(`http://server:2000/article/${article.data.id}`)

      expect(result.data.error).toEqual('Heading must be provided')
    })

    it('Should change heading', async () => {
      const article = await axios.post('http://server:2000/article')
      const result = await axios.put(`http://server:2000/article/${article.data.id}`, { heading: 'Heading' })

      expect(result.data.heading).toEqual('Heading')
      expect(result.data.content).toBeNull()
      expect(result.data.created_at).not.toBeNull()
      expect(result.data.updated_at).toBeNull()
    })

    it('Should change content', async () => {
      const article = await axios.post('http://server:2000/article')
      const result = await axios.put(`http://server:2000/article/${article.data.id}`, { content: 'Content', heading: 'Heading' })

      expect(result.data.heading).toEqual('Heading')
      expect(result.data.content).toEqual('Content')
      expect(result.data.created_at).not.toBeNull()
      expect(result.data.updated_at).toBeNull()
    })

    it('Should change updated_at date', async () => {
      const article = await axios.post('http://server:2000/article')
      const updatedArticle = await axios.put(`http://server:2000/article/${article.data.id}`, { content: 'Content', heading: 'Heading' })
      const result = await axios.put(`http://server:2000/article/${updatedArticle.data.id}`, { content: 'New content', heading: 'New heading' })

      expect(result.data.heading).toEqual('New heading')
      expect(result.data.content).toEqual('New content')
      expect(result.data.created_at).not.toBeNull()
      expect(result.data.updated_at).not.toBeNull()
    })
  })

  describe('DELETE /article', () => {
    it('Should delete one article', async () => {
      const newArticle = await axios.post('http://server:2000/article')
      
      const result = await axios.delete(`http://server:2000/article/${newArticle.data.id}`)
      
      expect(result.status).toEqual(200)
      expect(result.data.deleted).toBeTruthy()
    })
  })
})




