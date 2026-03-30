import { Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaKaggle } from "react-icons/fa";

export const DATA = {
  name: "Muhammad Saleem",
  initials: "BlueMind",
  avatarUrl: "/avatar.jpg",
  role: "AI Engineer & Researcher",

  roles: ["AI Engineer", "Aspiring AI Researcher", "AI Educator"],
  tagline:
    "Architecting neural networks from first principles to solve complex real-world challenges.",
  stats: [
    { label: "Hackathons", value: "4+" },
    { label: "CGPA", value: "3.32" },
    { label: "IELTS Academic", value: "6.5" },
    { label: "Students Mentored", value: "100+" },
  ],

  contact: {
    email: "msaleem.research@gmail.com",
    tel: "+92 310-6426-100",
    resumeUrl: "/Muhammad_Saleem_CV.pdf",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/msaleem-aisci",
        icon: FiGithub,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/msaleem-aisci/",
        icon: FiLinkedin,
      },
      {
        name: "Kaggle",
        url: "https://www.kaggle.com/xpertdl",
        icon: FaKaggle,
      },
    ],
  },

  achievements: [
    {
      category: "Competitions & Scholarships",
      items: [
        {
          title: "M(IT)² Spring Challenge",
          rank: "Ranked 329/800+",
          desc: "Advanced to Round 2, securing 329th place globally in algorithmic problem solving.",
        },
        {
          title: "Meta Hacker Cup",
          rank: "Ranked 1542/ 13,779",
          desc: "Qualified for Round 2, ranking in the top tier out of 13,779 global participants.",
        },
        {
          title: "PEEF Scholarship",
          rank: "Awarded",
          desc: "Awarded the Punjab Educational Endowment Fund scholarship for academic excellence.",
        },
      ],
    },
  ],

  projects: [
    {
      title: "Final Year Project",
      slug: "crop-detector",
      desc: "Branched CNN architecture for multi-feature extraction from diseased crop leaves.",
      tech: [
        "PyTorch",
        "NumPy",
        "FastAPI",
        "Matplotlib",
        "React Native",
        "Hugging Face",
      ],
      content: {
        problem:
          "Small-scale farmers often lack access to expert plant pathologists, leading to late-stage disease detection and substantial crop loss.",
        solution:
          "Engineered a branched CNN with 3 convolutional layers for multi-feature extraction from leaf images. Implemented Explainable AI (XAI) heatmaps (Grad-CAM) to visualize the model's focus for improved transparency.",
        results:
          "Achieved 92% accuracy classifying 13 diseases across 4 crop types using the Villageplant dataset, deployed via a high-performance FastAPI backend.",
      },
    },
    {
      title: "GemmaSight",
      slug: "gemmasight",
      desc: "Dual-path vision model (MedSigLIP) detecting colorectal cancer with MedGemma reporting.",
      tech: ["TensorFlow", "FAISS", "MedGemma"],
      content: {
        problem:
          "Manual classification of colorectal cancer (MSI-high vs MSS) is time-intensive and critical for determining immunotherapy eligibility in patients.",
        solution:
          "Developed a dual-path vision model utilizing MedSigLIP for histology feature extraction. Integrated a FAISS vector database to cross-reference predictions with established cases and MedGemma for automated diagnostic reports.",
        results:
          "Attained 97% diagnostic accuracy and a 99.97% AUROC, significantly optimizing the diagnosis timeline for pathologists.",
      },
    },
    {
      title: "Chrono-GlioNET",
      slug: "chrono-glionet",
      desc: "Architected a Residual Causal TCN with Self-Attention to predict hypotension 3-12 hours early.",
      tech: ["PyTorch", "TCN", "Time-Series"],
      content: {
        problem:
          "ICU clinicians lack early warning systems for hemodynamic instability. Current monitoring is reactive, leading to delayed interventions for sudden hypotension.",
        solution:
          "With team BlueMind, we architected a Residual Causal Temporal Convolutional Network (TCN) integrated with Self-Attention. We engineered Zero Future Leakage protocols and Missingness Masks to handle irregular sampling in the PhysioNet dataset.",
        results:
          "Optimized training using a Weighted Focal Loss function to counter extreme ICU data imbalances, enabling accurate predictions 3-12 hours in advance.",
      },
    },
  ],

  experience: [
    {
      role: "AI Engineer",
      company: "Vantedge AI",
      date: "Dec 2024 - Dec 2025",
      desc: [
        "Built an XGBoost baseline for time-series monthly sales forecasting achieving an initial 86% accuracy.",
        "Upgraded the pipeline using an LSTM with attention mechanisms enhancing prediction accuracy to 91%.",
        "Collaborated with backend developers to deploy the final model into real-time prediction APIs.",
      ],
    },
    {
      role: "Moderator & Trainer",
      company: "iCodeGuru",
      date: "Aug 2025 - Present",
      desc: [
        "Led a 6-week Deep Learning course guiding 60+ students through complex AI concepts.",
        "Conducted a hands-on PyTorch workshop to deepen practical neural network skills for 35+ learners.",
        "Mentored peers on highly effective IELTS Academic preparation strategies.",
      ],
    },
  ],

  researchInterests: [
    {
      title: "Computer Vision & Multi-modal Architectures",
      desc: "Investigating hybrid CNN-Transformer models and dual-path vision systems for high-accuracy feature extraction in medical and agricultural imaging.",
    },
    {
      title: "Computational Neuroscience",
      desc: "Studying the intersection of biological intelligence and artificial neural networks to design more biologically plausible and efficient learning algorithms.",
    },
    {
      title: "Deep Learning from First Principles",
      desc: "Deriving mathematical formulations for core network components to identify limitations in current abstractions and engineer novel architectural mechanisms.",
    },
  ],

  education: [
    {
      school: "University of Okara",
      degree: "Bachelor of Science in Computer Science (BSCS)",
      address: "Okara, Pakistan",
      score: "CGPA: 3.32/4",
      start: "2021",
      end: "2025",
    },
    {
      school: "Govt. Graduate College, Okara",
      degree: "Intermediate in Computer Science (ICS)",
      address: "Okara, Pakistan",
      score: "Marks: 812/1100",
      start: "2019",
      end: "2021",
    },
  ],

  skills: {
    "Deep Learning": ["PyTorch", "TensorFlow", "Keras", "Computer Vision"],
    "Data & ML": [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-Learn",
      "OpenCV",
      "Matplotlib",
    ],
    "Backend & APIs": ["FastAPI", "NodeJS", "Express JS", "C++"],
    "Frontend & Tools": ["React.JS", "React Native", "Redux", "Docker", "Git"],
  },
};
