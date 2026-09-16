function getRandomValue(array){
    return array[Math.floor(Math.random() * array.length)]    
}

function heavyTask(){
    const ms = getRandomValue([100, 150, 200, 300, 600, 500, 1000, 1400, 2500])
    const shouldThrowError = getRandomValue([1,2,3,4,5,6,7,8]) === 8
    if(shouldThrowError){
        const randomError = getRandomValue(["DB Payment Failure", "DB server is Down", "ACCESS ISSUES", "Just not gonna let you have a go at it."])
        throw new Error(randomError)
    }
    return new Promise((resolve, reject)=> setTimeout(()=> resolve(ms)))

}

module.exports = {heavyTask}