import React, { useState } from 'react';
import { INITIAL_BATCHES } from '../data/initialData';
import { BatchModule } from '../types';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Star, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  X, 
  Sparkles,
  Award,
  Search,
  Check,
  RotateCcw,
  Bookmark,
  ChevronRight,
  Download,
  Printer,
  Eye,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChapterDetail {
  title: string;
  summary: string;
  formulas: string[];
  keyConcepts: string[];
  practiceProblem: string;
  solution: string;
}

export const BatchesView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBatch, setActiveBatch] = useState<BatchModule | null>(null);

  // Active tab inside Reader Modal ('notes' | 'dpp')
  const [modalTab, setModalTab] = useState<'notes' | 'dpp'>('notes');

  // Selected specific chapter note to read in full deck view
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);

  // PDF Printable Preview State
  const [pdfPreviewChapter, setPdfPreviewChapter] = useState<ChapterDetail | null>(null);

  // Track completed chapters
  const [completedChapters, setCompletedChapters] = useState<{ [key: string]: boolean }>({});

  // DPP Quiz Interactive State
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: string }>({});
  const [showExplanations, setShowExplanations] = useState<{ [qIdx: number]: boolean }>({});

  const grades = [
    'All',
    'Class 1st-5th',
    'Class 6th-10th',
    'Class 11th',
    'Class 12th',
    'Engineering & Coding',
    'Creative & Design'
  ];

  const filteredBatches = INITIAL_BATCHES.filter(b => {
    const matchesGrade = selectedGrade === 'All' || b.classGrade === selectedGrade;
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const handleAnswerSelect = (qIdx: number, option: string, correctAnswer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: option }));
    setShowExplanations(prev => ({ ...prev, [qIdx]: true }));

    if (option === correctAnswer) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  const toggleChapterComplete = (batchId: string, chapterIdx: number) => {
    const key = `${batchId}_${chapterIdx}`;
    const nextState = !completedChapters[key];
    setCompletedChapters(prev => ({ ...prev, [key]: nextState }));

    if (nextState) {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.6 } });
    }
  };

  // Detailed study content generator for chapters
  const getChapterDetail = (batch: BatchModule, idx: number): ChapterDetail => {
    if (batch.id.includes('12_physics')) {
      const details: ChapterDetail[] = [
        {
          title: 'Chapter 1: Electric Charges & Fields (Complete Notes)',
          summary: 'Fundamental study of electric charges, Coulomb\'s inverse square law, electric dipole moment, and Gauss\'s law applications.',
          formulas: [
            'Coulomb\'s Law: F = (1 / 4πε₀) · (q₁ q₂ / r²)',
            'Gauss\'s Law: ∮ E · dA = Q_enclosed / ε₀',
            'Electric Dipole Moment: p = q · 2a (Directed from -q to +q)',
            'Electric Field due to Dipole on Axial Line: E_axial = (1 / 4πε₀) · (2p / r³)'
          ],
          keyConcepts: [
            'Quantization of Charge: Q = ±ne (where e = 1.6 × 10⁻¹⁹ C)',
            'Superposition Principle for Multiple Point Charges',
            'Electric Field Lines never intersect and originate from positive charges',
            'Field inside a hollow conducting sphere carrying charge Q is ZERO'
          ],
          practiceProblem: 'A point charge q₁ = +4 μC and q₂ = -2 μC are separated by 0.2 m in vacuum. Calculate the force between them.',
          solution: 'F = (9 × 10⁹) · (4 × 10⁻⁶ × 2 × 10⁻⁶) / (0.2)² = 1.8 N (Attractive).'
        },
        {
          title: 'Chapter 2: Electrostatic Potential & Capacitance Notes',
          summary: 'Work done in assembling charges, electrostatic potential energy, equipotential surfaces, and parallel plate capacitors.',
          formulas: [
            'Potential V = (1 / 4πε₀) · (Q / r)',
            'Capacitance of Parallel Plate: C = (ε₀ · A) / d',
            'Energy Stored in Capacitor: U = ½ C V² = ½ Q V = ½ (Q² / C)',
            'Capacitors in Series: 1/C_eq = 1/C₁ + 1/C₂; Parallel: C_eq = C₁ + C₂'
          ],
          keyConcepts: [
            'Equipotential surfaces are perpendicular to electric field lines at all points',
            'Dielectric constant K increases capacitance to C\' = K · C₀',
            'Potential energy of a dipole in uniform field: U = -p · E cos(θ)'
          ],
          practiceProblem: 'Find capacitance of a parallel plate capacitor with area A = 0.05 m² and separation d = 1 mm with dielectric K = 4.',
          solution: 'C = 4 × (8.854 × 10⁻¹²) × 0.05 / (1 × 10⁻³) = 1.77 nF.'
        },
        {
          title: 'Chapter 3: Current Electricity & Kirchhoff Laws Sheet',
          summary: 'Electric current, drift velocity, Ohm\'s law, temperature dependence of resistance, and Kirchhoff\'s circuit laws.',
          formulas: [
            'Drift Velocity: v_d = (e E τ) / m',
            'Ohm\'s Law: V = I · R; Resistance R = ρ · (L / A)',
            'Kirchhoff\'s Current Law (KCL): Σ I = 0 at any junction',
            'Kirchhoff\'s Voltage Law (KVL): Σ V = 0 around closed loop',
            'Wheatstone Bridge Balance Condition: P / Q = R / S'
          ],
          keyConcepts: [
            'KCL is based on Conservation of Charge',
            'KVL is based on Conservation of Energy',
            'Potentiometer measures emf without drawing any current from the cell'
          ],
          practiceProblem: 'In a balanced Wheatstone bridge, P = 10 Ω, Q = 20 Ω, R = 15 Ω. Calculate unknown resistance S.',
          solution: 'P/Q = R/S => 10/20 = 15/S => S = 30 Ω.'
        },
        {
          title: 'Chapter 4: Ray & Wave Optics Visual Diagrams',
          summary: 'Reflection, refraction, total internal reflection, lens maker\'s formula, wave optics interference, and Young\'s double slit experiment.',
          formulas: [
            'Snell\'s Law: n₁ sin(i) = n₂ sin(r)',
            'Lens Maker\'s Formula: 1/f = (n - 1) · (1/R₁ - 1/R₂)',
            'Mirror Formula: 1/f = 1/v + 1/u',
            'YDSE Fringe Width: β = (λ · D) / d'
          ],
          keyConcepts: [
            'Total Internal Reflection occurs when light travels from denser to rarer medium at angle > critical angle',
            'Interference maximum condition: Path difference Δx = nλ',
            'Interference minimum condition: Path difference Δx = (2n + 1) λ / 2'
          ],
          practiceProblem: 'Light of wavelength λ = 600 nm illuminates a YDSE with slit separation d = 1 mm and screen distance D = 1 m. Find fringe width.',
          solution: 'β = (600 × 10⁻⁹ × 1) / 10⁻³ = 0.6 mm.'
        }
      ];
      return details[idx] || details[0];
    } else if (batch.id.includes('9_10')) {
      const details: ChapterDetail[] = [
        {
          title: 'Class 10th Light: Reflection & Refraction Complete Notes',
          summary: 'Concave and convex mirrors, ray diagrams, refraction through glass slab, lens power, and optical human eye defects.',
          formulas: [
            'Mirror Formula: 1/f = 1/v + 1/u',
            'Magnification: m = -v / u = h_i / h_o',
            'Refractive Index: n = c / v',
            'Lens Power: P = 1 / f (in meters), Unit: Dioptre (D)'
          ],
          keyConcepts: [
            'Concave mirrors produce real inverted images (and virtual erect when object is between F and P)',
            'Convex mirrors always form virtual, erect, and diminished images',
            'Power of a convex lens is positive, concave lens is negative'
          ],
          practiceProblem: 'A convex lens has focal length f = +20 cm. Calculate its power in Dioptres.',
          solution: 'P = 1 / (+0.20 m) = +5.0 D.'
        },
        {
          title: 'Class 10th Carbon & Its Compounds Chemistry Notes',
          summary: 'Covalent bonding in carbon, tetravalency, catenation, homologous series, functional groups, and saponification.',
          formulas: [
            'Alkanes General Formula: C_n H_{2n+2}',
            'Alkenes General Formula: C_n H_{2n}',
            'Alkynes General Formula: C_n H_{2n-2}',
            'Esterification: CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O'
          ],
          keyConcepts: [
            'Catenation is the unique ability of carbon to form bonds with other carbon atoms forming long chains',
            'Homologous series have identical functional groups and similar chemical properties',
            'Soaps contain hydrophobic tail and hydrophilic head forming micelles in water'
          ],
          practiceProblem: 'Write the molecular formula and name of the alkane having n = 3 carbon atoms.',
          solution: 'C₃H_{2(3)+2} = C₃H₈ (Propane).'
        },
        {
          title: 'Class 9th Motion & Newton Laws Summary',
          summary: 'Distance vs displacement, speed, velocity, acceleration equations of motion, momentum, and Newton\'s three laws of motion.',
          formulas: [
            'Velocity: v = u + a · t',
            'Displacement: s = u · t + ½ a · t²',
            'Velocity-Displacement: v² = u² + 2 a · s',
            'Force: F = m · a; Momentum: p = m · v'
          ],
          keyConcepts: [
            'Newton\'s 1st Law defines Inertia',
            'Newton\'s 2nd Law provides quantitative measure of Force (F = ma)',
            'Newton\'s 3rd Law states Action and Reaction forces are equal and opposite'
          ],
          practiceProblem: 'A car accelerates uniformly from rest at 2 m/s² for 5 seconds. Find distance covered.',
          solution: 's = (0)(5) + ½ (2)(5)² = 25 meters.'
        }
      ];
      return details[idx] || details[0];
    } else if (batch.id.includes('cs_engineering')) {
      const details: ChapterDetail[] = [
        {
          title: 'Data Structures 101: Arrays, Linked Lists & Stacks Sheet',
          summary: 'Linear data structures, memory layout, dynamic array allocation, single & double linked list insertion/deletion, stack LIFO operations.',
          formulas: [
            'Array Element Address: BaseAddress + (i × ElementSize)',
            'Stack Push Time Complexity: O(1)',
            'Linked List Traversal Time Complexity: O(N)'
          ],
          keyConcepts: [
            'Arrays store contiguous elements; Linked lists use pointers for non-contiguous storage',
            'Stack follows Last-In-First-Out (LIFO) principle; Queue follows First-In-First-Out (FIFO)',
            'Pointers allow dynamic memory allocation using malloc/new'
          ],
          practiceProblem: 'Implement Stack Push and Pop pseudo-code operations.',
          solution: 'Push(val): stack[++top] = val;\nPop(): return stack[top--];'
        },
        {
          title: 'React 18 State Management & Hooks Guide',
          summary: 'Modern frontend architecture using React 18, functional components, useState, useEffect dependencies, custom hooks, and context API.',
          formulas: [
            'useState hook: const [state, setState] = useState(initialVal)',
            'useEffect hook: useEffect(() => { return cleanup; }, [dependencies])'
          ],
          keyConcepts: [
            'Never mutate state directly; always use setState updater function',
            'useEffect dependency array controls when the side-effect executes',
            'React Virtual DOM compares diffs to minimize real DOM reflows'
          ],
          practiceProblem: 'Write a React useEffect hook that fetches data when component mounts.',
          solution: 'useEffect(() => { fetchData(); }, []);'
        }
      ];
      return details[idx] || details[0];
    }

    // Default Fallback Detail
    return {
      title: `${batch.lectureNotes[idx] || 'Chapter Study Guide'}`,
      summary: `Detailed academic chapter breakdown prepared by Shivam Singh for ${batch.title}. Covers theoretical foundations, formulas, and solved practice examples.`,
      formulas: [
        'Core Equation: Y = f(X) + C',
        'Standard Deviation Formula: σ = √(Σ(x - μ)² / N)'
      ],
      keyConcepts: [
        'Understand fundamental definitions before attempting complex derivations',
        'Review solved numerical examples step-by-step',
        'Solve DPP practice questions to test concept retention'
      ],
      practiceProblem: 'Solve the fundamental equation for initial conditions X = 0.',
      solution: 'Y = f(0) + C.'
    };
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <GraduationCap size={16} /> Open Educational Platform for All Classes — Founded by Shivam Singh
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Study Batches, PDF Notes & Printable Handbooks</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
          Class-wise structured study modules for <strong>Class 1st to 12th, Engineering & Creative Streams</strong>. Download and save PDF notes authored by <strong>Shivam Singh</strong>.
        </p>
      </div>

      {/* Class Grade Filter Bar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search batches by class, subject or topic (e.g. Physics, Class 10th, React)..."
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {grades.map(grd => (
            <button
              key={grd}
              onClick={() => setSelectedGrade(grd)}
              className={`btn btn-sm ${selectedGrade === grd ? 'btn-primary' : 'btn-outline'}`}
            >
              {grd}
            </button>
          ))}
        </div>
      </div>

      {/* Batch Cards Grid */}
      <div className="grid-autofit-md">
        {filteredBatches.map(batch => (
          <div key={batch.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img src={batch.thumbnail} alt={batch.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <span className="badge badge-indigo">{batch.classGrade}</span>
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <span className="badge badge-emerald">{batch.priceTag}</span>
                </div>
              </div>

              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <img src={batch.instructorAvatar} alt={batch.instructor} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-light)' }}>
                    Instructor: {batch.instructor}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>{batch.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
                  {batch.overview}
                </p>
              </div>
            </div>

            <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Users size={14} /> {batch.enrolledStudents} Students
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-amber)' }}>
                  <Star size={14} fill="var(--accent-amber)" /> {batch.rating} / 5
                </span>
              </div>

              <button 
                onClick={() => {
                  setActiveBatch(batch);
                  setModalTab('notes');
                  setActiveChapterIndex(null);
                  setSelectedAnswers({});
                  setShowExplanations({});
                }} 
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                <BookOpen size={14} /> Open Study Deck & PDF Notes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Study Deck Modal */}
      {activeBatch && (
        <div className="modal-overlay" onClick={() => setActiveBatch(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', padding: 0, overflow: 'hidden' }}>
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.75rem', background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={activeBatch.instructorAvatar} alt={activeBatch.instructor} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} />
                <div>
                  <span className="badge badge-indigo" style={{ marginBottom: '0.15rem' }}>{activeBatch.classGrade} • {activeBatch.subject}</span>
                  <h3 style={{ fontSize: '1.2rem', lineHeight: 1.25 }}>{activeBatch.title}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Authored by <strong>{activeBatch.instructor}</strong></div>
                </div>
              </div>

              <button onClick={() => setActiveBatch(null)} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            {/* Modal Navigation Tabs */}
            <div style={{ display: 'flex', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => { setModalTab('notes'); setActiveChapterIndex(null); }}
                style={{
                  flex: 1,
                  padding: '0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: modalTab === 'notes' ? 'var(--accent-primary)' : 'var(--text-muted)',
                  borderBottom: modalTab === 'notes' ? '3px solid var(--accent-primary)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <FileText size={16} /> Lecture Notes & Chapter Index ({activeBatch.lectureNotes.length})
              </button>

              <button
                onClick={() => setModalTab('dpp')}
                style={{
                  flex: 1,
                  padding: '0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: modalTab === 'dpp' ? 'var(--accent-primary)' : 'var(--text-muted)',
                  borderBottom: modalTab === 'dpp' ? '3px solid var(--accent-primary)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <HelpCircle size={16} /> Daily Practice Papers (DPPs) Quiz ({activeBatch.dppQuestions.length})
              </button>
            </div>

            {/* Modal Content Stage */}
            <div style={{ padding: '1.75rem', maxHeight: '72vh', overflowY: 'auto' }}>
              {modalTab === 'notes' ? (
                activeChapterIndex === null ? (
                  /* Chapter Selection Index */
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-light)', marginBottom: '0.5rem' }}>Select a Chapter to Read Notes or Download PDF</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                      Click any chapter below to view full formulas, key definitions, and solved numerical problems in-app.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {activeBatch.lectureNotes.map((note, idx) => {
                        const isDone = completedChapters[`${activeBatch.id}_${idx}`];
                        const detail = getChapterDetail(activeBatch, idx);

                        return (
                          <div 
                            key={idx} 
                            className="glass-card" 
                            style={{ 
                              padding: '1.1rem 1.25rem', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              background: 'var(--bg-surface-elevated)',
                              borderLeft: isDone ? '4px solid #10b981' : '4px solid var(--accent-primary)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, cursor: 'pointer' }} onClick={() => setActiveChapterIndex(idx)}>
                              <FileText size={22} color={isDone ? '#10b981' : 'var(--accent-primary)'} />
                              <div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{note}</div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Authored by Shivam Singh</span>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                              {isDone && (
                                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                                  Completed ✓
                                </span>
                              )}
                              <button 
                                onClick={() => setPdfPreviewChapter(detail)} 
                                className="btn btn-sm btn-secondary" 
                                style={{ fontSize: '0.8rem' }}
                                title="Download PDF Printable Note"
                              >
                                <Download size={14} /> PDF
                              </button>

                              <button onClick={() => setActiveChapterIndex(idx)} className="btn btn-sm btn-primary">
                                Read Chapter <ChevronRight size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Single Chapter Detailed Reader Deck */
                  (() => {
                    const detail = getChapterDetail(activeBatch, activeChapterIndex);
                    const isDone = completedChapters[`${activeBatch.id}_${activeChapterIndex}`];

                    return (
                      <div>
                        {/* Header bar */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                          <button onClick={() => setActiveChapterIndex(null)} className="btn btn-sm btn-outline">
                            ← Back to Chapter Index
                          </button>

                          <div style={{ display: 'flex', gap: '0.65rem' }}>
                            <button onClick={() => setPdfPreviewChapter(detail)} className="btn btn-sm btn-secondary">
                              <Printer size={14} /> Save / Print PDF
                            </button>

                            <button 
                              onClick={() => toggleChapterComplete(activeBatch.id, activeChapterIndex)}
                              className={`btn btn-sm ${isDone ? 'btn-primary' : 'btn-secondary'}`}
                            >
                              {isDone ? '✓ Chapter Completed' : 'Mark as Completed'}
                            </button>
                          </div>
                        </div>

                        <h3 style={{ fontSize: '1.35rem', color: 'var(--accent-light)', marginBottom: '0.5rem' }}>{detail.title}</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6, background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-primary)' }}>
                          "{detail.summary}"
                        </p>

                        {/* Formulas & Equations */}
                        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--bg-surface-elevated)' }}>
                          <h4 style={{ fontSize: '1rem', color: 'var(--accent-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Sparkles size={16} /> Key Formulas & Equations
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {detail.formulas.map((f, fIdx) => (
                              <div key={fIdx} style={{ background: 'var(--bg-surface)', padding: '0.65rem 0.85rem', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}>
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Concepts */}
                        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--bg-surface-elevated)' }}>
                          <h4 style={{ fontSize: '1rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <CheckCircle2 size={16} /> Essential Concepts to Remember
                          </h4>
                          <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {detail.keyConcepts.map((c, cIdx) => (
                              <li key={cIdx}>{c}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Solved Numerical Problem */}
                        <div className="glass-card" style={{ padding: '1.25rem', background: 'var(--bg-surface-elevated)' }}>
                          <h4 style={{ fontSize: '1rem', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
                            ✍ Solved Practice Example
                          </h4>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            Problem: {detail.practiceProblem}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#6ee7b7', background: 'rgba(16, 185, 129, 0.15)', padding: '0.75rem', borderRadius: 4, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                            <strong>Solution:</strong> {detail.solution}
                          </div>
                        </div>
                      </div>
                    );
                  })()
                )
              ) : (
                /* DPP Interactive Quiz Tab */
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-light)', marginBottom: '1rem' }}>DPP Practice Questions (Interactive Quiz)</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {activeBatch.dppQuestions.map((q, qIdx) => {
                      const selected = selectedAnswers[qIdx];
                      const isCorrect = selected === q.answer;

                      return (
                        <div key={qIdx} className="glass-card" style={{ padding: '1.25rem', background: 'var(--bg-surface-elevated)' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem', lineHeight: 1.4 }}>
                            Q{qIdx + 1}. {q.question}
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '0.85rem' }}>
                            {q.options.map(opt => {
                              let btnStyle = {
                                padding: '0.6rem 0.85rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                border: '1px solid var(--border-subtle)',
                                background: 'var(--bg-surface)',
                                color: 'var(--text-main)',
                                textAlign: 'left' as const,
                                cursor: 'pointer'
                              };

                              if (selected === opt) {
                                if (opt === q.answer) {
                                  btnStyle.background = 'rgba(16, 185, 129, 0.25)';
                                  btnStyle.border = '1px solid #10b981';
                                  btnStyle.color = '#6ee7b7';
                                } else {
                                  btnStyle.background = 'rgba(244, 63, 94, 0.25)';
                                  btnStyle.border = '1px solid #f43f5e';
                                  btnStyle.color = '#fda4af';
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  onClick={() => handleAnswerSelect(qIdx, opt, q.answer)}
                                  style={btnStyle}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {showExplanations[qIdx] && (
                            <div style={{ padding: '0.75rem', borderRadius: 4, background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)', fontSize: '0.85rem', color: isCorrect ? '#6ee7b7' : '#fda4af' }}>
                              <strong>{isCorrect ? '✓ Correct Answer!' : '✗ Incorrect'}</strong> — {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1rem 1.75rem', background: 'var(--bg-surface-elevated)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setActiveBatch(null)} className="btn btn-secondary">
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Printable Document Modal View */}
      {pdfPreviewChapter && (
        <div className="modal-overlay" onClick={() => setPdfPreviewChapter(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '750px', background: '#ffffff', color: '#0f172a', padding: '2.5rem', borderRadius: 8 }}>
            {/* PDF Document Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #6366f1', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src="/shivam-singh.png" alt="Shivam Singh" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #6366f1' }} />
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#1e293b', margin: 0 }}>SHIVAM SINGH STUDY FOUNDATION</h2>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Official Academic Study Note & PDF Printable Sheet</div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#4338ca', padding: '0.25rem 0.65rem', borderRadius: 4, fontWeight: 700 }}>
                  VERIFIED PDF NOTE
                </span>
              </div>
            </div>

            {/* Note Content */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.75rem' }}>{pdfPreviewChapter.title}</h3>
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: 6, borderLeft: '4px solid #6366f1' }}>
              "{pdfPreviewChapter.summary}"
            </p>

            <h4 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '0.5rem' }}>📐 Formulas & Core Equations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {pdfPreviewChapter.formulas.map((f, i) => (
                <div key={i} style={{ background: '#f1f5f9', padding: '0.5rem 0.75rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#0f172a', borderRadius: 4 }}>
                  {f}
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '0.5rem' }}>💡 Key Concepts</h4>
            <ul style={{ paddingLeft: '1.2rem', color: '#334155', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {pdfPreviewChapter.keyConcepts.map((c, i) => (
                <li key={i} style={{ marginBottom: '0.35rem' }}>{c}</li>
              ))}
            </ul>

            <h4 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '0.5rem' }}>✍ Solved Practice Example</h4>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: 6, fontSize: '0.9rem', color: '#166534', marginBottom: '2rem' }}>
              <strong>Problem:</strong> {pdfPreviewChapter.practiceProblem}<br/>
              <strong style={{ display: 'block', marginTop: '0.5rem' }}>Solution:</strong> {pdfPreviewChapter.solution}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <button onClick={() => setPdfPreviewChapter(null)} className="btn btn-secondary">
                Close Preview
              </button>
              <button onClick={() => window.print()} className="btn btn-primary" style={{ background: '#6366f1', color: '#ffffff' }}>
                <Printer size={16} /> Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
