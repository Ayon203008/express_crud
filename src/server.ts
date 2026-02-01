import express, { Request, Response }  from 'express';
const app = express()
const port = 5000

app.get('/', (req:Request, res:Response) => {
  res.send('My name is Cristiano ronaldo')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
