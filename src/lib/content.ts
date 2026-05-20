export const site = {
  name: "The Her Tribe",
  email: "thehertribe@gmail.com",
  phone: "(613) 314-6225",
  phoneHref: "tel:+16133146225",
  tagline: "Be fearless. Be empowered.",
};

export const images = {
  logo: "/logo.png",
  hero: "/media/hero.png",
  workshop: "/media/workshop.png",
  founder: "/media/aditi.jpg",
  perfection: "/media/progress-vs-perfection.png",
  reflections: "/media/reflections.webp",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Workshops", href: "/workshop" },
  { label: "Mentors", href: "/mentors" },
  { label: "Tribe Talk", href: "/tribe-talk" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type Pillar = {
  num: string;
  kicker: string;
  title: string;
  copy: string;
  icon: "career" | "money" | "bloom";
};

export const pillars: Pillar[] = [
  {
    num: "01",
    kicker: "Mentorship",
    title: "Career & growth",
    copy: "Resume direction, confidence building, and skill planning — conversations that help women move forward with clarity.",
    icon: "career",
  },
  {
    num: "02",
    kicker: "Money literacy",
    title: "Financial independence",
    copy: "Friendly, practical guidance for saving, planning, investing, and taking control of personal finance decisions.",
    icon: "money",
  },
  {
    num: "03",
    kicker: "Well-being",
    title: "Life transformation",
    copy: "Workshops and circles for emotional energy, self-awareness, resilience, and designing life with intention.",
    icon: "bloom",
  },
];

export const stats = [
  { value: "500+", label: "Women in the community" },
  { value: "40+", label: "Workshops & Tribe Talks" },
  { value: "12", label: "Mentors & guides" },
];

export type Person = {
  name: string;
  role: string;
  title: string;
  image: string;
};

export const workshops: Person[] = [
  {
    name: "Aditi Verma",
    role: "Founder & mentor",
    title: "Discover the new YOU",
    image: "/media/aditi.jpg",
  },
  {
    name: "Harleen Kaur Chadhaa",
    role: "Well-being guide",
    title: "A blissful journey",
    image: "/media/harleen.jpg",
  },
  {
    name: "Pallavi Chaturvedi",
    role: "Finance coach",
    title: "Financial planning for a stress-free life",
    image: "/media/pallavi.jpg",
  },
  {
    name: "Richa Singh",
    role: "Career mentor",
    title: "Resume support for the job you want",
    image: "/media/richa.jpg",
  },
];

export const author = {
  name: "Aditi Verma",
  role: "Founder & mentor",
  image: "/media/aditi.jpg",
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  readingTime: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "true-empowerment",
    title: "What is true empowerment for women?",
    date: "January 11, 2025",
    tag: "Financial Literacy",
    excerpt:
      "Empowerment isn't a slogan — it's the quiet confidence of knowing your numbers, your worth, and your next move.",
    image: "/media/hero-wide.png",
    readingTime: "5 min read",
    body: [
      {
        type: "p",
        text: "We hear the word empowerment everywhere — on posters, in campaigns, printed across tote bags. But strip away the slogans and what's left? For us, true empowerment is quieter than the marketing suggests. It's the steady, private confidence of a woman who knows her numbers, knows her worth, and knows her next move.",
      },
      {
        type: "h2",
        text: "It starts with knowing your numbers",
      },
      {
        type: "p",
        text: "You can't feel free about something you're afraid to look at. So much of the anxiety women carry about money comes not from the figures themselves, but from avoiding them. The first act of empowerment is often the least glamorous: opening the statement, writing down what you earn and what you owe, and meeting reality without flinching.",
      },
      {
        type: "quote",
        text: "Confidence isn't the absence of fear. It's knowing your numbers well enough that fear loses its grip.",
      },
      {
        type: "p",
        text: "Once the picture is clear, the decisions get easier. Where can you save without feeling deprived? What's one goal worth planning toward? Empowerment isn't a single dramatic leap — it's a series of small, informed choices that compound over time.",
      },
      {
        type: "h2",
        text: "And it grows in community",
      },
      {
        type: "p",
        text: "No woman builds confidence in isolation. The conversations we have at The Her Tribe — honest, judgment-free, and often funny — are where the real shift happens. When you hear another woman name the exact fear you've been carrying, something loosens. You realise you were never the only one.",
      },
      {
        type: "p",
        text: "That's the empowerment worth chasing. Not the slogan, but the quiet certainty that you can handle what comes next — and that you don't have to handle it alone.",
      },
    ],
  },
  {
    slug: "perfection-trap",
    title: "The perfection trap",
    date: "January 1, 2025",
    tag: "Well-being",
    excerpt:
      "Progress over perfection isn't lowering the bar. It's choosing momentum over the paralysis of getting everything right.",
    image: "/media/progress-vs-perfection.png",
    readingTime: "4 min read",
    body: [
      {
        type: "p",
        text: "Perfectionism wears a convincing disguise. It looks like high standards, like care, like wanting to do things properly. But underneath, it often does the opposite of what we hope — it keeps us still. The project never starts because it might not be perfect. The message never sends because it isn't worded just right.",
      },
      {
        type: "quote",
        text: "Progress over perfection isn't lowering the bar. It's refusing to let the bar keep you on the ground.",
      },
      {
        type: "h2",
        text: "Momentum beats mastery",
      },
      {
        type: "p",
        text: "A messy first draft you can improve will always beat a perfect plan you never begin. Movement creates information — you learn what works only by doing. Perfection, by contrast, is a closed loop: it asks you to know the answer before you've been allowed to try.",
      },
      {
        type: "p",
        text: "The next time you catch yourself waiting until you're ready, try asking a smaller question: what's the next imperfect step I can take today? Then take it. Readiness, it turns out, is something you build on the way — not a gate you wait at.",
      },
    ],
  },
  {
    slug: "reflections-before-resolutions",
    title: "Reflections before resolutions",
    date: "December 31, 2024",
    tag: "Life Design",
    excerpt:
      "Before you set next year's goals, give this year an honest look. The clearest resolutions begin with reflection.",
    image: "/media/reflections.webp",
    readingTime: "6 min read",
    body: [
      {
        type: "p",
        text: "Every December, the pressure arrives on schedule: new year, new you. We rush to set resolutions for a version of ourselves we haven't met yet, often before we've made peace with the year we actually lived. But the clearest goals don't begin with ambition — they begin with reflection.",
      },
      {
        type: "h2",
        text: "Look back before you look forward",
      },
      {
        type: "p",
        text: "Give the past year an honest review. What drained you, and what filled you back up? Where did you surprise yourself? Which moments do you want more of — and which were quietly costing you more than they were worth? You can't chart a direction until you know where you're standing.",
      },
      {
        type: "quote",
        text: "Resolutions made in a hurry rarely survive February. Reflection is what gives them roots.",
      },
      {
        type: "p",
        text: "Only once you've reflected does the next step become obvious. Often you won't need a long list of resolutions at all — just one or two changes that, looking back, you already know you're ready for.",
      },
      {
        type: "p",
        text: "So before the countdown, give yourself the gift of a pause. The new year will still be there tomorrow. The clarity you build tonight is what will carry you into it.",
      },
    ],
  },
];


export type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Shikha Sahai",
    role: "Community member",
    image: "/media/shikha.jpeg",
    quote:
      "The Her Tribe came when I was in hard days. Aditi mentored me, motivated me to stay positive, and helped me stand on my feet.",
  },
  {
    name: "Pooja Saxena",
    role: "Career mentee",
    image: "/media/pooja.jpg",
    quote:
      "Aditi helped me focus my skills and prepare for a career path I could truly grow with. A great listener and an excellent mentor.",
  },
];

export const blogCategories = [
  "All",
  "Financial Literacy",
  "Well-being",
  "Life Design",
  "Career",
];

export const faqs = [
  {
    q: "Who can join The Her Tribe?",
    a: "Any woman looking for support, mentorship, or community on her career, financial, or personal-growth journey. There's no application or fee to become part of the conversation — just reach out.",
  },
  {
    q: "Are the workshops free?",
    a: "Most Tribe Talks and community circles are free. Some in-depth workshops have a small contribution that goes toward hosting and materials. We'll always tell you upfront.",
  },
  {
    q: "Do I need any background in finance?",
    a: "Not at all. Our financial literacy sessions are designed for beginners and intentionally jargon-free. We start wherever you are.",
  },
  {
    q: "How do I get involved as a mentor?",
    a: "We're always looking for women who want to share their experience. Email us and tell us a little about what you'd love to teach or talk about.",
  },
];

export type Mentor = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export const mentors: Mentor[] = [
  {
    name: "Pallavi Chaturvedi",
    role: "Financial Expert",
    image: "/media/pallavi.jpg",
    bio: "Founder of Blueestone Wealth Creator and a Certified Financial Planner (CFP) — the most internationally respected financial-planning qualification. Pallavi helps women understand their money and take charge of their financial future with clarity and confidence.",
  },
  {
    name: "Harleen K. Chadhaa",
    role: "Transformational Coach",
    image: "/media/harleen.jpg",
    bio: "A learning & development facilitator for over two decades, Harleen designs transformational programs on leadership, communication, behavioural skills, and relationships. A certified NLP practitioner and image consultant who connects with people across cultures and backgrounds.",
  },
  {
    name: "Supriya Sharma",
    role: "Yogic Healing Expert",
    image: "/media/supriya.jpg",
    bio: "Founder of Sohum Institute of Yoga Sciences and an RYT-200 certified Yoga Alliance trainer. After her own journey through burnout, Supriya now transforms lives through yogic teaching, mantras, and holistic, root-cause healing.",
  },
  {
    name: "Adya Poojari",
    role: "Clinical Psychologist",
    image: "/media/adya.jpg",
    bio: "A clinical psychologist supporting people through anxiety, stress, trauma and more — drawing on CBT, REBT, NLP, mindfulness and gratitude therapy. A Reiki Grandmaster and career counsellor, and a Karamveer Chakra awardee for social work.",
  },
  {
    name: "Sonia Bakshi Sud",
    role: "Life Coach & Environmentalist",
    image: "/media/sonia.jpg",
    bio: "An environment and development professional with 10+ years across climate, natural resources and rural livelihoods. An ardent reader, traveller and practitioner of Buddhism and Yog, Sonia brings a deeply reflective lens to life coaching.",
  },
  {
    name: "Rabiah Bhatia",
    role: "Educator & Mentor",
    image: "/media/rabiah.jpg",
    bio: "'Be the change to bring the change' is her motto. A British Council–certified Spoken English trainer and a senior brand, communications and HR professional with 19 years of experience across reputed schools and MNCs.",
  },
  {
    name: "Jyotsna Agarwal",
    role: "Law of Attraction Coach",
    image: "/media/jyotsna.jpg",
    bio: "A health and wellness coach based in Georgia, USA, with 30+ years in life-skills coaching. Jyotsna guides people through mindset shifts and self-discovery, with certifications spanning Yoga, Qi-Gong, Reiki and aromatherapy.",
  },
];

export type WorkshopOffering = {
  title: string;
  subtitle: string;
  copy: string;
  image: string;
  price: string;
};

export const workshopOfferings: WorkshopOffering[] = [
  {
    title: "Financially Smart",
    subtitle: "Financial empowerment for women",
    copy: "Build a calm, confident relationship with money — budgeting, saving, planning and investing, taught in plain language for every stage of life.",
    image: "/media/progress-vs-perfection.png",
    price: "Free",
  },
  {
    title: "Unleash the Power of YOU",
    subtitle: "Life transformation & personal development",
    copy: "A guided journey into self-awareness, resilience and intention — practical tools to shift your mindset and design a life that feels like yours.",
    image: "/media/reflections.webp",
    price: "Free",
  },
];

export const workshopTopics = [
  "Corporate growth & leadership",
  "Communication barriers",
  "Financial literacy",
  "Life transformation",
  "Entrepreneurship",
  "Personal branding",
];

export type TribeTalk = {
  youtubeId: string;
  speaker: string;
  topic: string;
  date: string;
};

export const tribeTalks: TribeTalk[] = [
  {
    youtubeId: "Jj1CF1rhsIg",
    speaker: "Seema Joshi",
    topic: "Extended Family — supporting children in need",
    date: "November 18, 2021",
  },
  {
    youtubeId: "PcjzkKH-NHE",
    speaker: "Jyotsna Agarwal",
    topic: "Change your life with the laws of transformation",
    date: "November 17, 2021",
  },
  {
    youtubeId: "Ob6WBo_r4ZM",
    speaker: "Dr. Rabiah Bhatia",
    topic: "The pandemic's impact on kids & education",
    date: "September 12, 2021",
  },
  {
    youtubeId: "w4rUMVImp34",
    speaker: "Dr. Nupur Krishnan",
    topic: "Healthy Navratra fasting tips",
    date: "September 5, 2021",
  },
  {
    youtubeId: "Zdn_TwEof3c",
    speaker: "Dr. Nupur Krishnan",
    topic: "Balanced nutrition for a healthy lifestyle",
    date: "September 5, 2021",
  },
  {
    youtubeId: "xX1ZlH5Ax8I",
    speaker: "The Her Tribe",
    topic: "Managing career breaks without guilt",
    date: "September 3, 2021",
  },
  {
    youtubeId: "vqCNagmFHBY",
    speaker: "Madhu Priya",
    topic: "How adversity shapes who we become",
    date: "August 9, 2021",
  },
  {
    youtubeId: "wtEBYdVW1xc",
    speaker: "Sonia Bakshi Sud",
    topic: "Spirituality vs. religion in today's world",
    date: "August 9, 2021",
  },
  {
    youtubeId: "jf1Ldv7jpKA",
    speaker: "Adya Poojari",
    topic: "The importance of emotional wellbeing",
    date: "July 24, 2021",
  },
  {
    youtubeId: "HNIltheTttw",
    speaker: "Pallavi Chaturvedi",
    topic: "The art of family finance & planning",
    date: "July 17, 2021",
  },
  {
    youtubeId: "NbZAJ1gkI2U",
    speaker: "Harleen Kaur Chadhaa",
    topic: "The role adversity plays in shaping identity",
    date: "July 10, 2021",
  },
];
