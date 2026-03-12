import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const translations = {
  en: {
    nav: { features: 'Features', comparison: 'Comparison', docs: 'Docs', github: 'GitHub' },
    hero: { badge: 'Open Source', title: 'The Agent Operating System', subtitle: 'Production-Grade Autonomous AI Agents in Rust. 180ms cold start, 40MB memory, 16 security layers, 40 channel adapters.' },
    stats: { coldStart: 'Cold Start', memory: 'Memory', security: 'Security Layers', channels: 'Channels' },
    features: { title: 'Built-in Hands', subtitle: 'Seven autonomous capability units that work out of the box' },
    workflows: { title: 'What can you build?', subtitle: 'Production-ready workflows for autonomous operations' },
    comparison: { title: 'How we compare', subtitle: 'Librefang vs other agent frameworks' },
    install: { title: 'Get Started', subtitle: 'Install Librefang and start building autonomous agents in minutes' },
    faq: { title: 'FAQ' },
    footer: { description: 'Librefang is a production-grade Agent Operating System built in Rust. Open source, privacy-focused, and built for 24/7 autonomous operation.' }
  },
  zh: {
    nav: { features: '特性', comparison: '对比', docs: '文档', github: 'GitHub' },
    hero: { badge: '开源', title: '代理操作系统', subtitle: 'Rust 构建的生产级自主 AI 代理。180ms 冷启动，40MB 内存，16 层安全，40 个渠道适配器。' },
    stats: { coldStart: '冷启动', memory: '内存', security: '安全层', channels: '渠道' },
    features: { title: '内置能力单元', subtitle: '开箱即用的七个自主能力单元' },
    workflows: { title: '可以构建什么？', subtitle: '用于自主运行的生产就绪工作流' },
    comparison: { title: '性能对比', subtitle: 'Librefang 与其他代理框架的对比' },
    install: { title: '开始使用', subtitle: '安装 Librefang并在几分钟内开始构建自主代理' },
    faq: { title: '常见问题' },
    footer: { description: 'Librefang 是用 Rust 构建的生产级代理操作系统。开源、注重隐私，专为 24/7 自主运行而设计。' }
  },
  de: {
    nav: { features: 'Funktionen', comparison: 'Vergleich', docs: 'Dokumentation', github: 'GitHub' },
    hero: { badge: 'Open Source', title: 'Das Agenten-Betriebssystem', subtitle: 'Produktionsreifes Autonomes AI in Rust. 180ms Cold Start, 40MB Speicher, 16 Sicherheitsschichten, 40 Kanaladapter.' },
    stats: { coldStart: 'Cold Start', memory: 'Speicher', security: 'Sicherheitsschichten', channels: 'Kanäle' },
    features: { title: 'Integrierte Hands', subtitle: 'Sieben autonome Fähigkeiten, die sofort einsatzbereit sind' },
    workflows: { title: 'Was können Sie bauen?', subtitle: 'Produktionsreife Workflows für autonomen Betrieb' },
    comparison: { title: 'Vergleich', subtitle: 'Librefang vs. andere Agenten-Frameworks' },
    install: { title: 'Loslegen', subtitle: 'Installieren Sie Librefang und bauen Sie in Minuten autonome Agenten' },
    faq: { title: 'FAQ' },
    footer: { description: 'Librefang ist ein produktionsreifes Agenten-Betriebssystem in Rust. Open Source, datenschutzorientiert und für 24/7 autonomen Betrieb konzipiert.' }
  },
  ja: {
    nav: { features: '機能', comparison: '比較', docs: 'ドキュメント', github: 'GitHub' },
    hero: { badge: 'オープンソース', title: 'エージェントオペレーティングシステム', subtitle: 'Rustで構築された本番対応自律型AI。180msコールドスタート、40MBメモリ、16層のセキュリティ、40のチャンネルアダプター。' },
    stats: { coldStart: 'コールドスタート', memory: 'メモリ', security: 'セキュリティ層', channels: 'チャンネル' },
    features: { title: '組み込みHands', subtitle: '箱から出してすぐに使える7つの自律的能力' },
    workflows: { title: '何を作れますか？', subtitle: '自律運用に向けた本番対応ワークフロー' },
    comparison: { title: '比較', subtitle: 'Librefangと他のエージェントフレームワーク' },
    install: { title: '始める', subtitle: 'Librefangをインストールして数分で自律エージェントを構築' },
    faq: { title: 'FAQ' },
    footer: { description: 'LibrefangはRustで構築された本番対応エージェントオペレーティングシステムです。オープンソース、プライバシー重視、24時間365日自律運用向けに設計されています。' }
  }
}

const languages = [
  { code: 'en', name: 'English', url: '/' },
  { code: 'zh', name: '简体中文', url: '/zh/' },
  { code: 'de', name: 'Deutsch', url: '/de/' },
  { code: 'ja', name: '日本語', url: '/ja/' },
]

function getCurrentLang() {
  const path = window.location.pathname
  if (path.startsWith('/zh')) return 'zh'
  if (path.startsWith('/de')) return 'de'
  if (path.startsWith('/ja')) return 'ja'
  return 'en'
}

const t = translations[getCurrentLang()]

const features = [
  { icon: 'movie_edit', title: 'Clip', description: 'Auto-converts YouTube videos into vertical shorts with AI captions and voice-over. Publishes directly to Telegram. Your content pipeline runs itself — no editors needed.' },
  { icon: 'person_search', title: 'Lead', description: 'Daily autonomous prospect discovery with ICP-based scoring, deduplication, and CSV export. Wake up to a fresh list of qualified leads every morning.' },
  { icon: 'radar', title: 'Collector', description: 'OSINT-grade intelligence monitoring with change detection. Tracks competitors, news, and signals — alerts you only when something meaningful shifts.' },
  { icon: 'trending_up', title: 'Predictor', description: 'Superforecasting engine with calibrated probabilistic reasoning. Model market movements and business outcomes before your competitors do.' },
  { icon: 'manage_search', title: 'Researcher', description: 'Deep autonomous research with credibility evaluation. Produces structured reports with source quality scoring — not just web search summaries.' },
  { icon: 'rss_feed', title: 'Twitter + Browser', description: 'Autonomous X/Twitter management with human approval gates. Full browser automation with purchase guardrails — power without losing control.' },
]

const workflows = [
  { icon: 'video_library', title: 'Content Pipeline', description: 'Clip + Twitter working together: monitor trending videos, cut shorts, add captions, publish to social — all while you\'re offline.' },
  { icon: 'filter_alt', title: 'Sales Prospecting', description: 'Lead runs nightly: discovers prospects, scores by ICP fit, removes duplicates, exports a clean CSV. Wake up ready to sell.' },
  { icon: 'monitoring', title: 'Competitive Intelligence', description: 'Collector watches competitor sites, pricing, job boards, and news. Alerts you the moment something changes — not after you notice it.' },
  { icon: 'hub', title: 'Multi-Agent Orchestration', description: 'Chain Hands with workflow orchestration. Build pipelines like: Researcher → Predictor → Clip → broadcast to 40 channels in one run.' },
  { icon: 'sync_alt', title: 'Migrate from OpenClaw', description: 'One command migration: librefang migrate --from openclaw. Your agents, memory, and skills transfer without manual reconfiguration.' },
  { icon: 'security', title: 'Production Security', description: 'WASM sandbox, Merkle audit chain, SSRF protection, prompt injection scanning, GCRA rate limiting — 16 layers so you can deploy with confidence.' },
]

const comparisonData = [
  { metric: 'Cold Start', openclaw: '2.5s+', zeroclaw: '4s+', librefang: '180ms' },
  { metric: 'Idle Memory', openclaw: '180MB+', zeroclaw: '250MB+', librefang: '40MB' },
  { metric: 'Binary Size', openclaw: '100MB+', zeroclaw: '200MB+', librefang: '32MB' },
  { metric: 'Security Layers', openclaw: '3', zeroclaw: '2', librefang: '16' },
  { metric: 'Channel Adapters', openclaw: '15', zeroclaw: '8', librefang: '40' },
  { metric: 'Built-in Hands', openclaw: '0', zeroclaw: '0', librefang: '7' },
]

const faqs = [
  { question: 'What is Librefang?', answer: 'Librefang is a production-grade Agent Operating System built in Rust. Unlike chatbot frameworks, it\'s designed to run autonomous agents 24/7 on schedules — without requiring user prompts. Think of it as the OS layer beneath your AI agents, providing runtime, security, and channel infrastructure.' },
  { question: 'How is it different from OpenClaw?', answer: 'OpenClaw is great for personal use and experimentation. Librefang is what you reach for when you need production-grade reliability — Rust instead of TypeScript, 16 security layers vs basic sandboxing, built-in Hands instead of plugin glue code. Librefang also includes a built-in migration path: librefang migrate --from openclaw.' },
  { question: 'What are Hands?', answer: 'Hands are Librefang\'s autonomous capability units — think of them as enhanced plugins, but self-contained. Each Hand ships with a designated model, tools, and workflow. You don\'t wire anything together; you just activate the Hand. The seven built-in Hands cover video (Clip), prospecting (Lead), intelligence (Collector), forecasting (Predictor), research (Researcher), social media (Twitter), and web automation (Browser).' },
  { question: 'Which LLM providers are supported?', answer: 'Librefang supports 12 mainstream LLM providers including Anthropic, OpenAI, Gemini, Groq, DeepSeek, Mistral, Together, Ollama, vLLM, and more — covering 123+ models total. All providers require API keys; OAuth is not currently supported. Each Hand can be configured to use a different provider.' },
  { question: 'Which channels are supported?', answer: 'Librefang supports 40 channel adapters — the broadest coverage of any agent framework. This includes Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Teams, Google Chat, Feishu, DingTalk, Mastodon, Bluesky, LinkedIn, Reddit, IRC, and 24+ more. If your team uses it, Librefang probably connects to it.' },
  { question: 'Is it production-ready?', answer: 'Librefang v0.1.0 passes 1,767+ tests with zero Clippy warnings. It has 16 discrete security layers including WASM sandboxing, Merkle hash-chain audit trail, and SSRF protection. Breaking API changes are possible until v1.0, so pin your version in production. The core runtime is stable and used in production deployments today.' },
  { question: 'Where is the GitHub repository?', answer: 'Find Librefang on GitHub: github.com/RightNow-AI/librefang. Star the project to follow releases and feature updates.' },
]

function MaterialIcon({ name, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>
}

function Header({ t }) {
  const currentLangName = languages.find(l => {
    const path = window.location.pathname
    if (path.startsWith('/zh')) return l.code === 'zh'
    if (path.startsWith('/de')) return l.code === 'de'
    if (path.startsWith('/ja')) return l.code === 'ja'
    return l.code === 'en'
  })?.name || 'English'
  const [langOpen, setLangOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 md:px-12 py-4 glass-effect" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center p-1">
            <img src="/logo.png" alt="Librefang Logo" width="32" height="32" className="rounded-md" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight">Librefang</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-400">
          <a className="hover:text-primary transition-colors" href="#features">{t.nav.features}</a>
          <a className="hover:text-primary transition-colors" href="#comparison">{t.nav.comparison}</a>
          <a className="hover:text-primary transition-colors" href="#install">{t.nav.docs}</a>
          <a className="flex items-center gap-1 hover:text-primary transition-colors" href="https://github.com/RightNow-AI/librefang" target="_blank" rel="noopener noreferrer">
            <span>{t.nav.github}</span>
            <MaterialIcon name="open_in_new" className="text-sm" />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-white/10" aria-label="Switch language" onClick={() => setLangOpen(!langOpen)}>
              <MaterialIcon name="language" />
              <span className="hidden sm:inline text-sm font-bold">{currentLangName}</span>
              <MaterialIcon name="expand_more" className="text-sm" />
            </button>
            <div className={`absolute right-0 mt-2 w-40 bg-[#161b22] border border-gray-700/50 rounded-md shadow-2xl ${langOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300 z-50`} role="menu">
              {languages.map((lang, i) => (
                <a key={lang.code} href={lang.url} className={`block px-5 py-3 text-sm font-bold transition-colors ${i === 0 ? 'bg-primary/10 text-primary rounded-t-md' : 'text-gray-400 hover:bg-white/10 hover:text-gray-100'} ${i === languages.length - 1 ? 'rounded-b-md' : ''}`}>
                  {lang.name}
                </a>
              ))}
            </div>
          </div>
          <a href="https://github.com/RightNow-AI/librefang" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center justify-center size-10 rounded-full bg-white/10 text-gray-200 hover:bg-primary hover:text-white transition-all" aria-label="Star on GitHub">
            <svg fill="currentColor" height="20" width="20" viewBox="0 0 256 256">
              <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68Z"></path>
            </svg>
          </a>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <MaterialIcon name={mobileMenuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#080c10]/95">
          <a href="#features" className="block py-2 text-gray-400">Features</a>
          <a href="#comparison" className="block py-2 text-gray-400">Comparison</a>
          <a href="#install" className="block py-2 text-gray-400">Docs</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <header className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[180px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[140px] opacity-10"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left space-y-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full text-sm font-bold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v0.1.0 · Rust-Powered · Open Source
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-100 to-primary">
            Librefang
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
            The production-grade Agent Operating System. Not a chatbot framework — a complete OS for AI agents that runs 24/7, autonomously, while you sleep.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
            <a href="#install" className="bg-primary hover:bg-primary-dark text-white font-extrabold py-5 px-10 rounded-full shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95">
              Get Started
            </a>
            <a href="https://github.com/RightNow-AI/librefang" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/5 text-gray-100 font-bold py-5 px-10 rounded-full border border-gray-600/50 backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 justify-center">
              <svg fill="currentColor" height="20" width="20" viewBox="0 0 256 256">
                <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68Z"></path>
              </svg>
              GitHub Repo
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[2.5rem] border border-gray-700/50 bg-[#0d1117] p-4 shadow-3xl backdrop-blur-sm overflow-hidden">
            <div className="w-full aspect-video rounded-[2rem] overflow-hidden relative">
              <img className="w-full h-full object-cover opacity-80" src="/librefang-vs-claws.png" alt="Librefang Agent OS Interface" width="1920" height="1080" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c10]/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-8 left-8 flex items-center gap-3 pointer-events-none">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">System Preview</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </header>
  )
}

function Stats() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '180ms', label: t.stats.coldStart },
            { value: '40MB', label: t.stats.memory },
            { value: '40', label: t.stats.channels },
            { value: '16', label: t.stats.security },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-3">
              <div className="text-5xl md:text-6xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-gray-400 font-bold text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="px-6 py-32 bg-[#0d1117] rounded-section mx-4 md:mx-12" id="features">
      <div className="max-w-7xl mx-auto space-y-20">
        <header className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">Seven Hands. Infinite Automation.</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">Each Hand is a self-contained automation unit with its own model, tools, and workflow. Think of them as AI employees that clock in at midnight and never ask for a raise.</p>
          <div className="h-2 w-32 bg-primary mx-auto rounded-full"></div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <article key={i} className="bg-[#161b22] p-10 rounded-[2.5rem] border border-gray-700/50 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-3 shadow-sm">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <MaterialIcon name={feature.icon} className="text-4xl font-bold" />
              </div>
              <h3 className="text-2xl font-extrabold mb-5 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Comparison() {
  return (
    <section className="px-6 py-32" id="comparison">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">Librefang vs OpenClaw vs ZeroClaw</h2>
          <p className="text-gray-400 text-xl">Built in Rust. Engineered for production, not prototypes.</p>
        </header>
        <div className="hidden md:block overflow-hidden rounded-[3rem] border border-gray-700/50 bg-white/5 backdrop-blur-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th scope="col" className="p-8 font-bold text-lg">Metric</th>
                <th scope="col" className="p-8 font-bold text-lg text-center border-l border-gray-700/50">OpenClaw</th>
                <th scope="col" className="p-8 font-bold text-lg text-center border-l border-gray-700/50">ZeroClaw</th>
                <th scope="col" className="p-8 font-bold text-lg text-center text-primary border-l border-gray-700/50 bg-primary/5">Librefang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <th scope="row" className="p-8 text-gray-100 font-semibold text-base">{row.metric}</th>
                  <td className="p-8 text-center text-gray-400 border-l border-gray-700/50">{row.openclaw}</td>
                  <td className="p-8 text-center text-gray-400 border-l border-gray-700/50">{row.zeroclaw}</td>
                  <td className="p-8 text-center text-primary font-bold border-l border-gray-700/50 bg-primary/5">{row.librefang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-6">
          {[
            { title: 'Cold Start', val: '180ms' },
            { title: 'Security Layers', val: '16' },
            { title: 'Channel Adapters', val: '40' },
          ].map((item, i) => (
            <article key={i} className="bg-white/8 rounded-[2rem] border border-gray-700/50 p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">{item.title}</h3>
              <dl className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-gray-700/50">
                  <dt className="text-gray-400 font-medium">OpenClaw / ZeroClaw</dt>
                  <dd className="text-gray-400">{i === 0 ? '2.5s – 4s+' : i === 1 ? '2–3 layers' : '8–15'}</dd>
                </div>
                <div className="flex justify-between items-center py-4">
                  <dt className="text-gray-100 font-bold">Librefang</dt>
                  <dd className="text-primary font-black">{item.val}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Workflows() {
  return (
    <section className="px-6 py-32">
      <div className="max-w-7xl mx-auto space-y-20">
        <header className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">Replace Entire Workflows with a Single Hand</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">Librefang doesn't just assist — it takes over. These are the operations you'd otherwise hire people for.</p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflows.map((workflow, i) => (
            <article key={i} className="bg-white/5 rounded-[2.5rem] border border-gray-700/50 p-8 space-y-6 hover:border-primary/50 transition-all group">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                <MaterialIcon name={workflow.icon} className="text-4xl text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">{workflow.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{workflow.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Install() {
  const [copied, setCopied] = useState(false)
  const copyCommand = () => {
    navigator.clipboard.writeText('curl -fsSL https://librefang.sh/install | sh')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="px-6 py-32 bg-[#0d1117] rounded-section mx-4 md:mx-12" id="install">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">One Command. Then Walk Away.</h2>
          <p className="text-gray-400 text-xl">Single binary. No Docker required. Runs on your laptop, a VPS, or a Raspberry Pi. Start autonomous agents in under 60 seconds.</p>
        </header>
        <div className="rounded-[2.5rem] overflow-hidden shadow-3xl bg-[#080c10] border border-gray-700/50">
          <div className="h-12 flex items-center px-6 justify-between">
            <div className="flex gap-2.5">
              <div className="size-3.5 rounded-full bg-gray-50/20"></div>
              <div className="size-3.5 rounded-full bg-gray-50/20"></div>
              <div className="size-3.5 rounded-full bg-gray-50/20"></div>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-black text-white/80">bash — Quick Install</span>
            <div className="w-12"></div>
          </div>
          <div className="p-6 md:p-10 font-mono text-sm md:text-base lg:text-xl leading-relaxed relative bg-black/40">
            <div className="flex items-start gap-3 md:gap-4 overflow-x-auto">
              <span className="text-primary select-none font-bold shrink-0">$</span>
              <code className="flex-1 min-w-0 whitespace-nowrap md:whitespace-normal">
                <span className="text-primary">curl</span>
                <span className="text-white"> -fsSL https://librefang.sh/install</span>
                <span className="text-gray-500"> |</span>
                <span className="text-primary"> sh</span>
              </code>
            </div>
            <button onClick={copyCommand} className="absolute top-6 right-6 md:top-10 md:right-10 text-primary hover:text-white transition-colors p-2.5 md:p-3 bg-primary/10 rounded-xl md:rounded-2xl hover:bg-primary" aria-label="Copy installation command">
              <MaterialIcon name={copied ? 'check' : 'content_copy'} className="text-[24px]" />
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <article className="bg-white/5 rounded-[2rem] border border-gray-700/50 p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <MaterialIcon name="checklist" className="text-primary text-3xl" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Requirements</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3"><span className="text-primary">•</span> Linux / macOS / Windows</li>
              <li className="flex items-center gap-3"><span className="text-primary">•</span> 64MB RAM minimum (256MB recommended)</li>
              <li className="flex items-center gap-3"><span className="text-primary">•</span> x86_64 or ARM64 architecture</li>
              <li className="flex items-center gap-3"><span className="text-primary">•</span> LLM API Key (12 providers supported)</li>
            </ul>
          </article>
          <article className="bg-white/5 rounded-[2rem] border border-gray-700/50 p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <MaterialIcon name="settings_suggest" className="text-primary text-3xl" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">What You Get</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3"><span className="text-primary">•</span> 7 built-in autonomous Hands</li>
              <li className="flex items-center gap-3"><span className="text-primary">•</span> 10 workflow orchestration templates</li>
              <li className="flex items-center gap-3"><span className="text-primary">•</span> 40 channel adapters (incl. Feishu & DingTalk)</li>
              <li className="flex items-center gap-3"><span className="text-primary">•</span> Tauri 2.0 native desktop app</li>
            </ul>
          </article>
        </div>
        <div className="bg-white/5 rounded-[2rem] border border-gray-700/50 p-10 space-y-8">
          <h3 className="text-2xl font-extrabold text-center text-white">Three Steps to Autonomous AI</h3>
          <ol className="space-y-6">
            <li className="flex gap-6 items-start">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-lg flex-shrink-0">1</div>
              <div className="flex-1 pt-1">
                <h4 className="font-bold text-lg mb-2 text-white">Install</h4>
                <pre className="bg-[#080c10] rounded-xl p-4 text-sm font-mono overflow-x-auto max-w-full border border-gray-700/30"><code><span className="text-primary">curl</span> <span className="text-white">-fsSL https://librefang.sh/install | sh</span><br/><span className="text-gray-500"># Windows PowerShell:</span><br/><span className="text-primary">irm</span> <span className="text-white">https://librefang.sh/install.ps1 | iex</span></code></pre>
              </div>
            </li>
            <li className="flex gap-6 items-start">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-lg flex-shrink-0">2</div>
              <div className="flex-1 pt-1">
                <h4 className="font-bold text-lg mb-2 text-white">Initialize</h4>
                <pre className="bg-[#080c10] rounded-xl p-4 text-sm font-mono overflow-x-auto max-w-full border border-gray-700/30"><code><span className="text-primary">librefang init</span><br/><span className="text-gray-500"># Configure your LLM provider and channel tokens</span></code></pre>
                <p className="text-gray-400 mt-3 text-sm">Follow the interactive setup to connect your LLM API key and messaging channels</p>
              </div>
            </li>
            <li className="flex gap-6 items-start">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-lg flex-shrink-0">3</div>
              <div className="flex-1 pt-1">
                <h4 className="font-bold text-lg mb-2 text-white">Start Agents</h4>
                <pre className="bg-[#080c10] rounded-xl p-4 text-sm font-mono overflow-x-auto max-w-full border border-gray-700/30"><code><span className="text-primary">librefang start</span><br/><span className="text-gray-500"># Migrate from OpenClaw:</span><br/><span className="text-primary">librefang migrate</span> <span className="text-white">--from openclaw</span></code></pre>
                <p className="text-gray-400 mt-3 text-sm">Agents run as background daemons. Use the desktop app or web UI to monitor and manage.</p>
              </div>
            </li>
          </ol>
        </div>
        <div className="flex flex-wrap justify-center gap-10 text-sm font-bold text-gray-400">
          {['macOS', 'Linux', 'Windows', 'Raspberry Pi', 'VPS / Cloud'].map((platform, i) => (
            <div key={i} className="flex items-center gap-3">
              <MaterialIcon name="verified" className="text-primary" />
              {platform}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="px-6 py-32" id="faq">
      <div className="max-w-3xl mx-auto space-y-16">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center text-white">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white/5 rounded-[2rem] border border-gray-700/50 overflow-hidden transition-all duration-500" open={i === 0}>
              <summary className="flex items-center justify-between p-8 cursor-pointer select-none list-none">
                <h3 className="font-extrabold text-white text-xl">{faq.question}</h3>
                <div className="bg-primary/10 p-2 rounded-full text-primary group-open:rotate-180 transition-transform">
                  <MaterialIcon name="expand_more" className="font-bold" />
                </div>
              </summary>
              <div className="px-8 pb-8 text-gray-400 text-lg leading-relaxed pt-2 border-t border-gray-700/30">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-20 border-t border-gray-700/50 bg-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
        <div className="flex flex-col items-center md:items-start gap-6">
          <a href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <img src="/logo.png" alt="Librefang Logo" width="32" height="32" className="rounded-md" />
            </div>
            <span className="font-black text-2xl tracking-tight text-white">Librefang</span>
          </a>
          <p className="text-gray-400 text-lg max-w-xs text-center md:text-left leading-relaxed">Agent Operating System. Production-grade, Rust-powered.</p>
        </div>
        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-16 text-sm">
          <div className="space-y-6">
            <h4 className="font-black text-primary uppercase tracking-[0.2em] text-xs">Project</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-bold">
              <li><a className="hover:text-primary transition-colors" href="#features">Features</a></li>
              <li><a className="hover:text-primary transition-colors" href="#comparison">Comparison</a></li>
              <li><a className="hover:text-primary transition-colors" href="#install">Docs</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-primary uppercase tracking-[0.2em] text-xs">Community</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-bold">
              <li><a className="hover:text-primary transition-colors" href="https://github.com/RightNow-AI/librefang/issues" target="_blank" rel="noopener noreferrer">Issues</a></li>
              <li><a className="hover:text-primary transition-colors" href="https://github.com/RightNow-AI/librefang/discussions" target="_blank" rel="noopener noreferrer">Discussions</a></li>
              <li><a className="hover:text-primary transition-colors" href="https://github.com/RightNow-AI/librefang" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="space-y-6 hidden sm:block">
            <h4 className="font-black text-primary uppercase tracking-[0.2em] text-xs">Docs</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-bold">
              <li><a className="hover:text-primary transition-colors" href="https://github.com/RightNow-AI/librefang#readme" target="_blank" rel="noopener noreferrer">Quick Start</a></li>
              <li><a className="hover:text-primary transition-colors" href="https://github.com/RightNow-AI/librefang/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a></li>
              <li><a className="hover:text-primary transition-colors" href="/privacy/">Privacy</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-700/30 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-gray-400">
        <p>© 2026 Librefang.ai</p>
        <div className="flex gap-8">
          <span className="flex items-center gap-2">
            <span className="size-2 bg-primary rounded-full animate-pulse"></span>
            Open Source
          </span>
          <span>Rust-Powered</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const path = window.location.pathname
    if (path.startsWith('/zh')) setLang('zh')
    else if (path.startsWith('/de')) setLang('de')
    else if (path.startsWith('/ja')) setLang('ja')
    else setLang('en')
  }, [])

  const currentT = translations[lang]

  return (
    <div className="bg-background-light font-display text-slate-900 antialiased overflow-x-hidden" style={{ background: '#080c10', minHeight: '100vh' }}>
      <Header t={currentT} />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Comparison />
        <Workflows />
        <Install />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
