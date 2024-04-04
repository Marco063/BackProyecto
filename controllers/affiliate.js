const Affiliate = require('../models/model-affiliate')
const Discipline = require('../models/model-discipline')
const Attendance = require('../models/model-attendance')
const Event = require('../models/model-event')

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await Affiliate.find({})
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    findById: async (req, res) => {
        const { id } = req.params
        try {
            const data = await Affiliate.findById(id)
            return res.status(200).json({ "state": true, "data": data })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error })
        }
    },

    save: async (req, res) => {
        const { id } = req.params;

        try {
            const discipline = await Discipline.findById(id)

            if (discipline) {
                try {
                    const affiliate = new Affiliate(req.body)
                    affiliate.discipline = discipline
                    const result = await affiliate.save()
                    disciplineObject = discipline.toObject()
                    disciplineObject.affiliate.push(affiliate)
                    await discipline.updateOne(disciplineObject)
                    return res.status(200).json({ "status": true, "data": result })
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({ "status": false, "error": error })
                }
            } else {
                return res.status(404).json({ "status": false, "error": "La Disciplina No Existe" })
            }
        } catch (error) {
            return res.status(500).json({ "status": false, "error": "El id está incompleto" })
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Affiliate.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    }
    ,

    remove: async (req, res) => {
        const { id } = req.params
        try {
            const affiliate = await Affiliate.findById(id)
            if (affiliate) {
                const disciplineId = affiliate.discipline
                const data = await Affiliate.findByIdAndDelete(id)
                if (data) {
                    const discipline = await Discipline.findById(disciplineId)
                    discipline.affiliate.pull(id)
                    await discipline.save()
                    await Attendance.deleteMany({ affiliate: id })
                    return res.status(200).json({ "status": true, "data": data })
                } else {
                    return res.status(404).json({ "status": false, "error": "Afiliado no encontrado" })
                }
            } else {
                return res.status(404).json({ "status": false, "error": "Afiliado no encontrado" })
            }
        } catch (error) {
            return res.status(500).json({ "status": false, "error": error })
        }
    }

}