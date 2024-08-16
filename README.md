# API-Rest Movies

![DATA](https://media.giphy.com/media/l41YvpiA9uMWw5AMU/giphy.gif?cid=ecf05e47xmwmy1297uwnaxoqadyy2ftwm0gi8cclq674j66d&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## HOW USE IT

### GET ALL MOVIES "/movies": https://api-rest-production-8e79.up.railway.app/movies

### GET MOVIE BY ID "/ID": https://api-rest-production-8e79.up.railway.app/movies/c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf

### GET MOVIE BY GENRE "/movies?genre=YOUR GENRE": https://api-rest-production-8e79.up.railway.app/movies?genre=action

### POST FULL MOVIE "/movie" plus info to add: https://api-rest-production-8e79.up.railway.app/movies + 
  {
    "title": "The Godfather",
    "year": 1972,
    "director": "Francis Ford Coppola",
    "duration": 175,
    "poster": "https://i.ebayimg.com/images/g/u-kAAOSw8w1joXP/",
    "genre": ["Crime", "Drama", "Action"],
    "rate": 9.2
  }
# PATCH PARCIAL INFO "/movie/ID" plus info to add: https://api-rest-production-8e79.up.railway.app/movies/c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf + 
                                                                                                                                                 {
                                                                                                                                                    "year": 1972,
                                                                                                                                                 }
