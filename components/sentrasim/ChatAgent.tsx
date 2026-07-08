'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Message = {
  id: string
  role: 'user' | 'model'
  text: string
  ts: Date
}

const STARTER_PROMPTS = [
  'Pasien sesak, SpO₂ 92%, RR 28, demam 38.5°C — apa kemungkinan diagnosis?',
  'Bagaimana interpretasi klinis takipnea + hipoksemia ringan?',
  'Kapan harus eskalasi ke ICU pada kasus pneumonia komunitas?',
  'Jelaskan bundle sepsis yang perlu dilakukan dalam 1 jam pertama',
]

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '10px 14px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--sentra-audrey-teal)',
          }}
        />
      ))}
    </div>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16, y: 4 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        alignSelf: 'flex-end',
        maxWidth: '82%',
        background: '#1a1a1a',
        color: '#f5f5f5',
        borderRadius: '14px 14px 3px 14px',
        padding: '10px 14px',
        fontFamily: 'var(--font-jakarta), sans-serif',
        fontSize: 13,
        fontWeight: 400,
        lineHeight: 1.55,
        whiteSpace: 'pre-wrap',
      }}
    >
      {text}
    </motion.div>
  )
}

function ModelBubble({ text }: { text: string }) {
  // Parse basic markdown-ish formatting: **bold**, bullet lists
  const lines = text.split('\n')
  return (
    <motion.div
      initial={{ opacity: 0, x: -12, y: 4 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        alignSelf: 'flex-start',
        maxWidth: '88%',
        background: '#f0f0f0',
        border: '1px solid #d8d8d8',
        borderRadius: '3px 14px 14px 14px',
        padding: '10px 14px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-jakarta), sans-serif',
          fontSize: 13,
          fontWeight: 400,
          lineHeight: 1.65,
          color: '#1a1a1a',
          whiteSpace: 'pre-wrap',
        }}
      >
        {lines.map((line, i) => {
          // Render **bold** inline
          const parts = line.split(/\*\*(.*?)\*\*/g)
          return (
            <span key={i}>
              {parts.map((p, j) =>
                j % 2 === 1 ? (
                  <strong key={j} style={{ fontWeight: 600 }}>
                    {p}
                  </strong>
                ) : (
                  <span key={j}>{p}</span>
                )
              )}
              {i < lines.length - 1 && <br />}
            </span>
          )
        })}
      </div>
    </motion.div>
  )
}

export function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text: string) {
    if (!text.trim() || loading) return
    setInput('')

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text: text.trim(),
      ts: new Date(),
    }
    const next = [...messages, userMsg]
    setMessages(next)
    setLoading(true)

    try {
      const res = await fetch('/api/sentra-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, text: m.text })),
        }),
      })
      const data = (await res.json()) as { reply?: string; error?: string }
      const reply = data.reply ?? `Error: ${data.error ?? 'Unknown error'}`
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'model', text: reply, ts: new Date() },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'model',
          text: 'Koneksi gagal. Periksa jaringan dan coba lagi.',
          ts: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div
      style={{
        position: 'sticky',
        top: 128,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 180px)',
        maxHeight: 700,
        fontFamily: 'var(--font-jakarta), sans-serif',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          paddingBottom: 20,
          borderBottom: '1px solid #b8b8b8',
          marginBottom: 16,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--sentra-audrey-teal)',
              flexShrink: 0,
              boxShadow: '0 0 8px rgba(0,209,178,0.6)',
              animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--sentra-audrey-teal)',
            }}
          >
            Clinical AI Agent
          </span>
        </div>

        <h3
          style={{
            fontSize: 'clamp(32px, 2.8vw, 46px)',
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '-0.055em',
            color: '#1a1a1a',
            margin: 0,
          }}
        >
          Sentra
          <br />
          Assist
        </h3>

        <p
          style={{
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 1.55,
            color: '#666',
            margin: 0,
          }}
        >
          Tanya apa saja tentang kasus klinis, interpretasi data, atau rekomendasi tatalaksana.
        </p>
      </div>

      {/* ── Message area ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          paddingRight: 4,
          scrollbarWidth: 'thin',
          scrollbarColor: '#ccc transparent',
        }}
      >
        {/* Empty state — starter prompts */}
        <AnimatePresence>
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}
            >
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#aaa',
                  fontWeight: 400,
                }}
              >
                Mulai dari sini
              </span>
              {STARTER_PROMPTS.map((p, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => send(p)}
                  style={{
                    background: '#f0f0f0',
                    border: '1px solid #d0d0d0',
                    borderRadius: 10,
                    padding: '9px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-jakarta), sans-serif',
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: 1.45,
                    color: '#2a2a2a',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--sentra-audrey-teal)'
                    e.currentTarget.style.background = 'rgba(0,209,178,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d0d0d0'
                    e.currentTarget.style.background = '#f0f0f0'
                  }}
                >
                  {p}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        {messages.map((m) =>
          m.role === 'user' ? (
            <UserBubble key={m.id} text={m.text} />
          ) : (
            <ModelBubble key={m.id} text={m.text} />
          )
        )}

        {/* Typing indicator */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              style={{
                alignSelf: 'flex-start',
                background: '#f0f0f0',
                border: '1px solid #d8d8d8',
                borderRadius: '3px 14px 14px 14px',
              }}
            >
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div
        style={{
          marginTop: 12,
          flexShrink: 0,
          background: '#f0f0f0',
          border: '1px solid #c8c8c8',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0,
          padding: '8px 8px 8px 14px',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => {
          // parent div focus-within via ref
          e.currentTarget.style.borderColor = 'var(--sentra-audrey-teal)'
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            e.currentTarget.style.borderColor = '#c8c8c8'
          }
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
          }}
          onKeyDown={handleKey}
          placeholder="Tanya Sentra Assist... (Enter untuk kirim)"
          rows={1}
          disabled={loading}
          style={{
            flex: 1,
            resize: 'none',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: 13,
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#1a1a1a',
            overflowY: 'hidden',
            paddingTop: 4,
            paddingBottom: 4,
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            border: 'none',
            background: input.trim() && !loading ? '#1a1a1a' : '#d0d0d0',
            color: input.trim() && !loading ? '#fff' : '#999',
            cursor: input.trim() && !loading ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s, color 0.15s',
          }}
          aria-label="Kirim pesan"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          marginTop: 8,
          fontSize: 9,
          fontWeight: 400,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#b0b0b0',
          textAlign: 'center',
        }}
      >
        Sentra Assist bukan pengganti keputusan dokter · Gunakan secara kritis
      </div>
    </div>
  )
}
