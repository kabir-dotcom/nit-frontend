import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatientProfile } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to parse stored user:', error);
      return null;
    }
  });
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getPatientProfile();
        setPatient(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      } catch (err) {
        console.error('Failed to fetch patient profile', err);
        setError('Session expired. Please log in again.');
        handleLogout();
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-slate-50 to-accent-100 px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl shadow-primary-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">Patient Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              {patient ? `Welcome ${patient.name}` : 'Welcome'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track your plan, review updates, and message your care team.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Account</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <span className="font-medium text-slate-900">Name:</span> {patient?.name || '—'}
              </li>
              <li>
                <span className="font-medium text-slate-900">Email:</span> {patient?.email || '—'}
              </li>
              <li>
                <span className="font-medium text-slate-900">Role:</span> {patient?.role || 'patient'}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Next Steps</h2>
            <p className="mt-3 text-sm text-slate-600">
              Your practitioner will upload personalized detox and immunotherapy boosters shortly. Keep an eye on this
              dashboard for lab requests, supplement calendars, and session notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
