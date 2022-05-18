import express from 'express'

import router from './router/index.js'

const app = express()
app.use(express.json())

app.use('/', router)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server started on port ${process.env.SERVER_PORT}`)
})