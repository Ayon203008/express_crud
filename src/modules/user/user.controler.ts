import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
    // const { name, email } = req.body;
    try {
        const result = await userServices.createUser(req.body)
        console.log(result.rows[0])
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser()
        console.log(result)
        res.status(200).json({
            success: true,
            mesage: "All users get successfully",
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getSingleUser =  async (req: Request, res: Response) => {
    // console.log(req.params.id)

    try {
        const result = await userServices.getSingleUser(req.params.id as string)
        console.log(result.rows)


        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User get successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const updateUser =  async (req: Request, res: Response) => {

    const {name,email}=req.body // The data you want to update 
    try {
        const result = await userServices.updateuser(name,email,req.params.id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User update successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
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
}


export const UserController ={
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}