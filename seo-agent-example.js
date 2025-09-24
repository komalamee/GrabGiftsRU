/**
 * Example usage of the generalized SEO sub-agent
 * Shows how to integrate SEO capabilities with existing agents
 */

const SEOAgentIntegrator = require('./seo-agent-integrator');

// Example 1: Enhance a Content Creation Agent
class ContentAgent {
  async createContent(topic, requirements = {}) {
    return {
      content: `Sample content about ${topic}`,
      wordCount: 500,
      readability: 'Good'
    };
  }

  async research(topic) {
    return {
      facts: [`Fact 1 about ${topic}`, `Fact 2 about ${topic}`],
      sources: ['source1.com', 'source2.com']
    };
  }
}

// Example 2: Enhance a Marketing Research Agent
class MarketingAgent {
  async analyze(market, product) {
    return {
      marketSize: '1M users',
      competition: 'Medium',
      opportunities: ['Opportunity 1', 'Opportunity 2']
    };
  }

  async createCampaign(product, target) {
    return {
      channels: ['social', 'search', 'email'],
      budget: '$10,000',
      timeline: '3 months'
    };
  }
}

// Initialize SEO integrator
const seoIntegrator = new SEOAgentIntegrator({
  ahrefs: { apiKey: 'your-ahrefs-key' },
  semrush: { apiKey: 'your-semrush-key' }
});

// Enhance existing agents with SEO capabilities
async function demonstrateEnhancements() {
  console.log('=== SEO Agent Enhancement Demo ===\n');

  // 1. Enhance Content Agent
  console.log('1. Enhancing Content Agent with SEO...');
  const contentAgent = new ContentAgent();
  const enhancedContentAgent = seoIntegrator.enhance(contentAgent);

  const contentResult = await enhancedContentAgent.createContent('gift exchange platforms', {
    domain: 'grabgifts.ru',
    keywords: ['gift exchange', 'подарки онлайн', 'обмен подарками'],
    language: 'ru',
    market: 'russia'
  });

  console.log('Enhanced Content Result:', JSON.stringify(contentResult, null, 2));

  // 2. Enhance Marketing Agent
  console.log('\n2. Enhancing Marketing Agent with SEO...');
  const marketingAgent = new MarketingAgent();
  const enhancedMarketingAgent = seoIntegrator.enhance(marketingAgent);

  const marketingResult = await enhancedMarketingAgent.analyze('russian gift market', {
    domain: 'grabgifts.ru',
    competitors: ['gifts.ru', 'podarki.com'],
    language: 'ru'
  });

  console.log('Enhanced Marketing Result:', JSON.stringify(marketingResult, null, 2));

  // 3. Direct SEO Operations
  console.log('\n3. Direct SEO Analysis...');

  const keywordAnalysis = await seoIntegrator.analyzeKeywords([
    'gift exchange',
    'подарки онлайн',
    'обмен подарками'
  ], 'ru');

  console.log('Keyword Analysis:', JSON.stringify(keywordAnalysis, null, 2));

  const domainMetrics = await seoIntegrator.getDomainMetrics('grabgifts.ru');
  console.log('Domain Metrics:', JSON.stringify(domainMetrics, null, 2));

  const competitorInsights = await seoIntegrator.getCompetitorInsights('grabgifts.ru');
  console.log('Competitor Insights:', JSON.stringify(competitorInsights, null, 2));
}

// Example 3: Custom Agent with Built-in SEO
class SEOAwareAgent {
  constructor() {
    this.seoIntegrator = new SEOAgentIntegrator();
  }

  async createSEOOptimizedContent(topic, config) {
    // Build SEO context
    const seoContext = await this.seoIntegrator.buildSEOContext([config]);

    // Get keyword insights
    const keywordData = await this.seoIntegrator.analyzeKeywords(
      config.keywords || [topic],
      config.language || 'en'
    );

    // Create content with SEO guidance
    const content = this.generateContent(topic, keywordData);

    // Optimize the content
    const optimization = await this.seoIntegrator.optimizeContent(
      content,
      keywordData.primary
    );

    return {
      content,
      seoContext,
      keywordData,
      optimization,
      recommendations: this.generateRecommendations(optimization, keywordData)
    };
  }

  generateContent(topic, keywordData) {
    const keywords = keywordData.related.join(', ');
    return `Comprehensive guide about ${topic}. This content covers ${keywords} and provides valuable insights for users interested in ${keywordData.primary}.`;
  }

  generateRecommendations(optimization, keywordData) {
    return [
      `Target keyword: ${keywordData.primary}`,
      `Search volume: ${keywordData.volume}`,
      `Difficulty: ${keywordData.difficulty}`,
      `Content score: ${optimization.score}`,
      ...optimization.suggestions
    ];
  }
}

// Example usage configurations for different projects
const projectConfigs = {
  grabgifts: {
    domain: 'grabgifts.ru',
    language: 'ru',
    market: 'russia',
    primaryKeywords: ['подарки', 'обмен подарками', 'gift exchange'],
    competitors: ['gifts.ru', 'podarki.com', 'surprise.ru']
  },

  ecommerce: {
    domain: 'example-store.com',
    language: 'en',
    market: 'global',
    primaryKeywords: ['online shopping', 'ecommerce', 'buy online'],
    competitors: ['amazon.com', 'ebay.com', 'shopify.com']
  },

  saas: {
    domain: 'saas-platform.com',
    language: 'en',
    market: 'b2b',
    primaryKeywords: ['business software', 'saas platform', 'enterprise solution'],
    competitors: ['salesforce.com', 'hubspot.com', 'slack.com']
  }
};

// Export for use in other modules
module.exports = {
  SEOAgentIntegrator,
  SEOAwareAgent,
  demonstrateEnhancements,
  projectConfigs
};

// Run demonstration if this file is executed directly
if (require.main === module) {
  demonstrateEnhancements().catch(console.error);
}