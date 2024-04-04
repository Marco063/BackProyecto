const routes = require('express').Router()

const {
    findAll,
    findById,
    save,
    update,
    remove
} = require('../controllers/attendance')

routes.get("/", findAll)
routes.get("/:id", findById)
routes.post("/", save)
routes.put("/:id", update)
routes.delete("/:id", remove)

module.exports = routes