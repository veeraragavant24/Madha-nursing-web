import { useState, useEffect } from 'react'
import './Chatbot.css'

type ChatbotProps = {
  navigate?: (page: string) => void
}

type Message = {
  id: number
  sender: 'user' | 'bot'
  text: string
}


type Option = {
  id: string
  label: string
}
type ChatStep =
  | 'main'
  | 'admission'
  | 'departments'
  | 'courses'
  | 'course-actions'
  | 'campus'
  | 'student-facilities'
  | 'about-college'
  | 'about-detail'
  | 'contact'
  | 'contact-detail'

type CourseId =
  | 'bsc-nursing'
  | 'pb-bsc-nursing'
  | 'msc-nursing'

const mainOptions: Option[] = [
  {
    id: 'admission',
    label: 'Application & Admission Process',
  },
  {
    id: 'courses',
    label: 'Courses',
  },
  {
    id: 'campus',
    label: 'Campus & Facilities',
  },
  {
    id: 'departments',
    label: 'Departments',
  },
  {
    id: 'about',
    label: 'About College',
  },
  {
    id: 'contact',
    label: 'Contact Information',
  },
]

const courseOptions: Option[] = [
  {
    id: 'bsc-nursing',
    label: 'B.Sc. Nursing',
  },
  {
    id: 'pb-bsc-nursing',
    label: 'P.B.B.Sc. Nursing',
  },
  {
    id: 'msc-nursing',
    label: 'M.Sc. Nursing',
  },
]

const courseActionOptions: Option[] = [
  {
    id: 'course-details',
    label: 'Course Details',
  },
  {
    id: 'course-fee',
    label: 'Fee Structure',
  },
  {
    id: 'course-eligibility',
    label: 'Eligibility',
  },
 
  
]
// =====================================================
// DEPARTMENT OPTIONS
// =====================================================

const departmentOptions: Option[] = [
  {
    id: 'medical-surgical-nursing',
    label: 'Medical Surgical Nursing',
  },
  {
    id: 'pediatric-nursing',
    label: 'Pediatric Nursing',
  },
  {
    id: 'community-health-nursing',
    label: 'Community Health Nursing',
  },
  {
    id: 'obstetrics-gynecological-nursing',
    label: 'Obstetrics & Gynecological Nursing',
  },
  {
    id: 'psychiatric-nursing',
    label: 'Psychiatric Nursing',
  },
  {
    id: 'nursing-research',
    label: 'Nursing Research',
  },
]

// =====================================================
// ABOUT COLLEGE OPTIONS
// =====================================================

const aboutCollegeOptions: Option[] = [
  {
    id: 'our-story-mission',
    label: 'Our Story & Our Mission',
  },
  {
    id: 'our-journey',
    label: 'Our Journey',
  },
  {
    id: 'achievements',
    label: 'Achievements',
  },
]

// =====================================================
// CONTACT INFORMATION OPTIONS
// =====================================================

const contactOptions: Option[] = [
  {
    id: 'phone',
    label: 'Phone',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'address',
    label: 'Address',
  },
  {
    id: 'google-maps',
    label: 'Google Maps',
  },
  {
    id: 'admission-office',
    label: 'Admission Office',
  },
]


const studentFacilitiesOptions: Option[] = [
  {
    id: 'hostel',
    label: 'Hostel',
  },
  {
    id: 'transport',
    label: 'Transport',
  },
]

// =====================================================
// CAMPUS & FACILITIES OPTIONS
// =====================================================

const campusOptions: Option[] = [
  {
    id: 'academic-facilities',
    label: 'Academic Facilities',
  },
  {
    id: 'learning-spaces',
    label: 'Learning Spaces',
  },
  {
    id: 'nursing-education',
    label: 'Nursing Education Facilities',
  },
  {
    id: 'practical-learning',
    label: 'Practical Learning Facilities',
  },
  {
    id: 'student-facilities',
    label: 'Student Facilities',
  },
]



export default function Chatbot({ navigate }: ChatbotProps) {
    const [isOpen, setIsOpen] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! 👋\nI’m MCON AI Assistant. How can I help you today?',
    },
  ])

  const [isTyping, setIsTyping] = useState(false)

  const [chatStep, setChatStep] =
    useState<ChatStep>('main')

  const [selectedCourse, setSelectedCourse] =
    useState<CourseId | null>(null)
const [selectedCourseActions, setSelectedCourseActions] =
  useState<string[]>([])
  const [isCampusDetail, setIsCampusDetail] = useState(false)
  const [isDepartmentDetail, setIsDepartmentDetail] = useState(false)

  const [selectedDepartmentOptions, setSelectedDepartmentOptions] =
    useState<string[]>([])
  const [selectedCampusOptions, setSelectedCampusOptions] =
    useState<string[]>([])
  const [selectedStudentFacilityOptions, setSelectedStudentFacilityOptions] =
    useState<string[]>([])

  const [previousStep, setPreviousStep] =
    useState<ChatStep>('main')

// =====================================================
// SMOOTH AUTO SCROLL CHATBOT
// =====================================================

useEffect(() => {
  const chatbotMessages = document.querySelector(
    '.madha-chatbot-messages'
  ) as HTMLElement | null

  if (!chatbotMessages) return

  const timer = window.setTimeout(() => {
    chatbotMessages.scrollTo({
      top: chatbotMessages.scrollHeight,
      behavior: 'smooth',
    })
  }, 150)

  return () => {
    window.clearTimeout(timer)
  }
}, [messages, chatStep, selectedCourseActions])
   
  // =====================================================
  // ADD USER MESSAGE
  // =====================================================

  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text,
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
    ])
  }

  // =====================================================
  // ADD BOT MESSAGE
  // =====================================================

  const addBotMessage = (
    text: string,
    delay = 700
  ) => {
    setIsTyping(true)

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text,
      }

      setMessages((prev) => [
        ...prev,
        botMessage,
      ])

      setIsTyping(false)
    }, delay)
  }

  // =====================================================
  // MAIN OPTION CLICK
  // =====================================================

  const handleMainOption = (option: Option) => {
    if (isTyping) return

    addUserMessage(option.label)

    if (option.id === 'courses') {
  setChatStep('courses')
  setSelectedCourseActions([])
  setIsCampusDetail(false)
  setIsDepartmentDetail(false)

      addBotMessage(
        `Sure! 🎓

I can help you with our nursing programmes.

Please select your course:`
      )

      return
    }

   if (option.id === 'admission') {
  setChatStep('admission')

  addBotMessage(
    `Application & Admission Process

The admission process generally follows these steps:

Step 1 — Application
Submit the admission application form.

Step 2 — Eligibility Verification
The college verifies the applicant's eligibility.

Step 3 — Document Verification
Submit the required documents for verification.

Step 4 — Admission Confirmation
After successful verification, the admission will be confirmed.

Step 5 — Fee Payment
Complete the applicable admission and tuition fee payment.

For admission enquiries and the latest application information,
please use the option below.`
  )

  return
}

    if (option.id === 'campus') {
  setChatStep('campus')
  setIsCampusDetail(false)
  setIsDepartmentDetail(false)
  setSelectedCampusOptions([])
  setSelectedStudentFacilityOptions([])

      addBotMessage(
        `Sure! 🏫

Campus & Facilities

Please select a facility below:`
      )

      return
    }

    if (option.id === 'departments') {
  setChatStep('departments')
  setIsDepartmentDetail(false)
  setSelectedDepartmentOptions([])

  addBotMessage(
    `Departments

Please select the department you would like to know about:`
  )

  return
}
if (option.id === 'about') {
  setChatStep('about-college')

  addBotMessage(
    `About Us

25 years of transforming lives through compassionate nursing education.

Please select what you would like to know about our college:`
  )

  return
}

    if (option.id === 'contact') {
  

  setChatStep('contact')

  addBotMessage(
    `Contact Information

Please select the information you would like to know:`
  )

  return
}
  }

  // =====================================================
  // CAMPUS & FACILITIES OPTION CLICK
  // =====================================================

  const handleCampusOption = (option: Option) => {
    if (isTyping) return

    addUserMessage(option.label)

    setSelectedCampusOptions((prev) =>
      prev.includes(option.id) ? prev : [...prev, option.id]
    )

    setIsCampusDetail(true)

    if (option.id === 'student-facilities') {
      setSelectedStudentFacilityOptions([])
      setChatStep('student-facilities')

      addBotMessage(
        `Sure! 🏫

Student Facilities

Please select an option below:`
      )

      return
    }

    if (option.id === 'academic-facilities') {
      addBotMessage(
        ` Academic Facilities

Madha College of Nursing provides an academic environment designed to support nursing education, professional development and practical learning.

The institution provides classroom-based teaching along with facilities that support students throughout their academic journey.

The college has a library and laboratory facilities that complement classroom learning and help students develop their academic and professional knowledge. 

Information technology infrastructure and other campus facilities further support the learning environment.

The college offers nursing education across undergraduate and postgraduate programmes, with departments including Medical Surgical Nursing, Pediatric Nursing, Community Health Nursing, Obstetrics & Gynecological Nursing and Psychiatric Nursing.
`
      )

      return
    }

    if (option.id === 'learning-spaces') {
      addBotMessage(
        `Learning Space

The learning environment at Madha College of Nursing is designed to support both academic study and professional nursing development. 

Students have access to classrooms, library resources, laboratories and IT infrastructure that complement their academic curriculum.

The library provides students with resources to support their studies, assignments and academic preparation. 

Laboratory facilities provide opportunities to connect theoretical concepts with practical nursing learning.

The institution promotes a student-friendly learning environment where academic education and practical training are given importance.
`
      )

      return
    }

    if (option.id === 'nursing-education') {
      addBotMessage(
        `Nursing Education

Madha College of Nursing has been providing nursing education since 1998. The institution is affiliated with The Tamil Nadu Dr. M.G.R. Medical University, Chennai, and is recognized by the Tamil Nadu Nurses and Midwives Council and approved by the Indian Nursing Council, New Delhi.

The college provides nursing education through undergraduate and postgraduate programmes.

Its academic departments cover major areas of nursing, including Medical Surgical Nursing, Pediatric Nursing, Community Health Nursing, Obstetrics & Gynecological Nursing and Psychiatric Nursing.

The institution focuses on preparing students for professional nursing practice through academic education, practical training and clinical learning.
`
      )

      return
    }

    if (option.id === 'practical-learning') {
      addBotMessage(
        `Practical Learning

Practical learning is an important part of nursing education at Madha College of Nursing.

Laboratory facilities provide students with opportunities to apply their theoretical knowledge and develop practical nursing skills.

The college provides departmental laboratory facilities that support practical learning across different areas of nursing.

Clinical learning and practical training help students connect classroom knowledge with the requirements of professional nursing practice.

Through academic instruction, laboratory learning and clinical exposure, students develop the knowledge and practical skills required for their future roles in healthcare.
`
      )

      return
    }
  }

  // =====================================================
  // STUDENT FACILITIES OPTION CLICK
  // =====================================================

  const handleStudentFacilitiesOption = (option: Option) => {
    if (isTyping) return

    addUserMessage(option.label)

    setSelectedStudentFacilityOptions((prev) =>
      prev.includes(option.id) ? prev : [...prev, option.id]
    )

    if (option.id === 'hostel') {
      addBotMessage(
        `Hostel

Hostel facilities are available for students
subject to availability.

The current hostel availability and fee details
should be confirmed with Madha College of Nursing.

Please contact the college for the latest
hostel information.`
      )

      return
    }

    if (option.id === 'transport') {
      addBotMessage(
        `Transport

Transport facilities may be available for
students depending on the current routes
and arrangements.

Transport availability, routes and current
transport fees should be confirmed with
Madha College of Nursing.

Please contact the college for the latest
transport information.`
      )

      return
    }
  }
  // =====================================================
// DEPARTMENT OPTION CLICK
// =====================================================

const handleDepartmentOption = (option: Option) => {
  if (isTyping) return

  // Convert selected option into a user message
  addUserMessage(option.label)

  setSelectedDepartmentOptions((prev) =>
    prev.includes(option.id) ? prev : [...prev, option.id]
  )
  setIsDepartmentDetail(true)

  if (option.id === 'medical-surgical-nursing') {
  addBotMessage(
    `Department of Medical Surgical Nursing



Department Overview

The Department of Medical Surgical Nursing is the cornerstone of our nursing curriculum, training students to manage complex medical and surgical patient care across specialties including cardiology, neurology, nephrology, and oncology.

Active Research Projects

1. Simulation Training in IM Injection

2. Fast Track System in Emergency Department

3. Emergency Codes

4. Safe Patient Handoffs

5. Infection Control Protocols

Facilities

• 40-bed simulation ward with mannequins

• Cardiac monitoring

• Wound care simulation centre

• IV therapy practice

• Drug calculation room

Laboratories

• Nursing Skills Lab

• Clinical Simulation Centre

• Anatomy & Physiology`
  )

  return
}
if (option.id === 'pediatric-nursing') {
  addBotMessage(
    `Department of Pediatric Nursing



DEPARTMENT OVERVIEW

Dedicated to the care of neonates, infants, children, and adolescents, this department equips nurses with specialised skills in growth monitoring, immunisation, paediatric pharmacology, and NICU care.

ACTIVE RESEARCH PROJECTS

1. Neonatal Hypothermia

2. Pediatric Pain Scale

3. Human Milk Donation

4. Autism Awareness Programme

5. Newborn Care

FACILITIES

• Neonatal care simulation unit
• Paediatric emergency simulation
• Growth & development assessment
• Immunisation training station

LABORATORIES

• Paediatric Nursing Skills Lab
• NICU Simulation Suite`
  )

  return
}

  if (option.id === 'community-health-nursing') {
  addBotMessage(
    `Department of Community Health Nursing


DEPARTMENT OVERVIEW

Community Health Nursing prepares students to serve as change agents in public health, primary care, and rural outreach settings. Special emphasis on epidemiology, school health, and environmental health.

ACTIVE RESEARCH PROJECTS

1. Rainbow Growth Chart Awareness Programme

2. Kayakalp Initiative Programme

3. TeCHO+ Initiative Awareness Programme

4. Biomedical Waste Management

FACILITIES

• Community health simulation centre
• Epidemiology mapping
• Mobile health camp vehicle
• School health demonstration room

LABORATORIES

• Community Health Lab
• Epidemiology & Statistics Room`
  )

  return
}

 if (option.id === 'obstetrics-gynecological-nursing') {
  addBotMessage(
    `Department of Obstetrics & Gynecological Nursing


DEPARTMENT OVERVIEW

This department provides comprehensive training in antenatal, intrapartum, and postnatal nursing care, along with gynaecological nursing and reproductive health. Students gain hands-on experience in Madha Medical College Hospital's maternity wing.

ACTIVE RESEARCH PROJECTS

1. Iron Supplementation for Multipara Mothers

2. Labour Care Guide Initiatives

3. Calcium Supplementation Tool Kit Awareness

4. Skill Training Programme for Primi Gravida

FACILITIES

• Obstetrics simulation suite (delivery room)
• Antenatal care assessment
• Newborn resuscitation station
• Gynaecology examination

LABORATORIES

• OBG Skills Lab
• Labour Room Simulation Suite`
  )

  return
}

  if (option.id === 'psychiatric-nursing') {
  addBotMessage(
    `Department of Psychiatric Nursing


DEPARTMENT OVERVIEW

Mental health is a growing priority in Indian healthcare. This department trains nurses in therapeutic communication, de-escalation, psychopharmacology, and evidence-based mental health interventions.

ACTIVE RESEARCH PROJECTS

1. Lifeskill Training

2. Bullying Prevention Awareness Programme

3. Problem-Solving Ability Among Students

4. Positive Self-Talk Programme

5. Dual-Task Training on Quality of Life

FACILITIES

• Therapeutic communication
• Mental status examination room
• Group therapy simulation space
• Relaxation & mindfulness studio

LABORATORIES

• Psychiatric Skills Lab
• Behavioural Simulation Suite`
  )

  return
}

  if (option.id === 'nursing-research') {
  addBotMessage(
    `Department of Nursing Research


DEPARTMENT OVERVIEW

The Department of Nursing Research drives evidence-based practice, supports faculty research projects, and applies for national and international grants. It serves as the intellectual engine of the institution.

ACTIVE RESEARCH PROJECTS

1. Systematic reviews in nursing practice

2. Nursing theory development projects

3. Interdisciplinary health research with MMCH

FACILITIES

- Dedicated faculty research room
- Statistical computing (SPSS, R, STATA)
- Digital library with e-journals
- Writing & publication support cell

LABORATORIES

- Research Methodology Lab
- Biostatistics Computing Centre`
  )

  return
}

}





  // =====================================================
  // COURSE SELECTION
  // =====================================================

 const handleCourseSelection = (option: Option) => {
  if (isTyping) return

  const selectedCourse = option.label

  // Show selected course as USER message
  setMessages((prev) => [
    ...prev,
    {
      id: Date.now(),
      sender: 'user',
      text: selectedCourse,
    },
  ])

  // Save selected course
  setSelectedCourse(option.id as CourseId)

  // Clear previously selected actions
  setSelectedCourseActions([])

  // Move to course action menu
  setChatStep('course-actions')
  setIsCampusDetail(false)

  // Bot reply
  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: `You selected ${selectedCourse}. What would you like to know about this course? Please select an option below:`,
      },
    ])
  }, 500)
}

  // =====================================================
  // COURSE ACTION
  // =====================================================
const handleCourseAction = (
  option: Option
) => {
  if (isTyping) return

  // Hide the selected option after the user clicks it
  if (option.id !== 'back-courses') {
    setSelectedCourseActions((prev) => [
      ...prev,
      option.id,
    ])
  }
    // ---------------------------------------------------
    // BACK TO COURSES
    // ---------------------------------------------------

    if (option.id === 'back-main') {
  addUserMessage(option.label)

  setChatStep('main')

  setSelectedCourse(null)

  setSelectedCourseActions([])

  addBotMessage(
    `Sure! 👋

How can I help you?`
  )

  return
}

    // Convert selected action into user message
    addUserMessage(option.label)

    // ---------------------------------------------------
    // COURSE DETAILS
    // ---------------------------------------------------

    if (option.id === 'course-details') {
      addBotMessage(
        getCourseDetails(selectedCourse)
      )

      return
    }

    // ---------------------------------------------------
    // FEE STRUCTURE
    // ---------------------------------------------------

    if (option.id === 'course-fee') {
      addBotMessage(
        getCourseFees(selectedCourse)
      )

      return
    }

    // ---------------------------------------------------
    // ELIGIBILITY
    // ---------------------------------------------------

    if (option.id === 'course-eligibility') {
      addBotMessage(
        getCourseEligibility(selectedCourse)
      )

      return
    }
  }

  // =====================================================
  // COURSE DETAILS
  // =====================================================

  const getCourseDetails = (
    course: CourseId | null
  ) => {
    if (course === 'bsc-nursing') {
      return `B.Sc. Nursing

Duration:
4 Years

B.Sc. Nursing is an undergraduate nursing programme focused on nursing education, clinical practice, patient care and professional development.

The exact curriculum and programme details should be confirmed using the official college academic information.   

Curriculum Overview:

Semester I: Communicative English, Applied Anatomy, Applied Physiology, Applied Sociology, Applied Psychology, Nursing Foundations I. Mandatory Module: First Aid as part of Nursing Foundation I Course

Semester II: Applied Biochemistry, Applied Nutrition and Dietetics, Nursing Foundations II, Health/Nursing Informatics & Technology. Mandatory Module: Health Assessment as part of Nursing Foundation II Course

Semester III: Applied Microbiology and Infection Control including Safety, Pharmacology I, Pathology I, Adult Health (Medical Surgical) Nursing I with integrated pathophysiology. Mandatory Module: BCLS as part of Adult Health Nursing I

Semester IV: Pharmacology II, Pathology II & Genetics, Adult Health Nursing II with integrated pathophysiology including Geriatric Nursing, Professionalism, Professional Values & Ethics including Bioethics. Mandatory Modules: Fundamentals of Prescribing under Pharmacology II; Palliative care module under Adult Health Nursing II

Semester V: Child Health Nursing I, Mental Health Nursing I, Community Health Nursing I (including Environmental Science & Epidemiology), Educational Technology/Nursing Education, Introduction to Forensic Nursing and Indian Laws. Mandatory Modules: Essential Newborn Care (ENBC), Facility Based Newborn Care (FBNBC), IMNCI and PLS as part of Child Health Nursing

Semester VI: Child Health Nursing II, Mental Health Nursing II, Nursing Management & Leadership, Midwifery/Obstetrics and Gynecology (OBG) Nursing I. Mandatory Module: SBA Module under OBG Nursing I/II (VI/VII Semester)
 
Semester VII: Community Health Nursing II, Nursing Research & Statistics, Midwifery/Obstetrics and Gynecology (OBG) Nursing II. Mandatory Module: Safe delivery app under OBG Nursing I/II (VI/VII Semester)

Semester VIII: Internship (Intensive Practicum/Residency Posting)`
    }

    if (course === 'pb-bsc-nursing') {
      return `P.B.B.Sc. Nursing

Post Basic B.Sc. Nursing is an undergraduate nursing programme intended for eligible nursing professionals.

The exact duration and programme structure should be confirmed using the official college academic information.

Curriculum Overview:

Year I: Nursing Foundation, Nutrition & Dietetics, Biochemistry & Biophysics, Psychology, Maternal Nursing, Child Health Nursing, Microbiology, Medical-Surgical Nursing, English

Year II: Sociology, Community Health Nursing, Mental Health Nursing, Introduction to Nursing Education, Management & Research`
    }

    if (course === 'msc-nursing') {
      return `M.Sc. Nursing

M.Sc. Nursing is a postgraduate nursing programme designed for advanced nursing education and professional development.

The exact specialisation, duration and programme structure should be confirmed using the official college academic information.

Curriculum Overview:

Year I: Nursing Education, Advanced Nursing Practice, Nursing Research & Statistics, Clinical Specialty I

Year II: Nursing Management, Clinical Specialty II, Dissertation Submission & Viva`
    }

    return 'Please select a course first.'
  }

  // =====================================================
  // COURSE FEES
  // =====================================================

  const getCourseFees = (
    course: CourseId | null
  ) => {
    if (course === 'bsc-nursing') {
      return `B.Sc. Nursing — Fee Structure

Tuition Fee:
To be updated

Other Fees:
To be updated

Hostel Fee:
To be updated

Transport Fee:
To be updated

Please contact Madha College of Nursing for the latest officially confirmed fee structure.`
    }

    if (course === 'pb-bsc-nursing') {
      return `P.B.B.Sc. Nursing — Fee Structure

Tuition Fee:
To be updated

Other Fees:
To be updated

Hostel Fee:
To be updated

Transport Fee:
To be updated

Please contact the college for the latest officially confirmed fee structure.`
    }

    if (course === 'msc-nursing') {
      return `M.Sc. Nursing — Fee Structure

Tuition Fee:
To be updated

Other Fees:
To be updated

Hostel Fee:
To be updated

Transport Fee:
To be updated

Please contact the college for the latest officially confirmed fee structure.`
    }

    return 'Please select a course first.'
  }

  // =====================================================
  // COURSE ELIGIBILITY
  // =====================================================

  const getCourseEligibility = (
    course: CourseId | null
  ) => {
    if (course === 'bsc-nursing') {
      return `B.Sc. Nursing — Eligibility

The exact eligibility requirements should be taken from the current official college admission information.

Please contact the college to confirm the latest eligibility criteria before applying.`
    }

    if (course === 'pb-bsc-nursing') {
      return `P.B.B.Sc. Nursing — Eligibility

Eligibility depends on the applicant's previous nursing qualification and other applicable requirements.

Please contact the college to confirm the current eligibility criteria.`
    }

    if (course === 'msc-nursing') {
      return `M.Sc. Nursing — Eligibility

Eligibility depends on the applicant's previous nursing qualification and other applicable requirements.

Please contact the college to confirm the current eligibility criteria.`
    }

    return 'Please select a course first.'
  }
  // =====================================================
// ABOUT COLLEGE OPTION CLICK
// =====================================================

const handleAboutCollegeOption = (option: Option) => {
  if (isTyping) return

  // Selected option becomes user message
  addUserMessage(option.label)

  // Move to deeper level
  setChatStep('about-detail')

  if (option.id === 'our-story-mission') {
    addBotMessage(
      `Our Story & Our Mission

Our Vision

To nurture students by developing their dedication, commitment, compassion, and goodwill towards patient care in both hospital and community settings.

To establish a centre of excellence in nursing that offers outstanding, evidence-based educational programmes to advance patient care.

Our Mission

Madha College of Nursing is dedicated to educating and producing nurses prepared to lead within the profession while advancing nursing research.

We place immense importance on preparing highly trained professionals who are caring, innovative, and capable of addressing evolving healthcare needs while adhering to ethical and cultural values.`
    )

    return
  }

  if (option.id === 'our-journey') {
    addBotMessage(
      `Our Journey

25 Years of Excellence

1998

Establishment with B.Sc. (N) degree course

Madha College of Nursing established in Chennai with a vision to produce world-class nursing professionals.

1998

University Affiliation

Formally affiliated to The Tamil Nadu Dr. M.G.R. Medical University, gaining recognition across Tamil Nadu.

1998

Indian Nursing Council Recognition

Received recognition from the Indian Nursing Council, establishing the institution’s commitment to national nursing education standards.

2006

Infrastructure Expansion

New campus building inaugurated with state-of-the-art nursing labs, simulation centre, and modern hostel facilities.

2009

M.Sc. (N) with four specialties

Started the M.Sc. (N) degree programme with four specialties: Medical-Surgical Nursing, Paediatric Nursing, OBG Nursing, and Community Health Nursing.

2010

P.B.B.Sc. (N) degree course

Introduced the P.B.B.Sc. (N) degree programme to provide registered nurses with opportunities for advanced professional education.

2010

Research Centre Launch

Dedicated nursing research centre established. First DST-funded project awarded to faculty.

2015

Seat enhancement

Enhanced B.Sc. (N) seats from 50 to 100 and M.Sc. (N) seats from 15 to 30, with Mental Health Nursing added as the fifth specialty.

2018

Smart Campus Initiative

Launched fully digital classrooms, e-library, and online patient simulation systems across all departments.

2026

Silver Jubilee: 25 Years of Legacy

Celebrating 25 years of excellence with 3,200+ alumni serving across 35+ countries worldwide.`
    )

    return
  }

  if (option.id === 'achievements') {
    addBotMessage(
      `Achievements

Milestones That Define Us

🎓 3,200+ Alumni

Across 35 Countries

🏥 18 Hospitals

Clinical Affiliations

📚 48 Research Papers

Published Nationally

🌍 INC Approved

Indian Nursing Council

💼 98% Placement

2024 Batch`
    )

    return
  }
}


// =====================================================
// CONTACT INFORMATION OPTION CLICK
// =====================================================

const handleContactOption = (option: Option) => {
  if (isTyping) return

  // Selected option becomes user message
  addUserMessage(option.label)

  // Move to deeper level
  setChatStep('contact-detail')

  if (option.id === 'phone') {
    addBotMessage(
      `Phone

+91 91576 51234

You can contact Madha College of Nursing using the official phone number above.`
    )

    return
  }

  if (option.id === 'email') {
    addBotMessage(
      `Email

info@madhanursing.in

You can contact the college through the official email address above.`
    )

    return
  }

  if (option.id === 'address') {
    addBotMessage(
      `Address

Madha Nagar,
Somangalam Road,
Kundrathur,
Chennai – 600069.`
    )

    return
  }

   if (option.id === 'google-maps') {
  

  window.open(
    'https://www.google.com/maps/search/?api=1&query=Madha+College+of+Nursing,+Madha+Nagar,+Somangalam+Road,+Kunrathur,+Chennai+600069',
    '_blank',
    'noopener,noreferrer'
  )

  return
}


  if (option.id === 'admission-office') {
    addBotMessage(
      `Admission Office

For admission-related enquiries, please contact the Admission Office using the official phone number or email address.

Phone: +91 91576 51234

Email: info@madhanursing.in`
    )

    return
  }
}

  // =====================================================
  // RENDER MAIN OPTIONS
  // =====================================================

  const renderMainOptions = () => {
    if (isTyping) return null

    return (
      <div className="madha-chatbot-query-area">

        <div className="madha-chatbot-query-title">
          How can I help you?
        </div>

        <div className="madha-chatbot-query-messages">

          {mainOptions.map((option) => (

            <button
  key={option.id}
  type="button"
  className="madha-chatbot-query-message"
  onClick={() => handleMainOption(option)}
>
  <span className="madha-chatbot-query-content">
    {option.label}
  </span>
</button>
          ))}

        </div>

      </div>
    )
  }

  // =====================================================
  // RENDER COURSE OPTIONS
  // =====================================================

  const renderCourseOptions = () => {
    if (isTyping) return null

    return (
      <div className="madha-chatbot-query-area">

        <div className="madha-chatbot-query-title">
          Please select your course
        </div>

        <div className="madha-chatbot-query-messages">

          {courseOptions.map((option) => (

            <button
              key={option.id}
              type="button"
              className="madha-chatbot-query-message"
              onClick={() =>
                handleCourseSelection(option)
              }
            >
              {option.label}
            </button>

          ))}

        </div>

      </div>
    )
  }

  // =====================================================
  // RENDER COURSE ACTION OPTIONS
  // =====================================================

  const renderCourseActionOptions = () => {
    if (isTyping) return null

    return (
      <div className="madha-chatbot-query-area">

        <div className="madha-chatbot-query-title">
          Select an option
        </div>

        <div className="madha-chatbot-query-messages">

{courseActionOptions
  .filter(
    (option) =>
      !selectedCourseActions.includes(option.id)
  )
  .map((option) => (
            <button
              key={option.id}
              type="button"
              className="madha-chatbot-query-message"
              onClick={() =>
                handleCourseAction(option)
              }
            >
              {option.label}
            </button>

          ))}

        </div>

      </div>
    )
  }
  
  // =====================================================
// RENDER STUDENT FACILITIES OPTIONS
// =====================================================
// RENDER CAMPUS & FACILITIES OPTIONS
// =====================================================

const renderCampusOptions = () => {
  if (isTyping) return null

  return (
    <div className="madha-chatbot-query-area">

      <div className="madha-chatbot-query-title">
        Select a facility
      </div>

      <div className="madha-chatbot-query-messages">

        {campusOptions
          .filter(
            (option) => !selectedCampusOptions.includes(option.id)
          )
          .map((option) => (

          <button
            key={option.id}
            type="button"
            className="madha-chatbot-query-message"
            onClick={() => handleCampusOption(option)}
            disabled={isTyping}
          >
            <span className="madha-chatbot-query-content">
              {option.label}
            </span>
          </button>
        ))}

      </div>

    </div>
  )
}

// =====================================================
// RENDER STUDENT FACILITIES OPTIONS
// =====================================================

const renderStudentFacilitiesOptions = () => {
  if (isTyping) return null

  return (
    <div className="madha-chatbot-query-area">

      <div className="madha-chatbot-query-title">
        Select an option
      </div>

      <div className="madha-chatbot-query-messages">

        {studentFacilitiesOptions
          .filter(
            (option) => !selectedStudentFacilityOptions.includes(option.id)
          )
          .map((option) => (
          <button
            key={option.id}
            type="button"
            className="madha-chatbot-query-message"
            onClick={() =>
              handleStudentFacilitiesOption(option)
            }
            disabled={isTyping}
          >
            {option.label}
          </button>
        ))}

      </div>

    </div>
  )
}
// =====================================================
// RENDER ABOUT COLLEGE OPTIONS
// =====================================================

const renderAboutCollegeOptions = () => {
  if (isTyping) return null

  return (
    <div className="madha-chatbot-query-area">

      <div className="madha-chatbot-query-title">
        Select an option
      </div>

      <div className="madha-chatbot-query-messages">

        {aboutCollegeOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className="madha-chatbot-query-message"
            onClick={() =>
              handleAboutCollegeOption(option)
            }
            disabled={isTyping}
          >
            <span className="madha-chatbot-query-content">
              {option.label}
            </span>
          </button>
        ))}

      </div>

    </div>
  )
}
// =====================================================
// RENDER CONTACT INFORMATION OPTIONS
// =====================================================

const renderContactOptions = () => {
  if (isTyping) return null

  return (
    <div className="madha-chatbot-query-area">

      <div className="madha-chatbot-query-title">
        Select an option
      </div>

      <div className="madha-chatbot-query-messages">

        {contactOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className="madha-chatbot-query-message"
            onClick={() => handleContactOption(option)}
            disabled={isTyping}
          >
            <span className="madha-chatbot-query-content">
              {option.label}
            </span>
          </button>
        ))}

      </div>

    </div>
  )
}

// =====================================================
// RENDER DEPARTMENT OPTIONS
// =====================================================

const renderDepartmentOptions = () => {
  if (isTyping) return null

  return (
    <div className="madha-chatbot-query-area">

      <div className="madha-chatbot-query-title">
        Select a department
      </div>

      <div className="madha-chatbot-query-messages">

        {departmentOptions
          .filter(
            (option) => !selectedDepartmentOptions.includes(option.id)
          )
          .map((option) => (
          <button
            key={option.id}
            type="button"
            className="madha-chatbot-query-message"
            onClick={() =>
              handleDepartmentOption(option)
            }
            disabled={isTyping}
          >
            <span className="madha-chatbot-query-content">
              {option.label}
            </span>
          </button>
        ))}

      </div>

    </div>
  )
} 


  
// =====================================================
// MAIN MENU
// =====================================================

const goToMainMenu = () => {
  if (isTyping) return

  setChatStep('main')
  setSelectedCourse(null)
  setSelectedCourseActions([])
  setIsCampusDetail(false)
  setIsDepartmentDetail(false)
  setSelectedDepartmentOptions([])
  setSelectedCampusOptions([])
  setSelectedStudentFacilityOptions([])

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now(),
      sender: 'user',
      text: 'Main Menu',
    },
  ])

  addBotMessage(
    `Sure! 👋

How can I help you?`
  )
}

// =====================================================
// PREVIOUS MENU
// =====================================================

const goToPreviousMenu = () => {
  if (isTyping) return

// ---------------------------------------------------
// CONTACT DETAIL → CONTACT INFORMATION MENU
// ---------------------------------------------------

if (chatStep === 'contact-detail') {
  setChatStep('contact')

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now(),
      sender: 'user',
      text: 'Previous Menu',
    },
  ])

  addBotMessage(
    `Contact Information

Please select the information you would like to know:`
  )

  return
}

  // ---------------------------------------------------
// ABOUT COLLEGE DETAIL → ABOUT COLLEGE MENU
// ---------------------------------------------------

if (chatStep === 'about-detail') {
  setChatStep('about-college')

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now(),
      sender: 'user',
      text: 'Previous Menu',
    },
  ])

  addBotMessage(
    `About Us

25 years of transforming lives through compassionate nursing education.

Please select what you would like to know about our college:`
  )

  return
}
  // ---------------------------------------------------
  // Student Facilities → Campus & Facilities
  // ---------------------------------------------------

  if (chatStep === 'student-facilities') {
    setChatStep('campus')
    setIsCampusDetail(false)
    // Show all Campus & Facilities options again
    setSelectedCampusOptions([])

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: 'Previous Menu',
      },
    ])

    addBotMessage(
      `Sure! 🏫

Please select a facility below:`
    )

    return
  }

  // ---------------------------------------------------
  // Campus detail → Campus & Facilities
  // ---------------------------------------------------

  if (chatStep === 'campus' && isCampusDetail) {
    setIsCampusDetail(false)
    // Show all Campus & Facilities options again
    setSelectedCampusOptions([])

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: 'Previous Menu',
      },
    ])

    addBotMessage(
      `Sure! 🏫

Campus & Facilities

Please select a facility below:`
    )

    return
  }

  // ---------------------------------------------------
  // Department detail → Departments
  // ---------------------------------------------------

  if (chatStep === 'departments' && isDepartmentDetail) {
    setIsDepartmentDetail(false)
    // Show all Department options again
    setSelectedDepartmentOptions([])

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: 'Previous Menu',
      },
    ])

    addBotMessage(
      `Sure! 🏢

Please select the department you would like to know about:`
    )

    return
  }

  // ---------------------------------------------------
  // Course details → Course selection
  // ---------------------------------------------------

  if (chatStep === 'course-actions') {
    setChatStep('courses')
    setSelectedCourse(null)
    setSelectedCourseActions([])

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: 'Previous Menu',
      },
    ])

    addBotMessage(
      `Sure! 🎓

Please select your course:`
    )

    return
  }

  // ---------------------------------------------------
  // Courses → Main Menu
  // ---------------------------------------------------

  if (chatStep === 'courses') {
    setChatStep('main')
    setSelectedCourse(null)
    setSelectedCourseActions([])
    setIsCampusDetail(false)

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: 'Previous Menu',
      },
    ])

    addBotMessage(
      `Sure! 👋

How can I help you?`
    )

    return
  }

  // ---------------------------------------------------
  // Campus → Main Menu
  // ---------------------------------------------------

  if (chatStep === 'campus') {
    setChatStep('main')
    setIsCampusDetail(false)

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: 'Previous Menu',
      },
    ])

    addBotMessage(
      `Sure! 👋

How can I help you?`
    )

    return
  }
}

 // =====================================================
// NAVIGATION BUTTONS
// =====================================================

const renderNavigationButtons = () => {
  if (isTyping || chatStep === 'main') {
    return null
  }

  // ---------------------------------------------------
  // FIRST-LEVEL SUBMENUS
  // Main Menu → Courses / Campus
  // Show ONLY Main Menu
  // ---------------------------------------------------

 const isFirstLevelMenu =
  chatStep === 'admission' ||
  (chatStep === 'departments' && !isDepartmentDetail) ||
  chatStep === 'courses' ||
  (chatStep === 'campus' && !isCampusDetail) ||
  chatStep === 'about-college' ||
  chatStep === 'contact'


  if (isFirstLevelMenu) {
    return (
      <div className="madha-chatbot-navigation">

        <button
          type="button"
          className="madha-chatbot-query-message"
          onClick={goToMainMenu}
          disabled={isTyping}
        >
          <span className="madha-chatbot-query-content">
            ⌂ Main Menu
          </span>
        </button>

      </div>
    )
  }

  // ---------------------------------------------------
  // DEEPER SUBMENU / DETAILED INFORMATION
  // Show Previous Menu + Main Menu
  // ---------------------------------------------------

  return (
    <div className="madha-chatbot-navigation">

      <button
        type="button"
        className="madha-chatbot-query-message"
        onClick={goToPreviousMenu}
        disabled={isTyping}
      >
        <span className="madha-chatbot-query-content">
          ← Previous Menu
        </span>
      </button>

      <button
        type="button"
        className="madha-chatbot-query-message"
        onClick={goToMainMenu}
        disabled={isTyping}
      >
        <span className="madha-chatbot-query-content">
          ⌂ Main Menu
        </span>
      </button>

    </div>
  )
}

  const renderOptions = () => {
  return (
    <>
      {chatStep === 'main' && renderMainOptions()}

      {chatStep === 'admission' && (
        <div className="madha-chatbot-options">


          <button
            type="button"
            className="madha-chatbot-query-message"
            onClick={() => {
              addUserMessage('Admission Enquiry')
              navigate?.('contact')
            }}
            disabled={isTyping}
          >
            <span className="madha-chatbot-query-content">
              📝 Admission Enquiry
            </span>
          </button>

        </div>
      )}
      {chatStep === 'departments' &&
  renderDepartmentOptions()}

  {chatStep === 'about-college' &&
  renderAboutCollegeOptions()}
  
  {chatStep === 'contact' &&
  renderContactOptions()}

      {chatStep === 'courses' && renderCourseOptions()}

      {chatStep === 'course-actions' &&
        renderCourseActionOptions()}

      {chatStep === 'campus' && renderCampusOptions()}

      {chatStep === 'student-facilities' &&
        renderStudentFacilitiesOptions()}


      {renderNavigationButtons()}
    </>
  )
}
// =====================================================
  // RESET CHAT
  // =====================================================

  const resetChat = () => {
    if (isTyping) return

    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'Hello! 👋\nI’m MCON AI Assistant. How can I help you today?',
      },
    ])

    setChatStep('main')

    setSelectedCourse(null)
    setSelectedCourseActions([])
    setIsCampusDetail(false)
    setIsDepartmentDetail(false)
    setSelectedDepartmentOptions([])
    setSelectedCampusOptions([])
    setSelectedStudentFacilityOptions([])
  }

  // =====================================================
  // MAIN JSX
  // =====================================================

  return (
    <div className="madha-chatbot">

      {/* =================================================
          CHATBOT WINDOW
          ================================================= */}

      {isOpen && (

        <div className="madha-chatbot-window">

          {/* =================================================
              HEADER
              ================================================= */}

          <div className="madha-chatbot-header">

            <div className="madha-chatbot-header-info">

              {/* COLLEGE LOGO */}

              <div className="madha-chatbot-avatar">

                <img
                  src="/logos/mdch-logo (1).png"
                  alt="Madha College of Nursing"
                />

              </div>

              <div>

                <h3>
                  MCON AI Assistant
                </h3>

                <span>
                  <i className="madha-chatbot-status-dot" />
                  Online
                </span>

              </div>

            </div>

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="madha-chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>

          </div>

          {/* =================================================
              CHAT MESSAGES
              ================================================= */}

          <div className="madha-chatbot-messages">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`madha-chatbot-message-row ${
                  msg.sender === 'user'
                    ? 'madha-chatbot-user-row'
                    : 'madha-chatbot-bot-row'
                }`}
              >

                <div
                  className={`madha-chatbot-message ${
                    msg.sender === 'user'
                      ? 'madha-chatbot-user-message'
                      : 'madha-chatbot-bot-message'
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            ))}

            {/* =================================================
                TYPING INDICATOR
                ================================================= */}

            {isTyping && (

              <div className="madha-chatbot-message-row madha-chatbot-bot-row">

                <div className="madha-chatbot-typing">

                  <span />
                  <span />
                  <span />

                </div>

              </div>

            )}

            {/* =================================================
                NEXT OPTIONS
                ================================================= */}

            {!isTyping && renderOptions()}

          </div>

          

        </div>

      )}

      {/* =====================================================
          FLOATING MCON AI BUTTON
          ===================================================== */}

      {!isOpen && (

        <button
          type="button"
          className="madha-chatbot-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open Madha AI Assistant"
        >

          <span
            className="madha-chatbot-launcher-icon"
            aria-hidden="true"
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                d="M12 2.8L13.25 9.2L19.2 12L13.25 14.8L12 21.2L10.75 14.8L4.8 12L10.75 9.2L12 2.8Z"
                fill="currentColor"
              />

              <path
                d="M19.2 4.5L19.65 6.35L21.2 7.1L19.65 7.85L19.2 9.7L18.75 7.85L17.2 7.1L18.75 6.35L19.2 4.5Z"
                fill="currentColor"
                opacity="0.7"
              />

            </svg>

          </span>

          <span className="madha-chatbot-launcher-text">
            MCON AI
          </span>

        </button>

      )}

    </div>
  )
}