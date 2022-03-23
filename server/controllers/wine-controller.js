const Wine = require('../models/wine-model');
const { getVivinoWine } = require('../services/vivino_scraper');

createWine = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a wine',
        })
    }

    const wine = new Wine(body)

    if (!wine) {
        return res.status(400).json({ success: false, error: err })
    }

    await wine
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: wine._id,
                message: 'Wine created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Wine not created!',
            })
        })
}

addVivinoWine = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Vivino URL',
        })
    }

    const url = req.body.url
    console.log(url)

    const body = await getVivinoWine(url);
    const wine = new Wine(body);
    console.log(wine);

    if (!wine) {
        return res.status(400).json({ success: false, error: err })
    }

    await wine
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: wine._id,
                message: 'Wine created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Wine not created!',
            })
        })
}

updateWine = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Wine.findOne({ _id: req.params.id }, (err, wine) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Wine not found!',
            })
        }
        wine.winery = body.winery
        wine.wine_name = body.wine_name
        wine.vintage = body.vintage
        wine.region = body.region
        wine.country = body.country
        wine.vivino_rating = body.vivino_rating
        wine.user_rating = body.user_rating
        wine.comments = body.comments
        wine.date_added = body.date_added
        wine.price = body.price
        wine.alcohol_content = body.alcohol_content
        wine.grapes = body.grapes
        wine.wine_style = body.wine_style
        wine.inventory_count = body.inventory_count
        
        wine
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: wine._id,
                    message: 'Wine updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Wine not updated!',
                })
            })
    })
}

deleteWine = async (req, res) => {
    await Wine.findOneAndDelete({ _id: req.params.id }, (err, wine) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!wine) {
            return res
                .status(404)
                .json({ success: false, error: `Wine not found` })
        }

        return res.status(200).json({ success: true, data: wine })
    }).catch(err => console.log(err))
}

getWineById = async (req, res) => {
    await Wine.findOne({ _id: req.params.id }, (err, wine) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!wine) {
            return res
                .status(404)
                .json({ success: false, error: `Wine not found` })
        }
        return res.status(200).json({ success: true, data: wine })
    }).catch(err => console.log(err))
}

getAllWines = async (req, res) => {
    await Wine.find({}, (err, wines) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!wines.length) {
            return res
                .status(404)
                .json({ success: false, error: `Wine not found` })
        }
        return res.status(200).json({ success: true, data: wines })
    }).clone().catch(err => console.log(err))
}

module.exports = {
    createWine,
    addVivinoWine,
    updateWine,
    deleteWine,
    getAllWines,
    getWineById,
}