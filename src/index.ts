import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// aqui temos o uso da variável PORT
// ela vem como string e então convertemos para um número com Number()
// deixamos um valor de backup com || caso não exista a variável
app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})