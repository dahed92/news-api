import { Request, Response } from 'express';
import { GNewsService } from '../services/gnews.service';
import { ApiResponse, NewsArticle, SearchParams } from '../types';

export class NewsController {
    private gnewsService: GNewsService;

    constructor() {
        this.gnewsService = new GNewsService();
    }

    async getTopHeadlines(req: Request, res: Response): Promise<void> {
        try {
            const params: SearchParams = {
                lang: req.query.lang as string,
                country: req.query.country as string,
                max: parseInt(req.query.max as string) || 10
            };

            const articles = await this.gnewsService.getTopHeadlines(params);

            const response: ApiResponse<NewsArticle[]> = {
                success: true,
                data: articles,
                message: `Retrieved ${articles.length} top headlines`
            };

            res.json(response);
        } catch (error) {
            console.error('Error fetching top headlines:', error);
            const response: ApiResponse<null> = {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch top headlines'
            };
            res.status(500).json(response);
        }
    }

    async searchArticles(req: Request, res: Response): Promise<void> {
        try {
            const { q, lang, country, max, from, to, sortby } = req.query;

            if (!q) {
                const response: ApiResponse<null> = {
                    success: false,
                    error: 'Search query parameter "q" is required'
                };
                res.status(400).json(response);
                return;
            }

            const params: SearchParams = {
                q: q as string,
                lang: lang as string,
                country: country as string,
                max: parseInt(max as string) || 10,
                from: from as string,
                to: to as string,
                sortby: sortby as 'publishedAt' | 'relevance' | 'popularity'
            };

            const articles = await this.gnewsService.searchArticles(params);

            const response: ApiResponse<NewsArticle[]> = {
                success: true,
                data: articles,
                message: `Found ${articles.length} articles for "${q}"`
            };

            res.json(response);
        } catch (error) {
            console.error('Error searching articles:', error);
            const response: ApiResponse<null> = {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to search articles'
            };
            res.status(500).json(response);
        }
    }

    async getArticlesByTitle(req: Request, res: Response): Promise<void> {
        try {
            const { title, max } = req.query;

            if (!title) {
                const response: ApiResponse<null> = {
                    success: false,
                    error: 'Title parameter is required'
                };
                res.status(400).json(response);
                return;
            }

            const articles = await this.gnewsService.getArticlesByTitle(
                title as string,
                parseInt(max as string) || 10
            );

            const response: ApiResponse<NewsArticle[]> = {
                success: true,
                data: articles,
                message: `Found ${articles.length} articles with title containing "${title}"`
            };

            res.json(response);
        } catch (error) {
            console.error('Error fetching articles by title:', error);
            const response: ApiResponse<null> = {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch articles by title'
            };
            res.status(500).json(response);
        }
    }

    async getArticlesByAuthor(req: Request, res: Response): Promise<void> {
        try {
            const { author, max } = req.query;

            if (!author) {
                const response: ApiResponse<null> = {
                    success: false,
                    error: 'Author parameter is required'
                };
                res.status(400).json(response);
                return;
            }

            const articles = await this.gnewsService.getArticlesByAuthor(
                author as string,
                parseInt(max as string) || 10
            );

            const response: ApiResponse<NewsArticle[]> = {
                success: true,
                data: articles,
                message: `Found ${articles.length} articles by author "${author}"`
            };

            res.json(response);
        } catch (error) {
            console.error('Error fetching articles by author:', error);
            const response: ApiResponse<null> = {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch articles by author'
            };
            res.status(500).json(response);
        }
    }

    async getArticlesByKeywords(req: Request, res: Response): Promise<void> {
        try {
            const { keywords, max } = req.query;

            if (!keywords) {
                const response: ApiResponse<null> = {
                    success: false,
                    error: 'Keywords parameter is required (comma-separated)'
                };
                res.status(400).json(response);
                return;
            }

            const keywordArray = (keywords as string).split(',').map(k => k.trim());
            const articles = await this.gnewsService.getArticlesByKeywords(
                keywordArray,
                parseInt(max as string) || 10
            );

            const response: ApiResponse<NewsArticle[]> = {
                success: true,
                data: articles,
                message: `Found ${articles.length} articles matching keywords: ${keywordArray.join(', ')}`
            };

            res.json(response);
        } catch (error) {
            console.error('Error fetching articles by keywords:', error);
            const response: ApiResponse<null> = {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch articles by keywords'
            };
            res.status(500).json(response);
        }
    }

    async clearCache(req: Request, res: Response): Promise<void> {
        try {
            this.gnewsService.clearCache();

            const response: ApiResponse<null> = {
                success: true,
                message: 'Cache cleared successfully'
            };

            res.json(response);
        } catch (error) {
            console.error('Error clearing cache:', error);
            const response: ApiResponse<null> = {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to clear cache'
            };
            res.status(500).json(response);
        }
    }

    async getCacheStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = this.gnewsService.getCacheStats();

            const response: ApiResponse<typeof stats> = {
                success: true,
                data: stats,
                message: 'Cache statistics retrieved successfully'
            };

            res.json(response);
        } catch (error) {
            console.error('Error getting cache stats:', error);
            const response: ApiResponse<null> = {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get cache statistics'
            };
            res.status(500).json(response);
        }
    }
} 