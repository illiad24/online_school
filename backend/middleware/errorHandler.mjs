const errorHandler = (app) => {
    app.use((req, res, next) => {
        const err = new Error('Not Found')
        err.status = 404
        next(err)
    })

    app.use((err, req, res, next) => {
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        res.status(err.status || 500)

    })
}

export default errorHandler
