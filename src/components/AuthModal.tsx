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
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';
import { apiClient } from '../services/api';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup' | 'otp';
  redirectView?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login', redirectView }) => {
  const { setCurrentUser, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'otp' | 'forgot'>(initialTab);

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Mobile OTP State
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);

  // Signup Form State
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<{ available?: boolean; message?: string }>({});
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [email, setEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountRole, setAccountRole] = useState<'STUDENT' | 'MENTOR' | 'RECRUITER'>('STUDENT');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // General Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any = null;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Username live check debouncer
  useEffect(() => {
    if (!username.trim() || username.length < 3) {
      setUsernameStatus({});
      return;
    }
    setIsCheckingUsername(true);
    const timeout = setTimeout(async () => {
      const res = await apiClient.checkUsername(username);
      setUsernameStatus(res);
      setIsCheckingUsername(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [username]);

  if (!isOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: '' };
    if (pass.length < 6) return { label: 'Weak', color: '#f43f5e' };
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return { label: 'Strong', color: '#10b981' };
    return { label: 'Medium', color: '#f59e0b' };
  };

  const strength = getPasswordStrength(signupPassword);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await apiClient.login({ identifier: loginIdentifier, password: loginPassword });
      setIsSubmitting(false);

      if (res.success && res.user) {
        setCurrentUser(res.user);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        onClose();
        if (redirectView) setCurrentView(redirectView);
      } else {
        setErrorMsg(res.error?.message || 'Invalid email/username or password.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Login server error. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await apiClient.googleLogin({ email: 'shivam.google@growthpath.com', name: 'Shivam Singh' });
      setIsSubmitting(false);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        onClose();
        if (redirectView) setCurrentView(redirectView);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Google login failed.');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await apiClient.sendOtp(phone);
      setIsSubmitting(false);
      if (res.success) {
        setOtpSent(true);
        setOtpTimer(30);
      } else {
        setErrorMsg(res.error?.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 6) return;

    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await apiClient.verifyOtp(phone, enteredOtp);
      setIsSubmitting(false);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        onClose();
        if (redirectView) setCurrentView(redirectView);
      } else {
        setErrorMsg(res.error?.message || 'That OTP is incorrect or expired.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('OTP verification error.');
    }
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
        setCurrentUser(res.user);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        onClose();
        if (redirectView) setCurrentView(redirectView);
      } else {
        setErrorMsg(res.error?.message || 'Registration failed.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Registration server error.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div 
        className="modal-content glass-card" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '520px', 
          width: '100%', 
          padding: '2.25rem', 
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-glow)'
        }}
      >
        {/* Header Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <img src="/growthpath-logo.jpg" alt="GrowthPath" style={{ height: 38, borderRadius: 'var(--radius-sm)' }} />
            <span style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              <span style={{ color: '#ffffff' }}>Growth</span>
              <span style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Path</span>
            </span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.05em' }}>
            LEARN • BUILD • GET REVIEWED • GET HIRED
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.35rem', background: 'var(--bg-surface)', padding: '0.3rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
          <button onClick={() => { setActiveTab('login'); setErrorMsg(null); }} className={`btn btn-sm ${activeTab === 'login' ? 'btn-primary' : 'btn-outline'}`} style={{ border: 'none' }}>
            Login
          </button>
          <button onClick={() => { setActiveTab('signup'); setErrorMsg(null); }} className={`btn btn-sm ${activeTab === 'signup' ? 'btn-primary' : 'btn-outline'}`} style={{ border: 'none' }}>
            Sign Up
          </button>
          <button onClick={() => { setActiveTab('otp'); setErrorMsg(null); }} className={`btn btn-sm ${activeTab === 'otp' ? 'btn-primary' : 'btn-outline'}`} style={{ border: 'none' }}>
            Mobile OTP
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#fda4af', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}

        {/* TAB 1: LOGIN */}
        {activeTab === 'login' && (
          <div>
            <button onClick={handleGoogleLogin} disabled={isSubmitting} className="btn btn-outline" style={{ width: '100%', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Continue with Google
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>OR LOGIN WITH EMAIL / USERNAME</div>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Email or Username</label>
                <input type="text" className="input-field" placeholder="shivam@example.com or shivamsingh" value={loginIdentifier} onChange={e => setLoginIdentifier(e.target.value)} required />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Password</label>
                  <button type="button" onClick={() => setActiveTab('forgot')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.78rem', cursor: 'pointer' }}>
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} className="input-field" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                {isSubmitting ? <RefreshCw size={16} className="spin" /> : <ArrowRight size={16} />}
                {isSubmitting ? 'Authenticating...' : 'Login to GrowthPath'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: MOBILE OTP */}
        {activeTab === 'otp' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Mobile Number (+91 India)</label>
                  <input type="tel" className="input-field" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
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
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      className="input-field"
                      style={{ width: '42px', height: '48px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 800 }}
                      value={digit}
                      onChange={e => {
                        const val = e.target.value;
                        const newDigits = [...otpDigits];
                        newDigits[idx] = val;
                        setOtpDigits(newDigits);
                        if (val && idx < 5) {
                          document.getElementById(`otp-${idx + 1}`)?.focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
                  {isSubmitting ? <RefreshCw size={16} className="spin" /> : <CheckCircle2 size={16} />} Verify OTP & Login
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : <button type="button" onClick={handleSendOtp} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer' }}>Resend OTP</button>}
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: SIGN UP */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Full Name *</label>
              <input type="text" className="input-field" placeholder="Shivam Singh" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Username *</label>
                {usernameStatus.message && (
                  <span style={{ fontSize: '0.75rem', color: usernameStatus.available ? '#10b981' : '#f43f5e', fontWeight: 600 }}>
                    {usernameStatus.message}
                  </span>
                )}
              </div>
              <input type="text" className="input-field" placeholder="shivamsingh" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Email Address *</label>
              <input type="email" className="input-field" placeholder="shivam@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Password *</label>
              <input type="password" className="input-field" placeholder="••••••••" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
              {strength.label && (
                <div style={{ fontSize: '0.72rem', color: strength.color, fontWeight: 700, marginTop: '0.25rem' }}>
                  Password Strength: {strength.label}
                </div>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Confirm Password *</label>
              <input type="password" className="input-field" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
              <input type="checkbox" id="terms" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} required />
              <label htmlFor="terms" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                I agree to the <strong>Terms & Privacy Policy</strong>
              </label>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {isSubmitting ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />} Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
