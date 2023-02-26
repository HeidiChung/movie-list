// require packages used in the project
const express = require('express')
const movieList = require('./movies.json')
const app = express()
const port = 3000

//載入express-handlebars
const exphbs = require('express-handlebars')

//setting template engine
app.engine('handlebars' , exphbs({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index' , { movies : movieList.results})
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const movies = movieList.results.filter(movie => {return movie.title.toLowerCase().includes(keyword.toLowerCase())})
    res.render('index', { movies: movies, keyword: keyword})
})

app.get('/movies/:movie_id', (req, res)=>{
  // const movie = movieList.results.filter(movie => movie.id == req.params.movie_id)
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  // res.render('show' , { movie : movie[0] })
    res.render('show' , { movie : movie })
  })


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})