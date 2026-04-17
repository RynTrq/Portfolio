export const projects = [
  {
    slug: 'torqussions-ai',
    title: 'Torqussions AI',
    subtitle: 'Collaborative AI Coding Workspace',
    domain: 'FULL_STACK_COLLAB',
    status: 'DEPLOYED',
    featured: true,
    accent: '#D8FF44',
    stack: ['React', 'Vite', 'Express', 'Socket.IO', 'MongoDB', 'Monaco', 'Gemini/Grok/Groq'],
    summary:
      'A full-stack collaborative workspace with project chat, shared files, preview, code execution, invitations, and project-scoped AI replies.',
    outcomes: ['Realtime rooms', 'AI-assisted drafting', 'Preview + execution'],
    bullets: [
      'Built authenticated project rooms with JWT sessions, project membership, invitations, and shared workspace state.',
      'Used Socket.IO for realtime project chat and file-tree events with REST fallback when realtime is unavailable.',
      'Added workspace-native AI replies through configured Gemini, Grok, or Groq providers, including generated file merging.',
    ],
    repoUrl: 'https://github.com/RynTrq/Torqussions',
    liveUrl: 'https://torqussions.up.railway.app/',
    hasDetailPage: true,
  },
  {
    slug: 'torq-ai',
    title: 'Torq AI',
    subtitle: 'AI-Native Build Cockpit',
    domain: 'DEV_WORKSPACE',
    status: 'DEPLOYED',
    featured: true,
    accent: '#74E6FF',
    stack: ['Next.js 16', 'React', 'Prisma', 'PostgreSQL', 'Auth.js', 'Inngest', 'AI SDK'],
    summary:
      'A multi-provider AI coding workspace with project/file management, chat-driven editing, preview, execution, and GitHub import/export.',
    outcomes: ['Project bootstrap', 'Integrated execution', 'GitHub flow'],
    bullets: [
      'Persisted users, projects, files, conversations, and messages in PostgreSQL through Prisma.',
      'Routed AI work across OpenRouter, Groq, and xAI-backed model definitions with health checks and tool-using file operations.',
      'Built GitHub import/export as Inngest functions and kept preview, editor, terminal, and assistant flows in one workspace.',
    ],
    repoUrl: 'https://github.com/RynTrq/Torq-AI',
    liveUrl: 'https://torq-ai.up.railway.app/',
    hasDetailPage: true,
  },
  {
    slug: 'torq-flows',
    title: 'Torq Flows',
    subtitle: 'Temporal-Backed Workflow Builder',
    domain: 'ORCHESTRATION',
    status: 'DEPLOYED',
    featured: false,
    accent: '#86FBA8',
    stack: ['Next.js', 'React Flow', 'FastAPI', 'Temporal', 'PostgreSQL', 'Docker'],
    summary:
      'A full-stack workflow orchestration product that connects a visual builder to backend validation, persistence, webhook execution, and Temporal-backed runs.',
    outcomes: ['Visual orchestration', 'Durable execution', 'Run observability'],
    bullets: [
      'Turned drag-and-drop graphs into backend-owned workflow definitions that can be validated, persisted, executed, and traced.',
      'Supported manual and webhook triggers with run history, logs, final output, and failure visibility.',
      'Used Temporal to make waits, API calls, retries, and longer-running flows durable beyond the browser session.',
    ],
    repoUrl: 'https://github.com/RynTrq/Torq-Flows',
    liveUrl: 'https://torq-flows.up.railway.app/',
    hasDetailPage: true,
  },
  {
    slug: 'torq-stocks',
    title: 'Torq Stocks',
    subtitle: 'Market Dashboard + Quant Workspace',
    domain: 'FINTECH',
    status: 'DEPLOYED',
    featured: false,
    accent: '#FFD447',
    stack: ['Next.js 16', 'TypeScript', 'MongoDB', 'Mongoose', 'TradingView', 'Groq'],
    summary:
      'A Next.js stock-market application with dashboard widgets, authentication, AI strategy research, historical backtesting, and persisted paper-trading sessions.',
    outcomes: ['TradingView dashboard', 'AI strategy generation', 'Backtesting + paper sessions'],
    bullets: [
      'Rendered symbol-driven market dashboards using TradingView widgets for charting, technical analysis, profile, and financial views.',
      'Built a quant workspace with strategy definitions, validation, indicators, local backtesting, and persisted results.',
      'Added authenticated saved strategies and paper-trading sessions backed by MongoDB/Mongoose.',
    ],
    repoUrl: 'https://github.com/RynTrq/Troqks-stock-app',
    liveUrl: 'https://torq-stocks.up.railway.app/',
    hasDetailPage: true,
  },
  {
    slug: 'youtube-analytics-api',
    title: 'YouTube Analytics API',
    subtitle: 'Time-Series Engagement System',
    domain: 'DATA_SYSTEMS',
    status: 'COMPLETE',
    featured: false,
    accent: '#86FBA8',
    stack: ['FastAPI', 'TimescaleDB', 'PostgreSQL', 'Docker'],
    summary:
      'A full-stack analytics pipeline for tracking high-frequency YouTube interaction events and turning them into queryable engagement data.',
    outcomes: ['Event ingestion', 'TimescaleDB analytics', 'Scalable schemas'],
    bullets: [
      'Created FastAPI routes for anonymous watch sessions, YouTube player-event ingestion, and health checks.',
      'Modeled video events with SQLModel/TimescaleDB and exposed time-bucketed aggregate analytics.',
      'Added Docker Compose and a Gunicorn/Uvicorn container entrypoint for a production-shaped backend service.',
    ],
    repoUrl: 'https://github.com/RynTrq/yt-video-analytics',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'quill-runtime',
    title: 'Quill Runtime',
    subtitle: 'Work-Stealing Scheduler',
    domain: 'SYSTEMS',
    status: 'COMPLETE',
    featured: false,
    accent: '#D8FF44',
    stack: ['C++', 'Multithreading', 'Scheduling', 'Concurrency'],
    summary:
      'A portable C++11 task-parallel runtime with work stealing, finish/async semantics, benchmark executables, and smoke tests.',
    outcomes: ['Work stealing', 'Finish/async API', 'Native benchmarks'],
    bullets: [
      'Implemented per-worker queues with local LIFO execution and cross-worker FIFO stealing.',
      'Added finish regions, async task submission, chunked parallel_for, and exception propagation through end_finish().',
      'Validated behavior with executable smoke tests and benchmark-style N-Queens and iterative averaging programs.',
    ],
    repoUrl: 'https://github.com/RynTrq/Quill-Runtime',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'x86-assembler-simulator',
    title: 'x86 Assembler & CPU Simulator',
    subtitle: 'Instruction-Level Execution Engine',
    domain: 'LOW_LEVEL',
    status: 'COMPLETE',
    featured: false,
    accent: '#74E6FF',
    stack: ['Python', 'Assembly', 'Computer Architecture'],
    summary:
      'A dependency-free Python assembler and CPU simulator for a teaching 16-bit instruction set with CLI wrappers and unit tests.',
    outcomes: ['Assembly encoding', 'CPU trace output', 'Unit tests'],
    bullets: [
      'Parsed assembly with comments, labels, variables, validation rules, and aggregate source-level error reporting.',
      'Encoded multiple instruction formats into 16-bit machine code, including custom teaching-float operations.',
      'Simulated execution with registers, flags, branches, memory dumps, and non-halting validation covered by tests.',
    ],
    repoUrl: 'https://github.com/RynTrq/Assembly-Language-s-Simulator',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'mems-memory-manager',
    title: 'MeMS Custom Memory Manager',
    subtitle: 'Virtual Memory Allocator',
    domain: 'SYSTEMS',
    status: 'COMPLETE',
    featured: false,
    accent: '#D8FF44',
    stack: ['C11', 'mmap', 'Memory Management', 'Make'],
    summary:
      'A C11 simulated virtual memory allocator with deterministic logical addresses, mmap-backed pages, and allocator metadata.',
    outcomes: ['Allocator internals', 'Logical addresses', 'Native C'],
    bullets: [
      'Implemented memory allocation behavior around virtual/logical address translation and allocator bookkeeping.',
      'Used mmap-backed page management to model lower-level memory behavior without claiming OS-level production use.',
      'Kept the project scoped as a local systems/academic build with source-backed allocator claims.',
    ],
    repoUrl: 'https://github.com/RynTrq/Memory-Management',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'http-server-implementation',
    title: 'HTTP Server Implementation',
    subtitle: 'Socket-Level Static Server',
    domain: 'NETWORKING',
    status: 'COMPLETE',
    featured: false,
    accent: '#74E6FF',
    stack: ['Python', 'TCP Sockets', 'HTTP', 'CLI'],
    summary:
      'A Python project implementing a local static-file HTTP server and companion client directly on TCP sockets.',
    outcomes: ['Raw sockets', 'HTTP parsing', 'Local client/server'],
    bullets: [
      'Built server/client behavior over TCP sockets rather than a web framework.',
      'Handled static file serving and HTTP request/response flow for local networking practice.',
      'Kept runtime expectations local, with no hosted production service claimed.',
    ],
    repoUrl: 'https://github.com/RynTrq/HTTP-Server-Implementation',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'udp-pinger',
    title: 'UDP Pinger',
    subtitle: 'Datagram Latency + Heartbeat Tool',
    domain: 'NETWORKING',
    status: 'COMPLETE',
    featured: false,
    accent: '#86FBA8',
    stack: ['Python', 'UDP Sockets', 'JSON', 'argparse', 'unittest'],
    summary:
      'A Python UDP networking package with ping client, reply server, packet-loss simulation, heartbeat checks, and an installable CLI.',
    outcomes: ['RTT measurement', 'Packet loss simulation', 'Heartbeat detection'],
    bullets: [
      'Implemented compact JSON datagrams for ping/pong exchange over UDP sockets.',
      'Measured round-trip latency and filtered stale or mismatched responses by sequence and timestamp.',
      'Added deterministic tests for protocol handling, local UDP round trips, packet drops, and heartbeat termination.',
    ],
    repoUrl: 'https://github.com/RynTrq/UDP-Pinger',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'dna-toolkit',
    title: 'Advanced DNA Toolkit',
    subtitle: 'Sequence Alignment + BWT CLI',
    domain: 'ALGORITHMS',
    status: 'COMPLETE',
    featured: false,
    accent: '#D8FF44',
    stack: ['Python', 'Dynamic Programming', 'BWT', 'CLI', 'unittest'],
    summary:
      'An installable Python package and CLI for DNA validation, affine-gap edit distance, Smith-Waterman local alignment, BWT, and exact pattern matching.',
    outcomes: ['Affine-gap alignment', 'BWT/FM-index style matching', 'Packaged CLI'],
    bullets: [
      'Implemented edit distance and Smith-Waterman local alignment with affine gap penalties.',
      'Built suffix-array-derived Burrows-Wheeler transform, inverse BWT, and exact matching utilities.',
      'Packaged the toolkit as a console script with unit tests covering algorithms and CLI behavior.',
    ],
    repoUrl: 'https://github.com/RynTrq/Advanced-DNA-Sequence-Analysis-and-Alignment-Toolkit',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'dna-motif-finding',
    title: 'DNA Motif Finding',
    subtitle: 'Brute Force + Median String + Gibbs Sampling',
    domain: 'ALGORITHMS',
    status: 'COMPLETE',
    featured: false,
    accent: '#86FBA8',
    stack: ['Python', 'Bioinformatics', 'CLI', 'Algorithms'],
    summary:
      'A Python package and CLI for finding DNA motifs with brute-force, median-string, and Gibbs-sampling algorithms.',
    outcomes: ['Motif search', 'Probabilistic sampling', 'CLI workflow'],
    bullets: [
      'Implemented multiple motif-finding strategies so exact and heuristic approaches can be compared.',
      'Structured the work as a local algorithm package rather than only a notebook experiment.',
      'Kept claims grounded to package/CLI behavior and algorithm implementation.',
    ],
    repoUrl: 'https://github.com/RynTrq/DNA-Motif-Finding-Algorithm-Implementation',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'online-bookstore-management',
    title: 'Shoponize Bookstore',
    subtitle: 'Python CLI + Relational Service Layer',
    domain: 'DATABASES',
    status: 'COMPLETE',
    featured: false,
    accent: '#FFD447',
    stack: ['Python', 'SQLite', 'MySQL', 'Service Layer', 'Tests'],
    summary:
      'A Python command-line bookstore application with service-layer logic, relational schemas for SQLite/MySQL, and service-level tests.',
    outcomes: ['Relational schema', 'Business services', 'CLI app'],
    bullets: [
      'Modeled bookstore operations with a service layer rather than putting all logic in command handlers.',
      'Supported relational persistence paths for SQLite and MySQL schema targets.',
      'Added local verification around core service behavior.',
    ],
    repoUrl: 'https://github.com/RynTrq/Online-Bookstore-Management-System',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'enterprise-banking-system',
    title: 'Enterprise Banking Transaction System',
    subtitle: 'Local Ledger CLI',
    domain: 'DATABASES',
    status: 'COMPLETE',
    featured: false,
    accent: '#74E6FF',
    stack: ['Python', 'CLI', 'Ledger Modeling', 'Testing'],
    summary:
      'A local Python banking ledger package with a CLI for account management and transaction recording.',
    outcomes: ['Account flows', 'Transaction ledger', 'CLI package'],
    bullets: [
      'Built account and transaction workflows around a local ledger model.',
      'Kept the implementation scoped to a personal/academic package with no commercial banking claims.',
      'Focused on defensible data modeling and command-line interaction.',
    ],
    repoUrl: 'https://github.com/RynTrq/Enterprise-Banking-Transaction-System',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'java-management-systems',
    title: 'Java Management Systems',
    subtitle: 'Library + Zoo Console Applications',
    domain: 'OOP',
    status: 'COMPLETE',
    featured: false,
    accent: '#D8FF44',
    stack: ['Java', 'OOP', 'Maven', 'Console Apps'],
    summary:
      'A pair of Java console systems covering library loans/fines and zoo attractions, memberships, ticket purchases, and visitor flows.',
    outcomes: ['OOP modeling', 'Console workflows', 'Domain rules'],
    bullets: [
      'Built Library Portal for members, book copies, loans, returns, and overdue fines.',
      'Built Revolutionary Zoo Management Application for attractions, animals, visitors, memberships, and tickets.',
      'Used the projects to practice object-oriented domain modeling and rule-heavy console flows.',
    ],
    repoUrl: 'https://github.com/RynTrq/Library-portal',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'java-desktop-games',
    title: 'Java Desktop Games',
    subtitle: 'Angry Birds + Stick Hero',
    domain: 'GAME_DEV',
    status: 'COMPLETE',
    featured: false,
    accent: '#86FBA8',
    stack: ['Java', 'LibGDX', 'Box2D', 'JavaFX', 'JUnit'],
    summary:
      'Desktop game projects covering a LibGDX/Box2D Angry Birds-style physics game and a JavaFX Stick Hero-style timing game.',
    outcomes: ['Physics gameplay', 'Save/load', 'High-score persistence'],
    bullets: [
      'Implemented drag-to-launch physics, destructible entities, levels, save/load, and helper tests in the Angry Birds-style game.',
      'Built a JavaFX timing-game implementation with local high-score persistence in the Stick Hero-style project.',
      'Kept both scoped as educational desktop games, not commercial releases.',
    ],
    repoUrl: 'https://github.com/RynTrq/Angry-Bird-Game',
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    slug: 'car-price-prediction',
    title: 'Car Price Prediction',
    subtitle: 'Regression Training CLI',
    domain: 'ML',
    status: 'COMPLETE',
    featured: false,
    accent: '#FFD447',
    stack: ['Python', 'Machine Learning', 'CLI', 'Model Evaluation'],
    summary:
      'A Python package and CLI for training, evaluating, saving, and using a used-car selling price regression model.',
    outcomes: ['Regression workflow', 'Model persistence', 'Prediction CLI'],
    bullets: [
      'Structured ML work around a repeatable package/CLI instead of a one-off script.',
      'Supported training, evaluation, saved model artifacts, and prediction usage.',
      'Kept claims limited to the verified local model workflow.',
    ],
    repoUrl: 'https://github.com/RynTrq/Car-price-prediction',
    liveUrl: null,
    hasDetailPage: false,
  },
];

export const projectCaseStudies = {
  'torqussions-ai': {
    eyebrow: 'COLLABORATIVE_COCKPIT',
    headline: 'A sharper full-stack room for collaboration, previews, AI drafting, and execution.',
    deck:
      'Torqussions is built around a simple idea: once people enter a project room, chat, shared files, preview, team coordination, code execution, and project-scoped AI help should stay in the same working surface.',
    overview: [
      'The product merges a React/Vite frontend with an Express, Socket.IO, and MongoDB backend so the room behaves like a living workspace instead of a static dashboard.',
      'The key product bet is continuity. A user can enter a room, ask AI to reply inside project context, merge generated files, preview the result, run code, invite teammates, and keep the context of the conversation without bouncing between separate apps.',
    ],
    heroStats: [
      { value: '1 room', label: 'Unified loop', detail: 'Chat, files, preview, execution, and team state in one place.' },
      { value: 'Socket.IO', label: 'Realtime core', detail: 'Low-latency synchronization for active collaboration rooms.' },
      { value: 'Gemini/Grok/Groq', label: 'AI replies', detail: 'Project-scoped AI replies can persist messages and merge generated files.' },
    ],
    ribbons: ['Realtime collaboration', 'Shared files', 'Live preview', 'Execution surface', 'Team invites'],
    architecture: [
      {
        title: 'Room Experience',
        description: 'The frontend is shaped like a live cockpit rather than a list of tools.',
        points: [
          'Workspace pages group files, preview, run, and team controls under one project room.',
          'Interface states support both light and dark presentation without losing hierarchy.',
          'Shared context makes AI outputs feel connected to the room rather than bolted on.',
        ],
      },
      {
        title: 'Realtime Backend',
        description: 'Express and Socket.IO keep collaboration state moving underneath the UI.',
        points: [
          'Project chat and room activity stay synchronized across connected collaborators.',
          'Environment configuration supports separate frontend and backend deployments or a same-origin setup.',
          'MongoDB-backed persistence gives rooms durable project state beyond a single session.',
        ],
      },
      {
        title: 'Execution Surfaces',
        description: 'Preview and code execution complete the loop from prompt to result.',
        points: [
          'Generated files stay visible inside the project rather than disappearing into chat history.',
          'Preview panels make front-end output inspectable inside the same workspace.',
          'Runtime views allow code to move from draft to runnable artifact without context switching.',
        ],
      },
    ],
    buildHighlights: [
      'Used project-scoped AI replies as a workspace-native action instead of a detached chatbot experience.',
      'Made collaboration feel spatial through richer cards, stacked panels, and clear room hierarchy.',
      'Integrated invitations and team state so access control stays close to the project itself.',
      'Balanced product polish with deployment flexibility across frontend and backend services.',
    ],
    gallery: [
      {
        title: 'Dark cockpit',
        caption: 'The project room header and cockpit framing establish the product as a collaborative surface, not a simple admin dashboard.',
        image: '/project-media/torqussions/dark-cockpit.png',
      },
      {
        title: 'Light cockpit',
        caption: 'The same collaboration model carries across a brighter theme while keeping strong card depth and hierarchy.',
        image: '/project-media/torqussions/light-cockpit.png',
      },
      {
        title: 'Workspace dashboard',
        caption: 'Project discovery, room counts, collaborators, and preview readiness are surfaced before users jump back into a room.',
        image: '/project-media/torqussions/dashboard.png',
      },
      {
        title: 'AI drafting thread',
        caption: 'Prompt-driven file generation stays visible inside the room chat with clear file artifacts attached to each response.',
        image: '/project-media/torqussions/chat-thread-b.png',
      },
      {
        title: 'Preview surface',
        caption: 'Front-end output can be opened and reviewed inside the project instead of in a disconnected tab.',
        image: '/project-media/torqussions/preview-panel.png',
      },
      {
        title: 'Runner + output',
        caption: 'Execution views complete the workflow by letting users run code and inspect outputs directly in the room.',
        image: '/project-media/torqussions/runner-panel.png',
      },
      {
        title: 'Team controls',
        caption: 'Membership, admin controls, and invite flows make collaboration operational rather than theoretical.',
        image: '/project-media/torqussions/team-panel.png',
      },
    ],
  },
  'torq-ai': {
    eyebrow: 'AI_NATIVE_BUILD_COCKPIT',
    headline: 'A full-stack browser workspace where AI assistance, editing, preview, execution, and repo flow live inside one cockpit.',
    deck:
      'Torq AI turns the browser into a build surface: users can start or import a project, work with an embedded coding assistant, inspect files, run selected source files, preview output, and export to GitHub without leaving the workspace.',
    overview: [
      'Under the hood, the app combines a Next.js 16 app with Prisma, PostgreSQL, Auth.js, Inngest, AI SDK routing, CodeMirror, WebContainers, and host-side execution paths. The result is not just a chatbot beside code, but a product-shaped workspace with sessions, persistence, runtime feedback, and deployment paths.',
      'What makes the project compelling is the breadth of real product work it asks for at once: interface design, auth, database modeling, AI provider routing, file-system thinking, runtime execution, and GitHub-connected workflows all have to feel coherent together.',
    ],
    heroStats: [
      { value: '5 runtimes', label: 'Execution', detail: 'JavaScript, Python, C, C++, and Java can be executed from the workspace.' },
      { value: '3 providers', label: 'Model routing', detail: 'OpenRouter, Groq, and xAI-backed models are wired behind one product surface.' },
      { value: 'GitHub', label: 'Import / export', detail: 'Projects can enter and leave the workspace through repository import and export flows.' },
    ],
    ribbons: ['Chat-driven creation', 'Repo import/export', 'Model routing', 'Integrated preview', 'Execution surface'],
    architecture: [
      {
        title: 'Workspace Product',
        description: 'The frontend is structured around high-frequency developer actions instead of marketing abstractions.',
        points: [
          'Users can create a project, import a repository, talk to the assistant, inspect files, preview output, and run code from the same cockpit.',
          'The interface keeps code and conversation close enough that the assistant feels operational rather than ornamental.',
          'Browser-first interaction is balanced with persistence, session state, and project continuity.',
        ],
      },
      {
        title: 'Persistence + Auth',
        description: 'The backend is built to support real product behavior, not only local demos.',
        points: [
          'Prisma and PostgreSQL manage durable project data, account state, and workspace continuity.',
          'Auth.js handles email-password sessions as well as GitHub-connected auth flows.',
          'Inngest supports event-driven and longer-running background work outside the immediate UI cycle.',
        ],
      },
      {
        title: 'AI + Execution Plane',
        description: 'The assistant is wired into actual build actions and runtime feedback.',
        points: [
          'AI SDK routing allows the workspace to adapt between OpenRouter, Groq, and xAI-backed model definitions.',
          'Generated or edited files can move directly into preview or runtime execution flows.',
          'WebContainer and host-side execution layers support JavaScript, Python, C, C++, and Java from the same workspace.',
        ],
      },
    ],
    buildHighlights: [
      'Shaped the app as a browser-native coding cockpit rather than a plain chat wrapper around a repository.',
      'Wired authentication, database persistence, GitHub connectivity, and AI provider switching into the same product.',
      'Connected generation, file editing, preview, execution, and export so the workflow feels continuous rather than stitched together.',
      'Carried the project through real deployment concerns with documented environment setup and production service wiring.',
    ],
    gallery: [
      {
        title: 'Build cockpit',
        caption: 'The landing cockpit frames project creation, repository import, workspace recovery, and keyboard-driven navigation as first-class product actions.',
        image: '/project-media/torq-ai/home-cockpit-dark.png',
      },
      {
        title: 'Workspace + runner',
        caption: 'The main workspace keeps assistant chat, file state, code editing, and terminal output inside one continuous screen.',
        image: '/project-media/torq-ai/workspace-runner.png',
      },
      {
        title: 'Model routing readiness',
        caption: 'Provider selection is visible inside the product, making model choice a controllable build decision rather than a hidden implementation detail.',
        image: '/project-media/torq-ai/model-routing-google.png',
      },
      {
        title: 'Light workspace cockpit',
        caption: 'The same product language carries into a lighter visual mode without losing hierarchy, flow clarity, or workspace density.',
        image: '/project-media/torq-ai/home-cockpit-light.png',
      },
      {
        title: 'Quota-aware model options',
        caption: 'The routing layer also communicates quota-limited options, which keeps provider state transparent inside the build flow.',
        image: '/project-media/torq-ai/model-routing-openai.png',
      },
      {
        title: 'Auth surface',
        caption: 'Session-backed access, GitHub continuation, and return-to-workspace flows are built into the product shell from the start.',
        image: '/project-media/torq-ai/auth-screen.png',
      },
    ],
  },
  'torq-flows': {
    eyebrow: 'WORKFLOW_ORCHESTRATION',
    headline: 'A full-stack workflow surface where visual design, backend validation, and durable execution stay tightly in sync.',
    deck:
      'Torq Flows pairs a React Flow builder with a FastAPI and Temporal backend that validates graphs, normalizes definitions, persists runs, exposes webhooks, and makes execution inspectable.',
    overview: [
      'The builder is intentionally expressive on the frontend: users can compose workflows visually, configure nodes in context, validate them in place, and inspect output without dropping out of the editor.',
      'The backend is what turns the product into infrastructure instead of a demo canvas. It actively understands the workflow graph, validates correctness, normalizes definitions, persists runs in PostgreSQL, and executes long-running flows through Temporal.',
    ],
    heroStats: [
      { value: '6 node types', label: 'Builder primitives', detail: 'Manual trigger, webhook, decision, wait, API call, and end nodes.' },
      { value: 'Temporal', label: 'Durable runs', detail: 'Waits and long-running orchestration survive beyond the UI.' },
      { value: 'Logs + runs', label: 'Observability', detail: 'Every execution records progress, payloads, final output, and failure state.' },
    ],
    ribbons: ['Visual builder', 'Backend validation', 'Webhook triggers', 'Temporal runs', 'Execution logs'],
    architecture: [
      {
        title: 'Graph Editor',
        description: 'The UI makes workflows readable, composable, and editable with strong node-level control.',
        points: [
          'React Flow drives the canvas while side panels expose node configuration in context.',
          'The builder supports add, move, connect, delete node, and delete edge interactions.',
          'Manual and webhook triggers are visible as explicit start conditions inside the graph.',
        ],
      },
      {
        title: 'Backend Ownership',
        description: 'The backend is responsible for deciding whether a workflow is valid and executable.',
        points: [
          'Graph validation checks trigger rules, end-state presence, cycles, unreachable nodes, and missing decision branches.',
          'Normalization transforms UI graph state into a backend-ready `startAt` and `nodes` definition.',
          'PostgreSQL stores both workflows and execution history so the product remains stateful and inspectable.',
        ],
      },
      {
        title: 'Execution Engine',
        description: 'Temporal and FastAPI turn the visual graph into an operational runtime.',
        points: [
          'Durable waits are implemented with `workflow.sleep` rather than front-end timers.',
          'API calls run as workflow activities and failure policy is recorded back into run logs.',
          'Webhook endpoints let outside systems activate workflows, not only the UI.',
        ],
      },
    ],
    buildHighlights: [
      'Made the canvas feel expressive without letting the frontend become the source of truth for execution.',
      'Connected validation, persistence, and orchestration so builder edits map cleanly to backend-owned workflow definitions.',
      'Surfaced run history, node-by-node logs, final output, and failure visibility as first-class product interfaces.',
      'Carried the project through real deployment concerns rather than stopping at a local-only orchestration demo.',
    ],
    gallery: [
      {
        title: 'Workflow builder',
        caption: 'The primary builder view combines node palette, graph editing, inline validation, node configuration, and execution output in a single orchestration cockpit.',
        image: '/project-media/torq-flows/builder-hero.png',
      },
      {
        title: 'Execution dashboard',
        caption: 'Monitoring cards, run volume, and expandable history connect workflow design to runtime behavior after a flow has already been triggered.',
        image: '/project-media/torq-flows/execution-dashboard.png',
      },
      {
        title: 'Workflow library live state',
        caption: 'The workflow index makes orchestration state scannable with active statuses, run counts, success rate, trigger type, and recent activity visible at a glance.',
        image: '/project-media/torq-flows/workflow-library-live.png',
      },
      {
        title: 'Run logs',
        caption: 'Expanded run records show how each node executed, when it completed, and what output or branch decision it produced.',
        image: '/project-media/torq-flows/run-logs.png',
      },
      {
        title: 'Workflow library overview',
        caption: 'The broader workflow inventory view helps operators jump between flows, filter status, and understand which workflows are active before drilling into runs.',
        image: '/project-media/torq-flows/workflow-library-overview.png',
      },
    ],
  },
  'torq-stocks': {
    eyebrow: 'QUANT_MARKET_WORKSPACE',
    headline: 'A deployed stock-market product where dashboards, authentication, AI strategy generation, backtesting, and paper sessions sit in one workspace.',
    deck:
      'Torq Stocks is a Next.js 16 application for market dashboards, stock search, authenticated strategy research, historical backtesting, and persisted paper-trading sessions.',
    overview: [
      'The product starts with a public stock dashboard powered by TradingView embeds, then expands into a signed-in quant workspace where users can save strategies, run backtests, and manage paper-trading sessions.',
      'The implementation is not only a finance-themed interface. The quant subsystem defines strategies as typed data, validates generated AI output, computes indicators locally, fetches historical bars from Yahoo Finance, persists results in MongoDB, and exposes archive views for saved work.',
    ],
    heroStats: [
      { value: 'Next.js 16', label: 'Product shell', detail: 'App Router pages cover dashboard, search, auth, quant lab, and history views.' },
      { value: 'MongoDB', label: 'Persistence', detail: 'Users, strategies, backtests, and paper sessions are stored through Mongoose models.' },
      { value: 'Groq', label: 'AI strategy flow', detail: 'Prompted strategies are generated, repaired, normalized, validated, and persisted.' },
    ],
    ribbons: ['TradingView dashboard', 'Stock search', 'AI strategy generation', 'Backtesting engine', 'Paper sessions'],
    architecture: [
      {
        title: 'Market Dashboard',
        description: 'The public product surface focuses on symbol-driven exploration before users enter the quant workspace.',
        points: [
          'TradingView widgets cover symbol info, technical analysis, charting, company profile, and financial views.',
          'Search filters a curated symbol list and supports custom valid ticker navigation.',
          'Dashboard routes stay product-facing while deeper strategy work sits behind authenticated flows.',
        ],
      },
      {
        title: 'Quant Engine',
        description: 'Strategy work is represented as local typed logic rather than only saved text prompts.',
        points: [
          'Prebuilt and saved strategies are exposed through a strategy catalog.',
          'Generated strategies are validated against allowed categories, indicators, rules, and risk settings.',
          'Historical backtests compute indicators, evaluate entry/exit rules, and return metrics, trades, and equity curves.',
        ],
      },
      {
        title: 'Persistence + Sessions',
        description: 'The app stores user-specific strategy research and paper-trading state.',
        points: [
          'Authentication uses server-side validation, password hashing, and signed HTTP-only session cookies.',
          'MongoDB models persist users, strategy experiments, backtest runs, and paper-trading sessions.',
          'The quant history archive aggregates saved strategies, backtests, and paper sessions into one searchable workspace.',
        ],
      },
    ],
    buildHighlights: [
      'Connected market exploration and strategy experimentation instead of treating them as unrelated tools.',
      'Used local TypeScript quant logic for strategy definitions, validation, indicators, backtests, and session snapshots.',
      'Kept AI generation behind schema validation so natural-language strategy prompts become controlled internal strategy data.',
      'Shipped the app as a deployed Railway product with a live market/quant workflow surface.',
    ],
    gallery: [
      {
        title: 'Market dashboard',
        caption: 'A symbol-driven dashboard uses TradingView surfaces to give users charting, technical analysis, company profile, and financial context before deeper research.',
        image: null,
        concept: {
          eyebrow: 'PUBLIC_DASHBOARD',
          title: 'Explore a symbol before opening the quant lab.',
          description: 'The first layer is market context: search a ticker, inspect charting and company data, then move into strategy research with the same symbol in mind.',
          chips: ['TradingView widgets', 'Symbol search', 'Custom ticker validation'],
          accent: '#FFD447',
        },
      },
      {
        title: 'Quant lab',
        caption: 'The authenticated workspace joins prebuilt strategies, saved strategies, prompt-generated strategies, validation, and experiment persistence.',
        image: null,
        concept: {
          eyebrow: 'STRATEGY_WORKSPACE',
          title: 'Strategy prompts become validated strategy definitions.',
          description: 'Groq-backed generation feeds a controlled strategy schema, then validation gates the output before it is saved as an experiment.',
          chips: ['Groq generation', 'Strategy schema', 'MongoDB persistence'],
          accent: '#74E6FF',
        },
      },
      {
        title: 'Backtesting engine',
        caption: 'Backtests fetch historical bars, compute indicators, evaluate rules, and produce metrics, trades, and equity curves.',
        image: null,
        concept: {
          eyebrow: 'HISTORICAL_SIMULATION',
          title: 'Local TypeScript logic turns strategies into measurable runs.',
          description: 'The backtesting path uses fetched market data and local rule evaluation so results are stored as structured runs rather than screenshots.',
          chips: ['Yahoo Finance bars', 'Indicators', 'Trades + equity curve'],
          accent: '#86FBA8',
        },
      },
      {
        title: 'Paper sessions',
        caption: 'Paper-trading sessions can be created, refreshed, paused, resumed, closed, and archived per authenticated user.',
        image: null,
        concept: {
          eyebrow: 'SESSION_STATE',
          title: 'Paper sessions keep strategy state alive between visits.',
          description: 'Snapshots, trade logs, status changes, and equity curves are persisted so experimentation can continue beyond one browser session.',
          chips: ['Session status', 'Snapshots', 'History archive'],
          accent: '#D8FF44',
        },
      },
    ],
  },
};

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectCaseStudy(slug) {
  const project = getProjectBySlug(slug);
  const detail = projectCaseStudies[slug];

  if (!project || !detail) {
    return null;
  }

  return { ...project, ...detail };
}
