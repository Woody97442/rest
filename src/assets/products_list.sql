INSERT INTO Product (
  name, reference, shortDescription, description, price, rating,
  country, specialty, preferences, likes, dislikes, stock,
  images, createdAt, updatedAt
) VALUES
-- Julia
('Julia', 'JULIA-001', 'Délicate et mystérieuse',
'Julia est sensible, intuitive et pleine de charme discret. Elle aime faire durer le plaisir en douceur.',
139.99, 5, 'France', 'Exploration sensorielle et tendresse',
'["romantisme", "bains chauds", "douceur", "piano"]',
'["Préliminaires longs", "Musique douce pendant l’acte", "Position cuillère"]',
'["Rough sex", "Précipitation"]',
0,
'https://images.unsplash.com/photo-1584720223124-466ff369e7c2?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Luna
('Luna', 'LUNA-001', 'Mystique et passionnée',
'Luna a une énergie vibrante et aime explorer les désirs profonds avec douceur et intensité.',
159.99, 4, 'Italie', 'Connexion émotionnelle et massage',
'["aventures", "massages", "encens", "nuit étoilée"]',
'["Toucher lent", "Regards profonds", "Échanges prolongés"]',
'["Routine", "Froid émotionnel"]',
0,
'https://images.unsplash.com/photo-1584720231124-466ff369e7c2?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Sophia
('Sophia', 'SOPHIA-001', 'Audacieuse et créative',
'Sophia adore les jeux de rôle et laisser libre cours à son imagination dans des scénarios ludiques.',
149.99, 5, 'Espagne', 'Jeux de rôle et fantaisie',
'["costumes", "théâtre", "suspense", "bougies parfumées"]',
'["Scénarios imaginatifs", "Costumes", "Surprises"]',
'["Monotonie", "Manque d’imagination"]',
0,
'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Amélie
('Amélie', 'AMELIE-001', 'Naturelle et lumineuse',
'Amélie aime la simplicité et la tendresse, avec une grande sensibilité à la connexion humaine.',
129.99, 4, 'France', 'Tendresse et authenticité',
'["balades", "pluie d’été", "rire", "peau contre peau"]',
'["Câlins prolongés", "Regards complices", "Moments calmes"]',
'["Bruit excessif", "Vulgarité"]',
0,
'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Hana
('Hana', 'HANA-001', 'Zen et attentionnée',
'Hana incarne la douceur japonaise avec une approche attentive et respectueuse de chaque moment partagé.',
144.99, 5, 'Japon', 'Rituels de soin et sensualité',
'["thé vert", "bains chauds", "encens", "silence"]',
'["Massages doux", "Lenteur", "Respect mutuel"]',
'["Agressivité", "Impatience"]',
0,
'https://images.unsplash.com/photo-1594737625785-c97d5b7c1790?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Zara
('Zara', 'ZARA-001', 'Forte et dominante',
'Zara prend le contrôle avec assurance et aime renverser les rôles avec style et puissance.',
169.99, 5, 'États-Unis', 'Domination douce',
'["talons", "commandes", "mystère", "satin noir"]',
'["Jeux de pouvoir", "Commandes douces", "Confiance"]',
'["Passivité", "Manque d’initiative"]',
0,
'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Elise
('Elise', 'ELISE-001', 'Classique et raffinée',
'Elise aime le charme à l’ancienne et les ambiances feutrées, les soirées lentes au parfum de velours.',
134.99, 4, 'Suisse', 'Romantisme classique',
'["vin rouge", "musique jazz", "lits anciens", "chandelles"]',
'["Repas aux chandelles", "Musique douce", "Préliminaires délicats"]',
'["Ambiances froides", "Manque d’élégance"]',
0,
'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Ingrid
('Ingrid', 'INGRID-001', 'Mystérieuse et envoûtante',
'Ingrid ne dévoile jamais tout et aime faire planer un mystère érotique autour de chaque geste.',
159.99, 4, 'Suède', 'Érotisme lent et mental',
'["ombres", "lumières tamisées", "voix basse", "parfum musqué"]',
'["Jeux mentaux", "Chuchotements", "Gestes retenus"]',
'["Exhibitionnisme", "Manque de subtilité"]',
0,
'https://images.unsplash.com/photo-1508182312879-278bad0bc3b4?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Karina
('Karina', 'KARINA-001', 'Fière et passionnée',
'Karina aime les relations explosives et intenses, chaque rencontre est un feu d’artifice de sensations.',
149.99, 5, 'Brésil', 'Feu et passion',
'["plage", "danse", "chaleur", "regard profond"]',
'["Contact physique", "Danse érotique", "Jeux de regards"]',
'["Froideur", "Distance"]',
0,
'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Anya
('Anya', 'ANYA-001', 'Douce et mystérieuse',
'Anya aime les silences pleins de sens, les caresses prolongées, et les nuits sans fin.',
139.99, 4, 'Russie', 'Poésie charnelle',
'["neige", "feu de bois", "silence", "langue étrangère"]',
'["Longues caresses", "Souffles", "Regards intenses"]',
'["Parler trop", "Manque d’intimité"]',
0,
'https://images.unsplash.com/photo-1530629013299-6cb10f1baba4?w=1000&auto=format&fit=crop&q=60',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);