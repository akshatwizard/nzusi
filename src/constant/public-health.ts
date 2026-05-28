// ─── Symptoms that need attention ────────────────────────────
export const URGENT_SYMPTOMS = [
    'Burning or pain while passing urine',
    'Blood in urine',
    'Frequent urination',
    'Difficulty passing urine',
    'Leakage of urine',
    'Kidney stone pain',
    'Swelling in testicles',
    'Male sexual health concerns',
    'Recurrent urinary infections',
    'Poor urinary stream',
    'Night-time urination',
]

export const EMERGENCY_SIGNS = [
    'Severe pain',
    'Heavy bleeding in urine',
    'Fever with urinary symptoms',
    'Inability to pass urine',
    'Sudden swelling or severe infection symptoms',
]

// ─── Section 1: Healthy Lifestyle ────────────────────────────
export const LIFESTYLE_HABITS = [
    {
        id: 'hydration',
        emoji: '💧',
        title: 'Stay Hydrated',
        subtitle: 'Why Hydration Matters',
        why: [
            'Prevent kidney stones',
            'Reduce urinary infections',
            'Improve bladder health',
            'Support kidney function',
            'Flush toxins from the body',
        ],
        tips: [
            'Drink 2–3 litres of water daily unless advised otherwise',
            'Increase fluid intake in summer and during exercise',
            'Reduce sugary drinks and excessive soft drinks',
            'Avoid dehydration during travel and work',
        ],
    },
    {
        id: 'salt',
        emoji: '🧂',
        title: 'Reduce Salt Intake',
        subtitle: 'High salt intake increases the risk of',
        why: [
            'High blood pressure',
            'Kidney disease',
            'Kidney stones',
            'Fluid retention',
        ],
        tips: [
            'Avoid processed foods',
            'Reduce packaged snacks and pickles',
            'Limit extra table salt',
            'Prefer fresh home-cooked meals',
        ],
    },
    {
        id: 'weight',
        emoji: '⚖️',
        title: 'Maintain Healthy Weight',
        subtitle: 'Obesity is linked to',
        why: [
            'Kidney stones',
            'Diabetes',
            'Erectile dysfunction',
            'Urinary incontinence',
            'Prostate enlargement symptoms',
        ],
        tips: [
            'Regular physical activity',
            'Balanced diet',
            'Adequate sleep',
            'Stress management',
        ],
    },
    {
        id: 'smoking',
        emoji: '🚭',
        title: 'Avoid Smoking & Tobacco',
        subtitle: 'Smoking increases risk of',
        why: [
            'Bladder cancer',
            'Kidney cancer',
            'Erectile dysfunction',
            'Poor blood circulation',
        ],
        tips: [
            'Stopping smoking significantly improves overall and urological health',
        ],
    },
    {
        id: 'alcohol',
        emoji: '🍷',
        title: 'Limit Alcohol Consumption',
        subtitle: 'Excess alcohol can contribute to',
        why: [
            'Dehydration',
            'Sexual dysfunction',
            'Sleep problems',
            'Worsening urinary symptoms',
        ],
        tips: ['Moderation is essential'],
    },
    {
        id: 'exercise',
        emoji: '🏃',
        title: 'Physical Activity & Pelvic Health',
        subtitle: 'Regular exercise helps',
        why: [
            'Improve bladder control',
            'Maintain healthy weight',
            'Improve blood circulation',
            'Improve sexual health',
            'Reduce stress',
        ],
        tips: [],
    },
]

// ─── Section 2: Kidney Stones ─────────────────────────────────
export const KIDNEY_STONE = {
    description: 'Kidney stones are hard mineral deposits that form in the kidneys.',
    symptoms: [
        'Severe flank pain',
        'Blood in urine',
        'Burning urination',
        'Nausea and vomiting',
        'Frequent urination',
    ],
    prevention: [
        'Drink adequate water',
        'Reduce salt intake',
        'Limit excessive animal protein',
        'Avoid dehydration',
        'Follow medical advice after stone treatment',
    ],
    myths: [
        { myth: 'Kidney stones occur only in elderly people', fact: 'Stones can occur at any age' },
        { myth: 'Less water intake is harmless', fact: 'Dehydration is a major cause of stones' },
        { myth: 'Stones always need surgery', fact: 'Many stones pass naturally' },
    ],
}

// ─── Section 3: Prostate Health ──────────────────────────────
export const PROSTATE_HEALTH = {
    description: 'The prostate is a small gland present in men below the bladder.',
    conditions: ['Benign Prostatic Enlargement (BPH)', 'Prostatitis', 'Prostate cancer'],
    symptoms: [
        'Weak urine stream',
        'Frequent urination',
        'Night-time urination',
        'Difficulty starting urination',
        'Blood in urine',
    ],
    tips: [
        'Regular exercise',
        'Healthy diet',
        'Weight control',
        'Timely medical consultation',
        'Avoid delaying urination frequently',
    ],
    keyMessage: 'Men above 50 years should discuss prostate health screening with their doctor.',
}

// ─── Section 4: UTI ──────────────────────────────────────────
export const UTI_INFO = {
    description: 'A urinary tract infection occurs when bacteria infect the urinary system.',
    symptoms: [
        'Burning urination',
        'Frequent urge to urinate',
        'Fever',
        'Lower abdominal discomfort',
        'Foul-smelling urine',
    ],
    prevention: [
        'Drink adequate water',
        'Maintain hygiene',
        'Do not hold urine for long periods',
        'Control diabetes',
        'Seek medical care for recurrent infections',
    ],
    warning: 'Repeated self-medication with antibiotics should be avoided.',
}

// ─── Section 5: Bladder Health & Incontinence ────────────────
export const BLADDER_HEALTH = {
    description: 'Urinary leakage is common and treatable.',
    causes: [
        'Ageing',
        'Pregnancy',
        'Obesity',
        'Prostate enlargement',
        'Neurological disorders',
    ],
    lifestyle: [
        'Weight reduction',
        'Bladder training',
        'Pelvic floor exercises',
        'Reduce caffeine intake',
        'Timely consultation',
    ],
}

// ─── Section 6: Men's Health ─────────────────────────────────
export const MENS_HEALTH = {
    description: 'Men may experience issues related to fertility, erections, testosterone levels, or urinary symptoms.',
    concerns: [
        'Erectile dysfunction',
        'Premature ejaculation',
        'Infertility',
        'Low testosterone symptoms',
        'Testicular swelling',
    ],
    lifestyleFactors: [
        'Smoking',
        'Diabetes',
        'Stress',
        'Lack of exercise',
        'Poor sleep',
    ],
}

// ─── Section 7: Women's Health ───────────────────────────────
export const WOMENS_HEALTH = {
    description: 'Women commonly experience various urological disorders.',
    conditions: ['UTIs', 'Urinary leakage', 'Pelvic organ prolapse', 'Bladder dysfunction'],
    advice: [
        'Maintain hydration',
        'Avoid delaying urination',
        'Seek medical care for recurrent symptoms',
        'Perform pelvic floor exercises',
    ],
}

// ─── Section 8: Children's Health ───────────────────────────
export const CHILDRENS_HEALTH = {
    conditions: [
        'Bedwetting',
        'Urinary infections',
        'Congenital abnormalities',
        'Swelling in scrotum',
        'Undescended testes',
    ],
    advice: [
        'Do not ignore recurrent fever with urinary symptoms',
        'Encourage regular toilet habits',
        'Seek early evaluation for genital swelling',
        'Avoid shaming children for bedwetting',
    ],
}

// ─── Section 9: Cancer Awareness ─────────────────────────────
export const CANCER_INFO = {
    cancers: ['Prostate cancer', 'Kidney cancer', 'Bladder cancer', 'Testicular cancer'],
    warningSigns: [
        'Blood in urine',
        'Unexplained weight loss',
        'Persistent urinary symptoms',
        'Lump in testicle',
        'Persistent pain',
    ],
    prevention: [
        'Avoid smoking',
        'Maintain healthy lifestyle',
        'Timely medical check-ups',
        'Awareness of family history',
    ],
    keyMessage: 'Early diagnosis improves treatment outcomes.',
}

// ─── Section 10: Preventive Screening ────────────────────────
export const PREVENTIVE_CHECKS = [
    'Blood pressure',
    'Diabetes control',
    'Kidney function',
    'Urine examination',
    'Prostate evaluation (when appropriate)',
]

// ─── Section 11: FAQs (all 44) ───────────────────────────────
export type FAQ = {
    id: number
    q: string
    a: string
    category: string
}

export const FAQS: FAQ[] = [
    // General Urology
    { id: 1, category: 'General', q: 'What is urology?', a: 'Urology is the branch of medicine that deals with diseases of the urinary system in men and women, and the male reproductive system.' },
    { id: 2, category: 'General', q: 'Who is a urologist?', a: 'A urologist is a doctor specially trained to diagnose and treat conditions related to the kidneys, bladder, prostate, urinary tract, and male reproductive organs.' },
    { id: 3, category: 'General', q: 'When should I consult a urologist?', a: 'You should consult a urologist if you have blood in urine, painful urination, frequent urination, difficulty passing urine, kidney stone symptoms, urinary leakage, testicular swelling, sexual health concerns, or recurrent urinary infections.' },
    // Kidney Stones
    { id: 4, category: 'Kidney Stones', q: 'What are kidney stones?', a: 'Kidney stones are hard deposits made of minerals and salts that form inside the kidneys.' },
    { id: 5, category: 'Kidney Stones', q: 'What causes kidney stones?', a: 'Common causes include low water intake, excess salt intake, high oxalate diet, family history, obesity, and certain medical conditions.' },
    { id: 6, category: 'Kidney Stones', q: 'What are the symptoms of kidney stones?', a: 'Symptoms may include severe pain in the back or side, blood in urine, burning urination, nausea or vomiting, and frequent urination.' },
    { id: 7, category: 'Kidney Stones', q: 'Can kidney stones be prevented?', a: 'Yes. Prevention includes drinking enough water, reducing salt intake, maintaining healthy weight, following dietary advice, and regular follow-up after stone treatment.' },
    { id: 8, category: 'Kidney Stones', q: 'Do all kidney stones require surgery?', a: 'No. Many small stones pass naturally with hydration and medications. Larger stones may require treatment.' },
    // UTI
    { id: 9, category: 'UTI', q: 'What is a urinary tract infection (UTI)?', a: 'A UTI occurs when bacteria infect any part of the urinary system.' },
    { id: 10, category: 'UTI', q: 'What are common symptoms of UTI?', a: 'Symptoms include burning urination, frequent urination, fever, lower abdominal pain, foul-smelling urine, and blood in urine.' },
    { id: 11, category: 'UTI', q: 'How can UTIs be prevented?', a: 'Drink plenty of water, maintain good hygiene, avoid holding urine for long periods, control diabetes, and seek medical advice for recurrent infections.' },
    { id: 12, category: 'UTI', q: 'Are recurrent UTIs serious?', a: 'Yes. Repeated infections can affect kidney health and should be medically evaluated.' },
    // Prostate
    { id: 13, category: 'Prostate', q: 'What is the prostate gland?', a: 'The prostate is a small gland in men located below the bladder.' },
    { id: 14, category: 'Prostate', q: 'What is prostate enlargement?', a: 'Benign Prostatic Hyperplasia (BPH) is a non-cancerous enlargement of the prostate common in ageing men.' },
    { id: 15, category: 'Prostate', q: 'What are symptoms of enlarged prostate?', a: 'Symptoms include weak urine stream, frequent urination, night-time urination, difficulty starting urination, and feeling of incomplete bladder emptying.' },
    { id: 16, category: 'Prostate', q: 'Does enlarged prostate mean cancer?', a: 'No. Most prostate enlargement is non-cancerous.' },
    { id: 17, category: 'Prostate', q: 'At what age should men discuss prostate screening?', a: 'Men above 50 years, or earlier if there is family history, should discuss screening with a doctor.' },
    // Bladder
    { id: 18, category: 'Bladder', q: 'What is urinary incontinence?', a: 'Urinary incontinence means leakage of urine due to loss of bladder control.' },
    { id: 19, category: 'Bladder', q: 'Is urinary leakage a normal part of ageing?', a: 'No. Although common with ageing, it is treatable and should not be ignored.' },
    { id: 20, category: 'Bladder', q: 'What can help improve bladder control?', a: 'Pelvic floor exercises, weight loss, bladder training, reducing caffeine, and medical consultation can all help improve bladder control.' },
    { id: 21, category: 'Bladder', q: 'What is overactive bladder?', a: 'Overactive bladder causes sudden urgency to urinate, frequent urination, and sometimes leakage.' },
    // Men's Health
    { id: 22, category: "Men's Health", q: 'What is erectile dysfunction?', a: 'Erectile dysfunction (ED) is difficulty achieving or maintaining an erection.' },
    { id: 23, category: "Men's Health", q: 'Can lifestyle affect erectile function?', a: 'Yes. Smoking, diabetes, obesity, stress, poor sleep, and lack of exercise can contribute to ED.' },
    { id: 24, category: "Men's Health", q: 'Is erectile dysfunction treatable?', a: 'Yes. Many effective treatment options are available.' },
    { id: 25, category: "Men's Health", q: 'When should men seek help for sexual health problems?', a: 'If symptoms persist or affect quality of life, medical advice should be sought.' },
    // Women's Health
    { id: 26, category: "Women's Health", q: 'Why are women more prone to UTIs?', a: 'Women have a shorter urethra, making bacterial infections more common.' },
    { id: 27, category: "Women's Health", q: 'What is pelvic organ prolapse?', a: 'Pelvic organs may descend due to weakness of pelvic floor muscles, causing pressure or urinary symptoms.' },
    { id: 28, category: "Women's Health", q: 'What are pelvic floor exercises?', a: 'These exercises strengthen pelvic muscles and help improve bladder control.' },
    // Children
    { id: 29, category: 'Children', q: 'Is bedwetting common in children?', a: 'Yes. Bedwetting is common and usually improves with age.' },
    { id: 30, category: 'Children', q: 'When should parents seek medical advice for bedwetting?', a: 'Medical evaluation may be needed if bedwetting persists beyond expected age, daytime symptoms occur, there are repeated infections, or the child has pain or fever.' },
    { id: 31, category: 'Children', q: 'What is undescended testis?', a: 'A testicle that has not moved into the scrotum before birth is called undescended testis.' },
    // Cancer
    { id: 32, category: 'Cancer', q: 'What are common urological cancers?', a: 'Prostate cancer, kidney cancer, bladder cancer, and testicular cancer are the most common urological cancers.' },
    { id: 33, category: 'Cancer', q: 'What are warning signs of urological cancers?', a: 'Blood in urine, persistent urinary symptoms, a lump in the testicle, unexplained weight loss, and persistent pain are warning signs.' },
    { id: 34, category: 'Cancer', q: 'Does smoking increase risk of urological cancers?', a: 'Yes. Smoking significantly increases risk of bladder and kidney cancers.' },
    { id: 35, category: 'Cancer', q: 'Can early detection improve outcomes?', a: 'Yes. Early diagnosis often leads to more successful treatment.' },
    // Kidney Health
    { id: 36, category: 'Kidney Health', q: 'How much water should I drink daily?', a: 'Most adults benefit from around 2–3 litres daily unless medically restricted. The amount should be enough to produce at least 1.5 to 2 litres of urine every day.' },
    { id: 37, category: 'Kidney Health', q: 'Can high blood pressure affect kidneys?', a: 'Yes. High blood pressure can damage kidneys over time.' },
    { id: 38, category: 'Kidney Health', q: 'Can diabetes affect kidneys?', a: 'Yes. Diabetes is a major cause of chronic kidney disease.' },
    { id: 39, category: 'Kidney Health', q: 'Is blood in urine normal?', a: 'No. Blood in urine should always be medically evaluated.' },
    // Lifestyle & Prevention
    { id: 40, category: 'Lifestyle', q: 'Does smoking affect urinary health?', a: 'Yes. Smoking increases risk of cancers, erectile dysfunction, and bladder problems.' },
    { id: 41, category: 'Lifestyle', q: 'Does obesity affect urological health?', a: 'Yes. Obesity increases risk of stones, urinary leakage, diabetes, and sexual dysfunction.' },
    { id: 42, category: 'Lifestyle', q: 'Can exercise improve urinary health?', a: 'Yes. Regular exercise supports kidney health, bladder function, and overall wellness.' },
    { id: 43, category: 'Lifestyle', q: 'Are regular health check-ups important?', a: 'Yes. Preventive check-ups help detect disease early.' },
    // Emergency
    { id: 44, category: 'Emergency', q: 'When should I seek urgent medical care?', a: 'Seek immediate medical attention if you have severe pain, heavy bleeding in urine, fever with urinary symptoms, inability to pass urine, or sudden swelling or severe infection symptoms.' },
]

export const FAQ_CATEGORIES = [
    'All',
    'General',
    'Kidney Stones',
    'UTI',
    'Prostate',
    'Bladder',
    "Men's Health",
    "Women's Health",
    'Children',
    'Cancer',
    'Kidney Health',
    'Lifestyle',
    'Emergency',
] as const

export type FAQCategory = typeof FAQ_CATEGORIES[number]

// ─── Sections meta (for ToC / navigation) ────────────────────
export const PUBLIC_HEALTH_SECTIONS = [
    { id: 'intro', label: 'Overview', emoji: '🩺' },
    { id: 'lifestyle', label: 'Healthy Lifestyle', emoji: '🌿' },
    { id: 'kidney', label: 'Kidney Stones', emoji: '🪨' },
    { id: 'prostate', label: 'Prostate Health', emoji: '🫀' },
    { id: 'uti', label: 'UTI Awareness', emoji: '🦠' },
    { id: 'bladder', label: 'Bladder Health', emoji: '💧' },
    { id: 'mens', label: "Men's Health", emoji: '♂️' },
    { id: 'womens', label: "Women's Health", emoji: '♀️' },
    { id: 'children', label: "Children's Health", emoji: '👶' },
    { id: 'cancer', label: 'Cancer Awareness', emoji: '⚠️' },
    { id: 'screening', label: 'Preventive Screening', emoji: '🔬' },
    { id: 'faqs', label: 'FAQs', emoji: '❓' },
] as const