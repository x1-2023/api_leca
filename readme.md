# Introduction

## Set Cookie
Set the cookie value for subsequent API requests.


```
Endpoint: /api/set_cookie
Method: POST
```


| Parameter | Type | Description |
| :--- | :--- | :--- |
| `cookie ` | `string` | **Required**. The value of the cookie to be set.

### Response:
`message (string): A message indicating whether the cookie has been set successfully.`
### Example:
### Request:
```http
POST /api/set_cookie
Content-Type: application/json

{
  "cookie": "your_cookie_value"
}
```
### Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Cookie has been set."
}

```

## Generate Images
Generate a list of image prompts based on the provided query.

| Parameter | Type | Description | Response |
| :--- | :--- | :--- | :--- |
| `query ` | `string` | **Required**. The query string used for image generation. | prompts (array): An array of image URLs. |

### Example:
### Request:
```http
POST /api/images
Content-Type: application/json

{
  "query": "cat"
}
```
### Response:


```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  "https://image.lexica.art/full_jpg/image1",
  "https://image.lexica.art/full_jpg/image2",
  "https://image.lexica.art/full_jpg/image3"
]
```

## Generate Text
### Request:
```http
POST /api/generate
Content-Type: application/json

{
  "query": "Hello, world!",
  "negativePrompt": "Not a good start",
  "guidanceScale": 5,
  "portrait": false
}
```
### Response:


```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  "https://image.lexica.art/full_jpg/image4",
  "https://image.lexica.art/full_jpg/image5",
  "https://image.lexica.art/full_jpg/image6"
]
```
https://api-leca.onrender.com
