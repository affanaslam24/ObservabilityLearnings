const express = require("express")
// STEP1
const client = require("prom-client")
const {heavyTask} = require("./util")

// FOR STEP4
const responseTime = require("response-time");

// STEP6 Add LOKI
const { createLogger, format, transports } = require("winston");
const LokiTransport = require("winston-loki");



const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// STEP2
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({register: client.register})


// STEP3
app.get("/metrics", async(req, res)=> {
    res.setHeader("Content-Type", client.register.contentType)
    const metrics = await client.register.metrics()
    res.send(metrics)
})

// STEP4: Creating own Client
const reqResTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "THis tells us how much time is taken by req and res",
    labelNames: ["method", "route", "status_code"],
    buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000]
})
// add the custom metric to the middleware of the app
app.use(
    responseTime((req, res, time) => {
        totalReqCounter.inc()
        reqResTime.labels({
            method: req.method,
            route: req.url,
            status_code: res.statusCode
        })
        .observe(time);
    })
)

// STEP5: one more Custom LAbel
const totalReqCounter = new client.Counter({
    name: 'total_req',
    help: 'tells total number of req'
})


// ----- LOKI ADDITION ------
const options = {
    transports: [
        new LokiTransport({
            labels: {
                // because we need a wau to look at this log
                appName: 'express node'
            },
            host: "http://127.0.0.1:3100"
        })
    ]
}

const logger = createLogger(options)


// -- * --


app.get("/", (req, res)=> {
    logger.info('Req Req Req')
    res.json({message: "Backend is running!"})
})

app.get("/slow", async(req, res) => {
    try {
        logger.info('Req Req Bay bay')
        const timeTaken = await heavyTask()
        return res.json({
            status: "Success",
            message: `Task took ${timeTaken}ms`
        })
    } catch (error) {
        logger.error(error.message)
        return res.status(300).json({
            status: "Error",
            error: error.message
        })
        
    }
})

app.listen(PORT, ()=> {
    console.log('Server runnig.');
})
