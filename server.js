const express = require('express')
const app = express()

app.use(express.static('./views'))
app.set('view engine', 'ejs')
app.get('/',async(req,res) => {
    let valid
    let caveat
    let link = req.query.link
    console.log(req.query.link)
    await fetch(`http://${req.query.link}`).then(response => {
        console.log("tried the link")
        valid ="Ok"
    }).catch(err => {
        console.log("Broken Link for https")
    })
    if (valid !== 'Ok') {
        console.log("Testing http")
        await fetch(`http://${req.query.link}`).then(response => {
            console.log("http Works!")
            valid = 'Ok'
            caveat = "This is a unsecure link!"
        }).catch(err => {
            console.log("Failed http")
            valid = "invalid"
        })
    }
    
    console.log("Listening on port 3500!")
    res.render('index',{link : link,valid : valid, caveat: caveat})
})


app.listen(3500)