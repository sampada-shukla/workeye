import React, { useState, useEffect } from 'react';
import {useRef} from 'react';
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

import logoImage from "./assets/workeye.jpg";
import workeye_dashboard from "./assets/workeye_dashboard.png";
import members from "./assets/members.png";
import view_details_1 from "./assets/view_details_1.png";
import view_analytics from "./assets/view_analytics.png";
import application_usage from "./assets/application_usage.png";

import { TutorialVideo } from './TutorialVideo';
import { Footer} from './Footer';

type ScreenshotStyle = {
  bg: string
  border: string
  shadow: string
}

const getScreenshotStyle = (index: number) => {
  const GOLDEN_RATIO = 137.508
  const hue = (index * GOLDEN_RATIO) % 360

  return {
    bg: `hsl(${hue}, 85%, 96%)`,
    border: `hsl(${hue}, 70%, 55%)`,
    shadow: `hsla(${hue}, 70%, 55%, 0.25)`,
  }
}

const CONTAINER_CONFIG = {
  borderRadius: '1.5rem',
  padding: '0.5rem',
  aspectRatio: '16/9', 
  innerBorderRadius: '1rem',
}

const SCREENSHOT_CONFIG = {
  default: {
    objectFit: 'cover' as const,
    width: '100%',
    height: '100%',
  },
}

type TutorialStep = {
  number: number;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<any>;
  iconColor: string;
  image: string;
  details?: string[] | undefined;
}

type TutorialSection = {
  sectionId: number;
  sectionTitle: string;
  sectionDescription: string;
  steps: TutorialStep[];
};

export const tutorialSections: TutorialSection[] = [
  {
    sectionId: 1,
    sectionTitle: '1: Dashboard Overview',
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
    sectionTitle: '2: Individual Employee Analytics',
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
    sectionTitle: '3: Team & Member Management',
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

interface ScreenshotCardProps {
  step: TutorialStep;
  stepIndex: number;
  colorIndex: number;
  isHovered: boolean;
  onHover: (number: number | null) => void;
  isMobile: boolean;
}

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  step,
  stepIndex,
  colorIndex,
  isHovered,
  onHover,
  isMobile,
}) => {
  const boxStyle = getScreenshotStyle(colorIndex)
  const Icon = step.icon
  const screenshotStyle = SCREENSHOT_CONFIG.default
  const cardRef = useRef<HTMLDivElement | null>(null)
  

  return (
    <div
      onMouseEnter={() => onHover(step.number)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: stepIndex * 0.05,
          ease: 'easeOut',
        }}
        viewport={{ once: true, margin: '-50px', amount: 0.2 }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'visible',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          <div
  ref={cardRef}
  style={{
    background: boxStyle.bg,
    border: `2px solid ${boxStyle.border}`,
    borderRadius: CONTAINER_CONFIG.borderRadius,
    padding: CONTAINER_CONFIG.padding,
    boxShadow: `0 4px 12px ${boxStyle.shadow}`,
  }}
>

            <div
              style={{
                borderRadius: CONTAINER_CONFIG.innerBorderRadius,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: CONTAINER_CONFIG.aspectRatio,
                backgroundColor: '#f8f9fa',
              }}
            >
              <img
                src={step.image}
                alt={step.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Hover Tooltip */}
          {isHovered && (
  <motion.div
    initial={{ opacity: 0, scale: 0.96, y: isMobile ? 10 : 0 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.25 }}
    style={{
      position: isMobile ? 'relative' : 'fixed',

      /* MOBILE: same width as container */
      width: isMobile ? '92%' : '300px',
      maxWidth: '300px',

      /*  MOBILE positioning */
      left: isMobile ? '4%' : '42%',
      top: isMobile ? 'auto' : '35%',
      transform: isMobile ? 'none' : 'translate(-50%, -50%)',
      marginTop: isMobile ? '1rem' : '0',

      background: 'rgba(15, 23, 42, 0.97)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1.25rem',
      padding: '1.25rem',
      boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
      color: 'white',
      zIndex: isMobile ? 5 : 999999,
      pointerEvents: isMobile ? 'auto' : 'none',
    }}
  >
               <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '-12px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: step.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                }}
              >
                {step.number}
              </div>

              <div
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '0.625rem',
                  background: step.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <Icon color="white" size={20} />
              </div>

              <h4
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  lineHeight: '1.3',
                }}
              >
                {step.title}
              </h4>

              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: '1.5',
                  fontWeight: 400,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function TutorialPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      document.head.removeChild(link)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Responsive styles
  const heroGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1.1fr 0.9fr',
    gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
    alignItems: 'center',
  }

  const h1Style = {
    fontFamily: '"Poppins", sans-serif',
    fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
    fontWeight: 700,
    marginBottom: '1rem',
    lineHeight: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.625rem',
    letterSpacing: '-0.025em',
  }

  const h2Style = {
    fontFamily: '"Poppins", sans-serif',
    fontSize: isMobile ? '1.75rem' : isTablet ? '2rem' : '2.25rem',
    fontWeight: 700,
    color: 'rgb(20, 47, 83)',
    marginBottom: '0.65rem',
    lineHeight: isMobile ? '2.25rem' : isTablet ? '2.5rem' : '2.875rem',
  }

  const h3Style = {
    fontFamily: '"Poppins", sans-serif',
    fontSize: isMobile ? '1.5rem' : isTablet ? '1.75rem' : '1.75rem',
    fontWeight: 700,
    color: 'rgb(20, 47, 83)',
    marginBottom: '0.5rem',
    lineHeight: '1.3',
  }

  const cardsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(2, 1fr)',
    gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '4rem',
    alignItems: 'start',
  }

  const topRowGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr',
    gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '4rem',
    marginBottom: '4rem',
    alignItems: 'stretch',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #e0f7fa 0%, #ffffff 40%, #ffffff 100%)',
        position: 'relative',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(224,247,250,0.3) 0%, rgba(255,255,255,0) 50%)',
            opacity: 0.6,
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <section
          style={{
            padding: isMobile ? '2rem 1rem' : isTablet ? '2.5rem 1.5rem' : '3rem 1.5rem',
            minHeight: isMobile ? 'auto' : '500px',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #ecfeff 100%)',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: isMobile ? '0 1rem' : '0 1.5rem' }}>
            <div style={heroGridStyle}>
              {/* LEFT: Text Content */}
              <div style={{ maxWidth: isMobile ? '100%' : '650px' }}>
                <h1 style={h1Style}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <img 
                      src={logoImage} 
                      alt="WorkEye Logo" 
                      style={{ 
                        width: isMobile ? '5rem' : '7.5rem', 
                        height: isMobile ? '5rem' : '7.5rem', 
                        objectFit: 'contain' 
                      }} 
                    />
                  </div>

                  <span style={{ color: 'rgb(6, 182, 212)', fontWeight: 900 }}>Explore WorkEye</span>{' '}
                  <span style={{ color: '#0F172A' }}>with Detailed Step-by-Step Tutorials</span>
                </h1>

                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: isMobile ? '0.9375rem' : '1rem',
                    fontWeight: 400,
                    color: '#475569',
                    marginBottom: '1.5rem',
                    lineHeight: '1.625rem',
                  }}
                >
                  Learn how to streamline operations, boost productivity, and scale faster with comprehensive tutorials
                  covering setup, configuration, and advanced features.
                </p>

                {/* Feature List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature) => (
                    <div
                      key={feature}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                      <div
                        style={{
                          width: isMobile ? '1.75rem' : '2.25rem',
                          height: isMobile ? '1.75rem' : '2.25rem',
                          borderRadius: '0.5rem',
                          background: 'rgba(6, 182, 212, 0.15)',
                          border: '2px solid rgb(6, 182, 212)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle style={{ width: isMobile ? '1rem' : '1.25rem', height: isMobile ? '1rem' : '1.25rem', color: 'rgb(6, 182, 212)' }} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: isMobile ? '0.9375rem' : '1rem',
                          fontWeight: 500,
                          color: '#475569',
                          lineHeight: '1.625rem',
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

           {/* RIGHT: Video Card */}
<motion.div
  style={{ 
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center',
    marginTop: isMobile ? '1.5rem' : '0' 
  }}
  animate={{ y: isMobile ? 0 : [0, -12, 0] }}
  transition={{
    duration: 3,
    repeat: isMobile ? 0 : Infinity,
    ease: 'easeInOut',
  }}
>
  <div style={{
    width: '100%',
    maxWidth: isMobile ? '400px' : 'none', 
    aspectRatio: isMobile ? '1/1' : '16/9', 
    overflow: 'hidden',
    borderRadius: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }}>
    <TutorialVideo />
                </div>
              </motion.div>
            </div> 
          </div> 
        </section>

        {/* Tutorial Section Header */}
        <section
          style={{ 
            padding: isMobile ? '1.5rem 1rem' : '2rem 1.5rem 1.5rem', 
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)' 
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', padding: isMobile ? '0 1rem' : '0 1.5rem' }}>
            <h2 style={h2Style}>
              Complete Step-by-Step Guide
            </h2>

            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: isMobile ? '0.9375rem' : '1rem',
                color: '#475569',
                maxWidth: '720px',
                margin: '0 auto',
                lineHeight: '1.625rem',
                fontWeight: 400,
              }}
            >
              Master WorkEye with our comprehensive guide covering every feature from sign-up to advanced functionality
            </p>
          </div>
        </section>

        {/* Tutorial Cards Section */}
        <section style={{ padding: isMobile ? '1rem' : '1.5rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 1rem' : '0 1.5rem' }}>
            {/* Top Row: Section 1 + Section 2 Step 2 */}
            <div style={topRowGridStyle}>
              {/* Section 1 */}
              {(() => {
                const section1 = tutorialSections.find(s => s.sectionId === 1)!
                const step1 = section1.steps[0]

                return (
                  <div key="section1" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem', minHeight: isMobile ? 'auto' : '120px' }}>
                      <h3 style={h3Style}>
                        {section1.sectionTitle}
                      </h3>
                      <p
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: isMobile ? '0.875rem' : '0.9375rem',
                          color: '#64748b',
                          lineHeight: '1.6',
                        }}
                      >
                        {section1.sectionDescription}
                      </p>
                    </div>

                    <div style={{ flex: 1 }}>
                      <ScreenshotCard
                        step={step1}
                        stepIndex={0}
                        colorIndex={step1.number}
                        isHovered={hoveredCard === step1.number}
                        onHover={setHoveredCard}
                        isMobile={isMobile}
                      />
                    </div>
                  </div>
                )
              })()}

              {/* Section 2 Step 2 */}
              {(() => {
                const section2 = tutorialSections.find(s => s.sectionId === 2)!
                const step2 = section2.steps.find(s => s.number === 2)!

                return (
                  <div key="section2-step2" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem', minHeight: isMobile ? 'auto' : '120px' }}>
                      <h3 style={h3Style}>
                        {section2.sectionTitle}
                      </h3>
                      <p
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: isMobile ? '0.875rem' : '0.9375rem',
                          color: '#64748b',
                          lineHeight: '1.6',
                        }}
                      >
                        {section2.sectionDescription}
                      </p>
                    </div>

                    <div style={{ flex: 1 }}>
                      <ScreenshotCard
                        step={step2}
                        stepIndex={0}
                        colorIndex={step2.number}
                        isHovered={hoveredCard === step2.number}
                        onHover={setHoveredCard}
                        isMobile={isMobile}
                      />
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Section 2 Remaining Steps */}
            {(() => {
              const section2 = tutorialSections.find(s => s.sectionId === 2)!
              const remainingSteps = section2.steps.filter(s => s.number !== 2)

              return (
                <div key="section2-remaining" style={{ marginBottom: '3rem' }}>
                  <div style={cardsGridStyle}>
                    {remainingSteps.map((step, stepIndex) => (
                      <ScreenshotCard
                        key={step.number}
                        step={step}
                        stepIndex={stepIndex}
                        colorIndex={step.number}
                        isHovered={hoveredCard === step.number}
                        onHover={setHoveredCard}
                        isMobile={isMobile}
                      />
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Remaining Sections */}
            {tutorialSections
              .filter(section => section.sectionId !== 1 && section.sectionId !== 2)
              .map((section) => {
                const stepsToRender = section.steps
                if (stepsToRender.length === 0) return null

                const isSingleCard = stepsToRender.length === 1

                return (
                  <div key={section.sectionId} style={{ marginBottom: '3rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3 style={h3Style}>
                        {section.sectionTitle}
                      </h3>
                      <p
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: isMobile ? '0.875rem' : '0.9375rem',
                          fontWeight: 400,
                          color: '#64748b',
                          lineHeight: '1.6',
                        }}
                      >
                        {section.sectionDescription}
                      </p>
                    </div>

                    <div style={isSingleCard ? {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    } : cardsGridStyle}>
                      {stepsToRender.map((step, stepIndex) => (
                        <div 
                          key={step.number}
                          style={isSingleCard ? {
                            width: isMobile ? '100%' : isTablet ? '80%' : '50%',
                            maxWidth: '100%',
                          } : {}}
                        >
                          <ScreenshotCard
                            step={step}
                            stepIndex={stepIndex}
                            colorIndex={step.number}
                            isHovered={hoveredCard === step.number}
                            onHover={setHoveredCard}
                            isMobile={isMobile}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        </section>

        {/* CTA Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
            marginBottom: '2rem',
            padding: isMobile ? '0 1rem' : '0',
          }}
        >
          <button
            onClick={() => (window.location.href = 'https://frontend-8x7e.onrender.com/')}
            style={{
              fontFamily: '"Poppins", sans-serif',
              padding: isMobile ? '1rem 2rem' : '1.25rem 3.5rem',
              background: 'rgb(30, 41, 59)',
              color: 'white',
              borderRadius: '1rem',
              border: 'none',
              fontSize: isMobile ? '0.9375rem' : '1rem',
              fontWeight: 500,
              lineHeight: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              width: isMobile ? '100%' : 'auto',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgb(15, 23, 42)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgb(30, 41, 59)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Go to Dashboard
            <ArrowRight style={{ width: isMobile ? '1.25rem' : '1.6rem', height: isMobile ? '1.25rem' : '1.6rem' }} />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  )
}
