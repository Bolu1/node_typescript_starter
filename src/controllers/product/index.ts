import express, {Request, Response } from 'express'
const db = require('../../utils/connect')
import { createProductInput } from '../../schema/product.schema'

 //insert product
exports.addProduct = async(req: Request<{}, {}, createProductInput['body']>, res:Response) =>{
   
    const sql = 'INSERT INTO products SET ?'
    console.log(req.body)
    await db.query(sql, req.body, (err:any, result:any)=>{
        if(err){
            console.log(err)
            res.status(500).send("An error occured")
        }else{
            res.status(200).send(result)
        }
    })
}

//get all products
exports.getProducts = async(req:Request,res:Response)=>{
    const sql = 'SELECT * FROM products'
    const query  = db.query(sql, (err:any, results:any)=>{
        if(err){
            console.log(err)
            return res.status(404).send('No Product found')
        }
        res.status(200).send(results)
    })
}

//get one product
exports.getOneProduct =  async(req:Request,res:Response)=>{
    try{

    
    const id = req.params.id
    console.log(id)
    const sql =  `SELECT * FROM products WHERE id=${id}`
    await db.query(sql, (err:any, result:any)=>{
        if(err){
            res.status(500).send("Something went wrong")
        }else{
            console.log(result)
            res.status(200).send(result)
        }
    })
    }catch(err){
        res.status(500).send("Something went wrong")
    }
}

//delete product
exports.deleteProduct =  async(req:Request,res:Response)=>{
    const id = req.params.id
    console.log(id)
    const sql = `DELETE FROM products WHERE id = ${id}`
    const query = db.query(sql, (err:any, result:any)=>{
        if(err) {
            console.log(err)
            res.status(500).send("Something went wrong")
        }else{
            res.status(200).send("Product has been removed")
        }
    })
}