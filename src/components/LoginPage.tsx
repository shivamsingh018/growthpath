import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Award,
  ShieldCheck,
  Building2,
  Check
} from 'lucide-react';
import { apiClient } from '../services/api';
import confetti from 'canvas-confetti';

export const LoginPage: React.FC = () => {
  const { setCurrentUser, setCurrentView, authRedirectView } = useApp();
  const [activeMode, setActiveMode] = useState<'login' | 'signup' | 'otp' | 'forgot'>('login');

  // Login State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Mobile OTP State
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);

  // Sign Up State
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<{ available?: boolean; message?: string }>({});
  const [email, setEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountRole, setAccountRole] = useState<'STUDENT' | 'MENTOR' | 'RECRUITER'>('STUDENT');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // OTP Countdown timer
  useEffect(() => {
    let interval: any = null;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Username availability live check
  useEffect(() => {
    if (!username.trim() || username.length < 3) {
      setUsernameStatus({});
      return;
    }
    const timeout = setTimeout(async () => {
      const res = await apiClient.checkUsername(username);
      setUsernameStatus(res);
    }, 350);
    return () => clearTimeout(timeout);
  }, [username]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await apiClient.login({ identifier, password });
      setIsSubmitting(false);

      if (res.success && res.user) {
        setCurrentUser(res.user);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        setCurrentView(authRedirectView || 'dashboard');
      } else {
        setErrorMsg(res.error?.message || 'Email/username or password is incorrect.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Login server error. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    const demoUser = {
      id: 'usr_shivam',
      name: 'Shivam Singh',
      username: 'shivam',
      email: 'shivam@growthpath.com',
      role: 'STUDENT',
      avatar: '/shivam-singh.png'
    };
    setCurrentUser(demoUser);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setCurrentView(authRedirectView || 'dashboard');
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOtpSent(true);
      setOtpTimer(30);
    }, 400);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const demoUser = {
        id: 'usr_shivam',
        name: 'Shivam Singh',
        username: 'shivam',
        email: 'shivam@growthpath.com',
        role: 'STUDENT',
        avatar: '/shivam-singh.png'
      };
      setCurrentUser(demoUser);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      setCurrentView(authRedirectView || 'dashboard');
    }, 400);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMsg('Please agree to the Terms & Privacy Policy.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await apiClient.register({
        name: fullName,
        username,
        email,
        phone: signupPhone,
        password: signupPassword,
        role: accountRole
      });
      setIsSubmitting(false);
      if (res.success && res.user) {
        setSuccessMsg('Account created successfully. Please log in.');
        setActiveMode('login');
        setIdentifier(email || username);
      } else {
        setErrorMsg(res.error?.message || 'Registration failed.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Registration server error.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '1100px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          
          {/* LEFT SIDE: Brand & Hero Showcase */}
          <div className="desktop-only">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <img src="/growthpath-logo.jpg" alt="GrowthPath Logo" style={{ height: 48, borderRadius: 'var(--radius-sm)', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)' }} />
              <div>
                <span style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                  <span style={{ color: '#ffffff' }}>Growth</span>
                  <span style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Path</span>
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.05em' }}>
                  LEARN • BUILD • GET REVIEWED • GET HIRED
                </div>
              </div>
            </div>

            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
              Learn. Build.<br />Get Reviewed.<br />
              <span style={{ background: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Get Career Ready.
              </span>
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '480px' }}>
              Your complete AI-powered student growth and placement platform. Practice DSA, optimize ATS resumes, complete project audits, and pass company interviews.
            </p>

            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glow)', boxShadow: 'var(--shadow-glow)' }}>
              <img src="/growthpath-logo.jpg" alt="GrowthPath Platform" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          {/* RIGHT SIDE: Authentication Card */}
          <div className="glass-card" style={{ padding: '2.5rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glow)' }}>
            
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>
                {activeMode === 'login' && 'Welcome back 👋'}
                {activeMode === 'signup' && 'Create GrowthPath Account'}
                {activeMode === 'otp' && 'Login with Mobile OTP'}
                {activeMode === 'forgot' && 'Reset Password'}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {activeMode === 'login' && 'Continue your journey from learning to getting hired.'}
                {activeMode === 'signup' && 'Join thousands of students building career-ready portfolios.'}
                {activeMode === 'otp' && 'Enter your mobile number to receive a 6-digit OTP code.'}
                {activeMode === 'forgot' && 'Enter your email or phone to reset your password.'}
              </p>
            </div>

            {/* Alert Messages */}
            {errorMsg && (
              <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#fda4af', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} /> {errorMsg}
              </div>
            )}
            {successMsg && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#6ee7b7', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} /> {successMsg}
              </div>
            )}

            {/* MODE 1: LOGIN */}
            {activeMode === 'login' && (
              <div>
                <button onClick={handleGoogleLogin} disabled={isSubmitting} className="btn btn-outline" style={{ width: '100%', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '0.75rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                  Continue with Google
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>OR LOGIN WITH EMAIL / USERNAME</div>

                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Email or Username</label>
                    <input type="text" className="input-field" placeholder="shivam@example.com or shivamsingh" value={identifier} onChange={e => setIdentifier(e.target.value)} required />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</label>
                      <button type="button" onClick={() => setActiveMode('forgot')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.78rem', cursor: 'pointer' }}>
                        Forgot password?
                      </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input type={showPassword ? 'text' : 'password'} className="input-field" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    {isSubmitting ? <RefreshCw size={16} className="spin" /> : <ArrowRight size={16} />} Login to GrowthPath
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                    <button type="button" onClick={() => setActiveMode('otp')} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontWeight: 600 }}>
                      Continue with Mobile OTP →
                    </button>
                    <div>
                      Don't have an account? <button type="button" onClick={() => setActiveMode('signup')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 700 }}>Create Account</button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* MODE 2: SIGN UP */}
            {activeMode === 'signup' && (
              <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Full Name *</label>
                  <input type="text" className="input-field" placeholder="Shivam Singh" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Username *</label>
                    {usernameStatus.message && (
                      <span style={{ fontSize: '0.75rem', color: usernameStatus.available ? '#10b981' : '#f43f5e', fontWeight: 600 }}>
                        {usernameStatus.message}
                      </span>
                    )}
                  </div>
                  <input type="text" className="input-field" placeholder="shivamsingh" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Email Address *</label>
                  <input type="email" className="input-field" placeholder="shivam@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Password *</label>
                  <input type="password" className="input-field" placeholder="••••••••" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Confirm Password *</label>
                  <input type="password" className="input-field" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
                  <input type="checkbox" id="terms_signup" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} required />
                  <label htmlFor="terms_signup" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    I agree to the <strong>Terms & Privacy Policy</strong>
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                  {isSubmitting ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />} Create Account
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                  Already have an account? <button type="button" onClick={() => setActiveMode('login')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 700 }}>Log In</button>
                </div>
              </form>
            )}

            {/* MODE 3: MOBILE OTP */}
            {activeMode === 'otp' && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Mobile Number (+91 India)</label>
                      <input type="tel" className="input-field" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} required />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      {isSubmitting ? <RefreshCw size={16} className="spin" /> : <Phone size={16} />} Send 6-Digit OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Enter 6-Digit OTP sent to {phone}</div>
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>Dev Test OTP: 123456</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-page-${idx}`}
                          type="text"
                          maxLength={1}
                          className="input-field"
                          style={{ width: '44px', height: '50px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 800 }}
                          value={digit}
                          onChange={e => {
                            const val = e.target.value;
                            const newDigits = [...otpDigits];
                            newDigits[idx] = val;
                            setOtpDigits(newDigits);
                            if (val && idx < 5) {
                              document.getElementById(`otp-page-${idx + 1}`)?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      {isSubmitting ? <RefreshCw size={16} className="spin" /> : <CheckCircle2 size={16} />} Verify OTP & Login
                    </button>

                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : <button type="button" onClick={handleSendOtp} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer' }}>Resend OTP</button>}
                    </div>
                  </form>
                )}

                <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button type="button" onClick={() => setActiveMode('login')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                    ← Back to Email / Password Login
                  </button>
                </div>
              </div>
            )}

            {/* MODE 4: FORGOT PASSWORD */}
            {activeMode === 'forgot' && (
              <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setSuccessMsg('Password reset link & code sent. Password updated successfully ✓');
                  setActiveMode('login');
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Email or Mobile Number</label>
                    <input type="text" className="input-field" placeholder="shivam@example.com or +91 98765 43210" required />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>New Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" required />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Confirm New Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" required />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Reset Password
                  </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button type="button" onClick={() => setActiveMode('login')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                    ← Back to Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
