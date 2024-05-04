const { Product } = require("../models");
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__filename, '../', '../', 'public', 'uploads');

function getProducts(req, res) {
    Product.findAll().then((product) => {
        res.send(product);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
}

function getProduct(req, res) {
    const productId = Number(req.params.id);
    Product.findOne({ where: { id: productId } }).then((product) => {
        if (product == null) {
            res.status(400).json({
               error: "Product does not exist."
            });
        } else {
            res.json(product);
        }
    });
}

function createProduct(req, res) {
    fileUpload(req.body.product_image, res);
    const prdData = {
        name: req.body.name,
        price: req.body.price,
        product_type: req.body.product_type,
        product_image: path.basename(req.body.product_image)
    };
    Product.create(prdData).then((product) => {
        res.json(product);
    })
    .catch((err) => {
        const filePath = uploadPath + '/' + path.basename(req.body.product_image);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        res.status(400).json(err.errors);
    })
}

async function updateProduct(req, res) {
    const productId = Number(req.params.id);
    fileUpload(req.body.product_image, res);
    try {
        const isUpdate = await Product.update({
            name: req.body.name,
            price: req.body.price,
            product_type: req.body.product_type,
            product_image: path.basename(req.body.product_image)
        }, { where: { id: productId } });
        if (isUpdate[0]) {
            res.send("Product Updated Successfully.");
        } else {
            res.status(400).send("Product Not Available.");
        }
    } catch (err) {
        res.status(400).json(err.errors);
    }
    
}

async function deleteProduct(req,res) {
    const productId = Number(req.params.id);
    try {
        const isDelete = await Product.destroy({
          where: {
            id: productId,
          },
        });
        if (isDelete) {
            res.send("Product Deleted Successfully.");
        } else {
            res.status(400).send("Product Not Deleted Successfully.");
        }

    } catch (err) {
        res.status(400).json(err.errors);
    }
}

function fileUpload(imgPath, res) {
    const fileName = path.basename(imgPath);
    const extensionName = path.extname(imgPath);
    const allowedExt = ['.jpg', '.jpeg', '.png'];
    if (imgPath && allowedExt.includes(extensionName)) {
        fs.readFile(imgPath, (err, data) => {
            if (err) {
                res.status(400).json(err);
            }
            fs.writeFile(uploadPath + '/' + fileName, Buffer.from(data, 'binary'), (err) => {
                if (err) {
                    res.status(400).json(err);
                }
            });
        });
    } else {
        res.status(400).json({
            error: "Please upload image file with extention jpg, jpeg, png."
        })
    }
    return '';
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}