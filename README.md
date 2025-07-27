# News API

A simple TypeScript API that interacts with the GNews API for fetching articles. This API provides various endpoints to search, filter, and retrieve news articles with built-in caching functionality.

## Features

- 🔍 **Search Articles**: Search for articles by keywords, title, or author
- 📰 **Top Headlines**: Get the latest top headlines
- 💾 **Caching**: Built-in caching to improve performance and reduce API calls
- 🚀 **TypeScript**: Full TypeScript support with type safety
- 📊 **Cache Statistics**: Monitor cache performance
- 🔧 **Flexible Parameters**: Support for various search parameters

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- GNews API key (get one at [https://gnews.io/](https://gnews.io/))

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd news-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Edit `.env` file and add your GNews API key:
```env
GNEWS_API_KEY=your_gnews_api_key_here
GNEWS_BASE_URL=https://gnews.io/api/v4
PORT=3000
NODE_ENV=development
CACHE_TTL=300000
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status and uptime

### Top Headlines
- **GET** `/api/news/headlines`
- **Query Parameters:**
  - `lang` (optional): Language code (e.g., "en", "es")
  - `country` (optional): Country code (e.g., "us", "gb")
  - `max` (optional): Maximum number of articles (default: 10)

**Example:**
```bash
curl "http://localhost:3000/api/news/headlines?lang=en&country=us&max=5"
```

### Search Articles
- **GET** `/api/news/search`
- **Query Parameters:**
  - `q` (required): Search query
  - `lang` (optional): Language code
  - `country` (optional): Country code
  - `max` (optional): Maximum number of articles (default: 10)
  - `from` (optional): Start date (YYYY-MM-DD)
  - `to` (optional): End date (YYYY-MM-DD)
  - `sortby` (optional): Sort by "publishedAt", "relevance", or "popularity"

**Example:**
```bash
curl "http://localhost:3000/api/news/search?q=technology&lang=en&max=10&sortby=publishedAt"
```

### Articles by Title
- **GET** `/api/news/title`
- **Query Parameters:**
  - `title` (required): Title to search for
  - `max` (optional): Maximum number of articles (default: 10)

**Example:**
```bash
curl "http://localhost:3000/api/news/title?title=artificial intelligence&max=5"
```

### Articles by Author
- **GET** `/api/news/author`
- **Query Parameters:**
  - `author` (required): Author name to search for
  - `max` (optional): Maximum number of articles (default: 10)

**Example:**
```bash
curl "http://localhost:3000/api/news/author?author=Reuters&max=10"
```

### Articles by Keywords
- **GET** `/api/news/keywords`
- **Query Parameters:**
  - `keywords` (required): Comma-separated keywords
  - `max` (optional): Maximum number of articles (default: 10)

**Example:**
```bash
curl "http://localhost:3000/api/news/keywords?keywords=AI,machine learning,technology&max=15"
```

### Cache Management

#### Clear Cache
- **POST** `/api/news/cache/clear`
- Clears all cached data

**Example:**
```bash
curl -X POST "http://localhost:3000/api/news/cache/clear"
```

#### Cache Statistics
- **GET** `/api/news/cache/stats`
- Returns cache performance statistics

**Example:**
```bash
curl "http://localhost:3000/api/news/cache/stats"
```

## Response Format

All API endpoints return responses in the following format:

```json
{
  "success": true,
  "data": [...],
  "message": "Description of the operation"
}
```

### Article Object Structure

```json
{
  "id": "unique_article_id",
  "title": "Article Title",
  "description": "Article description",
  "content": "Article content",
  "url": "Article URL",
  "image": "Image URL",
  "publishedAt": "2023-01-01T00:00:00Z",
  "author": "Author Name",
  "source": {
    "name": "Source Name",
    "url": "Source URL"
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid parameters
- `404 Not Found`: Endpoint not found
- `500 Internal Server Error`: Server error

Error response format:
```json
{
  "success": false,
  "error": "Error description"
}
```

## Caching

The API implements intelligent caching to:
- Reduce API calls to GNews
- Improve response times
- Reduce costs
- Handle rate limiting

Cache features:
- **TTL**: 5 minutes by default (configurable)
- **Automatic cleanup**: Expired entries are automatically removed
- **Statistics**: Monitor cache hit/miss rates
- **Manual clearing**: Clear cache on demand

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GNEWS_API_KEY` | Your GNews API key | Required |
| `GNEWS_BASE_URL` | GNews API base URL | `https://gnews.io/api/v4` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `CACHE_TTL` | Cache TTL in milliseconds | `300000` (5 minutes) |

## Development

### Project Structure
```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── types/          # TypeScript type definitions
├── routes/         # API routes
└── app.ts          # Main application file
```

### Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Start production server
- `npm test`: Run tests (not implemented yet)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue on GitHub or contact the maintainers. 