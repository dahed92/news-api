export interface GNewsArticle {
    title: string;
    description: string;
    content: string;
    url: string;
    image: string;
    publishedAt: string;
    source: {
        name: string;
        url: string;
    };
}

export interface GNewsResponse {
    totalArticles: number;
    articles: GNewsArticle[];
}

export interface NewsArticle {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    image: string;
    publishedAt: string;
    author: string;
    source: {
        name: string;
        url: string;
    };
}

export interface SearchParams {
    q?: string;
    lang?: string;
    country?: string;
    max?: number;
    from?: string;
    to?: string;
    sortby?: 'publishedAt' | 'relevance' | 'popularity';
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface CacheConfig {
    ttl: number;
    checkperiod: number;
} 