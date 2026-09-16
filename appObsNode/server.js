const express = require("express")
// STEP1
const client = require("prom-client")
const {heavyTask} = require("./util")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// STEP2
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({register: client.register})
console.log(client.register);

// STEP3
app.get("/metrics", async(req, res)=> {
    res.setHeader("Content-Type", client.register.contentType)
    const metrics = await client.register.metrics()
    res.send(metrics)
})

// // STEP4: Creating own Client
// const reqResTime = new client.Histogram

app.get("/", (req, res)=> {
    res.json({message: "Backend is running!"})
})

app.get("/slow", async(req, res) => {
    try {
        const timeTaken = await heavyTask()
        return res.json({
            status: "Success",
            message: `Task took ${timeTaken}ms`
        })
    } catch (error) {
        return res.status(300).json({
            status: "Error",
            error: error.message
        })
        
    }
})

app.listen(PORT, ()=> {
    console.log('Server runnig.');
})
