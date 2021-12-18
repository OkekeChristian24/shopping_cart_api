// Import products services
const {
    createProduct,
    getProductById,
    updateProduct,
    updateProductQty,
    deleteProduct
} = require('./products.service');

module.exports = {
    createProduct: (req, res) => {
        const data = req.body;
        createProduct(data, (err, results) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!results){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Product created successfully'
            });
        });
    },
    getProductById: (req, res) => {
        const productId = req.params.id;
        getProductById(productId, (err, results) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!results){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results[0]
            });
        });
    },
    updateProduct: (req, res) => {
        const productId = req.params.id;
        const data = req.body;
        updateProduct(productId, data, (err, results) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!results){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Product updated successfully'
            });
        });
    },
    updateProductQty: (req, res) => {
        const productId = req.params.id;
        const data = req.body;
        updateProductQty(productId, data, (err, results) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!results){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Product quantity updated successfully'
            });
        });
    },
    deleteProduct: (req, res) => {
        const productId = req.params.id;
        deleteProduct(productId, (err, results) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!results){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Product deleted successfully'
            });
        });
    }
};