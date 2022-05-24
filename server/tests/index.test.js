const axios = require('axios')
const lodash = require('lodash')

test('Basic test', async () => {
  expect(true).toEqual(true)
})

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
      expect(result.data).toHaveProperty('created_at')
      expect(result.data.heading).toEqual('Untitled article')
      expect(result.data.content).toBeNull()
      expect(result.data.updated_at).toBeNull()
    })
  })

  describe('GET /article', () => {
    it('Should get one article', async () => {
      const newArticle = await axios.post('http://server:2000/article')
      const result = await axios.get(`http://server:2000/article/${newArticle.data.id}`)
      
      expect(result.status).toEqual(200)
      expect(result.data.id).toEqual(newArticle.data.id)
      expect(result.data.heading).toEqual(newArticle.data.heading)
      expect(result.data.content).toEqual(newArticle.data.content)
      expect(result.data.created_at).toEqual(newArticle.data.created_at)
      expect(result.data.updated_at).toEqual(newArticle.data.updated_at)
    })
  })

  describe('PUT /article', () => {
    it('Should update one article', async () => {
      const newArticle = await axios.post('http://server:2000/article')

      const payload = {
        content: 'test',
        created_at: newArticle.data.created_at ? newArticle.data.created_at : new Date(),
        updated_at: newArticle.data.created_at ? new Date() : null
      }
      
      const result = await axios.put(`http://server:2000/article/${newArticle.data.id}`, payload)
      console.log(result)

      if (!newArticle.data.created_at) {
        expect(result.data.created_at).not.toBeNull()
      }

      if (newArticle.data.created_at) {
        expect(result.data.updated_at).not.toBeNull()
      }
      
      expect(result.status).toEqual(200)
      expect(result.data.content).toEqual(payload.content)
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




