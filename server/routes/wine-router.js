const express = require('express')

const WineCtrl = require('../controllers/wine-controller')

const router = express.Router()

router.post('/wine', WineCtrl.createWine)
router.put('/wine/:id', WineCtrl.updateWine)
router.delete('/wine/:id', WineCtrl.deleteWine)
router.get('/wine/:id', WineCtrl.getWineById)
router.get('/wines', WineCtrl.getAllWines)
router.post('/addvivinowine', WineCtrl.addVivinoWine)

module.exports = router