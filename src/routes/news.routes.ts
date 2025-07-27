import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';

const router = Router();
const newsController = new NewsController();

// GET /api/news/headlines - Get top headlines
router.get('/headlines', (req, res) => newsController.getTopHeadlines(req, res));

// GET /api/news/search - Search articles by query
router.get('/search', (req, res) => newsController.searchArticles(req, res));

// GET /api/news/title - Get articles by title
router.get('/title', (req, res) => newsController.getArticlesByTitle(req, res));

// GET /api/news/author - Get articles by author
router.get('/author', (req, res) => newsController.getArticlesByAuthor(req, res));

// GET /api/news/keywords - Get articles by keywords
router.get('/keywords', (req, res) => newsController.getArticlesByKeywords(req, res));

// POST /api/news/cache/clear - Clear cache
router.post('/cache/clear', (req, res) => newsController.clearCache(req, res));

// GET /api/news/cache/stats - Get cache statistics
router.get('/cache/stats', (req, res) => newsController.getCacheStats(req, res));

export default router; 