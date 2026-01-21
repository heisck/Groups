import express from "express";
import cors from 'cors'
import { handleAddStudent } from "./script.js";

const app = express()
const port = 55000

app.use(cors())
// Handle CORS preflight for specific route(s)
app.options('/send-info', cors())
app.use(express.json())


app.post('/send-info', async (req, res) => {
  try {
    const info = req.body
    const result = await handleAddStudent(info);
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
