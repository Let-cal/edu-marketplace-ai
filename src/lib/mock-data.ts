import { Product, User } from './types'

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Advanced React Development Masterclass',
    price: 750000,
    thumbnail: 'https://readdy.ai/api/search-image?query=Modern%20software%20development%20course%20with%20React%20programming%20on%20computer%20screen%2C%20clean%20workspace%20with%20modern%20laptop%2C%20coding%20interface%2C%20vibrant%20pink%20and%20purple%20gradient%20background%2C%20professional%20educational%20setting%2C%20high%20quality%20digital%20art%2C%20modern%20minimalist%20design&width=400&height=300&seq=react-course-1&orientation=landscape',
    description: 'Master React with hooks, context, and advanced patterns',
    fullDescription: 'Comprehensive course covering React fundamentals to advanced concepts including hooks, context API, performance optimization, testing, and modern development practices. Perfect for developers looking to master React development.',
    category: 'Programming',
    rating: 4.8,
    reviewCount: 1247,
    instructor: 'Sarah Johnson',
    duration: '32 hours',
    level: 'Advanced',
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development']
  },
  {
    id: '2',
    title: 'AI & Machine Learning Fundamentals',
    price: 1200000,
    thumbnail: 'https://readdy.ai/api/search-image?query=Artificial%20intelligence%20and%20machine%20learning%20concept%20with%20neural%20networks%2C%20data%20visualization%2C%20algorithm%20diagrams%2C%20futuristic%20pink%20and%20blue%20gradient%20background%2C%20educational%20technology%2C%20clean%20modern%20design%2C%20high%20tech%20atmosphere&width=400&height=300&seq=ai-course-2&orientation=landscape',
    description: 'Learn AI and ML from scratch with practical projects',
    fullDescription: 'Complete introduction to artificial intelligence and machine learning concepts, algorithms, and practical implementation. Includes hands-on projects with Python, TensorFlow, and real-world applications.',
    category: 'AI & Data Science',
    rating: 4.9,
    reviewCount: 892,
    instructor: 'Dr. Michael Chen',
    duration: '45 hours',
    level: 'Intermediate',
    tags: ['AI', 'Machine Learning', 'Python', 'Data Science']
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy Course',
    price: 450000,
    thumbnail: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20strategy%20with%20social%20media%20icons%2C%20analytics%20charts%2C%20mobile%20devices%2C%20laptop%20showing%20marketing%20dashboard%2C%20pink%20and%20white%20professional%20background%2C%20modern%20business%20setting%2C%20clean%20minimalist%20design&width=400&height=300&seq=marketing-course-3&orientation=landscape',
    description: 'Complete digital marketing from social media to SEO',
    fullDescription: 'Comprehensive digital marketing course covering social media marketing, SEO, content marketing, email marketing, PPC advertising, and analytics. Learn to create effective marketing campaigns.',
    category: 'Marketing',
    rating: 4.6,
    reviewCount: 634,
    instructor: 'Emma Williams',
    duration: '28 hours',
    level: 'Beginner',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics']
  },
  {
    id: '4',
    title: 'UI/UX Design Principles & Practice',
    price: 680000,
    thumbnail: 'https://readdy.ai/api/search-image?query=UI%20UX%20design%20workspace%20with%20design%20tools%2C%20wireframes%2C%20color%20palettes%2C%20mobile%20mockups%2C%20tablet%20with%20design%20software%2C%20pink%20and%20purple%20gradient%20background%2C%20creative%20professional%20environment%2C%20modern%20design%20aesthetic&width=400&height=300&seq=design-course-4&orientation=landscape',
    description: 'Master user interface and experience design',
    fullDescription: 'Learn the fundamentals of UI/UX design including user research, wireframing, prototyping, visual design, and usability testing. Master industry-standard tools like Figma and Adobe XD.',
    category: 'Design',
    rating: 4.7,
    reviewCount: 756,
    instructor: 'Alex Rodriguez',
    duration: '35 hours',
    level: 'Intermediate',
    tags: ['UI Design', 'UX Design', 'Figma', 'Prototyping']
  },
  {
    id: '5',
    title: 'Full Stack Web Development Bootcamp',
    price: 1500000,
    thumbnail: 'https://readdy.ai/api/search-image?query=Full%20stack%20web%20development%20with%20multiple%20screens%20showing%20code%2C%20database%20schemas%2C%20server%20architecture%2C%20modern%20development%20setup%2C%20pink%20and%20blue%20tech%20background%2C%20professional%20coding%20environment%2C%20clean%20workspace&width=400&height=300&seq=fullstack-course-5&orientation=landscape',
    description: 'Complete web development from frontend to backend',
    fullDescription: 'Intensive bootcamp covering full-stack web development including HTML, CSS, JavaScript, React, Node.js, databases, and deployment. Build real-world projects and portfolio.',
    category: 'Programming',
    rating: 4.8,
    reviewCount: 1123,
    instructor: 'David Kim',
    duration: '60 hours',
    level: 'Beginner',
    tags: ['Full Stack', 'React', 'Node.js', 'JavaScript']
  },
  {
    id: '6',
    title: 'Data Visualization with D3.js',
    price: 580000,
    thumbnail: 'https://readdy.ai/api/search-image?query=Data%20visualization%20charts%20and%20graphs%20on%20computer%20screen%2C%20interactive%20dashboards%2C%20colorful%20data%20charts%2C%20analytics%20interface%2C%20pink%20and%20purple%20gradient%20background%2C%20modern%20data%20science%20workspace%2C%20professional%20setting&width=400&height=300&seq=dataviz-course-6&orientation=landscape',
    description: 'Create interactive data visualizations',
    fullDescription: 'Learn to create stunning interactive data visualizations using D3.js. Cover basic charts to complex interactive dashboards, data binding, animations, and responsive design.',
    category: 'Programming',
    rating: 4.5,
    reviewCount: 423,
    instructor: 'Lisa Zhang',
    duration: '25 hours',
    level: 'Intermediate',
    tags: ['D3.js', 'Data Visualization', 'JavaScript', 'SVG']
  }
]

export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  favoriteProducts: ['2', '4'],
  viewedProducts: ['1', '2', '3', '4']
}