import axios, { AxiosResponse } from 'axios';
import NodeCache from 'node-cache';
import { GNewsResponse, GNewsArticle, SearchParams, NewsArticle } from '../types';

export class GNewsService {
    private apiKey: string;
    private baseUrl: string;
    private cache: NodeCache;

    constructor() {
        this.apiKey = process.env.GNEWS_API_KEY || '';
        this.baseUrl = process.env.GNEWS_BASE_URL || 'https://gnews.io/api/v4';
        this.cache = new NodeCache({
            stdTTL: parseInt(process.env.CACHE_TTL || '300000'), // 5 minutes default
            checkperiod: 600
        });
    }

    private generateCacheKey(endpoint: string, params: Record<string, any>): string {
        const sortedParams = Object.keys(params)
            .sort()
            .map(key => `${key}:${params[key]}`)
            .join('|');
        return `${endpoint}:${sortedParams}`;
    }

    private async makeRequest(endpoint: string, params: Record<string, any>): Promise<GNewsResponse> {
        const cacheKey = this.generateCacheKey(endpoint, params);

        // Check cache first
        const cachedData = this.cache.get<GNewsResponse>(cacheKey);
        if (cachedData) {
            console.log('Cache hit for:', cacheKey);
            return cachedData;
        }

        try {
            const response: AxiosResponse<GNewsResponse> = await axios.get(`${this.baseUrl}/${endpoint}`, {
                params: {
                    ...params,
                    token: this.apiKey
                }
            });

            // Cache the response
            this.cache.set(cacheKey, response.data);
            console.log('Cache miss for:', cacheKey);

            return response.data;
        } catch (error) {
            console.error('GNews API error:', error);
            throw new Error('Failed to fetch news from GNews API');
        }
    }

    private transformArticle(gnewsArticle: GNewsArticle): NewsArticle {
        return {
            id: this.generateId(gnewsArticle.title, gnewsArticle.publishedAt),
            title: gnewsArticle.title,
            description: gnewsArticle.description,
            content: gnewsArticle.content,
            url: gnewsArticle.url,
            image: gnewsArticle.image,
            publishedAt: gnewsArticle.publishedAt,
            author: gnewsArticle.source.name,
            source: gnewsArticle.source
        };
    }

    private generateId(title: string, publishedAt: string): string {
        return Buffer.from(`${title}-${publishedAt}`).toString('base64').slice(0, 12);
    }

    async getTopHeadlines(params: SearchParams = {}): Promise<NewsArticle[]> {
        const response = await this.makeRequest('top-headlines', params);
        return response.articles.map(article => this.transformArticle(article));
    }

    async searchArticles(params: SearchParams): Promise<NewsArticle[]> {
        if (!params.q) {
            throw new Error('Search query is required');
        }

        const response = await this.makeRequest('search', params);
        return response.articles.map(article => this.transformArticle(article));
    }

    async getArticlesByTitle(title: string, max: number = 10): Promise<NewsArticle[]> {
        const response = await this.makeRequest('search', {
            q: title,
            max: max,
            sortby: 'relevance'
        });

        return response.articles
            .filter(article =>
                article.title.toLowerCase().includes(title.toLowerCase())
            )
            .map(article => this.transformArticle(article));
    }

    async getArticlesByAuthor(author: string, max: number = 10): Promise<NewsArticle[]> {
        const response = await this.makeRequest('search', {
            q: author,
            max: max,
            sortby: 'relevance'
        });

        return response.articles
            .filter(article =>
                article.source.name.toLowerCase().includes(author.toLowerCase())
            )
            .map(article => this.transformArticle(article));
    }

    async getArticlesByKeywords(keywords: string[], max: number = 10): Promise<NewsArticle[]> {
        const query = keywords.join(' OR ');
        const response = await this.makeRequest('search', {
            q: query,
            max: max,
            sortby: 'relevance'
        });

        return response.articles.map(article => this.transformArticle(article));
    }

    clearCache(): void {
        this.cache.flushAll();
        console.log('Cache cleared');
    }

    getCacheStats(): { keys: number; hits: number; misses: number } {
        const stats = this.cache.getStats();
        return {
            keys: stats.keys,
            hits: stats.hits,
            misses: stats.misses
        };
    }
} 