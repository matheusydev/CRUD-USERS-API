import express from 'express'

const app = express()
const port = 3000


app.get('/usuarios', (req, res) => {
  res.send('API NO AR!')
})

app.listen(port, () => {
  console.log(`A API está rodando na porta: ${port}`)
})