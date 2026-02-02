import express, { NextFunction, Request, Response } from 'express';
import { Pool } from "pg"
import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';

const app = express()
const port = config.port
app.use(express.json())


initDB()

// * LOGGER MIDDLEWARE



app.get('/',logger, (req: Request, res: Response) => {
    res.send('My name is Cristiano ronaldo')
})



app.use("/users",userRoutes)



// * delete the users data 

app.delete("/users/:id", async (req: Request, res: Response) => {
    // console.log(req.params.id)
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id])
        console.log(result.rows)


        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows[0]
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})





// * POST THE TODOS DATA
app.post("/todos",async(req:Request,res:Response)=>{
    const {user_id,title}=req.body
    try{
        const result = await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,[user_id,title])
        res.status(201).json({
            message:"Post created successfully",
            success:true,
            data:result.rows[0]
        })
    }catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// * GET THE TODOS DATA 
app.get("/todos", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM todos`)
        console.log(result)
        res.status(200).json({
            success: true,
            mesage: "Todos get successfully",
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// *  make a not found route
app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found",
        success:false,
        path:req.path
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
