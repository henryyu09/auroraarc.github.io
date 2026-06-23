// gitprofile.config.js

const config = {
  github: {
    username: 'henryyu09', // Your GitHub org/user name. (Required)
    sortBy: 'updated', // stars | updated
    limit: 0, // How many projects to display.
    exclude: {
      forks: true, // Forked projects will not be displayed if set to true.
      projects: ['stat451', 'data', 'auroraarc', 'LaTeX', 'qubit-feature-analysis', 'Projects', 'CNNQCBM', 'CourseNBooks'], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
  },
  social: {
    linkedin: 'henry-yu09',
    twitter: '',
    mastodon: '',
    facebook: '',
    instagram: '',
    youtube: '', // example: 'pewdiepie'
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: '',
    phone: '',
    email: 'henry.yu094@gmail.com',
    },
    resume: {
    // fileUrl:
      
      // 'https://github.com/AuroraArc/auroraarc.github.io/blob/main/cv.pdf'
  },
  skills: [
    'Python',
    'Java',
    'C/C++',
    'R',
    'Git',
    'Docker',
    'Kubernetes',
    'Tableau',
    'Excel',
    'AWS',
    'Qiskit',
    'scikit-learn',
    'Pytorch',
    'Quantum Computing',
    'Statistical Analysis',
    'Financial Modeling',
    'Risk Analysis',
    'Backtesting',
    'Model Design',
    'ML/DL',
  ],
  experiences: [

  ],
  /* certifications: [
    {
      name: 'Lorem ipsum',
      body: 'Lorem ipsum dolor sit amet',
      year: 'March 2022',
      link: 'https://example.com'
    },
  ], */
  education: [
    {
      institution: 'Indiana University - Bloomington',
      degree: 'B.S. Computer Science',
      from: '2023',
      to: '2024',
    },
    {
      institution: 'University of Wisconsin - Madison',
      degree: 'B.S. Computer Science',
      from: '2024',
      to: '2027',
    }
  ],

  // To hide the `My Projects` section, keep it empty.
  externalProjects: [
    {
      title: 'Quantum Reservoir Computing for Molecular Activity Prediction using Neutral-Atom Quantum Architecture',
      description:
      'Developed in collaboration with QuEra Computing, this project explores the application of QuEra\'s neutral-atom quantum architecture and recent quantum reservoir computing techniques to predict molecular activity. This model compares the performance of QRC using simulation and real quantum hardware against classical ML models on the same task.',
      imageUrl: 'https://www.researchgate.net/publication/372198645/figure/fig1/AS:11431281173276507@1688819213560/Principle-of-quantum-reservoir-computing-The-reservoir-neurons-blue-circles-are-basis.png',
    },
    {
      title: 'Quantum Computing and ML for DFT Calculations in Proteins',
      description:
        'Proposed a novel QC-ML hybrid model for accelerating DFT calculations in large molecular systems using a graph-CNN like model with a QCBM.',
      imageUrl: 'https://lh3.googleusercontent.com/1xoO5BAUUU8kLns4myMNnKw6RRQyUk1JdlWL1M0aDiagMgaBeDA9O8Y4rYFAo9hfnzmb0cnUMrT_-cStBqnyp_zW59F5Edwbvxcy3EVmfeKS-PNgVw=w1072-h603-n-nu-rw',
    },
    // {
    //   title: 'Music Generation Using Performer',
    //   description:
    //     'Implementing a music generation model using Performer, a transformer-based model that uses the FAVOR+ algorithm for efficient attention computation.',
    //   imageUrl: 'https://media.istockphoto.com/id/1175435360/vector/music-note-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=R7s6RR849L57bv_c7jMIFRW4H87-FjLB8sqZ08mN0OU=',
    // },
    {
      title: 'Music Generation Using GGAs',
      description: 'Implementing a music generation model using Genetic Algorithm (GGA) for evolving music sequences.',
      imageUrl: 'https://media.istockphoto.com/id/1175435360/vector/music-note-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=R7s6RR849L57bv_c7jMIFRW4H87-FjLB8sqZ08mN0OU=',
    },
    {
      title: 'Analysis of Noise on Quantum Models',
      description:
      'The goal was to analyze the impact of noise on the accuracy of quantum models using quantum classifiers and noise models.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Arcfour2.png',
    },
    {
      title: 'Understanding the Influence of Qubit Features on Error Rates',
      description:
        'The goal of the project was to assess correlations between qubit features and ultimately predict error probability.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bloch_sphere.svg',
    },
    {
      title: 'Breaking the Cycle: Reducing Recidivism in Iowa State Prisons',
      description:
        'Analysis of the recidivism cycle and the impact of various factors on recidivism rates.',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/005/720/400/non_2x/prison-icon-jail-illustration-isolated-on-white-background-free-vector.jpg',
      // link: 'https://www.soa.org/49c692/globalassets/assets/files/static-pages/research/arch/2023/arch-2023-2-breaking-the-cycle-reducing-recidivism.pdf',

    },
    // Add more projects as needed
  ],
  // Display blog posts from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 2, // How many posts to display. Max is 10.
  },
  googleAnalytics: {
    id: 'G-DFJQESCYS3', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'autumn',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: true,

    // Hide the ring in Profile picture
    hideAvatarRing: false,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'autumn'
    ],

    // Custom theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Designed by arifszn's <a 
      class="text-primary" href="https://github.com/arifszn/gitprofile"
      target="_blank"
      rel="noreferrer"
    >GitProfile</a>`,
};

export default config;
