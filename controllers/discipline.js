const Discipline = require('../models/model-discipline')

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await Discipline.find({})
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    findById: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Discipline.findById(id)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    save: async (req, res) => {
        const discipline = new Discipline(req.body)
        try {
            const data = await discipline.save()
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    update: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Discipline.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    remove: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Discipline.findByIdAndDelete(id)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    }

}