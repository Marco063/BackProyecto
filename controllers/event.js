const Event = require('../models/model-event')
const Attendance = require('../models/model-attendance')
const Affiliate = require('../models/model-affiliate')

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await Event.find({})
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    findById: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Event.findById(id)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    save: async (req, res) => {
        const event = new Event(req.body)
        try {
            const data = await event.save()
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    update: async (req, res) => {
        const { id } = req.params

        try {
            const data = await Event.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    remove: async (req, res) => {
        const { id } = req.params

        try {
            const data = await Event.findByIdAndDelete(id)
            await Attendance.deleteMany({ event: id })
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    }
}