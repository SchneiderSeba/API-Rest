
# 🎬 API-Rest Movies

![Movies API](https://media.giphy.com/media/l41YvpiA9uMWw5AMU/giphy.gif?cid=ecf05e47xmwmy1297uwnaxoqadyy2ftwm0gi8cclq674j66d&ep=v1_gifs_search&rid=giphy.gif&ct=g)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Railway](https://img.shields.io/badge/Deployed_on-Railway-blueviolet?style=flat&logo=railway&logoColor=white)

A RESTful API for managing movies. This API allows you to **get** movies, **add** new movies, and **update** existing movies. Perfect for managing movie collections!

## 🌐 Live API

Base URL: [TryHere](https://moviesapi-rest.up.railway.app/movies)

---

## 🚀 Endpoints

### 🎥 GET All Movies

- **URL**: `/movies`
- **Method**: `GET`
- **Example**: [Get all movies](https://moviesapi-rest.up.railway.app/movies)


### 🎬 GET Movie by ID
- **URL**: `/movies/:id`
- **Method**: `GET`
- **Example**: [Get movie by ID](https://moviesapi-rest.up.railway.app/movies/11d77af6-622e-11ef-a0a8-a2aa5758d06e)


### 🎭 GET Movies by Genre
- **URL**: `/movies?genre=YOUR_GENRE`
- **Method**: `GET`
- **Example**: [Get movie by GENRE](https://moviesapi-rest.up.railway.app/movies?genre=action)


### ➕ POST Add a New Movie
- **URL**: `/movies`
- **Method**: `POST`
- **Example**: [Post new movies](https://moviesapi-rest.up.railway.app/movies) + the following payload:
```json
{
    "title": "The Godfather",
    "year": 1972,
    "director": "Francis Ford Coppola",
    "duration": 175,
    "poster": "https://i.ebayimg.com/images/g/u-kAAOSw8w1joXP/",
    "genre": ["Crime", "Drama", "Action"],
    "rate": 9.2
}
```


### ✏️ PATCH Update Partial Info
- **URL**: `/movies/:id`
- **Method**: `PATCH`
- **Example**:[Post new data](https://moviesapi-rest.up.railway.app/movies/11d77af6-622e-11ef-a0a8-a2aa5758d06e) Update specific movie info by sending the following payload:

```json

{
    "year": 1972
}
```


### 🛠️ How to Use It Locally
To run this project locally, follow these steps:

1. Clone the Repository

git clone https://github.com/usuario/API-Rest-Movies.git

2. Install Dependencies
Navigate to the project directory and install the required dependencies:

npm install

3. Start the Development Server
Run the following command to start the server:

npm run dev


### 📚 Technologies
This API is built with:

- **Node.js** - A JavaScript runtime for building fast and scalable network applications.
- **Express.js** - A minimal and flexible Node.js web application framework.
- **Railway** - Deployment platform for containerized apps.


### 📧 Contact
If you have any questions or suggestions, feel free to reach out:

Email: seba_19_sc@hotmail.com
GitHub: https://github.com/SchneiderSeba
