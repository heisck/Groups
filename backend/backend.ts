import express from "express";
import cors from 'cors'
import { main } from "./script";

const app = express()
const port = 55000

app.use(cors())
// Handle CORS preflight for specific route(s)
app.options('/send-info', cors())
app.use(express.json())


app.post('/send-info', (req, res) => {
  const info = req.body

  main(info);

  console.log(req.body)
  res.send('success')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


