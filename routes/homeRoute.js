const express = require('express');
const HomeController = require('../controllers/homeController');

const router = express.Router();
let ctrl = new HomeController();
router.get("/", ctrl.homeView);
router.get("/contact", ctrl.contactView);
router.get("/courses", ctrl.coursesView);
router.get("/pricing", ctrl.pricingView);
router.get("/events", ctrl.eventsView);

module.exports = router;