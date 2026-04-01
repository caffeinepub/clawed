import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const LOGO_SRC = "/assets/clawed-logo-019d495a-5d97-75e6-8937-dad675f6b206.png";
const GITHUB_URL = "https://github.com/Carbosix/Clawed";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const WELCOME: Message = {
  id: 0,
  role: "assistant",
  text: "Hey! 🐾 I'm Meow, your Clawed assistant. Ask me anything about Clawed — setup, Rust build, Python workspace, tests, and verification commands.",
};

function getResponse(input: string): string {
  const q = input.toLowerCase();

  if (/what is clawed|about clawed|clawed do/.test(q)) {
    return `**What is Clawed?**\n\nClawed is an open-source, clean-room rewrite exploring agentic workflows and tool-use architecture. It mirrors the architectural patterns of the original harness but is not yet a 1:1 functional replacement — currently a work-in-progress.\n\nIt is written primarily in **Rust (92.8%)** with a **Python (7.2%)** workspace, and is not affiliated with the original authors.\n\nCheck it out at: ${GITHUB_URL}`;
  }
  if (/clone|git clone|download/.test(q) && !/zip/.test(q)) {
    return `To clone the repository, run:\n\n\`\`\`\ngit clone ${GITHUB_URL}\ncd Clawed\n\`\`\`\n\nThis gives you the full source so you can build or explore Clawed locally.`;
  }
  if (/zip|download zip/.test(q)) {
    return `You can download the ZIP directly from the homepage's **Download ZIP** button, or grab it straight from:\n${GITHUB_URL}/archive/refs/heads/main.zip`;
  }
  if (
    /install|setup|set up|getting started|start/.test(q) &&
    !/python|rust/.test(q)
  ) {
    return `**Getting Started with Clawed:**\n\n1. Clone the repo:\n   \`git clone ${GITHUB_URL}\`\n2. Enter the directory:\n   \`cd Clawed\`\n3. **Rust build (recommended):**\n   \`cd rust && cargo build --release\`\n4. **Python workspace:**\n   \`python3 -m src.main summary\`\n\nSee \`README.md\` in the repo for the full quickstart guide.`;
  }
  if (/python|pip|requirements/.test(q) && !/rust|cargo/.test(q)) {
    return "**Python Workspace:**\n\n1. Ensure Python 3.8+ is installed — check with `python3 --version`\n2. Run the workspace summary:\n   `python3 -m src.main summary`\n3. Run the verification tests:\n   `python3 -m unittest discover -s tests -v`\n\nThe Python workspace lives in the `src/` directory. There is no root-level `requirements.txt` — refer to the `src/` package for dependencies.";
  }
  if (/rust|cargo|build/.test(q)) {
    return "**Rust Build:**\n\n1. Install Rust via [rustup.rs](https://rustup.rs)\n2. Navigate to the Rust workspace:\n   `cd rust`\n3. Build the project:\n   `cargo build --release`\n4. The compiled binary will be at `rust/target/release/`\n\n**Verification commands (run from `rust/`):**\n- Format: `cargo fmt`\n- Lint: `cargo clippy --workspace --all-targets -- -D warnings`\n- Test: `cargo test --workspace`\n\nRequires a recent stable Rust toolchain.";
  }
  if (/config|configur|env|environment|settings|api key/.test(q)) {
    return "**Configuration:**\n\nClawed is a research-oriented framework for agentic workflows. Configuration details depend on which runtime you're using (Rust CLI or Python workspace).\n\nRefer to `CLAW.md` in the repo root for guidance on working with the codebase, and `README.md` for quickstart instructions.\n\nCheck the repo for any environment variable or config file conventions relevant to your setup.";
  }
  if (/run|launch|start|usage|how to use/.test(q)) {
    return "**Running Clawed:**\n\n**Rust binary** (after `cd rust && cargo build --release`):\n`./rust/target/release/<binary-name>`\n\n**Python workspace summary:**\n`python3 -m src.main summary`\n\n**Run verification tests:**\n`python3 -m unittest discover -s tests -v`\n\nSee `README.md` for the full quickstart.";
  }
  if (/require|depend|prereq/.test(q)) {
    return "**Prerequisites:**\n\n- **Rust** (stable toolchain) — for building the Rust workspace\n- **Python 3.8+** — for the Python workspace (`src/`)\n- **git** — to clone the repository\n- **cargo** — comes with Rust, used for build, lint, and tests";
  }
  if (/struct|file|folder|director/.test(q)) {
    return `**Repository Structure:**\n\n\`\`\`\nClawed/\n├── rust/          # Rust workspace (CLI & runtime)\n│   └── ...        # API client, MCP orchestration\n├── src/           # Python implementation workspace\n├── tests/         # Verification test suite\n├── assets/        # Assets folder\n├── .github/       # GitHub Actions workflows\n├── CLAW.md        # Guidance for working with this repo\n├── PARITY.md      # Porting status\n└── README.md      # Quickstart guide\n\`\`\`\n\nSee the full repo at ${GITHUB_URL}`;
  }
  if (/cli|command|repl/.test(q)) {
    return "**CLI & Development Commands:**\n\n**Build:**\n- `cd rust && cargo build --release`\n\n**Development (run from `rust/`):**\n- Format code: `cargo fmt`\n- Lint: `cargo clippy --workspace --all-targets -- -D warnings`\n- Run tests: `cargo test --workspace`\n\n**Python workspace:**\n- Summary: `python3 -m src.main summary`\n- Tests: `python3 -m unittest discover -s tests -v`";
  }
  if (/parity|porting|status|wip|progress|complete/.test(q)) {
    return `**Porting Status (PARITY.md):**\n\nClawed is a **work-in-progress** clean-room rewrite. It mirrors the architectural patterns of the original harness but is **not yet a 1:1 functional replacement**.\n\nKey points:\n- Purpose: research into agentic workflows and tool-use architecture\n- Not affiliated with the original authors\n- Language split: Rust 92.8% / Python 7.2%\n\nFor the latest porting progress, see \`PARITY.md\` in the repo: ${GITHUB_URL}/blob/main/PARITY.md`;
  }
  if (/contribute|pr|pull request|open source/.test(q)) {
    return `**Contributing to Clawed:**\n\nClawed is fully open-source! To contribute:\n\n1. Fork the repo on GitHub\n2. Create a feature branch\n3. Run lint and tests before submitting:\n   - \`cargo fmt\`\n   - \`cargo clippy --workspace --all-targets -- -D warnings\`\n   - \`cargo test --workspace\`\n4. Open a pull request at ${GITHUB_URL}/pulls\n\nAll contributions are welcome — bug fixes, features, docs, or porting work.`;
  }
  if (/license|mit|copyright/.test(q)) {
    return `Clawed is open-source software. Check the LICENSE file in the repository for full details: ${GITHUB_URL}/blob/main/LICENSE`;
  }
  if (/icp|internet computer|donate|donation/.test(q)) {
    return "You can support Clawed's development with an ICP donation! Head to the **Clawed homepage** and scroll to the donation section — you'll find the Account ID and Principal ID there with one-click copy.";
  }

  return "I'm not sure about that one. Try asking about cloning, Rust build, Python workspace, tests, verification commands, or porting status! 🐾";
}

function renderInlinePart(part: string, partKey: string) {
  if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
    return (
      <code
        key={partKey}
        className="px-1.5 py-0.5 rounded text-xs font-mono"
        style={{
          background: "oklch(0.18 0.022 243)",
          color: "oklch(0.72 0.18 162)",
          border: "1px solid oklch(0.25 0.025 243)",
        }}
      >
        {part.slice(1, -1)}
      </code>
    );
  }
  const boldParts = part.split(/(\*\*.+?\*\*)/);
  if (boldParts.length === 1) return <span key={partKey}>{part}</span>;
  return (
    <span key={partKey}>
      {boldParts.map((bp, j) => {
        const bpKey = `${partKey}-b${j}`;
        if (bp.startsWith("**") && bp.endsWith("**") && bp.length > 4) {
          return (
            <strong key={bpKey} style={{ color: "oklch(0.92 0.01 240)" }}>
              {bp.slice(2, -2)}
            </strong>
          );
        }
        return <span key={bpKey}>{bp}</span>;
      })}
    </span>
  );
}

function formatInline(text: string) {
  const parts = text.split(/(`.+?`)/);
  return parts.map((part, i) => renderInlinePart(part, `p${i}`));
}

function formatMessage(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const lineKey = `l${i}`;
    if (line.startsWith("```")) return null;
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      return (
        <p
          key={lineKey}
          className="font-bold mb-1"
          style={{ color: "oklch(0.88 0.01 240)" }}
        >
          {line.slice(2, -2)}
        </p>
      );
    }
    if (line.startsWith("- ") || line.startsWith("  - ")) {
      const indent = line.startsWith("  ");
      return (
        <p
          key={lineKey}
          className={`${indent ? "ml-4" : ""} mb-0.5`}
          style={{ color: "oklch(0.78 0.015 240)" }}
        >
          {formatInline(line.replace(/^\s*- /, "• "))}
        </p>
      );
    }
    if (line.match(/^\d+\. /)) {
      return (
        <p
          key={lineKey}
          className="mb-0.5"
          style={{ color: "oklch(0.78 0.015 240)" }}
        >
          {formatInline(line)}
        </p>
      );
    }
    if (line.trim() === "") return <div key={lineKey} className="h-2" />;
    return (
      <p
        key={lineKey}
        className="mb-0.5 leading-relaxed"
        style={{ color: "oklch(0.78 0.015 240)" }}
      >
        {formatInline(line)}
      </p>
    );
  });
}

function TypingDots() {
  const dots = [0, 1, 2] as const;
  return (
    <div className="flex items-center gap-1 py-1 px-1">
      {dots.map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: "oklch(0.72 0.18 162 / 0.7)" }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 1.2,
            delay: i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MeowNav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "oklch(0.118 0.015 243 / 0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.22 0.025 243)",
      }}
    >
      <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            data-ocid="meow.nav.home.link"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "oklch(0.62 0.015 240)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span style={{ color: "oklch(0.3 0.025 243)" }}>|</span>
          <div className="flex items-center gap-2">
            <img
              src={LOGO_SRC}
              alt="Clawed logo"
              className="w-7 h-7 object-contain"
            />
            <span
              className="font-bold text-lg tracking-widest"
              style={{
                color: "oklch(0.92 0.01 240)",
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              MEOW
            </span>
          </div>
        </div>
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Meow navigation"
        >
          <Link
            to="/"
            data-ocid="meow.nav.clawed.link"
            className="text-sm transition-colors"
            style={{ color: "oklch(0.62 0.015 240)" }}
          >
            Clawed
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="meow.nav.github.link"
            className="text-sm transition-colors"
            style={{ color: "oklch(0.62 0.015 240)" }}
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function MeowPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  const messageCount = messages.length;
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll triggered by message count
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageCount, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { id: nextId.current++, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 400;
    setTimeout(() => {
      const reply = getResponse(text);
      const assistantMsg: Message = {
        id: nextId.current++,
        role: "assistant",
        text: reply,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    "How do I clone Clawed?",
    "Getting started",
    "Rust build steps",
    "What is Clawed?",
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.118 0.015 243)" }}
    >
      <MeowNav />

      {/* Page hero */}
      <div className="pt-20 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8 px-6"
        >
          <div className="flex justify-center mb-3">
            <img
              src={LOGO_SRC}
              alt="Meow logo"
              className="w-12 h-12 object-contain"
              style={{
                filter: "drop-shadow(0 0 16px oklch(0.72 0.18 162 / 0.5))",
              }}
            />
          </div>
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-[0.12em] mb-2"
            style={{
              color: "oklch(0.95 0.01 240)",
              textShadow: "0 0 40px oklch(0.72 0.18 162 / 0.35)",
            }}
          >
            MEOW
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.58 0.015 240)" }}>
            Ask me anything about installing and using Clawed
          </p>
        </motion.div>
      </div>

      {/* Chat area */}
      <div
        className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 pb-6"
        style={{ minHeight: 0 }}
      >
        {/* Messages — plain scrollable div so scrollTop works */}
        <div
          ref={scrollRef}
          className="flex-1 rounded-2xl mb-4 overflow-y-auto"
          style={{
            background: "oklch(0.128 0.016 243)",
            border: "1px solid oklch(0.2 0.022 243)",
            minHeight: "360px",
            maxHeight: "calc(100vh - 340px)",
          }}
          data-ocid="meow.panel"
        >
          <div className="p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1 text-sm"
                      style={{
                        background: "oklch(0.72 0.18 162 / 0.15)",
                        border: "1px solid oklch(0.72 0.18 162 / 0.35)",
                      }}
                    >
                      🐾
                    </div>
                  )}
                  <div
                    className="max-w-[80%] rounded-2xl px-4 py-3 text-sm"
                    style={{
                      background:
                        msg.role === "user"
                          ? "oklch(0.723 0.191 149 / 0.18)"
                          : "oklch(0.158 0.02 243)",
                      border:
                        msg.role === "user"
                          ? "1px solid oklch(0.723 0.191 149 / 0.4)"
                          : "1px solid oklch(0.24 0.025 243)",
                      borderBottomRightRadius:
                        msg.role === "user" ? "4px" : undefined,
                      borderBottomLeftRadius:
                        msg.role === "assistant" ? "4px" : undefined,
                    }}
                  >
                    {msg.role === "user" ? (
                      <p style={{ color: "oklch(0.88 0.12 149)" }}>
                        {msg.text}
                      </p>
                    ) : (
                      <div>{formatMessage(msg.text)}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                  data-ocid="meow.loading_state"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1 text-sm"
                    style={{
                      background: "oklch(0.72 0.18 162 / 0.15)",
                      border: "1px solid oklch(0.72 0.18 162 / 0.35)",
                    }}
                  >
                    🐾
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{
                      background: "oklch(0.158 0.02 243)",
                      border: "1px solid oklch(0.24 0.025 243)",
                      borderBottomLeftRadius: "4px",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Suggestion chips */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-3"
            data-ocid="meow.suggestions.panel"
          >
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setInput(s);
                  inputRef.current?.focus();
                }}
                className="text-xs px-3 py-1.5 rounded-full transition-all hover:-translate-y-0.5"
                style={{
                  background: "oklch(0.18 0.022 243)",
                  color: "oklch(0.72 0.015 240)",
                  border: "1px solid oklch(0.26 0.025 243)",
                }}
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}

        {/* Input row */}
        <div
          className="flex gap-3 items-end rounded-2xl p-3"
          style={{
            background: "oklch(0.148 0.018 243)",
            border: "1px solid oklch(0.24 0.025 243)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about setup, Rust build, Python workspace, tests..."
            rows={1}
            data-ocid="meow.textarea"
            className="flex-1 bg-transparent resize-none text-sm leading-relaxed outline-none placeholder:opacity-50"
            style={{
              color: "oklch(0.88 0.01 240)",
              maxHeight: "120px",
              fontFamily: "inherit",
            }}
          />
          <Button
            type="button"
            size="sm"
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            data-ocid="meow.submit_button"
            className="flex-shrink-0 rounded-xl px-4"
            style={{
              background:
                input.trim() && !isTyping
                  ? "oklch(0.723 0.191 149)"
                  : "oklch(0.2 0.022 243)",
              color:
                input.trim() && !isTyping
                  ? "oklch(0.1 0.03 149)"
                  : "oklch(0.44 0.015 240)",
              border: "none",
              transition: "all 0.2s",
            }}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p
          className="text-center text-xs mt-3"
          style={{ color: "oklch(0.38 0.012 240)" }}
        >
          Meow knows Clawed's setup, Rust build, Python workspace, tests, and
          verification commands.
        </p>
      </div>
    </div>
  );
}
