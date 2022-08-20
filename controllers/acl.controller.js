const express = require('express');
const router = express.Router();
const aclService = require('../services/acl.service');

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.get('/', getProducts);
router.delete('/', deleteProduct);
router.post('/', addProducts);
router.put('/', updateProducts);
router.patch('/', updateProducts);

function signupUser(req, res) {
    const userInfo = req.body;
    aclService.registerUser(userInfo).then(result => {
        return res.json(result);
    }).catch(err => {
        return res.json({ success: false, err });
    });
}

function loginUser(req, res) {
    const userInfo = req.body;
    aclService.loginUser(userInfo).then(result => {
        return res.json(result);
    }).catch(err => {
        return res.json({ success: false, err });
    });
}

function getProducts(req, res) {
    res.status(200).json({ success: true, message: "Products sent successfully" });
}

function deleteProduct(req, res) {
    res.status(200).json({ success: true, message: "Products deleted successfully" });
}

function addProducts(req, res) {
    res.status(201).json({ success: true, message: "Products added successfully" });
}

function updateProducts(req, res) {
    res.status(200).json({ success: true, message: "Products updated successfully" });
}

module.exports = router;