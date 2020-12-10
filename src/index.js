const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10
const {newsArticleModel} = require("./connector")

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds/:limit/:offset", (req, res) => {
    let limit = parseInt(req.params.limit);
    let offset = parseInt(req.params.offset);
    if (isNaN(req.params.limit) || isNaN(req.params.offset)) {
      limit = 10;
      offset = 0;
    }
  
    newsArticleModel
      .find()
      .limit(limit)
      .skip(offset)
      .then((news) => res.json(news))
      .catch((err) => console.log(err));
  });
  

app.get('/newFeeds',(req,res)=>{
    const limit = 10;
    const offset = 0;
    newsArticleModel
    .find() //.sort({"publishedAt":-1})
    .limit(limit)
    .skip(offset)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send(err));
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;