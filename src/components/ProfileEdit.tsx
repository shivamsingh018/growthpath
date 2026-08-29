import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../services/api';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Camera, 
  Save, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  X,
  RefreshCw,
  Lock,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProfileEdit: React.FC = () => {
  const { currentUser, setCurrentUser, setCurrentView } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Shivam Singh');
  const [username, setUsername] = useState((currentUser as any)?.username || 'shivam');
  const [usernameStatus, setUsernameStatus] = useState<{ available?: boolean; message?: string }>({});
  const [email, setEmail] = useState((currentUser as any)?.email || 'shivam@growthpath.com');
  const [phone, setPhone] = useState((currentUser as any)?.phone || '+91 98765 43210');
  const [location, setLocation] = useState('Gorakhpur, Uttar Pradesh');
  
  const [college, setCollege] = useState('Galgotias University');
  const [degree, setDegree] = useState('B.Tech Computer Science Engineering');
  const [branch, setBranch] = useState('Computer Science');
  const [gradYear, setGradYear] = useState('2027');

  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [targetCompany, setTargetCompany] = useState('Accenture');
  const [expLevel, setExpLevel] = useState('Student / Fresher');
  const [headline, setHeadline] = useState('Software Engineering Aspirant');
  const [bio, setBio] = useState('Computer Science Engineering student at Galgotias University focused on software development, problem solving, DSA, data analysis, and building real-world projects.');

  const [skillsList, setSkillsList] = useState<string[]>(['Java', 'Python', 'SQL', 'Data Analysis', 'Power BI', 'DSA', 'JavaScript', 'React', 'Node.js', 'Git', 'GitHub']);
  const [newSkill, setNewSkill] = useState('');

  const [github, setGithub] = useState('https://github.com/shivamsingh');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/shivamsingh');
  const [portfolio, setPortfolio] = useState('https://growthpath.com');

  // Photo Upload State
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(currentUser?.avatar || '/shivam-singh.png');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Status
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Live username availability validation
  useEffect(() => {
    if (!username.trim() || username === (currentUser as any)?.username) {
      setUsernameStatus({});
      return;
    }
    const timeout = setTimeout(async () => {
      const res = await apiClient.checkUsername(username);
      setUsernameStatus(res);
    }, 350);
    return () => clearTimeout(timeout);
  }, [username, currentUser]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrorMsg('Please select a valid JPG, PNG, or WEBP image.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Image size must be less than 5 MB.');
        return;
      }
      setSelectedPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setErrorMsg(null);
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedPhoto) return;
    setIsUploadingPhoto(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('photo', selectedPhoto);

    try {
      const res = await apiClient.uploadProfilePhoto(formData);
      setIsUploadingPhoto(false);
      if (res.success && res.avatar) {
        if (currentUser) {
          setCurrentUser({ ...currentUser, avatar: res.avatar });
        }
        setSuccessMsg('Profile photo updated successfully ✓');
        setSelectedPhoto(null);
      } else {
        setErrorMsg(res.error?.message || 'Failed to upload photo.');
      }
    } catch (err) {
      setIsUploadingPhoto(false);
      setErrorMsg('Error uploading photo.');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      setSkillsList([...skillsList, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameStatus.available === false) {
      setErrorMsg('Please choose an available username.');
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    try {
      const res = await apiClient.updateProfile({
        name,
        username,
        headline,
        bio,
        location,
        college,
        degree,
        graduation_year: gradYear,
        target_role: targetRole,
        target_company: targetCompany,
        skills: skillsList.join(', '),
        github,
        linkedin,
        portfolio
      });

      setIsSaving(false);
      if (res.success) {
        if (currentUser) {
          setCurrentUser({
            ...currentUser,
            name,
            username,
            headline,
            bio
          } as any);
        }
        setSuccessMsg('Profile updated successfully ✓');
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => setCurrentView('profile'), 1200);
      } else {
        setErrorMsg(res.error?.message || 'Failed to save profile changes.');
      }
    } catch (err) {
      setIsSaving(false);
      setErrorMsg('Failed to save profile changes to database.');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem 1.5rem', maxWidth: '900px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={() => setCurrentView('profile')} className="btn btn-outline btn-sm">
          <ArrowLeft size={16} /> Back to Profile
        </button>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Edit GrowthPath Profile</h1>
        <span className="badge badge-indigo">DB Persisted</span>
      </div>

      {errorMsg && (
        <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#fda4af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      {successMsg && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#6ee7b7', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {/* Photo Upload Section */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', background: 'var(--bg-surface-elevated)' }}>
        <div style={{ position: 'relative' }}>
          {photoPreview ? (
            <img src={photoPreview} alt={name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)' }} />
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--accent-primary)', color: '#fff', fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Profile Photo</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Upload a high-resolution portrait (JPG, PNG, or WEBP up to 5 MB).
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
              <Camera size={16} /> Choose File
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoSelect} style={{ display: 'none' }} />
            </label>

            {selectedPhoto && (
              <button onClick={handleUploadPhoto} disabled={isUploadingPhoto} className="btn btn-primary btn-sm">
                {isUploadingPhoto ? <RefreshCw size={14} className="spin" /> : <Save size={14} />} Save Photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveAll} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', background: 'var(--bg-surface-elevated)' }}>
        
        {/* Personal Details */}
        <div>
          <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem', marginBottom: '1.25rem' }}>
            Personal Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Full Name *</label>
              <input type="text" className="input-field" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Username *</label>
                {usernameStatus.message && (
                  <span style={{ fontSize: '0.75rem', color: usernameStatus.available ? '#10b981' : '#f43f5e', fontWeight: 600 }}>
                    {usernameStatus.message}
                  </span>
                )}
              </div>
              <input type="text" className="input-field" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Email Address (Verified ✓)</label>
              <input type="email" className="input-field" value={email} disabled style={{ opacity: 0.7, cursor: 'not-allowed' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Mobile Number (Verified ✓)</label>
              <input type="text" className="input-field" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Location</label>
              <input type="text" className="input-field" value={location} onChange={e => setLocation(e.target.value)} placeholder="Gorakhpur, Uttar Pradesh or Greater Noida, India" />
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem', marginBottom: '1.25rem' }}>
            Education
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>College / University</label>
              <input type="text" className="input-field" value={college} onChange={e => setCollege(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Degree</label>
              <input type="text" className="input-field" value={degree} onChange={e => setDegree(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Branch / Field of Study</label>
              <input type="text" className="input-field" value={branch} onChange={e => setBranch(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Graduation Year</label>
              <input type="text" className="input-field" value={gradYear} onChange={e => setGradYear(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Career & Bio */}
        <div>
          <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem', marginBottom: '1.25rem' }}>
            Career Goals & Bio
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Target Role</label>
              <input type="text" className="input-field" value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="Full Stack Engineer / SDE-1" />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Target Companies</label>
              <input type="text" className="input-field" value={targetCompany} onChange={e => setTargetCompany(e.target.value)} placeholder="Accenture, Amazon, Google" />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Professional Headline</label>
            <input type="text" className="input-field" value={headline} onChange={e => setHeadline(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>About / Bio</label>
            <textarea className="input-field" rows={3} value={bio} onChange={e => setBio(e.target.value)} />
          </div>
        </div>

        {/* Skills Tag Management */}
        <div>
          <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem', marginBottom: '1.25rem' }}>
            Technical Skills
          </h2>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {skillsList.map((skill, idx) => (
              <span key={idx} className="badge badge-indigo" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(skill)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Add skill (e.g. Docker, GraphQL, System Design)" 
              value={newSkill} 
              onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
              style={{ maxWidth: '400px' }}
            />
            <button type="button" onClick={handleAddSkill} className="btn btn-outline">
              <Plus size={16} /> Add Skill
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem', marginBottom: '1.25rem' }}>
            Social & Portfolio Links
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>GitHub URL</label>
              <input type="url" className="input-field" value={github} onChange={e => setGithub(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>LinkedIn URL</label>
              <input type="url" className="input-field" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Portfolio URL</label>
              <input type="url" className="input-field" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button type="button" onClick={() => setCurrentView('profile')} className="btn btn-outline btn-lg">
            Cancel
          </button>
          <button type="submit" disabled={isSaving} className="btn btn-primary btn-lg">
            {isSaving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />} Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};
