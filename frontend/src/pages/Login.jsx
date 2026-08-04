import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(usernameOrEmail, password);
        if (success) {
            const role = localStorage.getItem('role');
            if (role === 'ROLE_CASHIER') navigate('/pos');
            else navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center stars-bg relative"
            style={{ background: '#150f23' }}>
            {/* Glow orbs */}
            <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: '#422082' }}></div>
            <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: '#c2ef4e' }}></div>

            <div className="relative z-10 w-full max-w-md px-4">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 text-2xl font-bold mb-3">
                        <span style={{ background: '#c2ef4e', color: '#1f1633', borderRadius: 6, padding: '3px 10px', fontWeight: 900, fontSize: 15, letterSpacing: '.04em' }}>POS</span>
                        <span style={{ color: '#e8e4ed' }}>Pro</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#e8e4ed' }}>Welcome back</h1>
                    <p style={{ color: '#79628c', fontSize: 14 }}>Sign in to your account to continue</p>
                </div>

                {/* Card */}
                <div className="rounded-2xl p-8" style={{ background: '#1f1633', border: '1px solid #362d59' }}>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label style={{ color: '#bdb8c0', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>
                                Username or Email
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Enter your username..."
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label style={{ color: '#bdb8c0', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all mt-2"
                            style={{
                                background: loading ? '#362d59' : '#c2ef4e',
                                color: loading ? '#79628c' : '#150f23',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                letterSpacing: '.1em',
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid #362d59' }}>
                        <Link to="/" className="text-sm transition-colors" style={{ color: '#79628c' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#c2ef4e'}
                            onMouseLeave={e => e.currentTarget.style.color = '#79628c'}>
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
