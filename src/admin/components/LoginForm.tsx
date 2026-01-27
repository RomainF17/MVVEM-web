import { useState } from 'react';
import { Leaf, LogIn } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
}

const CREDENTIALS = {
  login: 'romain',
  password: 'romain',
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login === CREDENTIALS.login && password === CREDENTIALS.password) {
      sessionStorage.setItem('admin_authenticated', 'true');
      onLogin();
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
            <Leaf className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ma Ville Verte</h1>
          <p className="text-gray-500 mt-1">Espace Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-6">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Identifiant
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Votre identifiant"
              autoComplete="username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Votre mot de passe"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Se connecter
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          <a href="/" className="hover:text-gray-600">← Retour au site</a>
        </p>
      </div>
    </div>
  );
}
