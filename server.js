import { getVotes } from './votes.js'
import express from 'express'

const PORT = process.env.PORT || 4000;

const app = express()

app.get('/api/votes', async function (req, res) {
  res.send(await getVotes(req.query.id))
})

app.get("/", (req, res) => {
    res.send("This project has been done by summoNN and his twitch community!");
  });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});