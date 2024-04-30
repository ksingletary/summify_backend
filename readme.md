## Summify

Summify is a full-stack web application designed to summarize any article using OpenAI. It utilizes a variety of modern technologies and APIs to provide users with a seamless experience.

## Deployment
The application is deployed on Render.

## Technologies/API Used

- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building the server-side of the application.
- Express: A minimal and flexible Node.js web application framework.
- Redux: A predictable state container for JavaScript apps.
- JWT (JSON Web Tokens): A compact, URL-safe means of representing claims to be transferred between two parties.
- RapidAPI Article Extractor and Summarizer: An external API used for extracting and summarizing articles.
- Postgres: A powerful open-source relational database system, to store and manage application data efficiently. 
  
## Project Structure

The project is structured into two main parts: 

- Client-Side: Built with React and Redux. Components are organized to represent different parts of the user interface.

- Server-Side: Built with Node.js, Express, and Prisma. Postgres and JWT are used for handling authentication and database needs.

## Features

- Users can create accounts and be authenticated via JWT in HTTP-only cookies.
- Users can submit an article URL to summarize it.
- Summarized articles are displayed to the user.
- Users can clear their summarized articles.

## User Flow

- Logging In or Sign Up: Users can log in or sign up using the provided buttons.
- Submitting an Article: Users can submit an article URL to summarize it.
- Viewing Summarized Articles: Summarized articles are displayed to the user.
- Clearing Articles: Users can clear their summarized articles.
- Users can also see their summarized articles in their profile

## External API

- RapidAPI is a platform that allows developers to discover, test, and connect to thousands of APIs provided by various developers and organizations. One of the APIs available is the Article Extractor and Summarizer API. This API provides developers with tools to extract relevant content from articles and then summarize it into concise and digestible formats. 

Database Schema
The database schema can be found here: 