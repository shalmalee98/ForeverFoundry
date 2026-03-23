import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { email, name: email.split('@')[0] };
    localStorage.setItem('weddingUser', JSON.stringify(userData));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-rose-500 fill-rose-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Create magical wedding moments</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
            required 
          />
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-rose-600 font-bold hover:underline">
            Sign Up
          </button>
        </p>
        <button onClick={() => navigate('/')} className="w-full mt-4 text-gray-500 hover:text-gray-700">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;