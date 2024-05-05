"use strict";

const express = require('express');
const jsonschema = require("jsonschema");
const router = express.Router();
const UserArticle = require('../models/userArticles');  // Verify the path to your UserArticle model
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../expressError'); // Ensure these are correctly imported
const userArticlesSchema = require("../schemas/userArticles.json"); // Import the schema for article validation

// POST endpoint to create a new summarized article
router.post('/create', async (req, res, next) => {
    console.log("Received article data:", req.body);

    try {
        // Validate the entire body with your schema first
        const validator = jsonschema.validate(req.body, userArticlesSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs.join(', '));  // Join errors into a single message
        }

        const { username, articles } = req.body;
        
        // Check if articles array is present and has at least one article
        if (!articles || !articles.length) {
            return res.status(400).json({ error: "No articles provided." });
        }

        // Handle the first article. Assume processing one article for simplicity.
        const { article_url, summary } = articles[0];

        if (!article_url || !summary) {
            return res.status(400).json({ error: "Article URL and summary are required for each article." });
        }

        // Check user authorization - Example check, assuming `req.user` is properly set from auth middleware
        if (req.user !== req.user) {
            throw new UnauthorizedError("You are not authorized to perform this action.");
        }

        // Create the article using the extracted data
        const article = await UserArticle.create(username, article_url, summary);
        res.status(201).json(article);
    } catch (error) {
        console.error("Error processing article creation:", error.message);  // Log the error message
        console.error("Stack Trace:", error.stack);  // Log the stack trace
        return next(error);
    }
});

// GET endpoint to retrieve all summarized articles for a specific user based on article ID
router.get('/:username/:articleId', async (req, res, next) => {
    try {
      const { username, articleId } = req.params;
      // Authorization check
      if (req.user.username !== username) {
        throw new UnauthorizedError("You are not authorized to view these articles.");
      }
      // Fetch the article using the article ID and username
      const articles = await UserArticle.getByArticleId(username, articleId);
      res.status(200).json({ articles });
    } catch (error) {
      console.error(error.message); // Log the error message
      console.error(error.stack); // Log the stack trace
      return next(error);
    }
});
  


module.exports = router;
