import { useEffect, useState } from 'react';
import { fetchBoosters } from '../services/api';

const Boosters = () => {
  const [boosters, setBoosters] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const results = await fetchBoosters();
        setBoosters(results);
      } catch (err) {
        console.warn(err);
        setError('API offline. Showing sample booster stacks.');
        setBoosters([
          {
            id: 1,
            name: 'Lymph Accelerator',
            focus: 'Facilitates toxin mobilization while keeping immune responses balanced.',
          },
          {
            id: 2,
            name: 'Immune Mod Balance',
            focus: 'Botanical blend that eases Th1/Th2 dominance and supports microbiome diversity.',
          },
          {
            id: 3,
            name: 'Mito Renewal',
            focus: 'Mitochondrial nutrients and adaptogens that restore daily energy reserves.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="bg-slate-900 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-white">Booster Systems</h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-200">
          Our boosters are phased alongside practitioner oversight to ensure detox pathways stay open while supporting
          immune harmony and nervous system balance.
        </p>
        {loading ? (
          <p className="mt-10 text-sm text-slate-300">Loading booster stacks...</p>
        ) : (
          <>
            {error && <p className="mt-8 rounded-lg bg-white/10 p-4 text-sm text-amber-200">{error}</p>}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {boosters.map(booster => (
                <div key={booster.id} className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold text-white">{booster.name}</h3>
                  <p className="mt-3 text-sm text-slate-200">{booster.focus}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Boosters;
