const Attendance = require('../models/model-attendance')
const Affiliate = require('../models/model-affiliate')
const Event = require('../models/model-event')

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await Attendance.find({})
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    findById: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Attendance.findById(id)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    save: async (req, res) => {
        const { eventId, affiliateId, position } = req.body;
        try {
            const event = await Event.findById(eventId)
            const affiliate = await Affiliate.findById(affiliateId)
            if (event) {
                if (affiliate) {
                    const aux = {
                        position: position,
                        affiliate: affiliate,
                        event: event
                    }
                    const attendance = new Attendance(aux)
                    const result = await attendance.save()
                    affiliateObject = affiliate.toObject()
                    affiliateObject.attendance.push(attendance)
                    await affiliate.updateOne(affiliateObject)
                    eventObject = event.toObject()
                    eventObject.attendance.push(attendance)
                    await event.updateOne(eventObject)
                    return res.status(200).json({ "state": true, "data": result })
                } else {
                    return res.status(404).json({ "state": false, "error": "Affiliate not found" })
                }
            } else {
                console.log();
                return res.status(404).json({ "state": false, "error": "Event not found" })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ "state": false, "error": error })

        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { position } = req.body;
        try {
            const data = await Attendance.findByIdAndUpdate(id, { position: position }, { new: true });
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ "state": false, "error": error });
        }
    },

    remove: async (req, res) => {
        const { id } = req.params
        try {
            const attendance = await Attendance.findById(id)
            if (attendance) {
                const affiliateId = attendance.affiliate
                const eventId = attendance.event
                const data = await Attendance.findByIdAndDelete(id)
                if (data) {
                    const affiliate = await Affiliate.findById(affiliateId)
                    affiliate.attendance.pull(id)
                    await affiliate.save()
                    const event = await Event.findById(eventId)
                    event.attendance.pull(id)
                    await event.save()
                    return res.status(200).json({ "status": true, "data": data })
                } else {
                    return res.status(404).json({ "status": false, "error": "Asistencia no encontrada" })
                }
            } else {
                return res.status(404).json({ "status": false, "error": "Asistena no encontrada" })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ "status": false, "error": error })
        }
    }
}