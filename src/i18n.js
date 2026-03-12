export const translations = {
  en: {
    nav: { features: 'Features', comparison: 'Comparison', docs: 'Docs', github: 'GitHub' },
    hero: { badge: 'Open Source', title: 'The Agent Operating System', subtitle: 'Production-Grade Autonomous AI Agents in Rust. 180ms cold start, 40MB memory, 16 security layers, 40 channel adapters.', getStarted: 'Get Started', githubRepo: 'GitHub Repo', systemPreview: 'System Preview' },
    stats: { coldStart: 'Cold Start', memory: 'Memory', security: 'Security Layers', channels: 'Channels' },
    features: { title: 'Built-in Hands', subtitle: 'Seven autonomous capability units that work out of the box', feature1Title: 'Seven Hands. Infinite Automation.', feature1Desc: 'Each Hand is a self-contained automation unit with its own model, tools, and workflow. Think of them as AI employees that clock in at midnight and never ask for a raise.' },
    featureCards: [
      { title: 'Clip', description: 'Auto-converts YouTube videos into vertical shorts with AI captions and voice-over. Publishes directly to Telegram. Your content pipeline runs itself — no editors needed.' },
      { title: 'Lead', description: 'Daily autonomous prospect discovery with ICP-based scoring, deduplication, and CSV export. Wake up to a fresh list of qualified leads every morning.' },
      { title: 'Collector', description: 'OSINT-grade intelligence monitoring with change detection. Tracks competitors, news, and signals — alerts you only when something meaningful shifts.' },
      { title: 'Predictor', description: 'Superforecasting engine with calibrated probabilistic reasoning. Model market movements and business outcomes before your competitors do.' },
      { title: 'Researcher', description: 'Deep autonomous research with credibility evaluation. Produces structured reports with source quality scoring — not just web search summaries.' },
      { title: 'Twitter + Browser', description: 'Autonomous X/Twitter management with human approval gates. Full browser automation with purchase guardrails — power without losing control.' }
    ],
    workflows: { title: 'What can you build?', subtitle: 'Production-ready workflows for autonomous operations', workflow1Title: 'Replace Entire Workflows with a Single Hand', workflow1Desc: "Librefang doesn't just assist — it takes over. These are the operations you'd otherwise hire people for." },
    workflowCards: [
      { title: 'Content Pipeline', description: "Clip + Twitter working together: monitor trending videos, cut shorts, add captions, publish to social — all while you're offline." },
      { title: 'Sales Prospecting', description: "Lead runs nightly: discovers prospects, scores by ICP fit, removes duplicates, exports a clean CSV. Wake up ready to sell." },
      { title: 'Competitive Intelligence', description: "Collector watches competitor sites, pricing, job boards, and news. Alerts you the moment something changes — not after you notice it." },
      { title: 'Multi-Agent Orchestration', description: "Chain Hands with workflow orchestration. Build pipelines like: Researcher → Predictor → Clip → broadcast to 40 channels in one run." },
      { title: 'Migrate from OpenClaw', description: "One command migration: librefang migrate --from openclaw. Your agents, memory, and skills transfer without manual reconfiguration." },
      { title: 'Production Security', description: "WASM sandbox, Merkle audit chain, SSRF protection, prompt injection scanning, GCRA rate limiting — 16 layers so you can deploy with confidence." }
    ],
    comparison: { title: 'How we compare', subtitle: 'Librefang vs other agent frameworks', openclaw: 'OpenClaw', zeroclaw: 'ZeroClaw', librefang: 'Librefang', metric: 'Metric', librefangVs: 'Librefang vs OpenClaw vs ZeroClaw', subtitle2: 'Built in Rust. Engineered for production, not prototypes.' },
    install: { title: 'Get Started', subtitle: 'Install Librefang and start building autonomous agents in minutes', requirements: 'Requirements', whatYouGet: 'What You Get', threeSteps: 'Three Steps to Autonomous AI', install: 'Install', initialize: 'Initialize', initializeDesc: 'Follow the interactive setup to connect your LLM API key and messaging channels', startAgents: 'Start Agents', startAgentsDesc: 'Agents run as background daemons. Use the desktop app or web UI to monitor and manage.', copy: 'Copy', copied: 'Copied!', curl: 'curl -fsSL', or: 'or', npm: 'npm', pnpm: 'pnpm', cargo: 'cargo', brew: 'brew', installText: 'install', more: 'More installation options', singleBinary: 'One Command. Then Walk Away.', singleBinaryDesc: 'Single binary. No Docker required. Runs on your laptop, a VPS, or a Raspberry Pi. Start autonomous agents in under 60 seconds.' },
    faq: { title: 'Frequently Asked Questions' },
    footer: { description: 'Librefang is a production-grade Agent Operating System built in Rust. Open source, privacy-focused, and built for 24/7 autonomous operation.', privacy: 'Privacy', license: 'License', project: 'Project', community: 'Community', issues: 'Issues', discussions: 'Discussions', docs: 'Docs', quickStart: 'Quick Start', agentOS: 'Agent Operating System', agentOSDesc: 'Production-grade, Rust-powered.' }
  },
  zh: {
    nav: { features: '特性', comparison: '对比', docs: '文档', github: 'GitHub' },
    hero: { badge: '开源', title: '代理操作系统', subtitle: 'Rust 构建的生产级自主 AI 代理。180ms 冷启动，40MB 内存，16 层安全，40 个渠道适配器。', getStarted: '开始使用', githubRepo: 'GitHub 仓库', systemPreview: '系统预览' },
    stats: { coldStart: '冷启动', memory: '内存', security: '安全层', channels: '渠道' },
    features: { title: '内置能力单元', subtitle: '开箱即用的七个自主能力单元', feature1Title: '七大能力单元，无限自动化', feature1Desc: '每个 Hand 都是一个独立的自动化单元，配有专属模型、工具和工作流。可以把它们想象成午夜上班、永不要求加薪的 AI 员工。' },
    featureCards: [
      { title: 'Clip', description: '自动将 YouTube 视频转换为竖版短视频，配有 AI 字幕和配音。直接发布到 Telegram。你的内容管道自动运行——无需编辑。' },
      { title: 'Lead', description: '每日自主潜在客户发现，基于 ICP 评分、去重和 CSV 导出。每天早上醒来都会收到新的合格潜在客户名单。' },
      { title: 'Collector', description: 'OSINT 级情报监控，配备变化检测。追踪竞争对手、新闻和信号——只在有意义的变化发生时提醒你。' },
      { title: 'Predictor', description: '具有校准概率推理的超级预测引擎。在竞争对手之前预测市场走势和业务结果。' },
      { title: 'Researcher', description: '具有可信度评估的深度自主研究。生成带有来源质量评分的结构化报告——不仅仅是网络搜索摘要。' },
      { title: 'Twitter + Browser', description: '带人工审核门槛的自主 X/Twitter 管理。完整的浏览器自动化和购买防护——强大而不失控。' }
    ],
    workflows: { title: '可以构建什么？', subtitle: '用于自主运行的生产就绪工作流', workflow1Title: '用一个 Hand 替代整个工作流', workflow1Desc: 'Librefang 不仅仅是协助——它会接管。这些是你原本需要雇人来做的工作。' },
    workflowCards: [
      { title: '内容管道', description: 'Clip + Twitter 协同工作：监控趋势视频、剪辑短片、添加字幕、发布到社交媒体——全都在你离线时完成。' },
      { title: '销售潜在客户', description: 'Lead 每晚运行：发现潜在客户、按 ICP 匹配评分、去重、导出干净的 CSV。醒来就能开始销售。' },
      { title: '竞争情报', description: 'Collector 监控竞争对手网站、价格、招聘公告和新闻。一旦有变化就提醒你——而不是等你注意到之后。' },
      { title: '多代理编排', description: '使用工作流编排链接 Hands。构建这样的管道：Researcher → Predictor → Clip → 一次性广播到 40 个渠道。' },
      { title: '从 OpenClaw 迁移', description: '一条命令迁移：librefang migrate --from openclaw。你的代理、记忆和技能会自动转移，无需手动配置。' },
      { title: '生产级安全', description: 'WASM 沙箱、Merkle 审计链、SSRF 防护、提示注入扫描、GCRA 速率限制——16 层安全保障，放心部署。' }
    ],
    comparison: { title: '性能对比', subtitle: 'Librefang 与其他代理框架的对比', openclaw: 'OpenClaw', zeroclaw: 'ZeroClaw', librefang: 'Librefang', metric: '指标', librefangVs: 'Librefang vs OpenClaw vs ZeroClaw', subtitle2: 'Rust 构建。为生产环境设计，非原型。' },
    install: { title: '开始使用', subtitle: '安装 Librefang并在几分钟内开始构建自主代理', requirements: '要求', whatYouGet: '你将获得', threeSteps: '三步实现自主 AI', install: '安装', initialize: '初始化', initializeDesc: '按照交互式设置连接你的 LLM API 密钥和消息渠道', startAgents: '启动代理', startAgentsDesc: '代理作为后台守护进程运行。使用桌面应用或 Web UI 监控和管理。', copy: '复制', copied: '已复制！', curl: 'curl -fsSL', or: '或', npm: 'npm', pnpm: 'pnpm', cargo: 'cargo', brew: 'brew', installText: '安装', more: '更多安装选项', singleBinary: '一条命令，然后走开', singleBinaryDesc: '单个二进制文件。无需 Docker。可以在笔记本、VPS 或树莓派上运行。60 秒内启动自主代理。' },
    faq: { title: '常见问题' },
    footer: { description: 'Librefang 是用 Rust 构建的生产级代理操作系统。开源、注重隐私，专为 24/7 自主运行而设计。', privacy: '隐私', license: '许可证', project: '项目', community: '社区', issues: '问题', discussions: '讨论', docs: '文档', quickStart: '快速开始', agentOS: '代理操作系统', agentOSDesc: '生产级，Rust 驱动。' }
  },
  de: {
    nav: { features: 'Funktionen', comparison: 'Vergleich', docs: 'Dokumentation', github: 'GitHub' },
    hero: { badge: 'Open Source', title: 'Das Agenten-Betriebssystem', subtitle: 'Produktionsreifes Autonomes AI in Rust. 180ms Cold Start, 40MB Speicher, 16 Sicherheitsschichten, 40 Kanaladapter.', getStarted: 'Loslegen', githubRepo: 'GitHub-Repo', systemPreview: 'Systemvorschau' },
    stats: { coldStart: 'Cold Start', memory: 'Speicher', security: 'Sicherheitsschichten', channels: 'Kanäle' },
    features: { title: 'Integrierte Hands', subtitle: 'Sieben autonome Fähigkeiten, die sofort einsatzbereit sind', feature1Title: 'Sieben Hands. Unendliche Automatisierung.', feature1Desc: 'Jede Hand ist eine eigenständige Automatisierungseinheit mit eigenem Modell, Werkzeugen und Workflow. Denken Sie an AI-Mitarbeiter, die um Mitternacht erscheinen und nie um Gehaltserhöhung bitten.' },
    featureCards: [
      { title: 'Clip', description: 'Konvertiert YouTube-Videos automatisch in vertikale Shorts mit KI-Untertiteln und Sprachausgabe. Direkt auf Telegram veröffentlicht. Ihre Inhalts-Pipeline läuft von selbst — keine Editoren nötig.' },
      { title: 'Lead', description: 'Tägliche autonome Prospecting mit ICP-basierter Bewertung, Deduplizierung und CSV-Export. Wachen Sie jeden Morgen mit einer frischen Liste qualifizierter Leads auf.' },
      { title: 'Collector', description: 'OSINT-grade Intelligence-Überwachung mit Änderungserkennung. Verfolgt Konkurrenten, Nachrichten und Signale — warnt Sie nur, wenn sich etwas Bedeutsames ändert.' },
      { title: 'Predictor', description: 'Superforecasting-Engine mit kalibrierter probabilistischer Reasoning. Prognostizieren Sie Marktveränderungen und Geschäftsergebnisse, bevor Ihre Konkurrenten es tun.' },
      { title: 'Researcher', description: 'Tiefe autonome Recherche mit Glaubwürdigkeitsbewertung. Erstellt strukturierte Berichte mit Quellenqualitätsbewertung — nicht nur Websuch-Zusammenfassungen.' },
      { title: 'Twitter + Browser', description: 'Autonomes X/Twitter-Management mit menschlichen Genehmigungsschwellen. Vollständige Browser-Automatisierung mit Kaufschutz — Kraft ohne Kontrollverlust.' }
    ],
    workflows: { title: 'Was können Sie bauen?', subtitle: 'Produktionsreife Workflows für autonomen Betrieb', workflow1Title: 'Ersetzen Sie gesamte Workflows durch eine einzige Hand', workflow1Desc: 'Librefang hilft nicht nur — es übernimmt. Dies sind die Aufgaben, für die Sie sonst Menschen einstellen würden.' },
    workflowCards: [
      { title: 'Inhalts-Pipeline', description: 'Clip + Twitter arbeiten zusammen: überwachen Trends, schneiden Shorts, fügen Untertitel hinzu, veröffentlichen auf Social Media — alles während Sie offline sind.' },
      { title: 'Vertriebs-Prospecting', description: 'Lead läuft nachts: entdeckt Prospects, bewertet nach ICP-Fit, entfernt Duplikate, exportiert saubere CSV. Wach auf und sei verkaufsbereit.' },
      { title: 'Wettbewerbsintelligenz', description: 'Collector überwacht Konkurrenten-Websites, Preise, Jobbörsen und Nachrichten. Warnt Sie sofort, wenn sich etwas ändert — nicht nachdem Sie es bemerkt.' },
      { title: 'Multi-Agenten-Orchestrierung', description: 'Verketten Sie Hands mit Workflow-Orchestrierung. Bauen Sie Pipelines wie: Researcher → Predictor → Clip → Broadcast zu 40 Kanälen in einem Durchlauf.' },
      { title: 'Von OpenClaw migrieren', description: 'Ein-Befehl-Migration: librefang migrate --from openclaw. Ihre Agents, Memory und Skills werden ohne manuelle Neukonfiguration übertragen.' },
      { title: 'Produktionssicherheit', description: 'WASM-Sandbox, Merkle-Audit-Kette, SSRF-Schutz, Prompt-Injection-Scanning, GCRA-Rate-Limiting — 16 Schichten, damit Sie mit Vertrauen bereitstellen können.' }
    ],
    comparison: { title: 'Vergleich', subtitle: 'Librefang vs. andere Agenten-Frameworks', openclaw: 'OpenClaw', zeroclaw: 'ZeroClaw', librefang: 'Librefang', metric: 'Metrik', librefangVs: 'Librefang vs OpenClaw vs ZeroClaw', subtitle2: 'In Rust gebaut. Für Produktion entwickelt, nicht für Prototypen.' },
    install: { title: 'Loslegen', subtitle: 'Installieren Sie Librefang und bauen Sie in Minuten autonome Agenten', requirements: 'Anforderungen', whatYouGet: 'Was Sie bekommen', threeSteps: 'Drei Schritte zu autonomer AI', install: 'Installieren', initialize: 'Initialisieren', initializeDesc: 'Folgen Sie dem interaktiven Setup, um Ihren LLM-API-Schlüssel und Messaging-Kanäle zu verbinden', startAgents: 'Agenten starten', startAgentsDesc: 'Agenten laufen als Hintergrund-Daemons. Verwenden Sie die Desktop-App oder Web-UI zur Überwachung und Verwaltung.', copy: 'Kopieren', copied: 'Kopiert!', curl: 'curl -fsSL', or: 'oder', npm: 'npm', pnpm: 'pnpm', cargo: 'cargo', brew: 'brew', installText: 'install', more: 'Weitere Installationsoptionen', singleBinary: 'Ein Befehl. Dann weg.', singleBinaryDesc: 'Einzelne Binary. Kein Docker erforderlich. Läuft auf Ihrem Laptop, einem VPS oder einem Raspberry Pi. Starten Sie autonome Agenten in unter 60 Sekunden.' },
    faq: { title: 'FAQ' },
    footer: { description: 'Librefang ist ein produktionsreifes Agenten-Betriebssystem in Rust. Open Source, datenschutzorientiert und für 24/7 autonomen Betrieb konzipiert.', privacy: 'Datenschutz', license: 'Lizenz', project: 'Projekt', community: 'Community', issues: 'Probleme', discussions: 'Diskussionen', docs: 'Dokumentation', quickStart: 'Schnellstart', agentOS: 'Agenten-Betriebssystem', agentOSDesc: 'Produktionsreif, Rust-basiert.' }
  },
  ja: {
    nav: { features: '機能', comparison: '比較', docs: 'ドキュメント', github: 'GitHub' },
    hero: { badge: 'オープンソース', title: 'エージェントオペレーティングシステム', subtitle: 'Rustで構築された本番対応自律型AI。180msコールドスタート、40MBメモリ、16層のセキュリティ、40のチャンネルアダプター。', getStarted: '始める', githubRepo: 'GitHubリポジトリ', systemPreview: 'システムプレビュー' },
    stats: { coldStart: 'コールドスタート', memory: 'メモリ', security: 'セキュリティ層', channels: 'チャンネル' },
    features: { title: '組み込みHands', subtitle: '箱から出してすぐに使える7つの自律的能力', feature1Title: '7つのHands。無限の自動化。', feature1Desc: '各Handは独自のモデル、ツール、ワークフローを備えた自己完結型の自動化ユニットです。午夜に出勤し、給与を要求しないAI従業員を考えてください。' },
    featureCards: [
      { title: 'Clip', description: 'YouTube動画をAI字幕とナレーション付きで自動的に縦型ショートに変換。Telegramに直接公開。コンテンツパイプラインが自動的に動作——編集者は不要。' },
      { title: 'Lead', description: 'ICPベースのスコアリング、重複排除、CSVエクスポートによる毎日の自律的な見込み客発見。每朝、新しい適格見込み客リストで目覚める。' },
      { title: 'Collector', description: '変更検出機能を備えたOSINTグレードのインテリジェンスモニタリング。競合、ニュース、信号を追踪——意味のある変化があった時だけアラート。' },
      { title: 'Predictor', description: '校正された確率的推論を持つスーパ予測エンジン。競合より先に市場の動きとビジネス結果を予測。' },
      { title: 'Researcher', description: '信頼性評価を備えた深い自律的研究。ソース品質スコアリング付きの構造化レポートを作成——単なるウェブ検索の要約ではない。' },
      { title: 'Twitter + Browser', description: '人間による承認ゲート付きの自律的なX/Twitter管理。購入ガードレイル付きの完全なブラウザ自動化——コントロールを失わずにパワーを獲得。' }
    ],
    workflows: { title: '何を作れますか？', subtitle: '自律運用に向けた本番対応ワークフロー', workflow1Title: '単一のHandで Entire Workflows を置換', workflow1Desc: 'Librefang は単 помощник ではない — 引き継ぎます。これらはあなたが人を雇う otherwise の操作です。' },
    workflowCards: [
      { title: 'コンテンツパイプライン', description: 'Clip + Twitter が協調動作：トレンド動画を監視、ショートを剪辑、字幕を追加、SNSに公開——オフラインの間も全て自動化。' },
      { title: '営業見込み客', description: 'Lead が毎晩実行：見込み客を発見、ICP適合でスコアリング、重複を削除、クリーンなCSVをエクスポート。起床时就営業準備完了。' },
      { title: '競合インテリジェンス', description: 'Collector が競合サイト、価格、求人ニュースを監視。変化があったら即座にアラート——あなたが気づいてからではない。' },
      { title: 'マルチエージェントオーケストレーション', description: 'ワークフローオーケストレーションでHandsをチェーン。Researcher → Predictor → Clip → 40チャンネルへのブロードキャストのようなパイプラインを構築。' },
      { title: 'OpenClawから移行', description: 'ワンコマンド移行：librefang migrate --from openclaw。エージェント、メモリ、技能が手动設定不要で転送。' },
      { title: '本番セキュリティ', description: 'WASMサンドボックス、Merkle監査チェーン、SSRF保護、プロンプトインジェクションスキャン、GCRAレート制限——16層で自信を持ってデプロイ。' }
    ],
    comparison: { title: '比較', subtitle: 'Librefangと他のエージェントフレームワーク', openclaw: 'OpenClaw', zeroclaw: 'ZeroClaw', librefang: 'Librefang', metric: 'メトリクス', librefangVs: 'Librefang vs OpenClaw vs ZeroClaw', subtitle2: 'Rustで構築。本番用に設計、プロトタイプではない。' },
    install: { title: '始める', subtitle: 'Librefangをインストールして数分で自律エージェントを構築', requirements: '要件', whatYouGet: '得られるもの', threeSteps: '自律AIへの3ステップ', install: 'インストール', initialize: '初期化', initializeDesc: 'インタラクティブセットアップに従ってLLM APIキーとメッセージングチャンネルを接続', startAgents: 'エージェント起動', startAgentsDesc: 'エージェントはバックグラウンドデーモンとして実行。デスクトップアプリまたはWeb UIで監視・管理。', copy: 'コピー', copied: 'コピーしました！', curl: 'curl -fsSL', or: 'または', npm: 'npm', pnpm: 'pnpm', cargo: 'cargo', brew: 'brew', installText: 'install', more: 'その他のインストール方法', singleBinary: 'ワンコマンド、それだけで OK', singleBinaryDesc: '単一バイナリ。Docker不要。ラップトップ、VPS、ラズベリーPiで実行可能。60秒以内に自律エージェントを起動。' },
    faq: { title: 'FAQ' },
    footer: { description: 'LibrefangはRustで構築された本番対応エージェントオペレーティングシステムです。オープンソース、プライバシー重視、24時間365日自律運用向けに設計されています。', privacy: 'プライバシー', license: 'ライセンス', project: 'プロジェクト', community: 'コミュニティ', issues: '問題', discussions: 'ディスカッション', docs: 'ドキュメント', quickStart: 'クイックスタート', agentOS: 'エージェントオペレーティングシステム', agentOSDesc: '本番対応、Rust駆動。' }
  }
}

export const languages = [
  { code: 'en', name: 'English', url: '/' },
  { code: 'zh', name: '简体中文', url: '/zh/' },
  { code: 'de', name: 'Deutsch', url: '/de/' },
  { code: 'ja', name: '日本語', url: '/ja/' },
]
