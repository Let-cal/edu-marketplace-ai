import { Product, User } from "./types";

export const mockProducts: Product[] = [
  // Page 1 Products
  {
    id: "1",
    title: "Business English Communication Mastery",
    description: "Master professional English for workplace success",
    fullDescription:
      "Comprehensive business English course designed for professionals. Learn formal communication, presentation skills, meeting participation, email etiquette, and negotiation language. Perfect for career advancement and international business.",
    price: 750000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Professional%20business%20English%20learning%20with%20modern%20office%20setting%2C%20business%20people%20in%20meeting%2C%20presentation%20screens%2C%20corporate%20environment%2C%20pink%20and%20blue%20gradient%20background%2C%20clean%20professional%20atmosphere%2C%20high%20quality%20educational%20setting&width=400&height=300&seq=business-english-1&orientation=landscape",
    category: "Business English",
    instructor: "Sarah Thompson",
    rating: 4.8,
    reviewCount: 1247,
    duration: "32 hours",
    level: "Intermediate",
    tags: [
      "Business English",
      "Professional Communication",
      "Presentations",
      "Meetings",
      "Email Writing",
    ],
  },
  {
    id: "2",
    title: "Advanced IELTS Preparation Course",
    description: "Achieve your target IELTS score with expert guidance",
    fullDescription:
      "Complete IELTS preparation covering all four skills: Listening, Reading, Writing, and Speaking. Includes practice tests, tips from certified instructors, and personalized feedback to maximize your band score.",
    price: 1200000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=IELTS%20test%20preparation%20with%20study%20materials%2C%20practice%20books%2C%20headphones%20for%20listening%2C%20writing%20exercises%2C%20pink%20and%20white%20educational%20background%2C%20focused%20study%20environment%2C%20modern%20learning%20setup&width=400&height=300&seq=ielts-course-2&orientation=landscape",
    category: "Test Preparation",
    instructor: "Dr. Michael Rodriguez",
    rating: 4.9,
    reviewCount: 892,
    duration: "45 hours",
    level: "Advanced",
    tags: [
      "IELTS",
      "Test Preparation",
      "Academic English",
      "Writing",
      "Speaking",
    ],
  },
  {
    id: "3",
    title: "Everyday Conversation English",
    description: "Speak English confidently in daily situations",
    fullDescription:
      "Learn practical English for everyday conversations. Cover common phrases, social interactions, shopping, dining, travel, and casual communication. Build confidence for real-world English speaking.",
    price: 450000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Casual%20English%20conversation%20with%20diverse%20people%20talking%2C%20coffee%20shop%20setting%2C%20friendly%20atmosphere%2C%20speech%20bubbles%2C%20pink%20and%20warm%20gradient%20background%2C%20social%20interaction%2C%20modern%20lifestyle%20environment&width=400&height=300&seq=conversation-course-3&orientation=landscape",
    category: "Conversational English",
    instructor: "Emma Collins",
    rating: 4.6,
    reviewCount: 634,
    duration: "28 hours",
    level: "Beginner",
    tags: [
      "Conversation",
      "Daily English",
      "Speaking",
      "Social English",
      "Practical Communication",
    ],
  },
  {
    id: "4",
    title: "English Grammar Fundamentals",
    description: "Master English grammar rules and structures",
    fullDescription:
      "Comprehensive grammar course covering all essential English structures. Learn tenses, sentence construction, parts of speech, and advanced grammar patterns with clear explanations and practical exercises.",
    price: 680000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20grammar%20learning%20with%20textbooks%2C%20grammar%20charts%2C%20sentence%20diagrams%2C%20educational%20materials%2C%20pink%20and%20purple%20gradient%20background%2C%20organized%20study%20space%2C%20academic%20learning%20environment&width=400&height=300&seq=grammar-course-4&orientation=landscape",
    category: "Grammar",
    instructor: "James Wilson",
    rating: 4.7,
    reviewCount: 756,
    duration: "35 hours",
    level: "Beginner",
    tags: [
      "Grammar",
      "Sentence Structure",
      "Tenses",
      "Language Rules",
      "Foundation",
    ],
  },
  {
    id: "5",
    title: "American English with Native Speakers",
    description: "Learn authentic American English pronunciation and culture",
    fullDescription:
      "Immersive American English course taught by native speakers. Focus on authentic pronunciation, cultural context, idioms, slang, and regional variations. Perfect for those wanting to sound like a native speaker.",
    price: 1500000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=American%20English%20learning%20with%20native%20speaker%20teacher%2C%20American%20flag%20background%2C%20pronunciation%20practice%2C%20cultural%20elements%2C%20pink%20and%20red%20gradient%20background%2C%20authentic%20learning%20environment%2C%20modern%20classroom%20setting&width=400&height=300&seq=american-english-5&orientation=landscape",
    category: "Native English",
    instructor: "David Smith",
    rating: 4.8,
    reviewCount: 1123,
    duration: "60 hours",
    level: "Intermediate",
    tags: [
      "American English",
      "Native Speaker",
      "Pronunciation",
      "Culture",
      "Accent Training",
    ],
  },
  {
    id: "6",
    title: "English Vocabulary Building",
    description: "Expand your English vocabulary systematically",
    fullDescription:
      "Systematic vocabulary building course using proven memorization techniques. Learn high-frequency words, academic vocabulary, and specialized terms with context and practical usage examples.",
    price: 580000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20vocabulary%20learning%20with%20word%20cards%2C%20dictionary%2C%20vocabulary%20lists%2C%20memory%20techniques%2C%20pink%20and%20purple%20educational%20background%2C%20organized%20learning%20materials%2C%20modern%20study%20methods&width=400&height=300&seq=vocabulary-course-6&orientation=landscape",
    category: "Vocabulary",
    instructor: "Lisa Chang",
    rating: 4.5,
    reviewCount: 423,
    duration: "25 hours",
    level: "Beginner",
    tags: [
      "Vocabulary",
      "Word Building",
      "Memory Techniques",
      "Academic Words",
      "Language Expansion",
    ],
  },

  // Page 2 Products
  {
    id: "7",
    title: "TOEFL iBT Complete Preparation",
    description: "Comprehensive TOEFL preparation for university admission",
    fullDescription:
      "Complete TOEFL iBT preparation course covering Reading, Listening, Speaking, and Writing sections. Includes practice tests, scoring strategies, and academic English skills for university success.",
    price: 720000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=TOEFL%20test%20preparation%20with%20computer-based%20testing%20interface%2C%20university%20campus%20background%2C%20academic%20materials%2C%20study%20guides%2C%20pink%20and%20blue%20educational%20gradient%2C%20modern%20test%20preparation%20environment&width=400&height=300&seq=toefl-course-7&orientation=landscape",
    category: "Test Preparation",
    instructor: "Dr. Jennifer Walsh",
    rating: 4.7,
    reviewCount: 934,
    duration: "40 hours",
    level: "Advanced",
    tags: [
      "TOEFL",
      "University English",
      "Academic Preparation",
      "Test Strategy",
      "Higher Education",
    ],
  },
  {
    id: "8",
    title: "English Writing Skills Development",
    description: "Master academic and professional English writing",
    fullDescription:
      "Comprehensive writing course covering essays, reports, emails, and creative writing. Learn paragraph structure, argumentation, grammar in context, and editing techniques for clear, effective communication.",
    price: 850000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20writing%20skills%20with%20laptop%2C%20notebooks%2C%20writing%20exercises%2C%20essay%20drafts%2C%20pink%20and%20white%20academic%20background%2C%20modern%20writing%20workspace%2C%20professional%20learning%20environment&width=400&height=300&seq=writing-course-8&orientation=landscape",
    category: "Writing",
    instructor: "Rebecca Martinez",
    rating: 4.6,
    reviewCount: 678,
    duration: "38 hours",
    level: "Intermediate",
    tags: [
      "Academic Writing",
      "Essay Writing",
      "Professional Writing",
      "Grammar",
      "Communication",
    ],
  },
  {
    id: "9",
    title: "English Pronunciation & Accent Training",
    description: "Perfect your English pronunciation and reduce accent",
    fullDescription:
      "Specialized pronunciation course focusing on phonetics, stress patterns, intonation, and accent reduction. Includes audio practice, recording exercises, and personalized feedback for clear speech.",
    price: 520000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20pronunciation%20training%20with%20microphone%2C%20sound%20waves%2C%20phonetic%20symbols%2C%20speech%20therapy%20setup%2C%20pink%20and%20purple%20gradient%20background%2C%20professional%20language%20learning%20studio&width=400&height=300&seq=pronunciation-course-9&orientation=landscape",
    category: "Pronunciation",
    instructor: "Sophie Laurent",
    rating: 4.8,
    reviewCount: 512,
    duration: "30 hours",
    level: "Intermediate",
    tags: [
      "Pronunciation",
      "Accent Reduction",
      "Phonetics",
      "Speaking Skills",
      "Audio Practice",
    ],
  },
  {
    id: "10",
    title: "Travel English Essentials",
    description: "Essential English for travelers and tourists",
    fullDescription:
      "Practical English course for travelers. Learn airport, hotel, restaurant, and transportation vocabulary. Practice common travel situations, emergency phrases, and cultural communication tips.",
    price: 380000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Travel%20English%20learning%20with%20suitcase%2C%20passport%2C%20world%20map%2C%20airport%20scenes%2C%20pink%20and%20blue%20travel%20background%2C%20tourism%20elements%2C%20modern%20travel%20preparation%20setting&width=400&height=300&seq=travel-english-10&orientation=landscape",
    category: "Travel English",
    instructor: "Tom Bradley",
    rating: 4.5,
    reviewCount: 445,
    duration: "24 hours",
    level: "Beginner",
    tags: [
      "Travel English",
      "Tourism",
      "Practical Phrases",
      "Cultural Communication",
      "Survival English",
    ],
  },
  {
    id: "11",
    title: "Advanced English Literature & Analysis",
    description: "Explore English literature with critical analysis skills",
    fullDescription:
      "Advanced course in English literature covering classic and contemporary works. Develop critical thinking, analytical writing, and deep understanding of literary themes and techniques.",
    price: 1350000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20literature%20study%20with%20classic%20books%2C%20library%20setting%2C%20literary%20analysis%2C%20reading%20materials%2C%20pink%20and%20purple%20academic%20background%2C%20scholarly%20learning%20environment&width=400&height=300&seq=literature-course-11&orientation=landscape",
    category: "Academic English",
    instructor: "Dr. Margaret Powell",
    rating: 4.9,
    reviewCount: 723,
    duration: "50 hours",
    level: "Advanced",
    tags: [
      "Literature",
      "Critical Analysis",
      "Academic English",
      "Literary Criticism",
      "Advanced Reading",
    ],
  },
  {
    id: "12",
    title: "English for Healthcare Professionals",
    description: "Specialized English for medical and healthcare workers",
    fullDescription:
      "Specialized English course for healthcare professionals. Learn medical vocabulary, patient communication, documentation, and professional interactions in healthcare settings.",
    price: 620000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Medical%20English%20learning%20with%20healthcare%20professionals%2C%20hospital%20setting%2C%20medical%20terminology%2C%20patient%20communication%2C%20pink%20and%20white%20medical%20background%2C%20professional%20healthcare%20environment&width=400&height=300&seq=medical-english-12&orientation=landscape",
    category: "Professional English",
    instructor: "Dr. Sarah Kim",
    rating: 4.7,
    reviewCount: 856,
    duration: "35 hours",
    level: "Intermediate",
    tags: [
      "Medical English",
      "Healthcare Communication",
      "Professional Vocabulary",
      "Patient Interaction",
      "Medical Terminology",
    ],
  },

  // Page 3 Products
  {
    id: "13",
    title: "British English & Culture Course",
    description: "Authentic British English with cultural insights",
    fullDescription:
      "Immersive British English course covering pronunciation, vocabulary, cultural context, and social customs. Learn from native British instructors with authentic materials and cultural understanding.",
    price: 560000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=British%20English%20learning%20with%20Union%20Jack%2C%20London%20landmarks%2C%20British%20cultural%20elements%2C%20tea%20culture%2C%20pink%20and%20royal%20blue%20gradient%20background%2C%20authentic%20British%20learning%20environment&width=400&height=300&seq=british-english-13&orientation=landscape",
    category: "Native English",
    instructor: "Oliver Thompson",
    rating: 4.6,
    reviewCount: 689,
    duration: "32 hours",
    level: "Intermediate",
    tags: [
      "British English",
      "UK Culture",
      "British Accent",
      "Cultural Context",
      "Native Speaker",
    ],
  },
  {
    id: "14",
    title: "English Listening & Comprehension",
    description: "Improve English listening skills and comprehension",
    fullDescription:
      "Focused listening course with diverse audio materials including podcasts, news, interviews, and conversations. Develop active listening strategies and comprehension skills for real-world situations.",
    price: 420000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20listening%20practice%20with%20headphones%2C%20audio%20waveforms%2C%20podcast%20interface%2C%20listening%20exercises%2C%20pink%20and%20white%20audio%20background%2C%20modern%20language%20learning%20technology&width=400&height=300&seq=listening-course-14&orientation=landscape",
    category: "Listening Skills",
    instructor: "Rachel Green",
    rating: 4.4,
    reviewCount: 378,
    duration: "22 hours",
    level: "Beginner",
    tags: [
      "Listening Skills",
      "Audio Comprehension",
      "Podcast English",
      "Active Listening",
      "Sound Recognition",
    ],
  },
  {
    id: "15",
    title: "English Job Interview Preparation",
    description: "Master English for successful job interviews",
    fullDescription:
      "Specialized course for job interview success in English. Practice common interview questions, professional vocabulary, body language, and confidence-building techniques for career advancement.",
    price: 950000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Job%20interview%20preparation%20with%20professional%20setting%2C%20interview%20scenario%2C%20business%20attire%2C%20resume%20documents%2C%20pink%20and%20professional%20gradient%20background%2C%20career%20success%20environment&width=400&height=300&seq=interview-english-15&orientation=landscape",
    category: "Professional English",
    instructor: "Mark Johnson",
    rating: 4.7,
    reviewCount: 654,
    duration: "42 hours",
    level: "Intermediate",
    tags: [
      "Job Interview",
      "Professional English",
      "Career Preparation",
      "Interview Skills",
      "Workplace Communication",
    ],
  },
  {
    id: "16",
    title: "TOEIC Test Preparation Complete",
    description: "Achieve high TOEIC scores for career advancement",
    fullDescription:
      "Comprehensive TOEIC preparation focusing on business English skills. Practice listening and reading sections with authentic business scenarios and test-taking strategies.",
    price: 480000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=TOEIC%20test%20preparation%20with%20business%20scenarios%2C%20test%20booklets%2C%20answer%20sheets%2C%20corporate%20learning%20environment%2C%20pink%20and%20blue%20professional%20background%2C%20career%20advancement%20setting&width=400&height=300&seq=toeic-course-16&orientation=landscape",
    category: "Test Preparation",
    instructor: "Linda Rodriguez",
    rating: 4.5,
    reviewCount: 567,
    duration: "28 hours",
    level: "Intermediate",
    tags: [
      "TOEIC",
      "Business English",
      "Career English",
      "Test Preparation",
      "Professional Certification",
    ],
  },
  {
    id: "17",
    title: "Children's English Learning Program",
    description: "Fun and engaging English for young learners",
    fullDescription:
      "Interactive English program designed for children ages 6-12. Features games, songs, stories, and activities that make learning English fun and effective for young minds.",
    price: 750000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Children%20English%20learning%20with%20colorful%20classroom%2C%20kids%20activities%2C%20educational%20games%2C%20alphabet%20blocks%2C%20pink%20and%20rainbow%20gradient%20background%2C%20fun%20learning%20environment%20for%20children&width=400&height=300&seq=kids-english-17&orientation=landscape",
    category: "Children's English",
    instructor: "Amy Foster",
    rating: 4.8,
    reviewCount: 434,
    duration: "36 hours",
    level: "Beginner",
    tags: [
      "Children English",
      "Young Learners",
      "Interactive Learning",
      "Educational Games",
      "Kid-Friendly",
    ],
  },
  {
    id: "18",
    title: "English Presentation Skills Mastery",
    description: "Deliver confident presentations in English",
    fullDescription:
      "Master the art of presenting in English. Learn structure, delivery techniques, visual aids usage, audience engagement, and confidence-building strategies for professional presentations.",
    price: 820000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20presentation%20skills%20with%20presenter%20at%20podium%2C%20audience%2C%20presentation%20slides%2C%20professional%20conference%20setting%2C%20pink%20and%20blue%20gradient%20background%2C%20public%20speaking%20environment&width=400&height=300&seq=presentation-english-18&orientation=landscape",
    category: "Professional English",
    instructor: "Dr. Sarah Mitchell",
    rating: 4.6,
    reviewCount: 523,
    duration: "38 hours",
    level: "Advanced",
    tags: [
      "Presentation Skills",
      "Public Speaking",
      "Professional Communication",
      "Confidence Building",
      "Visual Aids",
    ],
  },

  // Page 4 Products
  {
    id: "19",
    title: "English Idioms & Expressions Mastery",
    description: "Master common English idioms and expressions",
    fullDescription:
      "Comprehensive course on English idioms, phrasal verbs, and expressions. Learn meanings, usage contexts, and cultural significance of common English expressions for natural communication.",
    price: 390000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20idioms%20learning%20with%20speech%20bubbles%2C%20expression%20cards%2C%20cultural%20symbols%2C%20pink%20and%20colorful%20gradient%20background%2C%20creative%20language%20learning%20environment&width=400&height=300&seq=idioms-course-19&orientation=landscape",
    category: "Advanced English",
    instructor: "Jessica Wong",
    rating: 4.3,
    reviewCount: 398,
    duration: "26 hours",
    level: "Intermediate",
    tags: [
      "Idioms",
      "Expressions",
      "Phrasal Verbs",
      "Cultural Language",
      "Natural Communication",
    ],
  },
  {
    id: "20",
    title: "Academic English for University",
    description: "Prepare for university-level English studies",
    fullDescription:
      "Comprehensive academic English preparation for university students. Cover research skills, academic writing, critical thinking, note-taking, and study strategies for higher education success.",
    price: 890000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Academic%20English%20with%20university%20campus%2C%20lecture%20halls%2C%20students%20studying%2C%20academic%20books%2C%20pink%20and%20blue%20educational%20gradient%2C%20higher%20education%20learning%20environment&width=400&height=300&seq=academic-english-20&orientation=landscape",
    category: "Academic English",
    instructor: "Dr. Robert Turner",
    rating: 4.7,
    reviewCount: 712,
    duration: "44 hours",
    level: "Advanced",
    tags: [
      "Academic English",
      "University Preparation",
      "Research Skills",
      "Critical Thinking",
      "Study Skills",
    ],
  },
  {
    id: "21",
    title: "English Reading Comprehension Skills",
    description: "Develop advanced English reading and comprehension",
    fullDescription:
      "Comprehensive reading course covering various text types from news articles to academic papers. Develop speed reading, critical analysis, and comprehension strategies for different purposes.",
    price: 640000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20reading%20comprehension%20with%20books%2C%20newspapers%2C%20tablets%2C%20reading%20materials%2C%20pink%20and%20white%20literary%20background%2C%20comfortable%20reading%20environment&width=400&height=300&seq=reading-course-21&orientation=landscape",
    category: "Reading Skills",
    instructor: "Elena Rossi",
    rating: 4.8,
    reviewCount: 545,
    duration: "34 hours",
    level: "Intermediate",
    tags: [
      "Reading Comprehension",
      "Speed Reading",
      "Critical Analysis",
      "Text Analysis",
      "Literature",
    ],
  },
  {
    id: "22",
    title: "English for International Business",
    description: "Master English for global business success",
    fullDescription:
      "Specialized English course for international business professionals. Learn negotiation language, cross-cultural communication, international trade terminology, and global business etiquette.",
    price: 780000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=International%20business%20English%20with%20world%20map%2C%20global%20communication%2C%20multicultural%20business%20meeting%2C%20pink%20and%20professional%20gradient%20background%2C%20international%20corporate%20environment&width=400&height=300&seq=international-business-22&orientation=landscape",
    category: "Business English",
    instructor: "Michael Davis",
    rating: 4.6,
    reviewCount: 467,
    duration: "40 hours",
    level: "Advanced",
    tags: [
      "International Business",
      "Global Communication",
      "Negotiation",
      "Cross-Cultural",
      "Trade English",
    ],
  },
  {
    id: "23",
    title: "English Speaking Confidence Course",
    description: "Build confidence in English speaking situations",
    fullDescription:
      "Confidence-building course focused on overcoming speaking anxiety and building fluency. Practice real-life scenarios, develop natural speech patterns, and gain confidence in English communication.",
    price: 520000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20speaking%20confidence%20with%20diverse%20people%20talking%2C%20supportive%20learning%20environment%2C%20speech%20practice%2C%20pink%20and%20encouraging%20gradient%20background%2C%20confidence%20building%20atmosphere&width=400&height=300&seq=speaking-confidence-23&orientation=landscape",
    category: "Speaking Skills",
    instructor: "Amanda Wilson",
    rating: 4.5,
    reviewCount: 356,
    duration: "30 hours",
    level: "Beginner",
    tags: [
      "Speaking Confidence",
      "Fluency Building",
      "Anxiety Reduction",
      "Communication Skills",
      "Self-Expression",
    ],
  },
  {
    id: "24",
    title: "English Creative Writing Workshop",
    description: "Develop creative writing skills in English",
    fullDescription:
      "Creative writing workshop focusing on storytelling, poetry, and creative expression in English. Develop imagination, writing techniques, and personal voice through guided exercises and feedback.",
    price: 1150000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Creative%20writing%20workshop%20with%20notebooks%2C%20pens%2C%20inspiring%20workspace%2C%20artistic%20elements%2C%20pink%20and%20purple%20creative%20gradient%2C%20imaginative%20writing%20environment&width=400&height=300&seq=creative-writing-24&orientation=landscape",
    category: "Writing",
    instructor: "Christopher Park",
    rating: 4.8,
    reviewCount: 432,
    duration: "48 hours",
    level: "Advanced",
    tags: [
      "Creative Writing",
      "Storytelling",
      "Poetry",
      "Imagination",
      "Literary Skills",
    ],
  },

  // Page 5 Products
  {
    id: "25",
    title: "English Communication for Seniors",
    description: "Gentle English learning approach for older adults",
    fullDescription:
      "Specially designed English course for senior learners. Patient, gentle approach focusing on practical communication, social interaction, and building confidence at a comfortable pace.",
    price: 680000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Senior%20English%20learning%20with%20mature%20adults%20in%20comfortable%20classroom%2C%20patient%20instructor%2C%20gentle%20learning%20environment%2C%20pink%20and%20warm%20gradient%20background%2C%20supportive%20educational%20setting&width=400&height=300&seq=senior-english-25&orientation=landscape",
    category: "Adult Learning",
    instructor: "Patricia Adams",
    rating: 4.7,
    reviewCount: 623,
    duration: "38 hours",
    level: "Beginner",
    tags: [
      "Senior Learning",
      "Adult Education",
      "Patient Learning",
      "Social English",
      "Comfortable Pace",
    ],
  },
  {
    id: "26",
    title: "English Email & Digital Communication",
    description: "Master professional email and digital communication",
    fullDescription:
      "Essential course for digital age communication. Learn professional email writing, online meeting participation, social media communication, and digital etiquette in English.",
    price: 460000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=Digital%20communication%20with%20laptop%2C%20email%20interface%2C%20video%20calls%2C%20online%20messaging%2C%20pink%20and%20blue%20digital%20gradient%20background%2C%20modern%20communication%20technology&width=400&height=300&seq=digital-communication-26&orientation=landscape",
    category: "Digital Communication",
    instructor: "Kevin Rodriguez",
    rating: 4.6,
    reviewCount: 389,
    duration: "28 hours",
    level: "Intermediate",
    tags: [
      "Email Writing",
      "Digital Communication",
      "Online Meetings",
      "Professional Messaging",
      "Digital Etiquette",
    ],
  },
  {
    id: "27",
    title: "English Debate & Discussion Skills",
    description: "Master argumentative and discussion skills in English",
    fullDescription:
      "Advanced course in English debate and discussion. Develop critical thinking, argumentation skills, and confident participation in debates, meetings, and academic discussions.",
    price: 920000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20debate%20skills%20with%20debate%20podium%2C%20discussion%20groups%2C%20argumentative%20setting%2C%20pink%20and%20dynamic%20gradient%20background%2C%20intellectual%20discussion%20environment&width=400&height=300&seq=debate-english-27&orientation=landscape",
    category: "Advanced English",
    instructor: "Dr. Michelle Chen",
    rating: 4.8,
    reviewCount: 567,
    duration: "45 hours",
    level: "Advanced",
    tags: [
      "Debate Skills",
      "Discussion",
      "Argumentation",
      "Critical Thinking",
      "Public Speaking",
    ],
  },
  {
    id: "28",
    title: "English Phonics & Reading Foundation",
    description: "Build strong foundation in English phonics and reading",
    fullDescription:
      "Fundamental course in English phonics and reading skills. Perfect for beginners to build strong foundation in sound-letter relationships, word recognition, and basic reading skills.",
    price: 650000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20phonics%20learning%20with%20alphabet%20letters%2C%20sound%20symbols%2C%20reading%20exercises%2C%20educational%20materials%2C%20pink%20and%20educational%20gradient%20background%2C%20foundation%20learning%20environment&width=400&height=300&seq=phonics-course-28&orientation=landscape",
    category: "Foundation English",
    instructor: "Dr. Anna Wilson",
    rating: 4.5,
    reviewCount: 445,
    duration: "35 hours",
    level: "Beginner",
    tags: [
      "Phonics",
      "Reading Foundation",
      "Sound Recognition",
      "Letter Sounds",
      "Basic Reading",
    ],
  },
  {
    id: "29",
    title: "English Storytelling & Narrative Skills",
    description: "Master the art of storytelling in English",
    fullDescription:
      "Creative course focusing on storytelling techniques, narrative structure, and engaging presentation. Develop skills in personal stories, professional anecdotes, and captivating communication.",
    price: 540000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20storytelling%20with%20story%20books%2C%20narrative%20elements%2C%20creative%20presentation%2C%20pink%20and%20imaginative%20gradient%20background%2C%20creative%20storytelling%20environment&width=400&height=300&seq=storytelling-course-29&orientation=landscape",
    category: "Creative English",
    instructor: "Lisa Park",
    rating: 4.7,
    reviewCount: 512,
    duration: "32 hours",
    level: "Intermediate",
    tags: [
      "Storytelling",
      "Narrative Skills",
      "Creative Communication",
      "Personal Stories",
      "Presentation",
    ],
  },
  {
    id: "30",
    title: "English Cultural Immersion Program",
    description: "Experience English through cultural immersion",
    fullDescription:
      "Comprehensive cultural immersion program combining language learning with cultural understanding. Explore English-speaking cultures, traditions, customs, and social norms while improving language skills.",
    price: 420000,
    thumbnail:
      "https://readdy.ai/api/search-image?query=English%20cultural%20immersion%20with%20world%20cultures%2C%20traditional%20elements%2C%20cultural%20festivals%2C%20pink%20and%20multicultural%20gradient%20background%2C%20diverse%20cultural%20learning%20environment&width=400&height=300&seq=cultural-english-30&orientation=landscape",
    category: "Cultural English",
    instructor: "International Team",
    rating: 4.4,
    reviewCount: 467,
    duration: "30 hours",
    level: "Intermediate",
    tags: [
      "Cultural Immersion",
      "Cross-Cultural",
      "Traditions",
      "Social Customs",
      "Global English",
    ],
  },
];

export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  favoriteProducts: ["2", "4", "7"],
  viewedProducts: ["1", "2", "3", "4", "5"],
};
