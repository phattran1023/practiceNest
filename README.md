<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  
# API Documentation

## Overview
This document provides information about the API endpoints for the Post Service.

## Endpoints

### GET /post/search
Search for posts.

**Parameters:**

- `searchKeyWord`: The keyword to search for in posts.
- `sortOrder`: The order to sort the results (asc/desc).
- `page`: The page number.
- `sortColumn`: The column to sort.
- `limit`: The number of results per page.

**Response:**

```json
{
  "_metadata": {
    "page": 1,
    "per_page": 7,
    "page_count": 7,
    "total_results": 18,
    "Links": [
      {
        "current": "/post/search?searchKeyWord=po&sortOrder=asc&page=1&sortColumn=id&limit=7"
      },
      {
        "first": "/post/search?searchKeyWord=po&sortOrder=asc&page=1&sortColumn=id&limit=7"
      },
      {
        "previous": "/post/search?searchKeyWord=po&sortOrder=asc&page=0&sortColumn=id&limit=7"
      },
      {
        "next": "/post/search?searchKeyWord=po&sortOrder=asc&page=2&sortColumn=id&limit=7"
      },
      {
        "last": "/post/search?searchKeyWord=po&sortOrder=asc&page=3&sortColumn=id&limit=7"
      }
    ]
  },
  "records": [
    {
      "id": 3,
      "title": "Post 3",
      "createdAt": "2024-06-14T04:36:59.000Z",
      "updatedAt": "2024-06-14T04:36:59.000Z",
      "uri": "/post/3"
    },
    {
      "id": 4,
      "title": "Post 4",
      "createdAt": "2024-06-14T04:36:59.000Z",
      "updatedAt": "2024-06-14T04:36:59.000Z",
      "uri": "/post/4"
    },
    {
      "id": 5,
      "title": "Post 5",
      "createdAt": "2024-06-14T04:36:59.000Z",
      "updatedAt": "2024-06-14T04:36:59.000Z",
      "uri": "/post/5"
    },
    {
      "id": 6,
      "title": "Post 6",
      "createdAt": "2024-06-14T04:36:59.000Z",
      "updatedAt": "2024-06-14T04:36:59.000Z",
      "uri": "/post/6"
    },
    {
      "id": 7,
      "title": "Post 7",
      "createdAt": "2024-06-14T04:36:59.000Z",
      "updatedAt": "2024-06-14T04:36:59.000Z",
      "uri": "/post/7"
    },
    {
      "id": 8,
      "title": "Post 8",
      "createdAt": "2024-06-14T04:36:59.000Z",
      "updatedAt": "2024-06-14T04:36:59.000Z",
      "uri": "/post/8"
    },
    {
      "id": 9,
      "title": "Post 9",
      "createdAt": "2024-06-14T04:36:59.000Z",
      "updatedAt": "2024-06-14T04:36:59.000Z",
      "uri": "/post/9"
    }
  ]
}
```

---

### POST /post - http://localhost:3000/post
Create a new post.

**Request Body:**

- `title`: The title of the post.
- `content`: The content of the post.
```json
{
  "title": "Hello",
  "content": "hmmmm"
}
```

**Response:**

```json
{
    "title": "Hello",
    "content": "hmmmm",
    "id": 23,
    "createdAt": "2024-06-14T07:49:36.218Z",
    "updatedAt": "2024-06-14T07:49:36.218Z"
}
```

---

### GET /post - http://localhost:3000/post?page=1&limit=4
Get all posts.

**Parameters:**

- `page`: The page number.
- `limit`: The number of results per page.

**Response:**

```json
{
    "_metadata": {
        "page": "1",
        "per_page": "4",
        "page_count": 4,
        "total_count": 22,
        "Links": [
            {
                "current": "/post?page=1&limit=4"
            },
            {
                "first": "/post?page=1&limit=4"
            },
            {
                "previous": "/post?page=0&limit=4"
            },
            {
                "next": "/post?page=2&limit=4"
            },
            {
                "last": "/post?page=6&limit=4"
            }
        ]
    },
    "records": [
        {
            "id": 23,
            "title": "Hello",
            "createdAt": "2024-06-14T07:49:36.218Z",
            "updatedAt": "2024-06-14T07:49:36.218Z",
            "uri": "/post/23"
        },
        {
            "id": 22,
            "title": "Hello",
            "createdAt": "2024-06-14T07:48:59.881Z",
            "updatedAt": "2024-06-14T07:48:59.881Z",
            "uri": "/post/22"
        },
        {
            "id": 21,
            "title": "Hello",
            "createdAt": "2024-06-14T04:55:14.688Z",
            "updatedAt": "2024-06-14T04:55:14.688Z",
            "uri": "/post/21"
        },
        {
            "id": 2,
            "title": "Hello update",
            "createdAt": "2024-06-14T04:36:59.000Z",
            "updatedAt": "2024-06-14T05:57:55.000Z",
            "uri": "/post/2"
        }
    ]
}
```

---

### GET /post/:id - http://localhost:3000/post/2
Get a specific post.

**Parameters:**

- `id`: The ID of the post.

**Response:**

```json
{
    "id": 2,
    "title": "Hello update",
    "content": "This is content for post",
    "createdAt": "2024-06-14T04:36:59.000Z",
    "updatedAt": "2024-06-14T05:56:38.000Z"
}
```

---

### PATCH /post/:id - http://localhost:3000/post/2
Update a specific post.

**Parameters:**

- `id`: The ID of the post.

**Request Body:**

- `title`: The new title of the post.
- `content`: The new content of the post.

**Response:**

```json
{
    "id": 1,
    "title": "Hello update",
    "content": "This is content for post",
    "createdAt": "2024-06-14T04:36:59.000Z",
    "updatedAt": "2024-06-14T05:59:05.000Z"
}
```

---

### DELETE /post/:id - http://localhost:3000/post/1
Delete a specific post.

**Parameters:**

- `id`: The ID of the post.

**Response:**
```json
{
  "message": "Post deleted"
}
```
Confirmation of the deleted post.