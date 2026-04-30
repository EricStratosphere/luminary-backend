# Luminary Backend API Documentation

## Overview
This repository implements the Luminary backend REST API using Express and MongoDB. The documentation below describes the currently available routes, request bodies, and response shapes for each resource.

## Base URL
Use the deployed host or local host where the app is running.

- Local: `http://localhost:<PORT>/api/v1`
- Deployed: `https://luminary-backend-chi.vercel.app/api/v1`

> Responses shown are representative of the current Mongoose models used by the application.

---

## Root
- `GET /`
  - Description: Health check endpoint.
  - Response:
    ```json
    "luminary backend active!"
    ```

---

## Authentication
### POST /api/v1/authenticate/signup
- Description: Create a new user account.
- Body:
  ```json
  {
    "username": "string",
    "email": "user@example.com",
    "password": "string",
    "is_admin": false,
    "is_writer": false
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "userObjectId",
      "username": "string",
      "email": "user@example.com",
      "is_admin": false,
      "is_writer": false,
      "createdAt": "2026-03-30T12:00:00.000Z",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    },
    "message": "User created successfully!"
  }
  ```

### POST /api/v1/authenticate/login
- Description: Authenticate a user.
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "string"
  }
  ```
- Response: typically includes auth token and user details.

### POST /api/v1/authenticate/refresh
- Description: Refresh authentication tokens.
- Body: depends on client implementation (refresh token).

### POST /api/v1/authenticate/signout
- Description: Sign out the current user.
- Body: typically includes token or session data.

---

## Authors
### GET /api/v1/authors
- Description: List all authors.

### GET /api/v1/authors/getbyid/:id
- Description: Retrieve a specific author by ID.

### GET /api/v1/authors/getbyname?q=<value>
- Description: Search authors by partial name.
- Example: `/api/v1/authors/getbyname?q=Jane`

### POST /api/v1/authors
- Description: Create a new author.
- Body:
  ```json
  {
    "name": "string",
    "author_description": "string",
    "author_img_url": "string"
  }
  ```

### PUT /api/v1/authors/update/:id
- Description: Update author details by ID.

### DELETE /api/v1/authors/delete/:id
- Description: Delete an author by ID.

---

## Books
### GET /api/v1/books
- Description: List all books.

### GET /api/v1/books/getbyid/:id
- Description: Retrieve a book by ID.

### GET /api/v1/books/getbyauthor/:id
- Description: Retrieve books by author ID.

### GET /api/v1/books/getbyname?q=<value>
- Description: Search books by title.
- Example: `/api/v1/books/getbyname?q=History`

### POST /api/v1/books
- Description: Create a new book.
- Body:
  ```json
  {
    "book_title": "string",
    "book_author_id": ["authorObjectId"],
    "date_published": "YYYY-MM-DD",
    "genre": ["Fiction"],
    "description": "string",
    "image_url": "string",
    "pdf_url": "string"
  }
  ```

### PUT /api/v1/books/update/:id
- Description: Update a book by ID.

### DELETE /api/v1/books/delete/:id
- Description: Delete a book by ID.

---

## Bookmarks
### GET /api/v1/bookmarks/book/:book_id/user/:user_id
- Description: Retrieve bookmarks for a specific book and user.

### GET /api/v1/bookmarks/getbyid/:id
- Description: Retrieve a bookmark by ID.

### POST /api/v1/bookmarks
- Description: Create a bookmark.
- Body:
  ```json
  {
    "user_id": "userObjectId",
    "book_id": "bookObjectId",
    "page": 123
  }
  ```

### PUT /api/v1/bookmarks/update/:id
- Description: Update a bookmark by ID.

### DELETE /api/v1/bookmarks/delete/:id
- Description: Delete a bookmark by ID.

---

## Collections
### GET /api/v1/collections/user/:user_id
- Description: Retrieve all collections for a user.

### GET /api/v1/collections/getbyid/:id
- Description: Retrieve a collection by ID.

### GET /api/v1/collections/getbyname?q=<value>
- Description: Search collections by name.
- Example: `/api/v1/collections/getbyname?q=favorites`

### POST /api/v1/collections
- Description: Create a new collection.
- Body:
  ```json
  {
    "name": "string",
    "user_id": "userObjectId",
    "public": true
  }
  ```

### PUT /api/v1/collections/update/:id
- Description: Update a collection by ID.

### DELETE /api/v1/collections/delete/:id
- Description: Delete a collection by ID.

---

## Collection EBooks
### GET /api/v1/collection-ebooks
- Description: List all collection-ebook relationships.

### GET /api/v1/collection-ebooks/getbycollectionid/:collectionId
- Description: Retrieve all ebooks linked to a specific collection.

### POST /api/v1/collection-ebooks
- Description: Add a book to a collection.
- Body:
  ```json
  {
    "collection_id": "collectionObjectId",
    "book_id": "bookObjectId"
  }
  ```

### PUT /api/v1/collection-ebooks/update/:id
- Description: Update a collection-ebook relationship by ID.

### DELETE /api/v1/collection-ebooks/delete/:id
- Description: Remove a book from a collection by ID.

---

## Comments
### GET /api/v1/comments
- Description: List all comments.

### GET /api/v1/comments/book/:bookId
- Description: Retrieve comments for a specific book.

### POST /api/v1/comments
- Description: Create a comment for a book.
- Body:
  ```json
  {
    "user_id": "userObjectId",
    "book_id": "bookObjectId",
    "like_count": 0,
    "rating": 4.5,
    "content": "string",
    "replying_to": "optionalCommentObjectId"
  }
  ```

### PUT /api/v1/comments/update/:id
- Description: Update a comment by ID.

### DELETE /api/v1/comments/delete/:id
- Description: Delete a comment by ID.

---

## Notes
### GET /api/v1/notes
- Description: List all notes.

### GET /api/v1/notes/getbyid/:id
- Description: Retrieve a note by ID.

### GET /api/v1/notes/book/:bookId/user/:userId
- Description: Retrieve notes for a specific book and user.

### POST /api/v1/notes
- Description: Create a new note.
- Body:
  ```json
  {
    "book_id": "bookObjectId",
    "user_id": "userObjectId",
    "noteContent": "string",
    "page": 12
  }
  ```

### PUT /api/v1/notes/update/:id
- Description: Update a note by ID.

### DELETE /api/v1/notes/delete/:id
- Description: Delete a note by ID.

---

## Users
### GET /api/v1/users
- Description: List all users.
- Note: This route is protected by `authenticateToken` middleware.

### GET /api/v1/users/getbyid/:id
- Description: Retrieve a user by ID.

### GET /api/v1/users/getbyname?q=<value>
- Description: Search users by username.
- Example: `/api/v1/users/getbyname?q=john`

### POST /api/v1/users
- Description: Create a user account.
- Body:
  ```json
  {
    "username": "string",
    "email": "user@example.com",
    "password": "string",
    "is_admin": false,
    "is_writer": false
  }
  ```

### PUT /api/v1/users/update/:id
- Description: Update a user by ID.

### DELETE /api/v1/users/delete/:id
- Description: Delete a user by ID.

---

## Gemini Chatbot
### POST /api/v1/gemini-chatbot/prompt-text
- Description: Send a text prompt to the Gemini chatbot service.
- Body: Depends on chat implementation.

### GET /api/v1/gemini-chatbot/conversation/:book_id/:user_id
- Description: Retrieve chatbot conversation context for a specific book and user.

---

## Data Model Summaries
### Author
- `name` (string, required)
- `author_img_url` (string)
- `author_description` (string)
- timestamps: `createdAt`, `updatedAt`

### Book
- `book_title` (string, required)
- `book_author_id` (ObjectId[], required)
- `date_published` (Date, required)
- `genre` (string[], required; limited enum values)
- `description` (string, required)
- `image_url` (string, required)
- `pdf_url` (string, required)

### Collection
- `name` (string, required)
- `user_id` (ObjectId, required)
- `copy_id` (ObjectId)
- `public` (boolean, default true)

### CollectionEBook
- `collection_id` (ObjectId, required)
- `book_id` (ObjectId, required)

### Bookmark
- `book_id` (ObjectId, required)
- `user_id` (ObjectId, required)
- `page` (number, required)

### Comment
- `user_id` (ObjectId, required)
- `book_id` (ObjectId, required)
- `like_count` (number)
- `rating` (number)
- `content` (string, required)
- `replying_to` (ObjectId)
- timestamps: `createdAt`, `updatedAt`

### Note
- `book_id` (ObjectId, required)
- `user_id` (ObjectId, required)
- `noteContent` (string, required)
- `page` (number, required)

### User
- `username` (string, required)
- `email` (string, required)
- `password` (string, required)
- `is_admin` (boolean)
- `is_writer` (boolean)
- timestamps: `createdAt`, `updatedAt`

---

## Notes
- All routes use JSON request and response payloads.
- Replace `:id`, `:book_id`, `:user_id`, `:collectionId`, and query parameters with actual MongoDB object IDs and values.
- `GET /api/v1/users` is protected by authentication middleware.
