CREATE TABLE users (
  user_id uuid DEFAULT gen_random_uuid(),
  username VARCHAR(30) UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);


CREATE TABLE summarized_articles (
  article_id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL REFERENCES users(username),
  article_url TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_article UNIQUE (username, summary)
);
