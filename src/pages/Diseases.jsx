import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchDiseases } from '../services/api';

const sanitizeText = value =>
  typeof value === 'string' ? value.replace(/\uFFFD/g, "'").replace(/\s+/g, ' ').trim() : value;

const STATIC_SPECIALTIES = {
  main: [
    {
      key: 'oncology',
      label: 'Oncology',
      description:
        'Integrative cancer care combining detox, immune modulation, and nutritional precision to strengthen resilience during treatment.',
      diseases: [
        {
          id: 'onco-1',
          name: 'Ovarian Cancer',
          description:
            'Supportive protocols to manage hormone balance, detoxification, and energy reserves during oncologic care.',
        },
        {
          id: 'onco-2',
          name: 'Lung Cancer',
          description:
            'Respiratory-focused boosters and immune recalibration that complement traditional oncology plans.',
        },
        {
          id: 'onco-3',
          name: 'Gastrointestinal Malignancies',
          description:
            'Gut-directed therapies that sustain nutrient absorption and immune signaling through treatment.',
        },
        {
          id: 'onco-4',
          name: 'Urological Cancer',
          description:
            'Detoxification and lymphatic drainage strategies for bladder, kidney, and prostate cancer journeys.',
        },
        {
          id: 'onco-5',
          name: 'Melanoma',
          description:
            'Immune literacy coaching and targeted micronutrients to guide skin healing and inflammation control.',
        },
        {
          id: 'onco-6',
          name: 'Leukemia',
          description:
            'Bone marrow support with gentle detox, mitochondrial care, and practitioner-guided nutrition plans.',
        },
        {
          id: 'onco-7',
          name: 'Thalassemia',
          description:
            'Programs to bolster iron regulation, oxygen delivery, and overall vitality for blood disorders.',
        },
        {
          id: 'onco-8',
          name: 'Polycythemia Vera',
          description:
            'Protocols to help regulate blood viscosity, reduce inflammation, and maintain vascular health.',
        },
        {
          id: 'onco-9',
          name: 'Autoimmune Hemolytic Anemia',
          description:
            'Immune calming strategies and detox pacing to minimize autoimmune flare-ups impacting red blood cells.',
        },
      ],
    },
    {
      key: 'interventional-cardiology',
      label: 'Interventional Cardiology',
      description:
        'Cardio-protective plans that combine micronutrients, vascular detox, and lifestyle syncing for sustainable heart health.',
      diseases: [
        {
          id: 'cardio-1',
          name: 'Rheumatic Fever',
          description:
            'Protocols to soothe systemic inflammation while supporting cardiac tissue recovery and detox pathways.',
        },
        {
          id: 'cardio-2',
          name: 'Hypertension',
          description:
            'Targeted boosters that calm vascular tension, support nitric oxide balance, and reduce stress reactivity.',
        },
        {
          id: 'cardio-3',
          name: 'Heart Attack (Myocardial Infarction)',
          description:
            'Programming for post-MI recovery with mitochondrial nutrients, light detox, and resilience coaching.',
        },
        {
          id: 'cardio-4',
          name: 'Congenital Heart Disease',
          description:
            'Holistic partnerships with cardiology to optimize energy, immunity, and growth in congenital cases.',
        },
        {
          id: 'cardio-5',
          name: 'Aortic Aneurysm',
          description:
            'Gentle blood pressure regulation tools paired with connective tissue support and detox sequencing.',
        },
        {
          id: 'cardio-6',
          name: 'Transient Ischemic Attack',
          description:
            'Microcirculation and neurovascular boosters designed to prevent recurrence and restore clarity.',
        },
        {
          id: 'cardio-7',
          name: 'Peripheral Artery Disease',
          description:
            'Protocols to enhance blood flow, reduce inflammatory load, and build walking tolerance safely.',
        },
        {
          id: 'cardio-8',
          name: 'Arrhythmia',
          description:
            'Electrolyte balancing, nervous system retraining, and detox pacing for rhythm stability.',
        },
        {
          id: 'cardio-9',
          name: 'Long QT Syndrome',
          description:
            'Lifestyle and micronutrient strategies to bolster electrical signaling under practitioner oversight.',
        },
      ],
    },
    {
      key: 'neurology',
      label: 'Neurology',
      description:
        'Neuro-immune programs that blend detox, nervous system retraining, and metabolic support for brain health.',
      diseases: [
        {
          id: 'neuro-1',
          name: 'Stroke',
          description:
            'Post-stroke rehabilitation support focusing on neuroplasticity, circulation, and restorative sleep.',
        },
        {
          id: 'neuro-2',
          name: 'Epilepsy',
          description:
            'Metabolic therapies and micronutrients tailored to stabilize neural signaling and energy production.',
        },
        {
          id: 'neuro-3',
          name: 'Parkinson’s Disease & Movement Disorders',
          description:
            'Detox, gut-brain balancing, and targeted boosters to ease rigidity and improve motor control.',
        },
        {
          id: 'neuro-4',
          name: 'Headache & Migraine',
          description:
            'Root-cause protocols spanning hormone balance, detox pathways, and nervous system resilience.',
        },
        {
          id: 'neuro-5',
          name: 'Multiple Sclerosis',
          description:
            'Immune modulation, remyelination nutrients, and nervous system regulation to minimize flare-ups.',
        },
        {
          id: 'neuro-6',
          name: 'Peripheral Neuropathies',
          description:
            'Protocols supporting nerve repair through microcirculation, detox, and gut-oriented strategies.',
        },
        {
          id: 'neuro-7',
          name: 'Sleep Disorders',
          description:
            'Neurohormonal balancing, light detox, and behavioral training for restorative sleep architecture.',
        },
        {
          id: 'neuro-8',
          name: 'ALS (Amyotrophic Lateral Sclerosis)',
          description:
            'Supportive care emphasizing mitochondrial health, detox pacing, and caregiver guidance.',
        },
        {
          id: 'neuro-9',
          name: 'Dementia',
          description:
            'Cognitive support integrating metabolic balance, toxin unloading, and brain-specific nutrients.',
        },
      ],
    },
    {
      key: 'orthopaedics',
      label: 'Orthopaedics and Joint Replacement',
      description:
        'Musculoskeletal recovery programs aligning detox, collagen support, and inflammation control for mobility.',
      diseases: [
        {
          id: 'ortho-1',
          name: 'Osteoarthritis',
          description:
            'Joint-friendly detox, anti-inflammatory nutrition, and movement plans to preserve cartilage health.',
        },
        {
          id: 'ortho-2',
          name: 'Fractures',
          description:
            'Bone healing boosters, micronutrient density, and lymphatic activation to speed recovery.',
        },
        {
          id: 'ortho-3',
          name: 'Ankle Tendinitis',
          description:
            'Protocols easing connective tissue inflammation while supporting vascular and lymphatic flow.',
        },
        {
          id: 'ortho-4',
          name: 'Back Pain',
          description:
            'Detox sequencing with fascia release and nervous system calming to reduce chronic pain loops.',
        },
        {
          id: 'ortho-5',
          name: 'Cartilage Injuries',
          description:
            'Collagen-building nutrients and detox support to encourage joint regeneration.',
        },
        {
          id: 'ortho-6',
          name: 'Sports Injuries',
          description:
            'Recovery blueprints balancing inflammation control, mobility, and energy replenishment.',
        },
        {
          id: 'ortho-7',
          name: 'Spinal Cord Injuries',
          description:
            'Holistic neuro-rehab plans combining immune modulation, detox, and adaptive movement.',
        },
        {
          id: 'ortho-8',
          name: 'Neuromuscular Disorders',
          description:
            'Integrative care addressing muscle fatigue, nerve conduction, and mitochondrial support.',
        },
        {
          id: 'ortho-9',
          name: 'Spinal Deformities',
          description:
            'Personalized programs to improve posture, reduce inflammation, and strengthen musculature.',
        },
      ],
    },
    {
      key: 'nephrology',
      label: 'Nephrology',
      description:
        'Kidney-focused protocols emphasizing detox relief, hydration balance, and immune harmony.',
      diseases: [
        {
          id: 'neph-1',
          name: 'Chronic Kidney Disease',
          description:
            'Kidney-friendly nutrition and detox pacing that protect renal function and energy levels.',
        },
        {
          id: 'neph-2',
          name: 'Kidney Stones',
          description:
            'Mineral balance, hydration strategies, and detox tools to prevent recurrent stone formation.',
        },
        {
          id: 'neph-3',
          name: 'Adrenal Cancer',
          description:
            'Endocrine support, lymphatic drainage, and stress modulation for adrenal-related malignancies.',
        },
        {
          id: 'neph-4',
          name: 'Kidney Failure',
          description:
            'Adjunct care aiming to reduce toxin load, support dialysis tolerance, and improve vitality.',
        },
        {
          id: 'neph-5',
          name: 'Prostate Cancer',
          description:
            'Detox-led hormone balance and immune support for prostate cancer recovery plans.',
        },
        {
          id: 'neph-6',
          name: 'Benign Prostatic Hyperplasia',
          description:
            'Anti-inflammatory botanicals and lifestyle guidance to ease urinary symptoms and swelling.',
        },
        {
          id: 'neph-7',
          name: 'Urinary Tract Infection',
          description:
            'Microbiome balancing and immune support to prevent recurrence in persistent UTIs.',
        },
        {
          id: 'neph-8',
          name: 'Urinary Incontinence',
          description:
            'Pelvic floor coaching with detox insights to minimize irritation and inflammation.',
        },
        {
          id: 'neph-9',
          name: 'Hydrocele',
          description:
            'Fluid balance and lymphatic stimulation strategies to reduce swelling and discomfort.',
        },
      ],
    },
  ],
  others: [
    {
      key: 'immune-reset',
      label: 'Immune Reset Programs',
      description:
        'Comprehensive protocols for chronic immune dysfunction, mold toxicity, and post-viral syndromes.',
      diseases: [
        {
          id: 'immune-1',
          name: 'Chronic Lyme',
          description:
            'Layered detox and immune modulation addressing persistent Lyme and co-infections.',
        },
        {
          id: 'immune-2',
          name: 'Chronic Fatigue Syndrome',
          description:
            'Mitochondrial support, detox pathways, and nervous system retraining to restore energy.',
        },
        {
          id: 'immune-3',
          name: 'Mold Illness',
          description:
            'Biotoxin binding, lymph movement, and home remediation guidance for mold-related illness.',
        },
        {
          id: 'immune-4',
          name: 'Autoimmune Thyroiditis',
          description:
            'Immune-balancing nutrition and detox to calm thyroid antibodies and hormonal swings.',
        },
        {
          id: 'immune-5',
          name: 'Long COVID',
          description:
            'Microcirculation repair, detox pacing, and autonomic nervous system support for post-viral recovery.',
        },
      ],
    },
  ],
};

const Diseases = () => {
  const dropdownRef = useRef(null);
  const [specialties, setSpecialties] = useState(STATIC_SPECIALTIES);
  const [activeKey, setActiveKey] = useState(STATIC_SPECIALTIES.main[0].key);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [showOthers, setShowOthers] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const results = await fetchDiseases();
        if (Array.isArray(results) && results.length) {
          const normalized = results.map((condition, index) => ({
            id: condition.id ? `remote-${condition.id}` : `remote-${index}`,
            name: sanitizeText(condition.name || condition.title || 'Condition'),
            description: sanitizeText(
              condition.summary ||
                condition.description ||
                'Personalized immunotherapy pathways tailored to your biomarkers.'
            ),
          }));

          setSpecialties(prev => {
            const filteredOthers = prev.others.filter(spec => spec.key !== 'natural-immunotherapy');
            return {
              ...prev,
              others: [
                {
                  key: 'natural-immunotherapy',
                  label: 'Natural Immunotherapy',
                  description:
                    'Conditions actively managed by our Natural Immunotherapy practitioners and care teams.',
                  diseases: normalized,
                },
                ...filteredOthers,
              ],
            };
          });
        }
      } catch (err) {
        console.warn(err);
        setAlert('Unable to reach the API. Displaying curated specialties instead.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!showOthers) {
      return undefined;
    }

    const handleClick = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOthers(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showOthers]);

  const allSpecialties = useMemo(
    () => [...specialties.main, ...specialties.others],
    [specialties]
  );

  const activeSpecialty = useMemo(
    () => allSpecialties.find(spec => spec.key === activeKey) || specialties.main[0],
    [activeKey, specialties.main, allSpecialties]
  );

  const diseasesToRender = activeSpecialty?.diseases || [];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-500">Our Disease</span>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Choose From Below Specialities</h1>
          <p className="mt-4 text-sm text-slate-600">
            Explore how Natural Immunotherapy collaborates across specialties to guide your recovery. Select a category
            to see the conditions we support with tailored protocols and practitioner-led care.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500">
          {specialties.main.map(spec => {
            const isActive = spec.key === activeKey;
            return (
              <button
                key={spec.key}
                type="button"
                onClick={() => {
                  setActiveKey(spec.key);
                  setShowOthers(false);
                }}
                className={[
                  'relative pb-2 transition-colors',
                  isActive ? 'text-primary-500' : 'hover:text-primary-500',
                ].join(' ')}
              >
                {spec.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500" aria-hidden />
                )}
              </button>
            );
          })}

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowOthers(prev => !prev)}
              className={[
                'flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 transition-colors',
                activeKey.startsWith('natural') || specialties.others.some(spec => spec.key === activeKey)
                  ? 'bg-primary-50 text-primary-500 border-primary-200'
                  : 'hover:border-primary-200 hover:text-primary-500',
              ].join(' ')}
            >
              Others
              <svg
                className={`h-4 w-4 transition-transform ${showOthers ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {showOthers && (
              <div className="absolute right-0 z-10 mt-3 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl">
                {specialties.others.map(spec => {
                  const isActive = spec.key === activeKey;
                  return (
                    <button
                      key={spec.key}
                      type="button"
                      onClick={() => {
                        setActiveKey(spec.key);
                        setShowOthers(false);
                      }}
                      className={[
                        'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        isActive ? 'bg-primary-50 text-primary-500' : 'hover:bg-slate-100',
                      ].join(' ')}
                    >
                      {spec.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-primary-200 via-slate-200 to-primary-200" />

        {alert && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {alert}
          </div>
        )}

        <div className="mt-8 max-w-4xl">
          <h2 className="text-2xl font-semibold text-slate-900">{activeSpecialty.label}</h2>
          <p className="mt-3 text-sm text-slate-600">{activeSpecialty.description}</p>
        </div>

        {loading && activeSpecialty.key === 'natural-immunotherapy' ? (
          <p className="mt-10 text-sm text-slate-500">Loading conditions...</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {diseasesToRender.map(disease => (
              <article
                key={disease.id}
                className="flex h-full flex-col rounded-2xl border border-primary-100 bg-primary-50/60 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-slate-900">{disease.name}</h3>
                <p className="mt-3 flex-1 text-sm text-slate-600">{disease.description}</p>
                <button
                  type="button"
                  className="mt-6 inline-flex w-max items-center rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  Read More
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Diseases;
