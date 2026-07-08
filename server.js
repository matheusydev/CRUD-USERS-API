import express from 'express'
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();

const app = express()
app.use(express.json())
const port = 3000


app.post('/usuarios', async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      }
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário', error: error.message })
  }
})

app.get('/usuarios', async (req, res) => {

  let users = []

  if (req.query.name) {
    users = await prisma.user.findMany({
      where: { name: req.query.name }
    })
  } else {
    users = await prisma.user.findMany()
  }

  res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      }
    })
    res.status(200).json(updated)
  } catch (error) {
    res.status(404).json({ message: 'Usuário não encontrado' })
  }
})


app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    })
    res.status(200).json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    res.status(404).json({ message: 'Usuário não encontrado' })
  }
})


app.listen(port, () => {
  console.log(`A API está rodando na porta: ${port}`)
})