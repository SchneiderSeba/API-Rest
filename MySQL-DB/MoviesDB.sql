CREATE DATABASE MoviesDB;
-- usar
USE MoviesDB;

-- Creating the Table
CREATE TABLE Movies (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT,
    director VARCHAR(255),
    duration INT,
    poster TEXT,
    genre TEXT,
    rate DECIMAL(2, 1) UNSIGNED
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE Movies_genre (
	movie_id BINARY(16) REFERENCES Movies(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) VALUE
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Animation'),
('Biography'),
('Fantasy'),
('Mystery'),
('Thriller'),
('Romance');

INSERT INTO Movies (id, title, year, director, duration, poster, genre, rate) VALUES
((UUID_TO_BIN(UUID())), 'Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 'Action, Adventure, Sci-Fi', 8.8),
((UUID_TO_BIN(UUID())), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 'Drama', 9.3),
((UUID_TO_BIN(UUID())), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 'Action, Crime, Drama', 9.0),
((UUID_TO_BIN(UUID())), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 'Crime, Drama', 8.9),
((UUID_TO_BIN(UUID())), 'Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg', 'Drama, Romance', 8.8),
((UUID_TO_BIN(UUID())), 'Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 'Action, Adventure, Drama', 8.5),
((UUID_TO_BIN(UUID())), 'The Matrix', 1999, 'Lana Wachowski', 136, 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 'Action, Sci-Fi', 8.7),
((UUID_TO_BIN(UUID())), 'Interstellar', 2014, 'Christopher Nolan', 169, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 'Adventure, Drama, Sci-Fi', 8.6),
((UUID_TO_BIN(UUID())), 'The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg', 'Action, Adventure, Drama', 8.9),
((UUID_TO_BIN(UUID())), 'The Lion King', 1994, 'Roger Allers, Rob Minkoff', 88, 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg', 'Animation, Adventure, Drama', 8.5),
((UUID_TO_BIN(UUID())), 'Jurassic Park', 1993, 'Steven Spielberg', 127, 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024', 'Adventure, Sci-Fi', 8.1),
((UUID_TO_BIN(UUID())), 'Titanic', 1997, 'James Cameron', 195, 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png', 'Drama, Romance', 7.8),
((UUID_TO_BIN(UUID())), 'The Social Network', 2010, 'David Fincher', 120, 'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg', 'Biography, Drama', 7.7),
((UUID_TO_BIN(UUID())), 'Avatar', 2009, 'James Cameron', 162, 'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg', 'Action, Adventure, Fantasy', 7.8);

 INSERT INTO Movies_genre (movie_id, genre_id)
VALUES
    -- Inception (Action, Adventure, Sci-Fi)
    ((SELECT id FROM Movies WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
    ((SELECT id FROM Movies WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM Movies WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Adventure')),

    -- The Shawshank Redemption (Drama)
    ((SELECT id FROM Movies WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),

    -- The Dark Knight (Action, Crime, Drama)
    ((SELECT id FROM Movies WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM Movies WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Crime')),
    ((SELECT id FROM Movies WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Drama')),

    -- Pulp Fiction (Crime, Drama)
    ((SELECT id FROM Movies WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Crime')),
    ((SELECT id FROM Movies WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Drama')),

    -- Forrest Gump (Drama, Romance)
    ((SELECT id FROM Movies WHERE title = 'Forrest Gump'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM Movies WHERE title = 'Forrest Gump'), (SELECT id FROM genre WHERE name = 'Romance')),

    -- Gladiator (Action, Adventure, Drama)
    ((SELECT id FROM Movies WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM Movies WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM Movies WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Drama')),

    -- The Matrix (Action, Sci-Fi)
    ((SELECT id FROM Movies WHERE title = 'The Matrix'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM Movies WHERE title = 'The Matrix'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

    -- Interstellar (Adventure, Drama, Sci-Fi)
    ((SELECT id FROM Movies WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM Movies WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM Movies WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

    -- The Lord of the Rings: The Return of the King (Action, Adventure, Drama)
    ((SELECT id FROM Movies WHERE title = 'The Lord of the Rings: The Return of the King'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM Movies WHERE title = 'The Lord of the Rings: The Return of the King'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM Movies WHERE title = 'The Lord of the Rings: The Return of the King'), (SELECT id FROM genre WHERE name = 'Drama')),

    -- The Lion King (Adventure, Drama)
    ((SELECT id FROM Movies WHERE title = 'The Lion King'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM Movies WHERE title = 'The Lion King'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM Movies WHERE title = 'The Lion King'), (SELECT id FROM genre WHERE name = 'Animation')),

    -- Jurassic Park (Adventure, Sci-Fi)
    ((SELECT id FROM Movies WHERE title = 'Jurassic Park'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM Movies WHERE title = 'Jurassic Park'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

    -- Titanic (Drama, Romance)
    ((SELECT id FROM Movies WHERE title = 'Titanic'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM Movies WHERE title = 'Titanic'), (SELECT id FROM genre WHERE name = 'Romance')),

    -- The Social Network (Drama)
    ((SELECT id FROM Movies WHERE title = 'The Social Network'), (SELECT id FROM genre WHERE name = 'Drama')),

    -- Avatar (Action, Adventure, Fantasy)
    ((SELECT id FROM Movies WHERE title = 'Avatar'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM Movies WHERE title = 'Avatar'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM Movies WHERE title = 'Avatar'), (SELECT id FROM genre WHERE name = 'Fantasy'));
    
    -- The Prestige (Drama, Mystery, Thriller)
    /*((SELECT id FROM Movies WHERE title = 'The Prestige'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM Movies WHERE title = 'The Prestige'), (SELECT id FROM genre WHERE name = 'Mystery')),
    ((SELECT id FROM Movies WHERE title = 'The Prestige'), (SELECT id FROM genre WHERE name = 'Thriller'));*/
    
    SELECT title, year, director, duration, poster, genre, rate, BIN_TO_UUID(id) id FROM Movies;


