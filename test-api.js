#!/usr/bin/env node

/**
 * Simple test script to demonstrate the News API
 * This script shows how to use the API endpoints
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
    console.log('🧪 Testing News API...\n');

    try {
        // Test 1: Health check
        console.log('1. Testing health check...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check passed:', healthResponse.data);
        console.log('');

        // Test 2: API information
        console.log('2. Testing API information...');
        const infoResponse = await axios.get(`${BASE_URL}/`);
        console.log('✅ API info retrieved:', infoResponse.data.name);
        console.log('');

        // Test 3: Cache statistics
        console.log('3. Testing cache statistics...');
        const cacheStatsResponse = await axios.get(`${BASE_URL}/api/news/cache/stats`);
        console.log('✅ Cache stats:', cacheStatsResponse.data.data);
        console.log('');

        // Test 4: Clear cache
        console.log('4. Testing cache clear...');
        const clearCacheResponse = await axios.post(`${BASE_URL}/api/news/cache/clear`);
        console.log('✅ Cache cleared:', clearCacheResponse.data.message);
        console.log('');

        console.log('🎉 All basic tests passed!');
        console.log('\n📝 Note: To test news endpoints, you need to:');
        console.log('   1. Get a GNews API key from https://gnews.io/');
        console.log('   2. Add it to your .env file as GNEWS_API_KEY');
        console.log('   3. Start the server with: npm run dev');
        console.log('\n📖 For more examples, see the README.md and docs/API.md files');

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Server is not running. Please start it with: npm run dev');
        } else {
            console.log('❌ Test failed:', error.message);
        }
    }
}

// Run the test
testAPI(); 