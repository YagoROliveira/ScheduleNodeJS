const express = require('express')
const UserController = require('./app/controllers/UserController')
const routes = express.Router()
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const authMiddleware = require('./app/middleware/auth')
const guestMiddleware = require('./app/middleware/guest')

const SessionController = require('./app/controllers/SessionController')
// eslint-disable-next-line no-unused-vars
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')
const ScheduleController = require('./app/controllers/ScheduleController')

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/available/:provider', AvailableController.index)

routes.get('/app/schedule', ScheduleController.index)

module.exports = routes
