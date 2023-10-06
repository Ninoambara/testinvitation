# API DOCUMENTASION

### List endpoint

- POST /users-register
- POST /users-login
- GET /users
- GET /jobs
- GET /jobs/:id

# User Registration

### POST /users-register

This endpoint is used to register a new user.

- Request Body:

```js
{
    "username":<String>
    "password":<String>
}
```

- Response 201 - created

```js
{
  message: "New User added";
}
```

- Response 400 - Bad Request

```js
{
  "message": "username cannot empty"
}
OR
{
  "message": "password cannot empty"
}
```

# User Login

### POST /users-login

This endpoint is used for user login.

- Request Body:

```js
{
    "username":<String>
    "password":<String>
}
```

- Response 200 - OK

```js
{
  "access_token": "your-access-token"
}
```

- Response 400 - Bad Request

```js
{
  "message": "username cannot empty"
}
OR
{
  "message": "password cannot empty"
}
```

# Get All User

### GET /users

- Response 200 - OK

```js
{
    "_id": "65200d789175765c43693b08",
    "username": "Nino"
}
```

# Get All Jobs

### GET /jobs

This endpoint is used to retrieve a list of jobs.

- Query Parameters:

  - description (string, optional): Job description.
  - location (string, optional): Job location.
  - full_time (boolean, optional): Full-time job (true/false).
  - page (number, optional): Page number for pagination

- Response 200 - OK

```js
[
  {
    id: "32bf67e5-4971-47ce-985c-44b6b3860cdb",
    type: "Full Time",
    url: "https://jobs.github.com/positions/32bf67e5-4971-47ce-985c-44b6b3860cdb",
    created_at: "Wed May 19 00:49:17 UTC 2021",
    company: "SweetRush",
    company_url: "https://www.sweetrush.com/",
    location: "Remote",
    title: "Senior Creative Front End Web Developer",
    description: "Example Desc",
    company_logo: "example url",
  },
];
```

# Get Job By ID

This endpoint is used to retrieve a job by its ID.

### GET /jobs/:id

- Request Params

```js
{
    id: <String>
}
```

- Response 200 - OK

```js
  {
    id: "32bf67e5-4971-47ce-985c-44b6b3860cdb",
    type: "Full Time",
    url: "https://jobs.github.com/positions/32bf67e5-4971-47ce-985c-44b6b3860cdb",
    created_at: "Wed May 19 00:49:17 UTC 2021",
    company: "SweetRush",
    company_url: "https://www.sweetrush.com/",
    location: "Remote",
    title: "Senior Creative Front End Web Developer",
    description: "Example Desc",
    company_logo: "example url",
  }
```

- Response 404 - Not found

```js
{
  message: "Jobs not found";
}
```

### Global Error

response 500 - Internal Server Error

```js
{
    "message": "Internal server error"
}
```

Response 401 - Unauthorized

```js
{
  "message": "Invalid token"
}
```
