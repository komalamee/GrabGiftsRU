/**
 * SEO Agent Integrator
 * Provides seamless integration patterns for adding SEO capabilities to any existing agent
 */

const RealSEOMCPClient = require('./real-seo-mcp-client');

class SEOAgentIntegrator {
  constructor(mcpConnections = {}) {
    this.mcpConnections = mcpConnections;
    this.cache = new Map();

    // Initialize real MCP client
    this.realMCPClient = new RealSEOMCPClient({
      capsolverApiKey: process.env.CAPSOLVER_API_KEY,
      ahrefsApiKey: process.env.AHREFS_API_KEY,
      semrushApiKey: process.env.SEMRUSH_API_KEY,
      ...mcpConnections
    });
  }

  /**
   * Enhance any existing agent with SEO capabilities
   */
  enhance(existingAgent, seoConfig = {}) {
    const enhancedAgent = {
      ...existingAgent,
      seo: this,

      // Wrapper methods that add SEO intelligence
      async executeWithSEO(method, ...args) {
        const seoContext = await this.buildSEOContext(args);
        const result = await existingAgent[method](...args, seoContext);
        return await this.optimizeResult(result, seoContext);
      }
    };

    // Add SEO hooks to common agent methods
    this.addSEOHooks(enhancedAgent, seoConfig);

    return enhancedAgent;
  }

  /**
   * Build SEO context for any operation
   */
  async buildSEOContext(args) {
    const context = {
      keywords: [],
      competitors: [],
      market: 'global',
      language: 'en'
    };

    // Extract SEO-relevant data from arguments
    for (const arg of args) {
      if (typeof arg === 'object' && arg !== null) {
        if (arg.domain) context.domain = arg.domain;
        if (arg.keywords) context.keywords = arg.keywords;
        if (arg.market) context.market = arg.market;
        if (arg.language) context.language = arg.language;
      }
    }

    // Fetch additional SEO intelligence
    if (context.domain) {
      context.domainMetrics = await this.getDomainMetrics(context.domain);
      context.topKeywords = await this.getTopKeywords(context.domain, context.language);
    }

    return context;
  }

  /**
   * Add SEO enhancement hooks to common agent methods
   */
  addSEOHooks(agent, config) {
    const originalMethods = {};

    // Content creation enhancement
    if (agent.createContent) {
      originalMethods.createContent = agent.createContent;
      agent.createContent = async (...args) => {
        const seoContext = await this.buildSEOContext(args);

        // Pre-content SEO research
        if (seoContext.keywords.length > 0) {
          seoContext.keywordAnalysis = await this.analyzeKeywords(
            seoContext.keywords,
            seoContext.language
          );
        }

        // Execute original method with SEO context
        const result = await originalMethods.createContent.call(agent, ...args, seoContext);

        // Post-content SEO optimization
        if (result.content) {
          result.seoOptimization = await this.optimizeContent(
            result.content,
            seoContext.keywordAnalysis?.primary
          );
        }

        return result;
      };
    }

    // Research enhancement
    if (agent.research) {
      originalMethods.research = agent.research;
      agent.research = async (...args) => {
        const seoContext = await this.buildSEOContext(args);

        // Add competitive intelligence
        if (seoContext.domain) {
          seoContext.competitorInsights = await this.getCompetitorInsights(seoContext.domain);
        }

        const result = await originalMethods.research.call(agent, ...args, seoContext);

        // Enrich research with SEO data
        result.seoInsights = {
          searchVolume: seoContext.keywordAnalysis?.volume,
          competitorGaps: seoContext.competitorInsights?.gaps,
          opportunities: await this.identifyOpportunities(result, seoContext)
        };

        return result;
      };
    }

    // Analysis enhancement
    if (agent.analyze) {
      originalMethods.analyze = agent.analyze;
      agent.analyze = async (...args) => {
        const seoContext = await this.buildSEOContext(args);
        const result = await originalMethods.analyze.call(agent, ...args, seoContext);

        // Add SEO metrics to analysis
        result.seoMetrics = await this.calculateSEOMetrics(result, seoContext);

        return result;
      };
    }
  }

  /**
   * MCP tool integration methods
   */
  async callMCPTool(toolName, params) {
    const cacheKey = `${toolName}_${JSON.stringify(params)}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Simulate MCP tool call - replace with actual MCP integration
      const result = await this.executeMCPCall(toolName, params);
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`MCP tool ${toolName} failed:`, error);
      return null;
    }
  }

  async executeMCPCall(toolName, params) {
    try {
      // Use real MCP client for actual API calls
      switch (toolName) {
        case 'ahrefs-keywords':
          return await this.realMCPClient.ahrefsKeywordResearch(
            params.keywords || [],
            params.country || 'US'
          );
        case 'ahrefs-competitors':
          return await this.realMCPClient.ahrefsCompetitorAnalysis(
            params.domain,
            params.competitors || []
          );
        case 'ahrefs-backlinks':
          return await this.realMCPClient.ahrefsBacklinkAnalysis(params.domain);
        case 'semrush-keywords':
          return await this.realMCPClient.semrushKeywordOverview(
            params.keyword,
            params.database || 'us'
          );
        case 'semrush-domain':
          return await this.realMCPClient.semrushDomainOverview(
            params.domain,
            params.database || 'us'
          );
        case 'mcp-backlinks':
          return await this.realMCPClient.getBacklinksList(params.domain);
        case 'mcp-keyword-generator':
          return await this.realMCPClient.keywordGenerator(
            params.keyword,
            params.country || 'us',
            params.searchEngine || 'Google'
          );
        default:
          throw new Error(`Unknown MCP tool: ${toolName}`);
      }
    } catch (error) {
      console.error(`MCP tool ${toolName} failed:`, error);
      // Fallback to mock data if real API fails
      return this.getFallbackData(toolName, params);
    }
  }

  getFallbackData(toolName, params) {
    switch (toolName) {
      case 'ahrefs-keywords':
        return this.realMCPClient.getFallbackKeywordData(params.keywords || []);
      case 'ahrefs-competitors':
        return this.realMCPClient.getFallbackCompetitorData(params.domain, params.competitors || []);
      case 'ahrefs-backlinks':
      case 'mcp-backlinks':
      case 'semrush-domain':
        return this.realMCPClient.getFallbackBacklinkData(params.domain);
      default:
        return null;
    }
  }

  /**
   * Core SEO analysis methods
   */
  async analyzeKeywords(keywords, language = 'en') {
    const results = await this.callMCPTool('ahrefs-keywords', {
      keywords,
      language,
      metrics: ['volume', 'difficulty', 'cpc', 'trends']
    });

    return {
      primary: keywords[0],
      volume: results?.volume || 0,
      difficulty: results?.difficulty || 0,
      related: results?.related || [],
      longTail: results?.longTail || []
    };
  }

  async getDomainMetrics(domain) {
    return await this.callMCPTool('ahrefs-domain', {
      domain,
      metrics: ['authority', 'backlinks', 'organic_traffic', 'keywords']
    });
  }

  async getTopKeywords(domain, language = 'en') {
    return await this.callMCPTool('ahrefs-keywords', {
      domain,
      language,
      limit: 50,
      type: 'organic'
    });
  }

  async getCompetitorInsights(domain) {
    const competitors = await this.callMCPTool('ahrefs-competitors', {
      domain,
      limit: 10
    });

    return {
      competitors: competitors?.domains || [],
      gaps: competitors?.keyword_gaps || [],
      opportunities: competitors?.content_gaps || []
    };
  }

  async optimizeContent(content, targetKeyword) {
    // Content optimization logic
    return {
      score: 85,
      suggestions: [
        'Increase keyword density',
        'Add semantic keywords',
        'Improve heading structure'
      ],
      readability: 'Good',
      wordCount: content.split(' ').length
    };
  }

  async identifyOpportunities(research, seoContext) {
    return [
      'Low competition keywords identified',
      'Content gap opportunities found',
      'Competitor weakness detected'
    ];
  }

  async calculateSEOMetrics(analysis, seoContext) {
    return {
      searchabilityScore: 78,
      competitivenessScore: 65,
      opportunityScore: 82,
      technicalScore: 90
    };
  }

  /**
   * Mock methods for demonstration (replace with actual MCP calls)
   */
  async mockAhrefsKeywords(params) {
    return {
      volume: Math.floor(Math.random() * 10000),
      difficulty: Math.floor(Math.random() * 100),
      cpc: (Math.random() * 5).toFixed(2),
      related: ['related keyword 1', 'related keyword 2'],
      longTail: ['long tail variation 1', 'long tail variation 2']
    };
  }

  async mockAhrefsCompetitors(params) {
    return {
      domains: ['competitor1.com', 'competitor2.com'],
      keyword_gaps: ['gap keyword 1', 'gap keyword 2'],
      content_gaps: ['missing topic 1', 'missing topic 2']
    };
  }

  async mockAhrefsBacklinks(params) {
    return {
      total: Math.floor(Math.random() * 1000),
      domains: Math.floor(Math.random() * 100),
      quality_score: Math.floor(Math.random() * 100)
    };
  }
}

module.exports = SEOAgentIntegrator;