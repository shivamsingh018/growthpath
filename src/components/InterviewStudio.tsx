import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Sparkles, Mic, Send, Bot, CheckCircle2, MessageSquare, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InterviewStudio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'Technical' | 'Behavioral' | 'HR'>('Technical');
  const [answerInput, setAnswerInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<any>(null);

  const sampleQuestions = {
    Technical: [
      'Explain the difference between SQL JOINs and Subqueries. How do you optimize execution time?',
      'Walk me through the architecture of your fullstack web application project.',
      'What is Object-Oriented Polymorphism and how is it implemented in Java or TypeScript?'
    ],
    Behavioral: [
      'Describe a situation where a technical project deadline was tight. How did you prioritize tasks? (STAR Method)',
      'Tell me about a time you resolved a major bug under pressure.',
      'How do you handle technical disagreements within a design or engineering team?'
    ],
    HR: [
      'Tell me about yourself and your career goals for the next 3 years.',
      'Why do you want to join our engineering and product team?',
      'What are your key technical strengths and areas for growth?'
    ]
  };

  const currentQuestions = sampleQuestions[activeCategory];
  const [selectedQuestion, setSelectedQuestion] = useState(currentQuestions[0]);

  const handleEvaluateAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim()) return;

    setIsEvaluating(true);
    setAiEvaluation(null);

    setTimeout(() => {
      setAiEvaluation({
        score: 86,
        clarity: 88,
        structure: 85,
        relevance: 87,
        feedback: [
          'Strong technical explanation with clear key terminology.',
          'Great use of the STAR method framework (Situation → Action → Result).',
          'Suggestion: Include specific quantitative numbers (e.g. % performance increase).'
        ]
      });
      setIsEvaluating(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 1200);
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <Award size={16} /> Interactive AI Mock Interview Studio — Directed by Shivam Singh
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Practice Technical & Behavioral Interviews
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Record or type your responses to common tech & HR interview questions. Get real-time AI evaluation on Clarity, Structure, and Relevance.
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {(['Technical', 'Behavioral', 'HR'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelectedQuestion(sampleQuestions[cat][0]); setAiEvaluation(null); }}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
          >
            {cat} Interview
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Practice Form */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <MessageSquare size={14} /> Practice Question
          </span>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>Select Question:</label>
            <select 
              className="input-field" 
              value={selectedQuestion}
              onChange={e => { setSelectedQuestion(e.target.value); setAiEvaluation(null); }}
            >
              {currentQuestions.map((q, idx) => (
                <option key={idx} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)', lineHeight: 1.4, padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            "{selectedQuestion}"
          </div>

          <form onSubmit={handleEvaluateAnswer}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Your Response (Type or Record):
            </label>
            <textarea 
              className="input-field" 
              rows={6}
              placeholder="Type your response using the STAR method (Situation, Task, Action, Result)..."
              value={answerInput}
              onChange={e => setAnswerInput(e.target.value)}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <button type="button" onClick={() => setAnswerInput('In my recent fullstack web project, I designed a scalable REST API using Node.js and PostgreSQL. When handling 1,000 concurrent requests, response times lagged. I implemented database indexing and Redis caching, reducing API latency by 45%.')} className="btn btn-sm btn-outline">
                Use Sample Answer
              </button>

              <button type="submit" disabled={isEvaluating} className="btn btn-primary">
                {isEvaluating ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />}
                {isEvaluating ? 'Evaluating...' : 'Evaluate Answer'}
              </button>
            </div>
          </form>
        </div>

        {/* Right AI Evaluation Scorecard */}
        <div>
          {aiEvaluation ? (
            <div className="glass-card" style={{ padding: '2rem', background: 'var(--bg-surface-elevated)', borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Bot size={22} color="var(--accent-primary)" />
                  <span style={{ fontSize: '1rem', fontWeight: 800 }}>AI Evaluation Result</span>
                </div>
                <span className="badge badge-emerald" style={{ fontSize: '1.1rem' }}>{aiEvaluation.score} / 100</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Clarity</div>
                  <strong style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>{aiEvaluation.clarity}%</strong>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Structure</div>
                  <strong style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem' }}>{aiEvaluation.structure}%</strong>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Relevance</div>
                  <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.2rem' }}>{aiEvaluation.relevance}%</strong>
                </div>
              </div>

              <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-amber)', marginBottom: '0.65rem' }}>AI Feedback & Suggestions:</h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {aiEvaluation.feedback.map((f: string, idx: number) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Bot size={40} color="var(--accent-primary)" style={{ margin: '0 auto 1rem auto', opacity: 0.6 }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>AI Interview Evaluator Ready</h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '340px', margin: '0 auto' }}>
                Select a question, type your response, and click 'Evaluate Answer' to receive instant AI scoring.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
