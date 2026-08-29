// GrowthPath REST API Client Service Layer
const API_BASE_URL = 'http://localhost:5001/api';

export const apiClient = {
  // Authentication APIs
  checkUsername: async (username: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/check-username?username=${encodeURIComponent(username)}`);
      return await res.json();
    } catch (err) {
      return { available: false, message: 'Server check error.' };
    }
  },

  register: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  login: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  logout: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST'
      });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  googleLogin: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  sendOtp: async (phone: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    return await res.json();
  },

  verifyOtp: async (phone: string, otp: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    return await res.json();
  },

  getMe: async (token?: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return await res.json();
    } catch (err) {
      return { success: false };
    }
  },

  // Profile APIs
  getProfile: async (token?: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return await res.json();
    } catch (err) {
      return { success: false };
    }
  },

  updateProfile: async (data: any, token?: string) => {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  uploadProfilePhoto: async (formData: FormData, token?: string) => {
    const res = await fetch(`${API_BASE_URL}/profile/photo`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    });
    return await res.json();
  },

  getPublicProfile: async (username: string) => {
    const res = await fetch(`${API_BASE_URL}/profile/u/${username}`);
    return await res.json();
  },

  // Resumes Upload & Analysis
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);

    const res = await fetch(`${API_BASE_URL}/resumes/upload`, {
      method: 'POST',
      body: formData
    });
    return await res.json();
  },

  analyzeResume: async (resumeId: string, targetRole: string, targetCompany: string) => {
    const res = await fetch(`${API_BASE_URL}/resumes/${resumeId}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_role: targetRole, target_company: targetCompany })
    });
    return await res.json();
  },

  deleteResume: async (resumeId: string) => {
    const res = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // Job Applications
  getApplications: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/applications`);
      return await res.json();
    } catch (err) {
      return { success: false, applications: [] };
    }
  },

  createApplication: async (appData: { company: string; role: string; status?: string; notes?: string }) => {
    const res = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
    return await res.json();
  },

  updateApplicationStatus: async (id: string, status: string) => {
    const res = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  deleteApplication: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // Notifications
  getNotifications: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`);
      return await res.json();
    } catch (err) {
      return { success: false, notifications: [] };
    }
  },

  markNotificationsRead: async () => {
    const res = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PATCH'
    });
    return await res.json();
  },

  // Projects
  submitProject: async (projData: { title: string; category?: string; github_url: string; live_url?: string; description?: string }) => {
    const res = await fetch(`${API_BASE_URL}/projects/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projData)
    });
    return await res.json();
  }
};
