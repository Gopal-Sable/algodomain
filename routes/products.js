const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../model/Product');
//Route:1
//get all the product using: GET "/api/products/fetch" 

router.get('/fetch', async (req, res) => {

    try {
        const products = await Product.find();

        res.json(products)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Route:2
// add products using: POST "/api/products/addproduct"  

router.post('/addproduct', [
    body('name', 'Enter a valid na,e(min length:3)').isLength({ min: 3 }),
    body('productType', 'Enter a valid type(min length:3)').isLength({ min: 3 }),
    body('category', 'Enter a valid catogary(min length:3)').isLength({ min: 3 }),
    body('basePrice', 'please enter price').isNumeric()
], async (req, res) => {
    try {
        const { name, productType, category, basePrice } = req.body;
        // if there are errors,return Bad requist and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let finalPrice, discount, charges
        switch (category) {

            case "Home Appliances":
                discount = basePrice * 0.22;
                charges = {
                    gst: (basePrice - discount) * 0.24,
                    delivery: 800.00
                }
                finalPrice = basePrice - discount + charges.gst + charges.delivery;
                break;


            case "Electronics":
                discount = basePrice * 0.15;
                charges = {
                    gst: (basePrice - discount) * 0.18,
                    delivery: 350.00
                }
                finalPrice = basePrice - discount + charges.gst + charges.delivery;
                break;


            case "Clothing":
                discount = basePrice * 0.40;
                charges = {
                    gst: (basePrice - discount) * 0.12,
                    delivery: 0.00
                }
                finalPrice = basePrice - discount + charges.gst + charges.delivery;
                break;

            case "Furniture":
                discount = basePrice * 0.10;
                charges = {
                    gst: (basePrice - discount) * 0.18,
                    delivery: 300.00
                }
                finalPrice = basePrice - discount + charges.gst + charges.delivery;
                break;

            default:
                discount = basePrice * 0.15;
                charges = {
                    gst: (basePrice - discount) * 0.18,
                    delivery: 00
                }
                finalPrice = basePrice - discount + charges.gst + charges.delivery;
                
                break;
        }
        const product = new Product({ name, productType, category, basePrice, discount, charges, finalPrice })
        const saveProduct = await product.save();

        res.json(saveProduct);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// // Route:3
// // update product using: PUT "/api/products/updateproduct"

router.put('/updateproduct/:id', [

    body('name', 'Enter a valid na,e(min length:3)').isLength({ min: 3 }),
    body('productType', 'Enter a valid type(min length:3)').isLength({ min: 3 }),
    body('category', 'Enter a valid catogary(min length:3)').isLength({ min: 3 }),
    body('basePrice', 'please enter price').isNumeric()], async (req, res) => {
        try {
            const { name, productType, category, basePrice } = req.body;
            // if there are errors,return Bad requist and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newProduct = {};
            if (name) { newProduct.name = name }
            if (productType) { newProduct.productType = productType }
            if (category) { newProduct.category = category };
            if (basePrice) { newProduct.basePrice = basePrice };

            // find the product to be updated and update it
            let product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send("Not Found")
            }

            let finalPrice, discount, charges
            switch (category) {
    
                case "Home Appliances":
                    discount = basePrice * 0.22;
                    charges = {
                        gst: (basePrice - discount) * 0.24,
                        delivery: 800.00
                    }
                    finalPrice = basePrice - discount + charges.gst + charges.delivery;
                    break;
    
    
                case "Electronics":
                    discount = basePrice * 0.15;
                    charges = {
                        gst: (basePrice - discount) * 0.18,
                        delivery: 350.00
                    }
                    finalPrice = basePrice - discount + charges.gst + charges.delivery;
                    break;
    
    
                case "Clothing":
                    discount = basePrice * 0.40;
                    charges = {
                        gst: (basePrice - discount) * 0.12,
                        delivery: 0.00
                    }
                    finalPrice = basePrice - discount + charges.gst + charges.delivery;
                    break;
    
                case "Furniture":
                    discount = basePrice * 0.10;
                    charges = {
                        gst: (basePrice - discount) * 0.18,
                        delivery: 300.00
                    }
                    finalPrice = basePrice - discount + charges.gst + charges.delivery;
                    break;
    
                default:
                    discount = basePrice * 0.15;
                    charges = {
                        gst: (basePrice - discount) * 0.18,
                        delivery: 00
                    }
                    finalPrice = basePrice - discount + charges.gst + charges.delivery;
                    
                    break;
            }
            newProduct.discount=discount
            newProduct.charges=charges
            newProduct.finalPrice=finalPrice

            product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });
            res.json({ product })


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
// Route:4
// delete product using: DELETE "/api/products/deleteProduct"

router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        // find the note to be delete and delete it
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Not Found")
        }

        product = await Product.findByIdAndDelete(req.params.id);
        res.json({ "Success": "product has been deleted", product: product });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router