# Luminary Backend API Routes

Base URL: `https://luminary-backend-chi.vercel.app/api/v1`

> Note: In the current implementation, route handlers return stubbed JSON objects with `success` and `message` only. The examples below show the expected response shapes based on the current Mongoose models.

---

## Root

- `GET /`
  - Description: Health check for the backend.
  - Response:
    ```json
    "luminary backend active!"
    ```

---

## Authors

### GET /api/v1/authors
- Description: List all authors available in the app.
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "authorObjectId",
        "name": "Author Name",
        "author_img_url" : "https://someauthorimglink.com",
        "author_description": "Short bio or description",
        "createdAt": "2026-03-30T12:00:00.000Z",
        "updatedAt": "2026-03-30T12:00:00.000Z"
      }
    ],
    "message": "Fetched all authors!"
  }
  ```

### GET /api/v1/authors/getbyid/:id
- Description: Retrieve a specific author by `id`.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "authorObjectId",
      "name": "Author Name",
      "author_img_url" : "https://someauthorimglink.com",
      "author_description": "Short bio or description",
      "createdAt": "2026-03-30T12:00:00.000Z",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    },
    "message": "Fetched author by id!"
  }
  ```

### GET /api/v1/authors/search?name=<value>
- Description: Search for authors by partial name (case-insensitive), maps to `/api/v1/authors/getbyname/:search_text`.
- Example URL: `/api/v1/authors/getbyname/John`
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "authorObjectId",
        "name": "John Doe",
        "author_img_url" : "https://someauthorimglink.com",
        "author_description": "Short bio or description",
        "createdAt": "2026-03-30T12:00:00.000Z",
        "updatedAt": "2026-03-30T12:00:00.000Z"
      }
    ]
  }
  ```

### POST /api/v1/authors
- Description: Create a new author record.
- Body:
  ```json
  {
    "name": "string",
    "author_description": "string"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "authorObjectId",
      "name": "string",
      "author_description": "string",
      "author_img_url" : "https://someauthorimglink.com",
      "createdAt": "2026-03-30T12:00:00.000Z",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    },
    "message": "Created new author!"
  }
  ```

### PUT /api/v1/authors/:id
- Description: Update an existing author by `id`.
- Body: same as POST.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "authorObjectId",
      "name": "string",
      "author_description": "string",
      "author_img_url" : "https://someauthorimglink.com",
      "createdAt": "2026-03-30T12:00:00.000Z",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    },
    "message": "Updated author!"
  }
  ```

### DELETE /api/v1/authors/:id
- Description: Delete an author by `id`.
- Response:
  ```json
  {
    "success": true,
    "message": "Deleted author!"
  }
  ```

---

## Books

### GET /api/v1/books
- Description: List all books available for streaming.
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "bookObjectId",
        "book_title": "Title",
        "book_author_id": ["authorObjectId"],
        "date_published": "2025-01-01T00:00:00.000Z",
        "genre": ["Fiction"],
        "description": "Book description",
        "image_url": "https://example.com/image.jpg",
        "pdf_url": "https://example.com/book.pdf"
      }
    ],
    "message": "Fetched all books!"
  }
  ```

### GET /api/v1/books/getbyid/:id
- Description: Retrieve a specific book by `id`.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "bookObjectId",
      "book_title": "Title",
      "book_author_id": ["authorObjectId"],
      "date_published": "2025-01-01T00:00:00.000Z",
      "genre": ["Fiction"],
      "description": "Book description",
      "image_url": "https://example.com/image.jpg",
      "pdf_url": "https://example.com/book.pdf"
    },
    "message": "Fetched book by id!"
  }
  ```

### GET /api/v1/books/getbyauthor/:id
- Description: Retrieve all books by a given author ID.
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "bookObjectId",
        "book_title": "Title",
        "book_author_id": ["authorObjectId"],
        "date_published": "2025-01-01T00:00:00.000Z",
        "genre": ["Fiction"],
        "description": "Book description",
        "image_url": "https://example.com/image.jpg",
        "pdf_url": "https://example.com/book.pdf"
      }
    ]
  }
  ```

### GET /api/v1/books/search?title=<value>
- Description: Search for books by partial title (case-insensitive), maps to `/api/v1/books/getbyname/:search_text`.
- Example URL: `/api/v1/books/getbyname/History`
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "bookObjectId",
        "book_title": "History of Everything",
        "book_author_id": ["authorObjectId"],
        "date_published": "2025-01-01T00:00:00.000Z",
        "genre": ["Fiction"],
        "description": "Book description",
        "image_url": "https://example.com/image.jpg",
        "pdf_url": "https://example.com/book.pdf"
      }
    ]
  }
  ```

### POST /api/v1/books
- Description: Create a new book record for the library.
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
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "bookObjectId",
      "book_title": "string",
      "book_author_id": ["authorObjectId"],
      "date_published": "YYYY-MM-DDT00:00:00.000Z",
      "genre": ["Fiction"],
      "description": "string",
      "image_url": "string",
      "pdf_url": "string"
    },
    "message": "Created new book!"
  }
  ```

### PUT /api/v1/books/:id
- Description: Update an existing book by `id`.
- Body: same as POST.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "bookObjectId",
      "book_title": "string",
      "book_author_id": ["authorObjectId"],
      "date_published": "YYYY-MM-DDT00:00:00.000Z",
      "genre": ["Fiction"],
      "description": "string",
      "image_url": "string",
      "pdf_url": "string"
    },
    "message": "Updated book!"
  }
  ```

### DELETE /api/v1/books/:id
- Description: Delete a book by `id`.
- Response:
  ```json
  {
    "success": true,
    "message": "Deleted book!"
  }
  ```

---

## Bookmarks

### GET /api/v1/bookmarks/book/:book_id/user/:user_id
- Description: Retrieve a bookmark for a specific book and user.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "bookmarkObjectId",
      "book_id": "bookObjectId",
      "user_id": "userObjectId",
      "page": 123
    }
  }
  ```

### GET /api/v1/bookmarks/:id
- Description: Retrieve a specific bookmark by `id`.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "bookmarkObjectId",
      "book_id": "bookObjectId",
      "user_id": "userObjectId",
      "page": 123
    },
    "message": "Fetched bookmark by id!"
  }
  ```

### POST /api/v1/bookmarks
- Description: Create a bookmark to save a book position for a user.
- Body:
  ```json
  {
    "user_id": "userObjectId",
    "book_id": "bookObjectId",
    "page": 123
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "bookmarkObjectId",
      "book_id": "bookObjectId",
      "user_id": "userObjectId",
      "page": 123
    },
    "message": "Created new bookmark!"
  }
  ```

### PUT /api/v1/bookmarks/:id
- Description: Update an existing bookmark by `id`.
- Body: same as POST.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "bookmarkObjectId",
      "book_id": "bookObjectId",
      "user_id": "userObjectId",
      "page": 123
    },
    "message": "Updated bookmark!"
  }
  ```

### DELETE /api/v1/bookmarks/:id
- Description: Delete a bookmark by `id`.
- Response:
  ```json
  {
    "success": true,
    "message": "Deleted bookmark!"
  }
  ```

---

## Collections

### GET /api/v1/collections/user/:user_id
- Description: Retrieve all collections for a specific user.
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "collectionObjectId",
        "name": "Collection Name",
        "user_id": "userObjectId"
      }
    ]
  }
  ```

### GET /api/v1/collections/getbyid/:id
- Description: Retrieve a specific playlist by `id`.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "collectionObjectId",
      "name": "Collection Name",
      "user_id": "userObjectId"
    },
    "message": "Fetched collection by id!"
  }
  ```

### GET /api/v1/collections/getbyname/:search_text
- Description: Search collections by partial name (case-insensitive).
- Example URL: `/api/v1/collections/getbyname/favorites`
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "collectionObjectId",
        "name": "Favorites",
        "user_id": "userObjectId"
      }
    ]
  }
  ```

### POST /api/v1/collections
- Description: Create a new book playlist.
- Body:
  ```json
  {
    "name": "string",
    "user_id": "userObjectId"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "collectionObjectId",
      "name": "string",
      "user_id": "userObjectId"
    },
    "message": "Created new collection!"
  }
  ```

### PUT /api/v1/collections/:id
- Description: Update an existing playlist by `id`.
- Body: same as POST.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "collectionObjectId",
      "name": "string",
      "user_id": "userObjectId"
    },
    "message": "Updated collection!"
  }
  ```

### DELETE /api/v1/collections/:id
- Description: Delete a playlist by `id`.
- Response:
  ```json
  {
    "success": true,
    "message": "Deleted collection!"
  }
  ```

---

## Collection Books

- Note: The collection-book relationship stores `collection_id` and `book_id` so the app can fetch all books in a playlist by matching a collection id.

### GET /api/v1/collection-books
- Description: List all book-to-playlist links in the collection-book join table.
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "collectionBookObjectId",
        "collection_id": "collectionObjectId",
        "book_id": "bookObjectId"
      }
    ],
    "message": "Fetched all collection books!"
  }
  ```

### GET /api/v1/collection-books/:id
- Description: Retrieve a specific book-to-playlist link by `id`.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "collectionBookObjectId",
      "collection_id": "collectionObjectId",
      "book_id": "bookObjectId"
    },
    "message": "Fetched collection book by id!"
  }
  ```

### POST /api/v1/collection-books
- Description: Link a book to a playlist by creating a collection-book entry.
- Body:
  ```json
  {
    "collection_id": "collectionObjectId",
    "book_id": "bookObjectId"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "collectionBookObjectId",
      "collection_id": "collectionObjectId",
      "book_id": "bookObjectId"
    },
    "message": "Created new collection book!"
  }
  ```

### PUT /api/v1/collection-books/:id
- Description: Update a book-to-playlist link by `id`.
- Body: same as POST.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "collectionBookObjectId",
      "collection_id": "collectionObjectId",
      "book_id": "bookObjectId"
    },
    "message": "Updated collection book!"
  }
  ```

### DELETE /api/v1/collection-books/:id
- Description: Remove a book from a playlist by `id`.
- Response:
  ```json
  {
    "success": true,
    "message": "Deleted collection book!"
  }
  ```

---

## Comments

### GET /api/v1/comments
- Description: List all comments and ratings left on books.
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "commentObjectId",
        "user_id": "userObjectId",
        "book_id": "bookObjectId",
        "like_count": 0,
        "rating": 4.5,
        "content": "This is a comment.",
        "replying_to": null,
        "createdAt": "2026-03-30T12:00:00.000Z",
        "updatedAt": "2026-03-30T12:00:00.000Z"
      }
    ],
    "message": "Fetched all comments!"
  }
  ```

### GET /api/v1/comments/:id
- Description: Retrieve a specific comment by `id`.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "commentObjectId",
      "user_id": "userObjectId",
      "book_id": "bookObjectId",
      "like_count": 0,
      "rating": 4.5,
      "content": "This is a comment.",
      "replying_to": null,
      "createdAt": "2026-03-30T12:00:00.000Z",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    },
    "message": "Fetched comment by id!"
  }
  ```

### POST /api/v1/comments
- Description: Create a new comment or rating for a book.
- Body:
  ```json
  {
    "user_id": "userObjectId",
    "book_id": "bookObjectId",
    "like_count": 0,
    "rating": 4.5,
    "content": "This is a comment.",
    "replying_to": "optionalCommentObjectId"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "commentObjectId",
      "user_id": "userObjectId",
      "book_id": "bookObjectId",
      "like_count": 0,
      "rating": 4.5,
      "content": "This is a comment.",
      "replying_to": null,
      "createdAt": "2026-03-30T12:00:00.000Z",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    },
    "message": "Created new comment!"
  }
  ```

### PUT /api/v1/comments/:id
- Description: Update an existing comment by `id`.
- Body: same as POST.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "commentObjectId",
      "user_id": "userObjectId",
      "book_id": "bookObjectId",
      "like_count": 0,
      "rating": 4.5,
      "content": "This is a comment.",
      "replying_to": null,
      "createdAt": "2026-03-30T12:00:00.000Z",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    },
    "message": "Updated comment!"
  }
  ```

### DELETE /api/v1/comments/:id
- Description: Delete a comment by `id`.
- Response:
  ```json
  {
    "success": true,
    "message": "Deleted comment!"
  }
  ```

---

## Notes

### GET /api/v1/notes
- Description: List all notes created by users for books.
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "noteObjectId",
        "book_id": "bookObjectId",
        "user_id": "userObjectId",
        "noteContent": "string",
        "page": 12
      }
    ],
    "message": "Fetched all notes!"
  }
  ```

### GET /api/v1/notes/:id
- Description: Retrieve a specific note by `id`.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "noteObjectId",
      "book_id": "bookObjectId",
      "user_id": "userObjectId",
      "noteContent": "string",
      "page": 12
    },
    "message": "Fetched note by id!"
  }
  ```

### POST /api/v1/notes
- Description: Create a new note for a book and page.
- Body:
  ```json
  {
    "book_id": "bookObjectId",
    "user_id": "userObjectId",
    "noteContent": "string",
    "page": 12
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "noteObjectId",
      "book_id": "bookObjectId",
      "user_id": "userObjectId",
      "noteContent": "string",
      "page": 12
    },
    "message": "Created new note!"
  }
  ```

### PUT /api/v1/notes/:id
- Description: Update an existing note by `id`.
- Body: same as POST.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "noteObjectId",
      "book_id": "bookObjectId",
      "user_id": "userObjectId",
      "noteContent": "string",
      "page": 12
    },
    "message": "Updated note!"
  }
  ```

### DELETE /api/v1/notes/:id
- Description: Delete a note by `id`.
- Response:
  ```json
  {
    "success": true,
    "message": "Deleted note!"
  }
  ```

---

## Users

### GET /api/v1/users
- Description: List all user accounts.
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "userObjectId",
        "username": "username",
        "email": "user@example.com",
        "is_admin": false,
        "is_writer": false,
        "createdAt": "2026-03-30T12:00:00.000Z",
        "updatedAt": "2026-03-30T12:00:00.000Z"
      }
    ],
    "message": "Fetched all users!"
  }
  ```

### GET /api/v1/users/getbyid/:id
- Description: Retrieve a specific user by `id`.
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "userObjectId",
      "username": "username",
      "email": "user@example.com",
      "is_admin": false,
      "is_writer": false,
      "createdAt": "2026-03-30T12:00:00.000Z",
      "updatedAt": "2026-03-30T12:00:00.000Z"
    },
    "message": "Fetched user by id!"
  }
  ```

### GET /api/v1/users/search?username=<value>
- Description: Search for users by partial username (case-insensitive), maps to `/api/v1/users/getbyname/:search_text`.
- Example URL: `/api/v1/users/getbyname/alice`
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "userObjectId",
        "username": "alice",
        "email": "alice@example.com",
        "is_admin": false,
        "is_writer": false,
        "createdAt": "2026-03-30T12:00:00.000Z",
        "updatedAt": "2026-03-30T12:00:00.000Z"
      }
    ]
  }
  ```

### POST /api/v1/users
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
    "message": "Created new user!"
  }
  ```

### PUT /api/v1/users/:id
- Description: Update a user account by `id`.
- Body: same as POST.
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
    "message": "Updated user!"
  }
  ```

### DELETE /api/v1/users/:id
- Description: Delete a user account by `id`.
- Response:
  ```json
  {
    "success": true,
    "message": "Deleted user!"
  }
  ```
