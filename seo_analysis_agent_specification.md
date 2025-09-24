# SEO Analysis Sub-Agent Specification
## Specialized Agent for Russian Market SEO Analysis - GrabGifts.ru

### Executive Summary

This document defines a specialized SEO analysis sub-agent designed specifically for the GrabGifts.ru project, targeting the Russian Telegram gaming market. The agent integrates with Ahrefs, SEMrush, and other SEO MCP tools to provide comprehensive keyword research, competitor analysis, and optimization recommendations tailored for Russian search engines (Yandex, Google.ru) and Cyrillic language optimization.

---

## 1. Agent Configuration

### 1.1 Core Identity
```yaml
agent_name: "RussianSEOAnalyst"
version: "1.0.0"
specialization: "Russian Market SEO Analysis"
target_market: "Russian Federation"
primary_languages: ["ru", "en"]
search_engines: ["Yandex", "Google.ru", "Mail.ru"]
domain_focus: "Telegram Gaming, Crypto Gaming, TON Blockchain"
```

### 1.2 Agent Capabilities
- **Keyword Research**: Russian language keyword discovery and analysis
- **Competitor Analysis**: SERP analysis for Russian gaming market
- **Backlink Analysis**: Russian domain authority assessment
- **Content Optimization**: Cyrillic SEO optimization recommendations
- **SERP Analysis**: Yandex-specific ranking factor analysis
- **Technical SEO**: Russian website compliance auditing
- **Local SEO**: Regional Russian market optimization

### 1.3 Data Sources Integration
```yaml
primary_tools:
  - ahrefs: "Russian keyword database access"
  - semrush: "Yandex ranking data"
  - serpstat: "Russian market SERP analysis"
  - yandex_wordstat: "Yandex native keyword tool"
  - mcp_seo_tools: "Real-time SEO analysis"

secondary_sources:
  - google_trends_russia: "Trending searches in Russia"
  - yandex_metrica: "User behavior data"
  - mail_ru_radar: "Email marketing insights"
  - vk_insights: "Social media trends"
```

---

## 2. Tool Integrations

### 2.1 Primary SEO Tools

#### Ahrefs Integration
```python
class AhrefsRussianAnalyzer:
    def __init__(self):
        self.api_key = os.getenv('AHREFS_API_KEY')
        self.target_countries = ['RU', 'BY', 'KZ', 'KG', 'MD']
        self.languages = ['ru']

    async def keyword_research(self, seed_keywords, market='RU'):
        """
        Comprehensive Russian keyword research
        """
        params = {
            'keywords': seed_keywords,
            'country': market,
            'language': 'ru',
            'search_engine': 'yandex',
            'include_serp_features': True,
            'volume_min': 100,
            'difficulty_max': 70
        }

        results = await self.client.keywords_explorer(params)
        return self.process_russian_keywords(results)

    async def competitor_analysis(self, domains):
        """
        Analyze Russian gaming competitors
        """
        competitors = [
            'hamsterkombat.io',
            'notcoin.io',
            'catizen.ai',
            'tapswap.club'
        ]

        analysis = {}
        for domain in competitors:
            data = await self.client.domain_overview(
                domain=domain,
                country='RU',
                search_engine='yandex'
            )
            analysis[domain] = self.extract_insights(data)

        return analysis

    def process_russian_keywords(self, raw_data):
        """
        Process and enhance Russian keyword data
        """
        processed = []
        for keyword in raw_data.get('keywords', []):
            enhanced_keyword = {
                'keyword': keyword['keyword'],
                'volume': keyword['search_volume'],
                'difficulty': keyword['keyword_difficulty'],
                'cpc': keyword['cpc'],
                'intent': self.classify_search_intent(keyword['keyword']),
                'seasonality': self.detect_seasonality(keyword),
                'local_relevance': self.assess_local_relevance(keyword['keyword']),
                'cyrillic_variations': self.generate_cyrillic_variations(keyword['keyword'])
            }
            processed.append(enhanced_keyword)

        return processed
```

#### SEMrush Yandex Integration
```python
class SemrushYandexAnalyzer:
    def __init__(self):
        self.api_key = os.getenv('SEMRUSH_API_KEY')
        self.database = 'ru'  # Russian database

    async def yandex_ranking_analysis(self, domain):
        """
        Analyze Yandex-specific ranking factors
        """
        params = {
            'type': 'domain_organic',
            'domain': domain,
            'database': self.database,
            'display_limit': 1000,
            'export_columns': 'Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td'
        }

        data = await self.client.get_report(params)
        return self.analyze_yandex_factors(data)

    async def russian_serp_features(self, keywords):
        """
        Analyze SERP features for Russian keywords
        """
        features_analysis = {}
        for keyword in keywords:
            serp_data = await self.client.get_serp_features(
                keyword=keyword,
                database='ru'
            )
            features_analysis[keyword] = {
                'featured_snippets': serp_data.get('featured_snippets', 0),
                'people_also_ask': serp_data.get('people_also_ask', 0),
                'local_pack': serp_data.get('local_pack', 0),
                'knowledge_graph': serp_data.get('knowledge_graph', 0),
                'yandex_direct_ads': serp_data.get('ads_count', 0)
            }

        return features_analysis
```

### 2.2 Russian-Specific Tools

#### Yandex Wordstat Integration
```python
class YandexWordstatConnector:
    def __init__(self):
        self.token = os.getenv('YANDEX_WORDSTAT_TOKEN')
        self.base_url = 'https://api.direct.yandex.com/json/v5/keywordsresearch'

    async def get_keyword_suggestions(self, seeds):
        """
        Get keyword suggestions from Yandex Wordstat
        """
        payload = {
            'method': 'get',
            'params': {
                'Keywords': seeds,
                'Language': 'RU',
                'GeoIds': [225]  # Russia geo ID
            }
        }

        response = await self.make_request(payload)
        return self.process_yandex_keywords(response)

    async def get_search_volume_forecast(self, keywords):
        """
        Get search volume forecasts for keywords
        """
        payload = {
            'method': 'get',
            'params': {
                'Keywords': [{'Keyword': kw} for kw in keywords],
                'RegionIds': [225],  # Russia
                'Currency': 'RUB'
            }
        }

        response = await self.make_request(payload)
        return self.extract_volume_data(response)
```

### 2.3 Technical SEO Tools

#### Russian Website Auditor
```python
class RussianTechnicalSEOAuditor:
    def __init__(self):
        self.charset_requirements = 'UTF-8'
        self.language_tags = ['ru', 'ru-RU']
        self.yandex_requirements = {
            'robots_txt': True,
            'sitemap_xml': True,
            'yandex_verification': True,
            'cyrillic_urls': True
        }

    async def audit_russian_compliance(self, url):
        """
        Comprehensive Russian SEO compliance audit
        """
        audit_results = {
            'charset_encoding': await self.check_charset(url),
            'language_declaration': await self.check_language_tags(url),
            'cyrillic_support': await self.check_cyrillic_rendering(url),
            'yandex_optimization': await self.check_yandex_requirements(url),
            'mobile_optimization': await self.check_mobile_compliance(url),
            'page_speed_russia': await self.check_speed_from_russia(url),
            'schema_markup': await self.check_schema_markup(url),
            'local_hosting': await self.check_hosting_location(url)
        }

        return audit_results

    async def check_cyrillic_rendering(self, url):
        """
        Check if Cyrillic text renders properly
        """
        page_content = await self.fetch_page_content(url)
        cyrillic_issues = []

        # Check for common Cyrillic rendering issues
        if '&#' in page_content:  # HTML entity encoding issues
            cyrillic_issues.append('HTML entity encoding detected')

        if 'font-family' not in page_content.lower():
            cyrillic_issues.append('No explicit font specification for Cyrillic')

        return {
            'status': 'pass' if not cyrillic_issues else 'fail',
            'issues': cyrillic_issues,
            'recommendations': self.get_cyrillic_recommendations()
        }
```

---

## 3. Workflow Templates

### 3.1 Comprehensive Keyword Research Workflow

```python
class RussianKeywordResearchWorkflow:
    async def execute_full_research(self, project_context):
        """
        Complete Russian keyword research workflow for GrabGifts.ru
        """
        # Phase 1: Seed keyword expansion
        seed_keywords = self.load_existing_keywords()
        expanded_keywords = await self.expand_seed_keywords(seed_keywords)

        # Phase 2: Competitor keyword gap analysis
        competitor_keywords = await self.analyze_competitor_keywords()
        keyword_gaps = self.identify_keyword_gaps(expanded_keywords, competitor_keywords)

        # Phase 3: Search intent classification
        classified_keywords = await self.classify_search_intent(expanded_keywords)

        # Phase 4: Difficulty and opportunity scoring
        scored_keywords = await self.score_keyword_opportunities(classified_keywords)

        # Phase 5: Seasonal trend analysis
        seasonal_data = await self.analyze_seasonal_trends(scored_keywords)

        # Phase 6: Voice search optimization
        voice_keywords = await self.identify_voice_search_opportunities(scored_keywords)

        # Phase 7: Local market variations
        regional_variations = await self.analyze_regional_variations(scored_keywords)

        return self.compile_research_report({
            'expanded_keywords': expanded_keywords,
            'keyword_gaps': keyword_gaps,
            'classified_keywords': classified_keywords,
            'scored_keywords': scored_keywords,
            'seasonal_data': seasonal_data,
            'voice_keywords': voice_keywords,
            'regional_variations': regional_variations
        })

    def load_existing_keywords(self):
        """
        Load keywords from russian-keyword-strategy.md
        """
        with open('/Users/komalamin/Documents/Windsurf projects/GrabGiftsRUsite/russian-keyword-strategy.md', 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract keywords from existing strategy
        keywords = self.extract_keywords_from_strategy(content)
        return keywords

    async def expand_seed_keywords(self, seeds):
        """
        Expand seed keywords using multiple sources
        """
        expanded = []

        # Ahrefs expansion
        ahrefs_keywords = await self.ahrefs.keyword_research(seeds)
        expanded.extend(ahrefs_keywords)

        # Yandex Wordstat expansion
        yandex_keywords = await self.yandex_wordstat.get_keyword_suggestions(seeds)
        expanded.extend(yandex_keywords)

        # Related searches expansion
        related_keywords = await self.get_related_searches(seeds)
        expanded.extend(related_keywords)

        return self.deduplicate_and_merge(expanded)
```

### 3.2 Competitor Analysis Workflow

```python
class RussianCompetitorAnalysisWorkflow:
    async def execute_competitor_analysis(self):
        """
        Comprehensive competitor analysis for Russian gaming market
        """
        competitors = self.load_competitors_from_analysis()

        analysis_results = {}

        for competitor in competitors:
            competitor_data = {
                'organic_keywords': await self.analyze_organic_keywords(competitor),
                'paid_keywords': await self.analyze_paid_keywords(competitor),
                'backlink_profile': await self.analyze_backlinks(competitor),
                'content_gaps': await self.identify_content_gaps(competitor),
                'technical_analysis': await self.technical_audit(competitor),
                'serp_features': await self.analyze_serp_features(competitor),
                'local_presence': await self.analyze_local_presence(competitor)
            }

            analysis_results[competitor] = competitor_data

        return self.compile_competitor_report(analysis_results)

    def load_competitors_from_analysis(self):
        """
        Load competitor list from competitive analysis file
        """
        with open('/Users/komalamin/Documents/Windsurf projects/GrabGiftsRUsite/grabgifts_competitive_analysis.md', 'r', encoding='utf-8') as f:
            content = f.read()

        competitors = self.extract_competitor_domains(content)
        return competitors
```

### 3.3 Content Optimization Workflow

```python
class RussianContentOptimizationWorkflow:
    async def optimize_content_for_keywords(self, content_url, target_keywords):
        """
        Optimize content for Russian keywords and search engines
        """
        current_content = await self.fetch_content(content_url)

        optimization_analysis = {
            'keyword_density': self.analyze_keyword_density(current_content, target_keywords),
            'semantic_keywords': await self.identify_semantic_keywords(target_keywords),
            'title_optimization': self.optimize_title_tags(current_content, target_keywords),
            'meta_description': self.optimize_meta_description(current_content, target_keywords),
            'heading_structure': self.optimize_heading_structure(current_content, target_keywords),
            'internal_linking': await self.suggest_internal_links(current_content, target_keywords),
            'schema_markup': self.suggest_schema_markup(current_content, target_keywords),
            'yandex_optimization': self.optimize_for_yandex(current_content, target_keywords)
        }

        return self.generate_optimization_recommendations(optimization_analysis)
```

---

## 4. Usage Examples

### 4.1 Basic Keyword Research

```python
# Initialize the SEO agent
seo_agent = RussianSEOAnalyst()

# Load existing keyword strategy
existing_strategy = seo_agent.load_strategy_file(
    '/Users/komalamin/Documents/Windsurf projects/GrabGiftsRUsite/russian-keyword-strategy.md'
)

# Perform expanded keyword research
new_keywords = await seo_agent.research_keywords(
    seeds=['телеграмм игры', 'криптоигры', 'TON игры'],
    market='RU',
    search_engines=['yandex', 'google.ru'],
    volume_min=500,
    difficulty_max=60
)

# Analyze keyword opportunities
opportunities = seo_agent.analyze_opportunities(
    existing_keywords=existing_strategy['keywords'],
    new_keywords=new_keywords,
    competitor_data=existing_strategy['competitors']
)

# Generate updated strategy recommendations
recommendations = seo_agent.generate_strategy_update(opportunities)
```

### 4.2 Competitor Gap Analysis

```python
# Load competitor data from analysis file
competitors = seo_agent.load_competitors(
    '/Users/komalamin/Documents/Windsurf projects/GrabGiftsRUsite/grabgifts_competitive_analysis.md'
)

# Perform gap analysis
gap_analysis = await seo_agent.analyze_keyword_gaps(
    our_domain='grabgifts.ru',
    competitor_domains=competitors,
    market='RU',
    languages=['ru']
)

# Identify quick win opportunities
quick_wins = seo_agent.identify_quick_wins(
    gap_analysis=gap_analysis,
    difficulty_threshold=40,
    volume_threshold=1000
)

# Generate content recommendations
content_recommendations = seo_agent.generate_content_plan(quick_wins)
```

### 4.3 Technical SEO Audit

```python
# Perform comprehensive technical audit
technical_audit = await seo_agent.audit_technical_seo(
    domain='grabgifts.ru',
    focus_areas=[
        'cyrillic_support',
        'yandex_optimization',
        'mobile_performance',
        'schema_markup',
        'page_speed_russia'
    ]
)

# Generate prioritized fix recommendations
fix_recommendations = seo_agent.prioritize_technical_fixes(
    audit_results=technical_audit,
    business_impact=['user_experience', 'search_visibility', 'conversion_rate']
)

# Create implementation roadmap
implementation_plan = seo_agent.create_technical_roadmap(fix_recommendations)
```

### 4.4 Content Optimization

```python
# Optimize existing content
content_optimization = await seo_agent.optimize_content(
    content_urls=[
        'grabgifts.ru/',
        'grabgifts.ru/telegramm-igry/',
        'grabgifts.ru/kriptogry/'
    ],
    target_keywords_by_page={
        'grabgifts.ru/': ['телеграмм игры', 'бесплатные игры телеграм'],
        'grabgifts.ru/telegramm-igry/': ['игры в телеграмме', 'лучшие игры телеграм'],
        'grabgifts.ru/kriptogry/': ['криптоигры', 'заработок в играх']
    },
    optimization_goals=['yandex_ranking', 'user_engagement', 'conversion_rate']
)

# Generate optimization report
optimization_report = seo_agent.generate_optimization_report(content_optimization)
```

---

## 5. Integration Points with Existing Project Files

### 5.1 Russian Keyword Strategy Integration

```python
class StrategyFileIntegration:
    def __init__(self):
        self.strategy_file = '/Users/komalamin/Documents/Windsurf projects/GrabGiftsRUsite/russian-keyword-strategy.md'

    def extract_current_keywords(self):
        """
        Extract existing keywords from strategy file
        """
        with open(self.strategy_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Parse markdown tables to extract keywords
        keyword_clusters = self.parse_keyword_tables(content)
        return keyword_clusters

    def update_strategy_file(self, new_data):
        """
        Update strategy file with new keyword research
        """
        current_content = open(self.strategy_file, 'r', encoding='utf-8').read()

        # Insert new sections
        updated_content = self.insert_new_keywords(current_content, new_data)
        updated_content = self.update_competitor_analysis(updated_content, new_data)
        updated_content = self.update_performance_metrics(updated_content, new_data)

        # Write updated file
        with open(self.strategy_file, 'w', encoding='utf-8') as f:
            f.write(updated_content)

    def generate_strategy_diff(self, new_analysis):
        """
        Generate diff report of strategy changes
        """
        current_strategy = self.extract_current_keywords()

        diff_report = {
            'new_keywords': self.find_new_keywords(current_strategy, new_analysis),
            'updated_metrics': self.find_metric_changes(current_strategy, new_analysis),
            'priority_changes': self.find_priority_changes(current_strategy, new_analysis),
            'competitor_updates': self.find_competitor_changes(current_strategy, new_analysis)
        }

        return diff_report
```

### 5.2 Competitive Analysis Integration

```python
class CompetitiveAnalysisIntegration:
    def __init__(self):
        self.analysis_file = '/Users/komalamin/Documents/Windsurf projects/GrabGiftsRUsite/grabgifts_competitive_analysis.md'

    def extract_competitor_data(self):
        """
        Extract competitor information from analysis file
        """
        with open(self.analysis_file, 'r', encoding='utf-8') as f:
            content = f.read()

        competitors = {
            'tier_1': self.extract_tier_1_competitors(content),
            'tier_2': self.extract_tier_2_competitors(content),
            'indirect': self.extract_indirect_competitors(content)
        }

        return competitors

    def update_competitive_metrics(self, seo_data):
        """
        Update competitive analysis with fresh SEO metrics
        """
        current_content = open(self.analysis_file, 'r', encoding='utf-8').read()

        # Update competitor metrics
        updated_content = self.update_traffic_estimates(current_content, seo_data)
        updated_content = self.update_keyword_rankings(updated_content, seo_data)
        updated_content = self.update_backlink_profiles(updated_content, seo_data)

        return updated_content
```

### 5.3 Project Status Integration

```python
class ProjectStatusIntegration:
    def __init__(self):
        self.status_file = '/Users/komalamin/Documents/Windsurf projects/GrabGiftsRUsite/PROJECT_STATUS_TRACKER.md'

    def update_seo_progress(self, seo_metrics):
        """
        Update project status with SEO progress
        """
        status_updates = {
            'keyword_rankings': seo_metrics.get('ranking_improvements', {}),
            'organic_traffic': seo_metrics.get('traffic_growth', {}),
            'technical_seo_score': seo_metrics.get('technical_score', 0),
            'content_optimization': seo_metrics.get('content_completion', {}),
            'competitor_analysis': seo_metrics.get('competitive_position', {})
        }

        return self.append_seo_status(status_updates)
```

---

## 6. Russian Language and Market Specifics

### 6.1 Cyrillic Text Processing

```python
class CyrillicSEOProcessor:
    def __init__(self):
        self.alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
        self.transliteration_map = self.load_transliteration_map()

    def generate_url_variations(self, keyword):
        """
        Generate SEO-friendly URL variations for Cyrillic keywords
        """
        variations = []

        # Transliterated version
        transliterated = self.transliterate(keyword)
        variations.append(transliterated)

        # Hyphenated version
        hyphenated = keyword.replace(' ', '-').lower()
        variations.append(hyphenated)

        # Encoded version for special cases
        encoded = self.url_encode_cyrillic(keyword)
        variations.append(encoded)

        return variations

    def optimize_for_yandex_morphology(self, keywords):
        """
        Optimize keywords for Yandex morphological analysis
        """
        optimized = []

        for keyword in keywords:
            morphological_forms = self.generate_morphological_forms(keyword)
            optimized.extend(morphological_forms)

        return list(set(optimized))  # Remove duplicates

    def detect_keyword_intent_russian(self, keyword):
        """
        Detect search intent for Russian keywords
        """
        intent_indicators = {
            'informational': ['что такое', 'как', 'почему', 'где', 'когда', 'гайд', 'обзор'],
            'commercial': ['лучшие', 'топ', 'сравнение', 'выбрать', 'рейтинг'],
            'transactional': ['купить', 'скачать', 'играть', 'регистрация', 'бесплатно'],
            'navigational': ['сайт', 'официальный', 'войти', 'логин']
        }

        keyword_lower = keyword.lower()

        for intent, indicators in intent_indicators.items():
            if any(indicator in keyword_lower for indicator in indicators):
                return intent

        return 'informational'  # Default
```

### 6.2 Yandex-Specific Optimization

```python
class YandexOptimizer:
    def __init__(self):
        self.yandex_factors = {
            'behavioral_factors': 0.3,
            'content_quality': 0.25,
            'technical_factors': 0.2,
            'link_factors': 0.15,
            'commercial_factors': 0.1
        }

    def optimize_for_yandex_ranking(self, page_data):
        """
        Optimize page elements for Yandex ranking factors
        """
        optimizations = {
            'title_optimization': self.optimize_title_for_yandex(page_data.get('title', '')),
            'meta_description': self.optimize_meta_for_yandex(page_data.get('meta_description', '')),
            'content_structure': self.optimize_content_structure(page_data.get('content', '')),
            'internal_linking': self.optimize_internal_linking(page_data),
            'behavioral_signals': self.suggest_behavioral_improvements(page_data),
            'commercial_factors': self.optimize_commercial_factors(page_data)
        }

        return optimizations

    def optimize_title_for_yandex(self, title):
        """
        Optimize title tag for Yandex specific requirements
        """
        recommendations = []

        # Check length (Yandex prefers 50-60 characters)
        if len(title) > 60:
            recommendations.append('Shorten title to 50-60 characters')
        elif len(title) < 30:
            recommendations.append('Expand title to at least 30 characters')

        # Check for brand inclusion
        if 'grabgifts' not in title.lower():
            recommendations.append('Consider including brand name "GrabGifts"')

        # Check for target keyword
        if not any(keyword in title.lower() for keyword in ['телеграм', 'игры', 'криптоигры']):
            recommendations.append('Include primary target keyword in title')

        return {
            'current_title': title,
            'recommendations': recommendations,
            'optimized_examples': self.generate_title_examples(title)
        }
```

### 6.3 Regional Market Analysis

```python
class RussianRegionalAnalyzer:
    def __init__(self):
        self.regions = {
            'moscow': {'geo_id': 213, 'population': 12_500_000},
            'saint_petersburg': {'geo_id': 2, 'population': 5_400_000},
            'novosibirsk': {'geo_id': 65, 'population': 1_600_000},
            'yekaterinburg': {'geo_id': 54, 'population': 1_500_000},
            'kazan': {'geo_id': 43, 'population': 1_300_000}
        }

    async def analyze_regional_keywords(self, keywords):
        """
        Analyze keyword performance across Russian regions
        """
        regional_data = {}

        for region, data in self.regions.items():
            regional_metrics = await self.get_regional_metrics(
                keywords=keywords,
                geo_id=data['geo_id']
            )

            regional_data[region] = {
                'search_volumes': regional_metrics.get('volumes', {}),
                'competition_levels': regional_metrics.get('competition', {}),
                'local_variations': regional_metrics.get('variations', []),
                'demographic_insights': self.get_demographic_insights(region)
            }

        return regional_data

    def generate_regional_strategy(self, regional_data):
        """
        Generate region-specific SEO strategies
        """
        strategies = {}

        for region, data in regional_data.items():
            strategies[region] = {
                'priority_keywords': self.identify_regional_priorities(data),
                'content_recommendations': self.suggest_regional_content(region, data),
                'local_optimization': self.suggest_local_optimization(region),
                'budget_allocation': self.suggest_budget_allocation(region, data)
            }

        return strategies
```

---

## 7. Advanced Features

### 7.1 AI-Powered Content Analysis

```python
class AIContentAnalyzer:
    def __init__(self):
        self.ai_model = "gpt-4-turbo"
        self.analysis_prompts = self.load_analysis_prompts()

    async def analyze_content_quality(self, content, target_keywords):
        """
        AI-powered analysis of content quality for Russian market
        """
        prompt = f"""
        Analyze the following Russian content for SEO quality targeting keywords: {target_keywords}

        Content: {content}

        Evaluate:
        1. Keyword integration naturalness
        2. Content depth and authority
        3. User intent satisfaction
        4. Russian cultural relevance
        5. Yandex ranking factors alignment

        Provide specific recommendations for improvement.
        """

        analysis = await self.ai_client.analyze(prompt)
        return self.parse_ai_analysis(analysis)

    async def generate_content_suggestions(self, keyword_cluster):
        """
        Generate content ideas using AI for keyword clusters
        """
        prompt = f"""
        Generate content ideas for Russian Telegram gaming market.

        Target keyword cluster: {keyword_cluster}

        Create:
        1. 5 blog post ideas with engaging Russian titles
        2. 3 landing page concepts
        3. 2 video content ideas
        4. Social media content themes

        Consider Russian gaming culture, Telegram ecosystem, and crypto gaming trends.
        """

        suggestions = await self.ai_client.generate(prompt)
        return self.parse_content_suggestions(suggestions)
```

### 7.2 Real-Time Monitoring System

```python
class RealTimeMonitoringSystem:
    def __init__(self):
        self.monitoring_keywords = []
        self.alert_thresholds = {
            'ranking_drop': 5,  # positions
            'traffic_drop': 20,  # percentage
            'competitor_surge': 10  # percentage
        }

    async def setup_monitoring(self, keywords, competitors):
        """
        Setup real-time monitoring for keywords and competitors
        """
        monitoring_config = {
            'keywords': keywords,
            'competitors': competitors,
            'check_frequency': '1h',
            'alert_channels': ['email', 'telegram', 'slack']
        }

        await self.initialize_monitoring(monitoring_config)

    async def detect_ranking_changes(self):
        """
        Detect significant ranking changes
        """
        current_rankings = await self.get_current_rankings()
        previous_rankings = await self.get_previous_rankings()

        changes = self.calculate_ranking_changes(current_rankings, previous_rankings)

        alerts = []
        for keyword, change in changes.items():
            if abs(change) >= self.alert_thresholds['ranking_drop']:
                alerts.append({
                    'type': 'ranking_change',
                    'keyword': keyword,
                    'change': change,
                    'severity': 'high' if abs(change) > 10 else 'medium'
                })

        return alerts

    async def monitor_competitor_movements(self):
        """
        Monitor competitor ranking movements
        """
        competitor_changes = await self.get_competitor_changes()

        alerts = []
        for competitor, changes in competitor_changes.items():
            if changes.get('average_improvement', 0) > self.alert_thresholds['competitor_surge']:
                alerts.append({
                    'type': 'competitor_surge',
                    'competitor': competitor,
                    'improvements': changes,
                    'recommended_actions': self.suggest_counter_actions(competitor, changes)
                })

        return alerts
```

### 7.3 Automated Reporting System

```python
class AutomatedReportingSystem:
    def __init__(self):
        self.report_templates = self.load_report_templates()
        self.recipients = ['seo-team@grabgifts.ru', 'marketing@grabgifts.ru']

    async def generate_weekly_report(self):
        """
        Generate comprehensive weekly SEO report
        """
        report_data = await self.collect_weekly_data()

        report = {
            'executive_summary': self.generate_executive_summary(report_data),
            'keyword_performance': self.analyze_keyword_performance(report_data),
            'competitor_analysis': self.analyze_competitor_changes(report_data),
            'technical_health': self.assess_technical_health(report_data),
            'content_performance': self.analyze_content_performance(report_data),
            'recommendations': self.generate_recommendations(report_data),
            'next_week_priorities': self.suggest_priorities(report_data)
        }

        # Generate visual report
        visual_report = await self.create_visual_report(report)

        # Send report
        await self.send_report(visual_report, self.recipients)

        return report

    def generate_executive_summary(self, data):
        """
        Generate executive summary for stakeholders
        """
        summary = {
            'organic_traffic_change': data.get('traffic_change_percent', 0),
            'ranking_improvements': len(data.get('ranking_improvements', [])),
            'new_keyword_opportunities': len(data.get('new_opportunities', [])),
            'competitor_threats': len(data.get('competitor_threats', [])),
            'technical_issues': len(data.get('technical_issues', [])),
            'key_wins': data.get('key_wins', []),
            'main_challenges': data.get('main_challenges', [])
        }

        return summary
```

---

## 8. Implementation Roadmap

### 8.1 Phase 1: Foundation (Weeks 1-2)
- **Setup core agent infrastructure**
- **Integrate primary SEO tools (Ahrefs, SEMrush)**
- **Establish connection to existing project files**
- **Implement basic keyword research workflows**
- **Setup Yandex Wordstat integration**

### 8.2 Phase 2: Core Features (Weeks 3-4)
- **Implement competitor analysis workflows**
- **Develop Russian-specific optimization features**
- **Create technical SEO audit capabilities**
- **Setup content optimization workflows**
- **Implement regional analysis features**

### 8.3 Phase 3: Advanced Features (Weeks 5-6)
- **Integrate AI-powered content analysis**
- **Setup real-time monitoring system**
- **Implement automated reporting**
- **Create predictive analytics capabilities**
- **Setup performance tracking dashboards**

### 8.4 Phase 4: Optimization & Scaling (Weeks 7-8)
- **Optimize agent performance**
- **Implement advanced automation**
- **Setup integration with other project tools**
- **Create custom reporting templates**
- **Establish monitoring and alerting systems**

---

## 9. Success Metrics

### 9.1 Agent Performance Metrics
- **Response Time**: <5 seconds for basic queries
- **Accuracy**: >95% for keyword data retrieval
- **Coverage**: 100% of target keywords monitored
- **Uptime**: 99.9% availability

### 9.2 SEO Impact Metrics
- **Keyword Rankings**: Track improvements in target keyword positions
- **Organic Traffic**: Monitor traffic growth from Russian search engines
- **SERP Features**: Track featured snippet and SERP feature captures
- **Competitor Performance**: Monitor relative competitive position

### 9.3 Business Impact Metrics
- **Content Creation Efficiency**: Reduce content research time by 60%
- **Optimization Speed**: Increase optimization implementation speed by 40%
- **Strategic Decision Making**: Provide data-driven insights for strategy decisions
- **ROI Improvement**: Demonstrate clear ROI from SEO investments

---

## 10. Conclusion

This SEO analysis sub-agent specification provides a comprehensive framework for automated Russian market SEO analysis specifically tailored for the GrabGifts.ru project. The agent integrates seamlessly with existing project files, leverages multiple data sources, and provides actionable insights for the Russian Telegram gaming market.

The agent's design emphasizes:
- **Russian market expertise** with Cyrillic text processing and Yandex optimization
- **Gaming industry focus** with specific knowledge of Telegram and crypto gaming
- **Integration capabilities** with existing project documentation and strategy
- **Automation potential** for reducing manual SEO analysis workload
- **Scalability** for growing with the project's needs

Implementation of this agent will significantly enhance the project's SEO capabilities, providing the competitive edge needed to succeed in the rapidly evolving Russian Telegram gaming market.

---

*This specification document serves as the blueprint for implementing a sophisticated SEO analysis agent tailored specifically for the Russian market and GrabGifts.ru project requirements.*