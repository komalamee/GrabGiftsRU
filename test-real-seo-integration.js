/**
 * Test script for real SEO MCP integration
 * Run this to verify the SEO agent works with real API connections
 */

const SEOAgentIntegrator = require('./seo-agent-integrator');
require('dotenv').config();

async function testRealSEOIntegration() {
  console.log('🔍 Testing Real SEO MCP Integration...\n');

  // Initialize SEO integrator
  const seoIntegrator = new SEOAgentIntegrator();

  // Test 1: Health Check
  console.log('1. Checking API health...');
  try {
    const health = await seoIntegrator.realMCPClient.healthCheck();
    console.log('Health Check Results:', health);
  } catch (error) {
    console.log('Health check failed (using fallback data):', error.message);
  }

  // Test 2: Keyword Analysis
  console.log('\n2. Testing keyword analysis...');
  try {
    const keywordData = await seoIntegrator.analyzeKeywords([
      'gift exchange',
      'подарки онлайн',
      'обмен подарками'
    ], 'ru');

    console.log('Keyword Analysis Results:');
    console.log('- Primary keyword:', keywordData.primary);
    console.log('- Search volume:', keywordData.volume);
    console.log('- Difficulty:', keywordData.difficulty);
    console.log('- Related keywords:', keywordData.related.slice(0, 3));
  } catch (error) {
    console.log('Keyword analysis error:', error.message);
  }

  // Test 3: Domain Analysis
  console.log('\n3. Testing domain analysis...');
  try {
    const domainData = await seoIntegrator.getDomainMetrics('grabgifts.ru');
    console.log('Domain Metrics:');
    console.log('- Organic traffic:', domainData.organic_traffic);
    console.log('- Domain rating:', domainData.domain_rating);
    console.log('- Total backlinks:', domainData.total_backlinks);
    console.log('- Referring domains:', domainData.referring_domains);
  } catch (error) {
    console.log('Domain analysis error:', error.message);
  }

  // Test 4: Competitor Analysis
  console.log('\n4. Testing competitor analysis...');
  try {
    const competitorData = await seoIntegrator.getCompetitorInsights('grabgifts.ru');
    console.log('Competitor Insights:');
    console.log('- Keyword gaps:', competitorData.gaps?.slice(0, 3) || competitorData.keyword_gaps?.slice(0, 3));
    console.log('- Content opportunities:', competitorData.opportunities?.slice(0, 3) || competitorData.content_gaps?.slice(0, 3));
  } catch (error) {
    console.log('Competitor analysis error:', error.message);
  }

  // Test 5: Enhanced Content Agent
  console.log('\n5. Testing enhanced content agent...');

  // Create a simple content agent
  const simpleContentAgent = {
    async createContent(topic, requirements = {}) {
      return {
        content: `Sample content about ${topic}`,
        wordCount: 500,
        metadata: requirements
      };
    }
  };

  // Enhance it with SEO capabilities
  const enhancedAgent = seoIntegrator.enhance(simpleContentAgent);

  try {
    const contentResult = await enhancedAgent.createContent('gift exchange platforms', {
      domain: 'grabgifts.ru',
      keywords: ['gift exchange', 'подарки онлайн'],
      language: 'ru',
      market: 'russia'
    });

    console.log('Enhanced Content Creation Results:');
    console.log('- Content length:', contentResult.content?.length || 'N/A');
    console.log('- SEO optimization score:', contentResult.seoOptimization?.score || 'N/A');
    console.log('- Recommendations:', contentResult.seoOptimization?.suggestions?.slice(0, 2) || 'None');
  } catch (error) {
    console.log('Enhanced content creation error:', error.message);
  }

  // Test 6: Cache Performance
  console.log('\n6. Testing cache performance...');
  console.time('First keyword call');
  await seoIntegrator.analyzeKeywords(['test keyword'], 'en');
  console.timeEnd('First keyword call');

  console.time('Cached keyword call');
  await seoIntegrator.analyzeKeywords(['test keyword'], 'en');
  console.timeEnd('Cached keyword call');

  console.log('\n✅ Real SEO MCP Integration test completed!');
  console.log('\n📋 Setup Instructions:');
  console.log('1. Copy .env.example to .env');
  console.log('2. Add your API keys to .env file');
  console.log('3. Run: node test-real-seo-integration.js');
  console.log('4. Without API keys, fallback data will be used');
}

// Example content agent to demonstrate integration
class ExampleContentAgent {
  async createContent(topic, requirements = {}) {
    console.log(`Creating content about: ${topic}`);
    return {
      content: `This is example content about ${topic}. It covers various aspects and provides valuable information.`,
      wordCount: 150,
      readability: 'Good',
      topic
    };
  }

  async research(topic) {
    console.log(`Researching: ${topic}`);
    return {
      facts: [`Key fact about ${topic}`, `Important insight about ${topic}`],
      sources: ['example.com', 'research.org']
    };
  }
}

// Example usage with different configurations
async function demonstrateConfigurations() {
  console.log('\n🎯 Demonstrating different configurations...\n');

  // Configuration for Russian market
  const russianConfig = {
    language: 'ru',
    market: 'russia',
    keywords: ['подарки', 'обмен подарками', 'сюрпризы'],
    competitors: ['gifts.ru', 'podarki.com']
  };

  // Configuration for global market
  const globalConfig = {
    language: 'en',
    market: 'global',
    keywords: ['gifts', 'gift exchange', 'surprise gifts'],
    competitors: ['amazon.com', 'etsy.com']
  };

  const seoIntegrator = new SEOAgentIntegrator();
  const contentAgent = new ExampleContentAgent();
  const enhancedAgent = seoIntegrator.enhance(contentAgent);

  // Test Russian configuration
  console.log('Testing Russian market configuration...');
  const russianResult = await enhancedAgent.createContent('подарочная платформа', {
    domain: 'grabgifts.ru',
    ...russianConfig
  });
  console.log('Russian result keywords:', russianResult.metadata?.keywords);

  // Test global configuration
  console.log('\nTesting global market configuration...');
  const globalResult = await enhancedAgent.createContent('gift platform', {
    domain: 'grabgifts.com',
    ...globalConfig
  });
  console.log('Global result keywords:', globalResult.metadata?.keywords);
}

// Run tests if this file is executed directly
if (require.main === module) {
  testRealSEOIntegration()
    .then(() => demonstrateConfigurations())
    .catch(console.error);
}

module.exports = {
  testRealSEOIntegration,
  demonstrateConfigurations,
  ExampleContentAgent
};