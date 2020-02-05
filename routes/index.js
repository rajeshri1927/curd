
const express = require("express");
const session = require('express-session');
const router = express.Router();

const { check, validationResult } = require('express-validator');
router.post('/submit',
    [
        check('product_name')
            .not()
            .isEmpty()
            .withMessage('Product name is required'),
    ], (req, res) => {
        var errors = validationResult(req).array();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/');
        } else {
            req.session.success = true;
            res.redirect('/');
        }
    });

router.get('/', function (req, res) {
    res.render('./product_view', {
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
});


module.exports = router;