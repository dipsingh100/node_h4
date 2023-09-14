const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500
    res.status(statusCode)
    switch (statusCode) {
        case 400:
            res.json({
                title: "Invalid Request",
                message: err.message,
                stackTrace: err.stack
            })
            break
        case 401: res.json({
            title: "Unauthorized",
            message: err.message,
            stackTrace: err.stack
        })
            break
        case 404:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            })
            break
        case 409:
            res.json({
                title: "Conflict",
                message: err.message,
                stackTrace: err.stack
            })
            break
        default: res.json({
            title: "Server Error",
            message: err.message,
            stackTrace: err.stack
        })
    }
}

module.exports = errHandler