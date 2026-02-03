import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { UserController } from "./user.controler";
import auth from "../../middleware/auth";

const router = Router()

// Routes --> Controller(handle req,res) --> Service(logic)

router.post("/",auth("admin","user"),UserController.createUser)

router.get("/",UserController.getUser)

router.get("/:id",UserController.getSingleUser)

router.put("/:id",UserController.updateUser)

router.delete("/:id",UserController.deleteUser)


export const userRoutes =router