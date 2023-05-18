const express = require('express')
const path = require('path')
const app = express();

const fs = require('fs')
const request = require('request')
const{PORT} = require('./config.js')
const{API_KEY} = require('./config.js')




app.get('/ticker=:id', function(req, res){
    const ticker = req.params.id
    console.log(ticker);
    // const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+ticker+'&interval=5min&apikey='+API_KEY;

    const url = 'https://api.spoonacular.com/recipes/complexSearch?query='+ticker+'&apiKey='+API_KEY+'&includeNutrition=true.';

    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}

    }, (err, res, data)=>{
        if(err){
            console.log('Error :', err);
        }else if(res.statusCode !== 200){
            console.log('Status', res.statusCode);
        }else{
             console.log(data);
            const newData = JSON.stringify(data)
            fs.writeFile('frontend/static/js/views/'+ticker+ '.json', newData, err =>{
                if(err) throw err
                console.log('success');
            })
        }
    })
    res.end('Success')
}) 



app.use("/static", express.static(path.resolve(__dirname,'frontend','static')))

app.get("/*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
})


// app.listen(8080, ()=> console.log('server running...'))
app.listen(PORT || 4001, ()=> {
    console.log('Server running on port', PORT);
})