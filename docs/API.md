# News API Documentation

## Overview

The News API is a RESTful service that provides access to news articles through the GNews API. It includes caching functionality to improve performance and reduce API calls.

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, no authentication is required for the API endpoints.

## Response Format

All API responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "data": [...],
  "message": "Description of the operation"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description"
}
```

## Endpoints

### 1. Health Check

**GET** `/health`

Returns server status and uptime information.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### 2. API Information

**GET** `/`

Returns API information and available endpoints.

**Response:**
```json
{
  "name": "News API",
  "version": "1.0.0",
  "description": "A simple API that interacts with GNews API for fetching articles",
  "endpoints": {
    "health": "GET /health",
    "headlines": "GET /api/news/headlines",
    "search": "GET /api/news/search?q=query",
    "byTitle": "GET /api/news/title?title=title",
    "byAuthor": "GET /api/news/author?author=author",
    "byKeywords": "GET /api/news/keywords?keywords=keyword1,keyword2",
    "clearCache": "POST /api/news/cache/clear",
    "cacheStats": "GET /api/news/cache/stats"
  }
}
```

### 3. Top Headlines

**GET** `/api/news/headlines`

Retrieves the latest top headlines.

**Query Parameters:**
- `lang` (optional): Language code (e.g., "en", "es", "fr")
- `country` (optional): Country code (e.g., "us", "gb", "ca")
- `max` (optional): Maximum number of articles (default: 10, max: 100)

**Example Request:**
```bash
curl "http://localhost:3000/api/news/headlines?lang=en&country=us&max=5"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "dGVjaG5vbG9neQ==",
      "title": "Latest Technology News",
      "description": "Breaking technology news and updates",
      "content": "Full article content...",
      "url": "https://example.com/article",
      "image": "https://example.com/image.jpg",
      "publishedAt": "2023-01-01T00:00:00Z",
      "author": "Tech News",
      "source": {
        "name": "Tech News",
        "url": "https://technews.com"
      }
    }
  ],
  "message": "Retrieved 1 top headlines"
}
```

### 4. Search Articles

**GET** `/api/news/search`

Search for articles by query string.

**Query Parameters:**
- `q` (required): Search query
- `lang` (optional): Language code
- `country` (optional): Country code
- `max` (optional): Maximum number of articles (default: 10)
- `from` (optional): Start date (YYYY-MM-DD)
- `to` (optional): End date (YYYY-MM-DD)
- `sortby` (optional): Sort by "publishedAt", "relevance", or "popularity"

**Example Request:**
```bash
curl "http://localhost:3000/api/news/search?q=artificial intelligence&lang=en&max=10&sortby=publishedAt"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "YWkgYXJ0aWNsZQ==",
      "title": "AI Breakthrough in Technology",
      "description": "New developments in artificial intelligence",
      "content": "Article content about AI...",
      "url": "https://example.com/ai-article",
      "image": "https://example.com/ai-image.jpg",
      "publishedAt": "2023-01-01T00:00:00Z",
      "author": "AI News",
      "source": {
        "name": "AI News",
        "url": "https://ainews.com"
      }
    }
  ],
  "message": "Found 1 articles for \"artificial intelligence\""
}
```

### 5. Articles by Title

**GET** `/api/news/title`

Find articles by title.

**Query Parameters:**
- `title` (required): Title to search for
- `max` (optional): Maximum number of articles (default: 10)

**Example Request:**
```bash
curl "http://localhost:3000/api/news/title?title=climate change&max=5"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "Y2xpbWF0ZSBjaGFuZ2U=",
      "title": "Climate Change Impact on Global Economy",
      "description": "Analysis of climate change effects",
      "content": "Article about climate change...",
      "url": "https://example.com/climate-article",
      "image": "https://example.com/climate-image.jpg",
      "publishedAt": "2023-01-01T00:00:00Z",
      "author": "Environmental News",
      "source": {
        "name": "Environmental News",
        "url": "https://envnews.com"
      }
    }
  ],
  "message": "Found 1 articles with title containing \"climate change\""
}
```

### 6. Articles by Author

**GET** `/api/news/author`

Find articles by author/source.

**Query Parameters:**
- `author` (required): Author name to search for
- `max` (optional): Maximum number of articles (default: 10)

**Example Request:**
```bash
curl "http://localhost:3000/api/news/author?author=Reuters&max=10"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cmV1dGVycyBhcnRpY2xl",
      "title": "Reuters: Market Update",
      "description": "Latest market news from Reuters",
      "content": "Reuters article content...",
      "url": "https://reuters.com/article",
      "image": "https://reuters.com/image.jpg",
      "publishedAt": "2023-01-01T00:00:00Z",
      "author": "Reuters",
      "source": {
        "name": "Reuters",
        "url": "https://reuters.com"
      }
    }
  ],
  "message": "Found 1 articles by author \"Reuters\""
}
```

### 7. Articles by Keywords

**GET** `/api/news/keywords`

Find articles by multiple keywords.

**Query Parameters:**
- `keywords` (required): Comma-separated keywords
- `max` (optional): Maximum number of articles (default: 10)

**Example Request:**
```bash
curl "http://localhost:3000/api/news/keywords?keywords=AI,machine learning,technology&max=15"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "a2V5d29yZCBhcnRpY2xl",
      "title": "AI and Machine Learning in Modern Technology",
      "description": "Exploring the intersection of AI and ML",
      "content": "Article about AI and ML...",
      "url": "https://example.com/ai-ml-article",
      "image": "https://example.com/ai-ml-image.jpg",
      "publishedAt": "2023-01-01T00:00:00Z",
      "author": "Tech Journal",
      "source": {
        "name": "Tech Journal",
        "url": "https://techjournal.com"
      }
    }
  ],
  "message": "Found 1 articles matching keywords: AI, machine learning, technology"
}
```

### 8. Clear Cache

**POST** `/api/news/cache/clear`

Clears all cached data.

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/news/cache/clear"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Cache cleared successfully"
}
```

### 9. Cache Statistics

**GET** `/api/news/cache/stats`

Returns cache performance statistics.

**Example Request:**
```bash
curl "http://localhost:3000/api/news/cache/stats"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "keys": 5,
    "hits": 12,
    "misses": 8
  },
  "message": "Cache statistics retrieved successfully"
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Endpoint not found |
| 500 | Internal Server Error |

## Rate Limiting

The API implements caching to reduce calls to the GNews API. Cache TTL is configurable via the `CACHE_TTL` environment variable (default: 5 minutes).

## Data Models

### Article Object

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "content": "string",
  "url": "string",
  "image": "string",
  "publishedAt": "string (ISO 8601)",
  "author": "string",
  "source": {
    "name": "string",
    "url": "string"
  }
}
```

### Cache Statistics Object

```json
{
  "keys": "number",
  "hits": "number",
  "misses": "number"
}
```

## Testing the API

You can test the API using curl commands or any HTTP client like Postman.

### Example curl commands:

```bash
# Get top headlines
curl "http://localhost:3000/api/news/headlines?lang=en&max=5"

# Search for articles
curl "http://localhost:3000/api/news/search?q=technology&max=10"

# Get cache statistics
curl "http://localhost:3000/api/news/cache/stats"
```

## Notes

- All dates are in ISO 8601 format
- Image URLs may be empty strings if no image is available
- The API automatically handles rate limiting through caching
- Cache can be manually cleared using the cache endpoints 