export const CONVENERS = [
  { symbol: '統', name: 'Dr. A. K. Sharma', role: 'Convener', seed: 100, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

export const FACULTY_COORDINATORS = [
  { symbol: '教', name: 'Dr. Rajesh Kumar', role: 'Faculty Coordinator', seed: 150, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '導', name: 'Dr. Meenakshi Sundaram', role: 'Faculty Coordinator', seed: 151, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '学', name: 'Dr. Vikramaditya Singh', role: 'Faculty Coordinator', seed: 152, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

export const LEADS_SUMMARY = [
  { symbol: '市', name: 'Marketing Lead', role: 'Head of Marketing', seed: 0, dept: 'Marketing' },
  { symbol: '社', name: 'Social Lead', role: 'Head of Social', seed: 1, dept: 'Social' },
  { symbol: '図', name: 'Graphics Lead', role: 'Head of Graphics', seed: 2, dept: 'Graphics' },
  { symbol: '技', name: 'Tech Lead', role: 'Head of Tech', seed: 3, dept: 'Tech' },
  { symbol: '管', name: 'Management Lead', role: 'Head of Management', seed: 4, dept: 'Management and logistics' },
  { symbol: '映', name: 'Videography Lead', role: 'Head of Videography', seed: 5, dept: 'Videography' }
];

export const COORDINATORS = [
  { symbol: '協', name: 'Rohan Verma', role: 'Head Coordinator', seed: 200, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '統', name: 'Ananya Roy', role: 'Event Coordinator', seed: 201, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '運', name: 'Vikram Sethi', role: 'Logistics Lead Coordinator', seed: 202, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '技', name: 'Devika Sharma', role: 'Technical Coordinator', seed: 203, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '広', name: 'Arjun Mehta', role: 'PR & Media Coordinator', seed: 204, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '創', name: 'Ishita Gupta', role: 'Creative & Stage Coordinator', seed: 205, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

export const VOLUNTEERS = [
  { symbol: '奉', name: 'Priya Das', role: 'Senior Student Volunteer', seed: 210, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '力', name: 'Amit Kumar', role: 'Technical Support Volunteer', seed: 211, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '和', name: 'Sneha Kapoor', role: 'Operations & Crowd Volunteer', seed: 212, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '心', name: 'Kabir Malhotra', role: 'Hospitality Volunteer', seed: 213, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '光', name: 'Riya Nair', role: 'Media & Design Volunteer', seed: 214, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '疾', name: 'Siddharth Rao', role: 'Ground Logistics Volunteer', seed: 215, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

export const COORDINATORS_VOLUNTEERS = [
  ...COORDINATORS,
  ...VOLUNTEERS
];

export const DEPTS = [
  {
    name: 'Marketing',
    kana: '第一の間 — I',
    title: 'Marketing',
    desc: 'Driving the vision forward. Masters of strategy and audience engagement.',
    members: [
      { symbol: '市', name: 'Marketing Lead', role: 'Head of Marketing', seed: 0, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Social',
    kana: '第二の間 — II',
    title: 'Social',
    desc: 'Connecting with the community. Voices that carry across the digital realm.',
    members: [
      { symbol: '社', name: 'Social Lead', role: 'Head of Social', seed: 1, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Graphics',
    kana: '第三の間 — III',
    title: 'Graphics',
    desc: 'Ink and pixel, bound by fire. Artists whose work defines our identity.',
    members: [
      { symbol: '図', name: 'Graphics Lead', role: 'Head of Graphics', seed: 2, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Tech',
    kana: '第四の間 — IV',
    title: 'Tech',
    desc: 'Architects of the digital fortress. Code forged in the fire of the dojo.',
    members: [
      { symbol: '技', name: 'Tech Lead', role: 'Head of Tech', seed: 3, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Management and logistics',
    kana: '第五の間 — V',
    title: 'Management<br><span>& Logistics</span>',
    desc: 'The backbone of the operation. Orchestrating every detail with precision.',
    members: [
      { symbol: '管', name: 'Management Lead', role: 'Head of Management', seed: 4, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Videography',
    kana: '第六の間 — VI',
    title: 'Videography',
    desc: 'Frame cutters who sculpt time. Capturing moments that last forever.',
    members: [
      { symbol: '映', name: 'Videography Lead', role: 'Head of Videography', seed: 5, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  }
];
