import express from 'express'
const {addProduct, getProducts, getOneProduct, deleteProduct} = require('../../controllers/product/index')
const validateResult = require('../../middleware/validateResource')
const {createProductSchema} = require('../../schema/product.schema')
const requireUser = require('../../middleware/requireUser')

const router = express()

router.post('/addProduct', validateResult(createProductSchema), addProduct)
router.get('/getProducts', getProducts)
router.get('/getOneProduct/:id', getOneProduct)
router.delete('/deleteProduct/:id', deleteProduct)

module.exports = router