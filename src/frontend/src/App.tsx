import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Check,
  Copy,
  Download,
  GitFork,
  Github,
  Star,
  Terminal,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const GITHUB_URL = "https://github.com/instructkr/claw-code";
const ZIP_URL =
  "https://github.com/instructkr/claw-code/archive/refs/heads/main.zip";
const CLONE_CMD = "git clone https://github.com/instructkr/claw-code.git";
const ACCOUNT_ID =
  "f9fc12b37bb227067662f2961f4afc1cbffc732187c5805c2f36bfc336f810c1";
const PRINCIPAL_ID =
  "ccp2l-7oyqh-jkdow-rlca6-ejbc4-7yhjv-kwbtp-2o4ju-rjfyy-t6hit-gae";

const features = [
  {
    icon: <span className="text-2xl">🦀</span>,
    title: "Rust-Powered Runtime",
    description:
      "Fast, memory-safe harness with streaming API support and zero-cost abstractions.",
  },
  {
    icon: <span className="text-2xl">🐍</span>,
    title: "Python Workspace",
    description:
      "Clean-room Python port with a comprehensive test suite and familiar developer ergonomics.",
  },
  {
    icon: <span className="text-2xl">🔌</span>,
    title: "Plugin System",
    description:
      "Extensible hook pipeline and bundled plugins for custom workflows and integrations.",
  },
  {
    icon: <span className="text-2xl">🖥️</span>,
    title: "Interactive CLI",
    description:
      "REPL with markdown rendering, syntax highlighting, and project bootstrap commands.",
  },
];

const codeLines: { text: string; type: "comment" | "command" | "blank" }[] = [
  { text: "# Clone the repository", type: "comment" },
  {
    text: "git clone https://github.com/instructkr/claw-code.git",
    type: "command",
  },
  { text: "cd claw-code", type: "command" },
  { text: "", type: "blank" },
  { text: "# Run the Python workspace", type: "comment" },
  { text: "python3 -m src.main summary", type: "command" },
  { text: "", type: "blank" },
  { text: "# Or build the Rust port", type: "comment" },
  { text: "cd rust && cargo build --release", type: "command" },
];

function useCopyToClipboard(text: string, duration = 2000) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
    });
  };
  return { copied, copy };
}

function CopyButton({
  text,
  label,
  ocid,
}: { text: string; label?: string; ocid: string }) {
  const { copied, copy } = useCopyToClipboard(text);
  return (
    <button
      type="button"
      onClick={copy}
      data-ocid={ocid}
      title={copied ? "Copied!" : "Copy to clipboard"}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={{
        background: copied
          ? "oklch(0.72 0.18 162 / 0.18)"
          : "oklch(0.22 0.025 243)",
        color: copied ? "oklch(0.72 0.18 162)" : "oklch(0.72 0.018 240)",
        border: `1px solid ${copied ? "oklch(0.72 0.18 162 / 0.4)" : "oklch(0.3 0.028 243)"}`,
      }}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      {label && <span>{copied ? "Copied!" : label}</span>}
    </button>
  );
}

function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "oklch(0.118 0.015 243 / 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.22 0.025 243)",
      }}
    >
      <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-sm"
            style={{
              background: "oklch(0.72 0.18 162 / 0.2)",
              border: "1px solid oklch(0.72 0.18 162 / 0.4)",
            }}
          >
            🦾
          </div>
          <span
            className="font-bold text-lg tracking-widest"
            style={{
              color: "oklch(0.92 0.01 240)",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            CLAWED
          </span>
        </div>

        {/* Nav links */}
        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Main navigation"
        >
          {[
            { label: "Home", href: "#hero", active: true },
            { label: "Features", href: "#features" },
            { label: "Quick Start", href: "#quickstart" },
            { label: "GitHub", href: GITHUB_URL, external: true },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
              className="text-sm transition-colors"
              style={{
                color: link.active
                  ? "oklch(0.76 0.15 168)"
                  : "oklch(0.72 0.018 240)",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href={ZIP_URL} download data-ocid="nav.download.button">
          <Button
            size="sm"
            className="text-xs font-semibold tracking-wide"
            style={{
              background: "oklch(0.723 0.191 149)",
              color: "oklch(0.1 0.03 149)",
              border: "none",
            }}
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download v0.9.1
          </Button>
        </a>
      </div>
    </header>
  );
}

function FloatingGlyph({
  text,
  x,
  y,
  delay,
}: {
  text: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute code-font text-xs select-none pointer-events-none hidden lg:block"
      style={{
        left: x,
        top: y,
        color: "oklch(0.72 0.18 162 / 0.25)",
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  );
}

function CloneButton() {
  const { copied, copy } = useCopyToClipboard(CLONE_CMD);
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={copy}
      data-ocid="hero.clone.button"
      className="text-sm font-semibold px-6 py-3 rounded-xl w-full sm:w-auto transition-all"
      style={{
        background: copied
          ? "oklch(0.72 0.18 162 / 0.12)"
          : "oklch(0.22 0.025 243)",
        color: copied ? "oklch(0.72 0.18 162)" : "oklch(0.92 0.01 240)",
        border: copied
          ? "1px solid oklch(0.72 0.18 162 / 0.5)"
          : "1px solid oklch(0.3 0.028 243)",
      }}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Terminal className="w-4 h-4 mr-2" />
          Copy Clone Command
        </>
      )}
    </Button>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center pt-20 pb-24 overflow-hidden"
    >
      {/* Aurora glow */}
      <div className="hero-glow" />

      {/* Floating code glyphs */}
      <FloatingGlyph text="fn main()" x="8%" y="25%" delay={0} />
      <FloatingGlyph text="import" x="85%" y="30%" delay={1.5} />
      <FloatingGlyph text="cargo build" x="6%" y="65%" delay={0.8} />
      <FloatingGlyph text="python3 -m" x="82%" y="60%" delay={2} />
      <FloatingGlyph text="git clone" x="15%" y="80%" delay={0.4} />
      <FloatingGlyph text="--release" x="75%" y="78%" delay={1.2} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-extrabold tracking-[0.15em] mb-6"
          style={{
            color: "oklch(0.95 0.01 240)",
            textShadow: "0 0 80px oklch(0.72 0.18 162 / 0.4)",
          }}
        >
          CLAWED
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "oklch(0.72 0.018 240)" }}
        >
          Better Harness Tools that make real things done. Open-source AI coding
          harness, rebuilt from the ground up.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <a href={ZIP_URL} download data-ocid="hero.download.button">
            <Button
              size="lg"
              className="text-sm font-semibold px-6 py-3 rounded-xl w-full sm:w-auto"
              style={{
                background: "oklch(0.723 0.191 149)",
                color: "oklch(0.1 0.03 149)",
                border: "none",
                boxShadow: "0 0 32px oklch(0.72 0.18 162 / 0.3)",
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Now (v0.9.1)
            </Button>
          </a>
          <CloneButton />
        </motion.div>

        {/* Release pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex justify-center"
        >
          <Badge
            className="text-xs px-4 py-1.5 rounded-full font-medium tracking-wide"
            style={{
              background: "oklch(0.19 0.022 243)",
              color: "oklch(0.72 0.018 240)",
              border: "1px solid oklch(0.28 0.028 243)",
            }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-2 animate-pulse-glow"
              style={{ background: "oklch(0.72 0.18 162)" }}
            />
            Latest Release · main branch
          </Badge>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "oklch(0.92 0.01 240)" }}
          >
            Features
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.62 0.015 240)" }}
          >
            Everything you need to build, test, and ship AI-assisted code at
            scale.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          data-ocid="features.list"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`features.item.${i + 1}`}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-2xl p-6 h-full flex flex-col gap-4 transition-transform hover:-translate-y-1 hover:shadow-card"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.162 0.020 243) 0%, oklch(0.148 0.018 243) 100%)",
        border: "1px solid oklch(0.24 0.025 243)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: "oklch(0.72 0.18 162 / 0.12)",
          border: "1px solid oklch(0.72 0.18 162 / 0.25)",
        }}
      >
        {icon}
      </div>
      <div>
        <h3
          className="font-semibold text-base mb-2"
          style={{ color: "oklch(0.92 0.01 240)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.62 0.015 240)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function QuickStart() {
  return (
    <section id="quickstart" className="py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "oklch(0.92 0.01 240)" }}
          >
            Installation &amp; Quick Start
          </h2>
          <p className="text-base" style={{ color: "oklch(0.62 0.015 240)" }}>
            Get up and running in under a minute.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          data-ocid="quickstart.panel"
        >
          {/* Terminal card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.13 0.016 243)",
              border: "1px solid oklch(0.22 0.025 243)",
              boxShadow: "0 8px 48px oklch(0 0 0 / 0.5)",
            }}
          >
            {/* macOS title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid oklch(0.2 0.022 243)" }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "#FF5F57" }}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "#FFBD2E" }}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "#28C840" }}
              />
              <span
                className="ml-4 text-xs code-font"
                style={{ color: "oklch(0.48 0.015 240)" }}
              >
                terminal
              </span>
            </div>

            {/* Code content */}
            <div className="p-6 overflow-x-auto">
              <pre
                className="code-font text-sm leading-7"
                style={{ color: "oklch(0.78 0.015 240)" }}
              >
                {codeLines.map((line) => (
                  <div key={line.text || `blank-${codeLines.indexOf(line)}`}>
                    {line.type === "comment" ? (
                      <span style={{ color: "oklch(0.55 0.015 240)" }}>
                        {line.text}
                      </span>
                    ) : line.type === "command" ? (
                      <span>
                        <span style={{ color: "oklch(0.72 0.18 162)" }}>
                          ${" "}
                        </span>
                        <span style={{ color: "oklch(0.88 0.01 240)" }}>
                          {line.text}
                        </span>
                      </span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Donate() {
  return (
    <section id="donate" className="py-24">
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* ICP infinity glyph accent */}
          <div
            className="mx-auto mb-6 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
            style={{
              background: "oklch(0.75 0.18 75 / 0.12)",
              border: "1px solid oklch(0.75 0.18 75 / 0.35)",
              color: "oklch(0.82 0.18 75)",
              boxShadow: "0 0 32px oklch(0.75 0.18 75 / 0.15)",
            }}
          >
            ∞
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "oklch(0.92 0.01 240)" }}
          >
            Support Clawed
          </h2>
          <p
            className="text-base mb-8 max-w-md mx-auto"
            style={{ color: "oklch(0.62 0.015 240)" }}
          >
            Support development with ICP on the Internet Computer.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                data-ocid="donate.open_modal_button"
                className="text-sm font-semibold px-8 py-3 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.17 75) 0%, oklch(0.65 0.20 55) 100%)",
                  color: "oklch(0.12 0.03 75)",
                  border: "none",
                  boxShadow: "0 0 32px oklch(0.72 0.17 75 / 0.35)",
                }}
              >
                <span className="mr-2 text-base">∞</span>
                Donate ICP
              </Button>
            </DialogTrigger>

            <DialogContent
              data-ocid="donate.dialog"
              className="max-w-lg"
              style={{
                background: "oklch(0.148 0.018 243)",
                border: "1px solid oklch(0.26 0.028 243)",
                boxShadow: "0 24px 80px oklch(0 0 0 / 0.7)",
              }}
            >
              <DialogHeader>
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                    style={{
                      background: "oklch(0.75 0.18 75 / 0.15)",
                      border: "1px solid oklch(0.75 0.18 75 / 0.4)",
                      color: "oklch(0.82 0.18 75)",
                    }}
                  >
                    ∞
                  </div>
                </div>
                <DialogTitle
                  className="text-center text-xl font-bold"
                  style={{ color: "oklch(0.92 0.01 240)" }}
                >
                  Donate ICP
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-5">
                {/* Instructions */}
                <p
                  className="text-sm text-center leading-relaxed"
                  style={{ color: "oklch(0.62 0.015 240)" }}
                >
                  Open your ICP wallet (e.g. Plug, Stoic, NNS) and send ICP to
                  the Account ID below.
                </p>

                {/* Account ID */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "oklch(0.13 0.016 243)",
                    border: "1px solid oklch(0.22 0.025 243)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: "oklch(0.82 0.18 75)" }}
                    >
                      Account ID
                    </span>
                    <CopyButton
                      text={ACCOUNT_ID}
                      label="Copy"
                      ocid="donate.account_id.button"
                    />
                  </div>
                  <p
                    className="code-font text-xs break-all leading-relaxed"
                    style={{ color: "oklch(0.82 0.01 240)" }}
                  >
                    {ACCOUNT_ID}
                  </p>
                </div>

                {/* Principal ID */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "oklch(0.13 0.016 243)",
                    border: "1px solid oklch(0.22 0.025 243)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: "oklch(0.72 0.13 210)" }}
                    >
                      Principal ID
                    </span>
                    <CopyButton
                      text={PRINCIPAL_ID}
                      label="Copy"
                      ocid="donate.principal_id.button"
                    />
                  </div>
                  <p
                    className="code-font text-xs break-all leading-relaxed"
                    style={{ color: "oklch(0.82 0.01 240)" }}
                  >
                    {PRINCIPAL_ID}
                  </p>
                </div>

                {/* Note */}
                <p
                  className="text-xs text-center"
                  style={{ color: "oklch(0.48 0.012 240)" }}
                >
                  Prefer sending to Account ID when using NNS or exchange
                  withdrawals.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="py-24">
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "oklch(0.92 0.01 240)" }}
          >
            Community &amp; GitHub
          </h2>
          <p
            className="text-base mb-10"
            style={{ color: "oklch(0.62 0.015 240)" }}
          >
            Join thousands of developers building with Clawed.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <Star
                className="w-5 h-5"
                style={{ color: "oklch(0.82 0.16 84)" }}
                fill="oklch(0.82 0.16 84)"
              />
              <span
                className="text-xl font-bold"
                style={{ color: "oklch(0.92 0.01 240)" }}
              >
                101k
              </span>
              <span
                className="text-sm"
                style={{ color: "oklch(0.58 0.015 240)" }}
              >
                stars
              </span>
            </div>
            <div
              className="w-px h-6"
              style={{ background: "oklch(0.25 0.025 243)" }}
            />
            <div className="flex items-center gap-2">
              <GitFork
                className="w-5 h-5"
                style={{ color: "oklch(0.72 0.13 210)" }}
              />
              <span
                className="text-xl font-bold"
                style={{ color: "oklch(0.92 0.01 240)" }}
              >
                92.5k
              </span>
              <span
                className="text-sm"
                style={{ color: "oklch(0.58 0.015 240)" }}
              >
                forks
              </span>
            </div>
          </div>

          {/* GitHub button */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="community.github.button"
          >
            <Button
              size="lg"
              className="text-sm font-semibold px-10 py-3 rounded-xl"
              style={{
                background: "oklch(0.22 0.025 243)",
                color: "oklch(0.92 0.01 240)",
                border: "1px solid oklch(0.3 0.028 243)",
              }}
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub (101k Stars / 92.5k Forks) →
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="py-12"
      style={{ borderTop: "1px solid oklch(0.2 0.022 243)" }}
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-base">🦾</span>
            <span
              className="font-bold tracking-widest text-sm"
              style={{ color: "oklch(0.92 0.01 240)" }}
            >
              CLAWED
            </span>
          </div>

          {/* Footer links */}
          <nav
            className="flex items-center gap-6"
            aria-label="Footer navigation"
          >
            {[
              { label: "Home", href: "#hero" },
              { label: "Features", href: "#features" },
              { label: "Quick Start", href: "#quickstart" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs transition-colors hover:text-foreground"
                data-ocid={`footer.${link.label.toLowerCase().replace(" ", "_")}.link`}
                style={{ color: "oklch(0.52 0.015 240)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.github.link"
              className="transition-opacity hover:opacity-80"
              style={{ color: "oklch(0.62 0.015 240)" }}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid oklch(0.18 0.02 243)",
            color: "oklch(0.44 0.012 240)",
          }}
        >
          © {year} Clawed. Open-source on{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "oklch(0.72 0.18 162)" }}
          >
            GitHub
          </a>
          . Built with ❤️ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "oklch(0.62 0.015 240)" }}
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Features />
        <QuickStart />
        <Donate />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
