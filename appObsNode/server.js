const express = require("express")
const {heavyTask} = require("./util")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

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
