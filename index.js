const express = require('express')
const cors = require('cors')

require('./drivers/connect-db')

const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(cors())

app.use('/discipline', require('./routes/discipline'))
app.use('/event', require('./routes/event'))
app.use('/affiliate', require('./routes/affiliate'))
app.use('/attendance', require('./routes/attendance'))

app.listen(app.get('PORT'), () => console.log(`Server listen at port ${app.get('PORT')}`))