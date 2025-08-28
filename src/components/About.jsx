import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Split heading into letters for animation
  const heading1 = "FRONTEND";
  const heading2 = "DEVELOPER *";

  return (
    <AboutContainer 
      id='about' 
      className="about-container"
      ref={ref}
    >
      <HeadingStack className="heading-stack">
        <AnimatedHeading className="about-heading">
          {heading1.split("").map((char, i) => (
            <LetterSpan 
              key={`h1-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                delay: i * 0.02,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            >
              {char}
            </LetterSpan>
          ))}
        </AnimatedHeading>
        
        <AnimatedHeading className="about-heading">
          {heading2.split("").map((char, i) => (
            <LetterSpan 
              key={`h2-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                delay: (i + heading1.length) * 0.02,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            >
              {char}
            </LetterSpan>
          ))}
        </AnimatedHeading>
      </HeadingStack>

      <ContentSections className="about-sections">
        {[
          {
            title: "DISCOVER AND ANALYSIS",
            text: "Good development goes beyond functionality—it defines user experience. I begin by understanding your requirements through research and collaboration, ensuring every technical decision serves a purpose."
          },
          {
            title: "DESIGN AND IMPLEMENT",
            text: "Creativity meets clean code. From responsive interfaces to scalable components, I ensure consistency across layouts and interactions, delivering solutions that enhance engagement and performance."
          },
          {
            title: "DELIVER AND MONITOR",
            text: "Development is more than deployment—it's about real-world impact. I oversee smooth launches, optimizing every detail for functionality and user experience, so your product doesn't just work—it excels."
          }
        ].map((section, index) => (
          <ContentSection 
            key={index}
            className="about-section"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              delay: 0.2 + index * 0.15,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <SectionContent className="section-content">
              <SectionTitle
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ 
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                  duration: 0.6
                }}
              >
                {section.title}
              </SectionTitle>
              <SectionText
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ 
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                  duration: 0.6
                }}
              >
                {section.text}
              </SectionText>
            </SectionContent>
            <BulletPoints 
              className="bullet-points"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ 
                delay: 0.6 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
                duration: 0.5
              }}
            >
              ● ●
            </BulletPoints>
          </ContentSection>
          
        ))}
      </ContentSections>
    </AboutContainer>
  );
};

// Styled components
const AboutContainer = styled(motion.section)`
  max-width: 1200px;
  margin: 15vh auto;
  padding: 1rem 2.2rem;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  overflow: hidden;
`;

const HeadingStack = styled.div`
  margin-bottom: 4rem;
`;

const AnimatedHeading = styled(motion.h1)`
  display: block;
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const LetterSpan = styled(motion.span)`
  display: inline-block;
  will-change: transform, opacity;
`;

const ContentSections = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 0;
`;

const ContentSection = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }
`;

const SectionContent = styled.div`
  flex: 1;
  max-width: 800px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
  will-change: transform, opacity;
`;

const SectionText = styled(motion.p)`
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 300;
  opacity: 0.9;
  will-change: transform, opacity;
`;

const BulletPoints = styled(motion.div)`
  font-size: 1.2rem;
  letter-spacing: 0.3rem;
  padding-top: 0.5rem;
  margin-left: 1rem;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 0;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }
`;

export default About;