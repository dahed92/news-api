import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRoutes from './routes/news.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API routes
app.use('/api/news', newsRoutes);

// Root endpoint with API information
app.get('/', (req, res) => {
    res.json({
        name: 'News API',
        version: '1.0.0',
        description: 'A simple API that interacts with GNews API for fetching articles',
        endpoints: {
            health: 'GET /health',
            headlines: 'GET /api/news/headlines',
            search: 'GET /api/news/search?q=query',
            byTitle: 'GET /api/news/title?title=title',
            byAuthor: 'GET /api/news/author?author=author',
            byKeywords: 'GET /api/news/keywords?keywords=keyword1,keyword2',
            clearCache: 'POST /api/news/cache/clear',
            cacheStats: 'GET /api/news/cache/stats'
        },
        documentation: '/docs'
    });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `The endpoint ${req.method} ${req.originalUrl} does not exist`
    });
});

export default app;

// Start server if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 News API server running on port ${PORT}`);
        console.log(`📖 API Documentation: http://localhost:${PORT}/docs`);
        console.log(`🔍 Health Check: http://localhost:${PORT}/health`);
    });
} 