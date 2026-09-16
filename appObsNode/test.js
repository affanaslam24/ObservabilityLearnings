async function testing(){
    while(true){
        await fetch("http://localhost:3000/slow")
    }
}
testing()