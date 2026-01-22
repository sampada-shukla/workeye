import React, { useState } from 'react';
import {
  BarChart3,
  LayoutDashboard,
  Play,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Users,
  Monitor,
  UserCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';


import logoImage from "./assets/workeye.jpg";
import workeye_dashboard from "./assets/workeye_dashboard.png";
import members from "./assets/members.png";
import view_details_1 from "./assets/view_details_1.png";
import view_analytics from "./assets/view_analytics.png";
import application_usage from "./assets/application_usage.png";


import { TutorialVideo } from './TutorialVideo';
import { Footer} from './Footer';

const screenshotBoxStyles = [
  {
    bg: '#e0ecff',     
    border: '#3b82f6',
    shadow: 'rgba(59,130,246,0.25)',
  },
  {
    bg: '#dcf7e6',     
    border: '#22c55e',
    shadow: 'rgba(34,197,94,0.25)',
  },
  {
    bg: '#ffedd5',     
    border: '#fb923c',
    shadow: 'rgba(251,146,60,0.25)',
  },
  {
    bg: '#ede9fe',     
    border: '#8b5cf6',
    shadow: 'rgba(139,92,246,0.25)',
  },
];

export const tutorialSections = [
  {
    sectionId: 1,
    sectionTitle: '📊 1: Dashboard Overview',
    sectionDescription:
      'Monitor team productivity, activity status, and performance metrics from a centralized real-time dashboard.',
    steps: [
      {
        number: 1,
        title: 'Admin Dashboard',
        description:
          'Displays comprehensive overview including total employees, active members, average screen time, productivity metrics, peak hours, and automated screenshot counts with advanced filtering options.',
        icon: LayoutDashboard,
        iconColor: 'rgb(99, 102, 241)',
        image: workeye_dashboard, 
      },
    ],
  },

  {
    sectionId: 2,
    sectionTitle: '👤 2: Individual Employee Analytics',
    sectionDescription:
      'Deep dive into individual employee performance with detailed analytics, activity logs, and productivity insights.',
    steps: [
      {
        number: 2,
        title: 'Employee Overview Dashboard',
        description:
          'After clicking on View Details, view individual employee profile with current status, screen time breakdown (7h 30m), active time percentage (91%), idle time (42m), and productivity rating with real-time analytics.',
        icon: UserCheck,
        iconColor: 'rgb(34, 197, 94)',
        image: view_details_1, 
        
      },
      {
        number: 3,
        title: 'Analytics Dashboard',
        description:
          'On clicking View Analytics, comprehensive activity analysis showing current screen time, active time percentage, productivity metrics, quick analytics summary, and navigation guide for reports including application usage breakdown and historical trends is displayed',
        icon: BarChart3,
        iconColor: 'rgb(79, 70, 229)',
        image: view_analytics, 
        
      },
      {
        number: 4,
        title: 'Application Usage Analysis',
        description:
          'Track time spent on different applications with detailed breakdown for last 30 days showing total time (0.0h), apps used (0), most used applications, and top app time metrics.',
        icon: Monitor,
        iconColor: 'rgb(249, 115, 22)',
        image: application_usage, 
      },
    ],
  },

  {
    sectionId: 3,
    sectionTitle: '🧑‍💼 3: Team & Member Management',
    sectionDescription:
      'Set up and manage your team members, control access, and configure employee accounts for monitoring.',
    steps: [
      {
        number: 5,
        title: 'Members Management',
        description:
          'Add, manage, and organize team members. View total members (0), active (0), and inactive (0) status. Add your first member to get started with employee tracking and monitoring.',
        icon: Users,
        iconColor: 'rgb(59, 130, 246)',
        image: members, 
      },
    ],
  },
]
export default function TutorialPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: number]: number }>({});
  const [popupSide, setPopupSide] = useState('right');


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => {
        const updated = { ...prev };
        tutorialSections.forEach((section) => {
          section.steps.forEach((step) => {
            if (step.multiImages && step.images) {
              const currentIndex = updated[step.number] ?? 0;
              updated[step.number] = (currentIndex + 1) % step.images.length;
            }
          });
        });
        return updated;
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'white', position: 'relative' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, white, rgb(236, 254, 255), white)', opacity: 0.8 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section with Left-Right Layout */}
        <section style={{ padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.2fr 1fr', 
              gap: '6rem', 
              alignItems: 'center' 
            }}>
              {/* LEFT: Text Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <img src={logoImage} alt="work Eye Logo" style={{ width: '7.5rem', height: '7.5rem', objectFit: 'contain' }} />
                </div>
                
                <h1 style={{ fontSize: '3.25rem', fontWeight: 800,marginBottom: '1.5rem',lineHeight: '1.1',letterSpacing: '-0.02em' }}>
                  <span style={{ color: 'rgb(6, 182, 212)',fontWeight: 900 }}>Explore Work Eye</span>{' '}
                  <span style={{ color: 'rgb(30, 41, 59)' }}>with Detailed Step-by-Step Tutorials</span>
                </h1>
                
                <p style={{ fontSize: '1.25rem',color: 'rgb(75, 85, 99)',marginBottom: '2rem',lineHeight: '1.7',maxWidth: '42rem' }}>
                  Learn how to streamline operations, boost productivity, and scale faster with comprehensive tutorials covering setup, configuration, and advanced features.
                </p>

                {/* Feature List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: 'rgb(6, 182, 212)', flexShrink: 0 }} />
                      <span style={{ fontSize: '1.1rem', color: 'rgb(55, 65, 81)' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Video Card */}
<motion.div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }}
  animate={{ y: [0, -14, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
  <div
    style={{
      background: 'white',
      borderRadius: '1.75rem',
      boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      border: '1px solid rgb(243, 244, 246)',
      width: '100%',
      maxWidth: '640px', // 🔥 INCREASED SIZE
    }}
  >
    {/* VIDEO PREVIEW */}
    <div
      style={{
        position: 'relative',
        height: '300px', // 🔥 TALLER VIDEO AREA
        background:
          'linear-gradient(to bottom right, rgb(219, 234, 254), rgb(207, 250, 254))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              width: '5.5rem',
              height: '5.5rem',
              background: 'rgb(6, 182, 212)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: 'none',
              cursor: 'pointer',
              margin: '0 auto 1.75rem',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgb(8, 145, 178)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgb(6, 182, 212)')
            }
          >
            <Play
              style={{
                width: '2.75rem',
                height: '2.75rem',
                color: 'white',
                marginLeft: '0.25rem',
              }}
              fill="white"
            />
          </button>

          <p
            style={{
              marginTop: '1.25rem',
              color: 'rgb(55, 65, 81)',
              fontWeight: 600,
              fontSize: '1.15rem',
            }}
          >
            Getting Started with Work Eye
          </p>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgb(107, 114, 128)',
              marginTop: '0.25rem',
            }}
          >
            Duration: 5:32
          </p>
        </div>
      </div>
    </div>

    {/* VIDEO INFO */}
    <div style={{ padding: '2.25rem' }}>
      <h3
        style={{
          fontSize: '1.5rem',
          color: 'rgb(30, 41, 59)',
          marginBottom: '0.75rem',
          fontWeight: 700,
        }}
      >
        Welcome to Work Eye Tutorial
      </h3>

      <p
        style={{
          color: 'rgb(75, 85, 99)',
          marginBottom: '1.75rem',
          lineHeight: '1.65',
        }}
      >
        Learn how to set up your account, configure tracking parameters, and
        start monitoring your assets in just a few minutes.
      </p>

      <button
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          background: 'rgb(30, 41, 59)',
          color: 'white',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 12px 18px -6px rgba(0, 0, 0, 0.15)',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgb(15, 23, 42)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgb(30, 41, 59)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Watch Full Tutorial Series
        <ExternalLink style={{ width: '1.25rem', height: '1.25rem' }} />
      </button>
    </div>
  </div>
</motion.div>
 </div>
          </div>
        </section>
        {/* Tutorial Section Header */}
<section
  style={{
    padding: '3rem 1rem 2.5rem',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)',
  }}
>
  <div
    style={{
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'center',
    }}
  >
    <h2
      style={{
        fontSize: '2.4rem',
        fontWeight: 800,
        color: '#0f172a',
        marginBottom: '0.75rem',
      }}
    >
      Complete Step-by-Step Tutorial
    </h2>

    <p
      style={{
        fontSize: '1rem',
        color: '#475569',
        maxWidth: '720px',
        margin: '0 auto',
        lineHeight: 1.6,
      }}
    >
      Master Work Eye with our comprehensive guide covering every feature
      from sign-up to advanced functionality
    </p>
  </div>
</section>
<section style={{ padding: '3rem 1rem' }}>
  <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
    {tutorialSections.map((section) => (
      <div key={section.sectionId} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1e293b' }}>
          {section.sectionTitle}
        </h3>
        <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
          {section.sectionDescription}
        </p>

        <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', // 🔥 2 per row
    columnGap: '4rem',
    rowGap: '5rem',
    paddingTop: '3rem',
    paddingInline: '2rem',
    alignItems: 'center',
  }}
>


  {section.steps.map((step, stepIndex) => {
    const Icon = step.icon;
    const isHovered = hoveredCard === step.number;
    const boxStyle = screenshotBoxStyles[stepIndex % screenshotBoxStyles.length]
    const isSingleItem = section.steps.length === 1;


    const images = step.multiImages ? step.images : [step.image];
    const isSingleImage = !step.multiImages;

    return (
      <div
        key={step.number}
        onMouseEnter={() => setHoveredCard(step.number)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          position: 'relative',
          width: 'auto',
          flex: '1 1 0',
          minWidth: '420px',
          perspective: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Staggered Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.7, 
            delay: (stepIndex * 0.12),
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: false, margin: '-80px', amount: 0.3 }}
          style={{ height: '100%' }}
        >
          {/* 🔥 ADD THIS WRAPPER HERE */}
<div
  style={{
    position: 'relative',
    overflow: 'visible',
  }}
></div>

        <motion.div
          animate={{
            rotateY: isHovered ? -8 : 0,
            rotateX: isHovered ? 4 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          style={{
            borderRadius: 0,
            overflow: 'visible',
            boxShadow: 'none',
              //? '0 40px 80px rgba(0,0,0,0.55)'
              //: '0 25px 50px rgba(0,0,0,0.35)',
            //background: '#000',
            //border: '8px solid #000',
          }}
        >
          <div
  style={{
    background: boxStyle.bg,
    border: `2px solid ${boxStyle.border}`,
    borderRadius: '1.75rem',
    padding: '1.25rem',
    boxShadow: `0 8px 20px ${boxStyle.shadow}`,
  }}
>
  {/* ❌ REMOVE white background */}
  <div
    style={{
      borderRadius: '1.1rem',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <motion.img
      src={step.image}
      alt={step.title}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        width: '97%',          
        height: 'auto',
        display: 'block',
        objectFit: 'cover',
        background: 'transparent',
      }}
    />
  </div>
</div>

        {/* Carousel Navigation Dots - Removed, now fully automatic */}
        </motion.div>


        {/* 🟨 POPUP DESCRIPTION */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '320px',
              background: 'rgba(15, 23, 42, 0.95)',
              //backdropFilter: 'blur(12px)',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
              color: 'white',
              zIndex: 99999,
              pointerEvents: 'none',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
            }}
          >
            {/* 🔢 STEP NUMBER BADGE */}
    <div
      style={{
        position: 'absolute',
        top: '-14px',
        left: '-14px',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: step.iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.05rem',
        fontWeight: 800,
        color: 'white',
        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
      }}
    >
      {step.number}
    </div>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: step.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <Icon color="white" size={22} />
            </div>

            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              {step.title}
            </h4>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
              }}
            >
              {step.description}
            </p>

            {step.details && (
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1rem' }}>
                {step.details.map((d, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.75)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
        </motion.div>
      </div>
    );
  })}
</div>
 </div>    
))}
  </div>
</section>
           
{/* CTA SECTION */}
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
  }}
>
  <button
    onClick={() =>
      (window.location.href =
        'https://frontend-8x7e.onrender.com/')
    }
    style={{
      padding: '1.25rem 3.5rem',   
      background: 'rgb(30, 41, 59)',
      color: 'white',
      borderRadius: '1rem',        
      border: 'none',
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.3,             
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
      transition: 'all 0.3s',
      whiteSpace: 'nowrap',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgb(15, 23, 42)';
      e.currentTarget.style.transform = 'scale(1.04)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgb(30, 41, 59)';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    Go to Dashboard
    <ArrowRight style={{ width: '1.6rem', height: '1.6rem' }} />
  </button>
</div>
<Footer/>
</div>


      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}