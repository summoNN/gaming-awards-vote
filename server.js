import { getVotes } from './votes.js'
import express from 'express'

const app = express()

app.get('/api/votes', async function (req, res) {
  res.send(await getVotes(req.query.id))
})

app.listen(3000)