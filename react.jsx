// ============ CUSTOM HOOKS ============

// useToggle Hook
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  
  const toggle = React.useCallback(() => {
    setValue(prev => !prev);
  }, []);
  
  const setTrue = React.useCallback(() => setValue(true), []);
  const setFalse = React.useCallback(() => setValue(false), []);
  
  return { value, toggle, setTrue, setFalse };
}

// useForm Hook
function useForm(initialValues = {}, validate = null) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (callback) => {
    return (e) => {
      e.preventDefault();
      
      if (validate) {
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }
      
      setIsSubmitting(true);
      callback(values);
      setIsSubmitting(false);
    };
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setErrors
  };
}

// ============ MODAL COMPONENTS ============

// Login Modal
function LoginModal({ isOpen, onClose, onSwitchToSignup, onSwitchToForgot }) {
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid';
    if (!values.password) errors.password = 'Password is required';
    else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
    { email: '', password: '' },
    validate
  );

  const onSubmit = (formValues) => {
    console.log('Login:', formValues);
    // Simulate API call
    setTimeout(() => {
      alert('Login successful! 🎉');
      resetForm();
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Welcome Back! 👋</h2>
        <p className="modal-subtitle">Login to your account</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div style={{ textAlign: 'right', marginBottom: '15px' }}>
            <a onClick={onSwitchToForgot} style={{ 
              color: '#667eea', 
              cursor: 'pointer', 
              fontSize: '14px',
              textDecoration: 'none'
            }}>
              Forgot Password?
            </a>
          </div>
          
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="modal-footer">
          Don't have an account? <a onClick={onSwitchToSignup}>Sign Up</a>
        </div>
      </div>
    </div>
  );
}

// Signup Modal
function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid';
    if (!values.password) errors.password = 'Password is required';
    else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!values.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validate
  );

  const onSubmit = (formValues) => {
    console.log('Signup:', formValues);
    setTimeout(() => {
      alert('Account created successfully! 🎉');
      resetForm();
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Create Account 🚀</h2>
        <p className="modal-subtitle">Join our community</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
          
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="modal-footer">
          Already have an account? <a onClick={onSwitchToLogin}>Login</a>
        </div>
      </div>
    </div>
  );
}

// Forgot Password Modal
function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }) {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSuccess(true);
      setIsSubmitting(false);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail('');
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Forgot Password? 🔑</h2>
        <p className="modal-subtitle">We'll send you a reset link</p>
        
        {success ? (
          <div className="success-message">
            ✅ Password reset link sent to your email!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email"
                className={error ? 'error' : ''}
              />
              {error && <span className="error-text">{error}</span>}
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        
        <div className="modal-footer">
          Remember your password? <a onClick={onSwitchToLogin}>Login</a>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP COMPONENT ============

const { useState } = React;

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  // Modal states using useToggle hook
  const loginModal = useToggle(false);
  const signupModal = useToggle(false);
  const forgotModal = useToggle(false);

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  // Open login, close others
  const openLogin = () => {
    signupModal.setFalse();
    forgotModal.setFalse();
    loginModal.setTrue();
  };

  // Open signup, close others
  const openSignup = () => {
    loginModal.setFalse();
    forgotModal.setFalse();
    signupModal.setTrue();
  };

  // Open forgot, close others
  const openForgot = () => {
    loginModal.setFalse();
    signupModal.setFalse();
    forgotModal.setTrue();
  };

  return (
    <div className="profile-container">
      {/* Profile Image */}
      <img 
        src="touqir.jpeg"
        alt="Ansari Mo Touqir" 
        className="profile-image"
        onError={(e) => {
          e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
        }}
      />
      
      <h1 className="profile-name">Ansari Mo Touqir Mo Tanvir Aalam</h1>
      <p className="profile-title">🎓 Engineering Student | Future Developer</p>
      
      {/* Auth Buttons */}
      <div className="auth-buttons">
        <button className="auth-btn primary" onClick={openLogin}>
          Login
        </button>
        <button className="auth-btn" onClick={openSignup}>
          Sign Up
        </button>
      </div>
      
      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button 
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button 
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'about' && (
          <div>
            <p>👋 Hello! I'm Touqir, a passionate engineering student from Surat, Gujarat. I'm currently in my 4th year of BE at C.K. Pithawala College of Engineering and Technology.</p>
            <p style={{ marginTop: '10px' }}>💡 I'm always eager to learn new technologies and build innovative solutions that make a difference.</p>
            <p style={{ marginTop: '10px' }}>💼 Currently doing a 15-day internship at <strong>Crix Technology</strong> to gain practical industry experience.</p>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="edu-item">
            <h3>🎓 Bachelor of Engineering (BE)</h3>
            <p><strong>College:</strong> C.K. Pithawala College of Engineering and Technology</p>
            <p><strong>Year:</strong> 4th Year (Final Year)</p>
            <p><strong>Location:</strong> Surat, Gujarat</p>
            
            <div className="internship">
              <h4 style={{ color: 'white', marginBottom: '8px' }}>💼 Internship</h4>
              <p><strong>Company:</strong> Crix Technology</p>
              <p><strong>Duration:</strong> 15 Days</p>
              <p><strong>Role:</strong> Intern</p>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <div className="contact-item">
              <span>📧</span>
              <p><strong>Email:</strong> touqiralam79@gmail.com</p>
            </div>
            <div className="contact-item">
              <span>📱</span>
              <p><strong>Phone:</strong> 8511726065</p>
            </div>
            <div className="contact-item">
              <span>📍</span>
              <p><strong>Location:</strong> Surat, Gujarat</p>
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/touqir-alam-ba239931b" target="_blank" className="social-link">
                LinkedIn
              </a>
              <a href="https://github.com/touqiralam111-eng" target="_blank" className="social-link">
                GitHub
              </a>
              <a href="https://www.instagram.com/engr_touqir/" target="_blank" className="social-link">
                Instagram
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Toggle Button */}
      <button 
        onClick={toggleMessage} 
        className="toggle-button"
      >
        {showMessage ? 'Hide Welcome Message' : 'Show Welcome Message'}
      </button>
      
      {/* Conditional Message */}
      {showMessage && (
        <div className="message-box">
          <p>Welcome to my portfolio! I'm passionate about technology and always ready to learn something new. Currently interning at Crix Technology and excited to build my career in software development. Let's connect and create something amazing together! 🚀</p>
        </div>
      )}

      {/* Modals */}
      <LoginModal 
        isOpen={loginModal.value}
        onClose={loginModal.setFalse}
        onSwitchToSignup={openSignup}
        onSwitchToForgot={openForgot}
      />
      
      <SignupModal 
        isOpen={signupModal.value}
        onClose={signupModal.setFalse}
        onSwitchToLogin={openLogin}
      />
      
      <ForgotPasswordModal 
        isOpen={forgotModal.value}
        onClose={forgotModal.setFalse}
        onSwitchToLogin={openLogin}
      />
    </div>
  );
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(<App />);