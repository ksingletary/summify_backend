"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class UserArticle {
  // Method to create a summarized article for a user
  static async create(username, articleUrl, summary) {
    console.log("Inserting into DB:", { username, articleUrl, summary });
    const result = await db.query(
      `
      INSERT INTO summarized_articles
        (username, article_url, summary)
      VALUES ($1, $2, $3)
      RETURNING username, article_url, summary
      `,
      [username, articleUrl, summary]
    );

    const article = result.rows[0];

    return article;
  }

  // Method to retrieve all summarized articles for a user
  static async getAll(username) {
    const result = await db.query(
      `
      SELECT article_url, summary
      FROM summarized_articles
      WHERE username = $1
      `,
      [username]
    );

    const articles = result.rows;

    return articles;
  }

  // Method to retrieve articles by username and article ID
  static async getByArticleId(username, articleId) {
    const result = await db.query(
      `SELECT article_url, summary FROM summarized_articles WHERE username = $1 AND id = $2`,
      [username, articleId]
    );
    const articles = result.rows;
    return articles;
  }

  // Method to delete a summarized article for a user
  static async delete(username, summary) {
    const result = await db.query(
      `
      DELETE FROM summarized_articles
      WHERE username = $1 AND summary = $2
      RETURNING username, summary
      `,
      [username, summary]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError(`Summarized article not found for ${username}`);
    }
  }
}

module.exports = UserArticle;
