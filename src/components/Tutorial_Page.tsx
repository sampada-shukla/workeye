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
// Container dimensions - keeps all cards equal size
const CONTAINER_CONFIG = {
  borderRadius: '1.5rem',
  padding: '0.5rem',
  aspectRatio: '16/9', 
  innerBorderRadius: '1rem',
}

// Screenshot sizing - controls how images fit in containers
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
  //layout?: 'portrait' | 'landscape';
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
}

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  step,
  stepIndex,
  colorIndex,
  isHovered,
  onHover,
}) => {
  const boxStyle = getScreenshotStyle(colorIndex)
  const Icon = step.icon

  // Get screenshot config for this specific step
  const screenshotStyle =  SCREENSHOT_CONFIG.default

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
          {/* Colored Container */}
          <div
            style={{
              background: boxStyle.bg,
              border: `2px solid ${boxStyle.border}`,
              borderRadius: CONTAINER_CONFIG.borderRadius,
              padding: CONTAINER_CONFIG.padding,
              boxShadow: `0 4px 12px ${boxStyle.shadow}`,
            }}
          >
            {/* Screenshot Container with Fixed Aspect Ratio */}
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
                  
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Hover Tooltip */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: '20%',
                left: '44%',
                transform: 'translateX(-50%,-50%)',
                width: '360px',
                background: 'rgba(15, 23, 42, 0.97)',
                backdropFilter: 'blur(12px)',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                color: 'white',
                zIndex: 999999,
                pointerEvents: 'none',
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
                  fontFamily: '"Poppins", sans-serif',
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
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '17px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  lineHeight: '1.3',
                }}
              >
                {step.title}
              </h4>

              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '13px',
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

/* ============================================
   MAIN COMPONENT
============================================ */

export default function TutorialPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

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
            padding: '3rem 1.5rem',
            minHeight: '500px',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #ecfeff 100%)',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 1.5rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: '3rem',
                alignItems: 'center',
              }}
            >
              
              {/* LEFT: Text Content */}
              <div style={{ maxWidth: '650px' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '48px',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    lineHeight: '58px',
                    letterSpacing: '-0.025em',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <img src={logoImage} alt="MeetHub Logo" style={{ width: '7.5rem', height: '7.5rem', objectFit: 'contain' }} />
                  </div>

                  <span style={{ color: 'rgb(6, 182, 212)', fontWeight: 900 }}>Explore MeetHub</span>{' '}
                  <span style={{ color: '#0F172A' }}>with Detailed Step-by-Step Tutorials</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#475569',
                    marginBottom: '1.5rem',
                    lineHeight: '26px',
                  }}
                >
                  Learn how to streamline operations, boost productivity, and scale faster with comprehensive tutorials
                  covering setup, configuration, and advanced features.
                </motion.p>

                {/* Feature List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                >
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
                    >
                      <div
                        style={{
                          width: '2.25rem',
                          height: '2.25rem',
                          borderRadius: '0.5rem',
                          background: 'rgba(6, 182, 212, 0.15)',
                          border: '2px solid rgb(6, 182, 212)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: 'rgb(6, 182, 212)' }} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#475569',
                          lineHeight: '26px',
                        }}
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT: Enhanced Video Card */}
              <motion.div
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <TutorialVideo />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tutorial Section Header */}
        <section
          style={{ padding: '2rem 1.5rem 1.5rem', background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem' }}>
            <h2
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '36px',
                fontWeight: 700,
                color: 'rgb(20, 47, 83)',
                marginBottom: '0.65rem',
                lineHeight: '46px',
              }}
            >
              Complete Step-by-Step Guide
            </h2>

            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                color: '#475569',
                maxWidth: '720px',
                margin: '0 auto',
                lineHeight: '26px',
                fontWeight: 400,
              }}
            >
              Master MeetHub with our comprehensive guide covering every feature from sign-up to advanced functionality
            </p>
          </div>
        </section>

          {/* Tutorial Cards Section */}
        <section style={{ padding: '1.5rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            {/* =========================
                Top Row: Section 1 + Section 2 Step 2
            ========================= */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2.5rem',
                marginBottom: '3rem',
                alignItems: 'stretch',
              }}
            >
              {/* LEFT → Section 1 Step 1 */}
              {(() => {
                const section1 = tutorialSections.find(s => s.sectionId === 1)!
                const step1 = section1.steps[0]

                return (
                  <div key="section1" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem', minHeight: '120px' }}>
                      <h3
                        style={{
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: '28px',
                          fontWeight: 700,
                          color: 'rgb(20, 47, 83)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {section1.sectionTitle}
                      </h3>
                      <p
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '15px',
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
                      />
                    </div>
                  </div>
                )
              })()}

              {/* RIGHT → Section 2 Step 2 */}
              {(() => {
                const section2 = tutorialSections.find(s => s.sectionId === 2)!
                const step2 = section2.steps.find(s => s.number === 2)!

                return (
                  <div key="section2-step2" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1.5rem', minHeight: '120px' }}>
                      <h3
                        style={{
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: '28px',
                          fontWeight: 700,
                          color: 'rgb(20, 47, 83)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {section2.sectionTitle}
                      </h3>
                      <p
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '15px',
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
                      />
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* =========================
                Section 2 Remaining Steps (3-8)
            ========================= */}
            {(() => {
              const section2 = tutorialSections.find(s => s.sectionId === 2)!
              const remainingSteps = section2.steps.filter(s => s.number !== 2)

              return (
                <div key="section2-remaining" style={{ marginBottom: '3rem' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '3rem',
                      alignItems: 'start',
                    }}
                  >
                    {remainingSteps.map((step, stepIndex) => (
                      <ScreenshotCard
                        key={step.number}
                        step={step}
                        stepIndex={stepIndex}
                        colorIndex={step.number}
                        isHovered={hoveredCard === step.number}
                        onHover={setHoveredCard}
                      />
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* =========================
                Render remaining sections (skip Section 1 and 2)
            ========================= */}
            {tutorialSections
              .filter(section => section.sectionId !== 1 && section.sectionId !== 2)
              .map((section) => {
                const stepsToRender = section.steps
                if (stepsToRender.length === 0) return null

                const isMultiCard = stepsToRender.length > 1
                const gridCols = 'repeat(2, 1fr)' // Always use 2-column grid
                const gridStyle = isMultiCard ? {} : { gridTemplateColumns: 'repeat(2, 1fr)' }

                return (
                  <div key={section.sectionId} style={{ marginBottom: '3rem' }}>
                    {/* Section Header */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3
                        style={{
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: '28px',
                          fontWeight: 700,
                          color: 'rgb(20, 47, 83)',
                          lineHeight: '1.3',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {section.sectionTitle}
                      </h3>
                      <p
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '15px',
                          fontWeight: 400,
                          color: '#64748b',
                          lineHeight: '1.6',
                        }}
                      >
                        {section.sectionDescription}
                      </p>
                    </div>

                    {/* Cards Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: gridCols,
                        gap: '3rem',
                        alignItems: 'start',
                      }}
                    >
                      {stepsToRender.map((step, stepIndex) => (
                        <div key={step.number} style={isMultiCard ? {} : { gridColumn: '1 / -1', maxWidth: '50%', margin: '0 auto', width: '100%' }}>
                          <ScreenshotCard
                            step={step}
                            stepIndex={stepIndex}
                            colorIndex={step.number}
                            isHovered={hoveredCard === step.number}
                            onHover={setHoveredCard}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
     


        {/* CTA SECTION */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
            marginBottom: '2rem',
          }}
        >
          <button
            onClick={() => (window.location.href = 'https://meethub.biz/2b1a38e0-f87c-4069-b8c6-4ed44e42d739/dashboard')}
            style={{
              fontFamily: '"Poppins", sans-serif',
              padding: '1.25rem 3.5rem',
              background: 'rgb(30, 41, 59)',
              color: 'white',
              borderRadius: '1rem',
              border: 'none',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
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
            <ArrowRight style={{ width: '1.6rem', height: '1.6rem' }} />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  )
}
