import { useState } from 'react'
import Reveal from '../components/Reveal'

type Page =
  | 'home'
  | 'about'
  | 'courses'
  | 'departments'
  | 'gallery'
  | 'contact'
  | 'management'
  | 'principal'

interface Props {
  navigate: (p: Page) => void
}

export default function Contact({ navigate }: Props) {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handle = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!form.name || !form.email) {
    return
  }

  try {
    const response = await fetch('/api/admission-enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!response.ok) {
      throw new Error('Failed to send enquiry')
    }

    setSubmitted(true)

  } catch (error) {
    console.error('Error submitting enquiry:', error)
    alert('Unable to send enquiry. Please try again.')
  }
}

  return (
    <div className="contact-page">

      <style>{`

        /* ==========================================
           RESTORE PREVIOUS HEADER / NAV BAR COLOR
           ========================================== */

        .nav-root.transparent {
          background: transparent !important;
        }

        .nav-root.transparent .nav-college-name {
          color: #ffffff !important;
        }

        .nav-root.transparent .nav-item {
          color: rgba(255,255,255,.80) !important;
        }

        .nav-root.transparent .nav-item:hover,
        .nav-root.transparent .nav-item.active {
          color: #ffffff !important;
        }


        /* ==========================================
           PAGE
           ========================================== */

        .contact-page {
          width: 100%;
          overflow-x: hidden;
        }


        /* ==========================================
           CONTACT BANNER
           ========================================== */

        .contact-banner {
          padding: 190px 40px 40px;
          background: linear-gradient(
            160deg,
            #071A36 0%,
            #0B2545 100%
          );
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .contact-banner-glow {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(
              circle at 50% 60%,
              rgba(24,198,200,.10) 0%,
              transparent 55%
            );
          pointer-events: none;
        }

        .contact-banner-content {
          position: relative;
          z-index: 2;
        }

        .contact-banner-tag {
          margin-bottom: 20px;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .contact-banner-line {
          display: inline-block;
          width: 55px;
          height: 2px;
          background: #18C6C8;
        }

        .contact-banner h1 {
          margin: 16px 0 0;
          font-size: clamp(24px, 2.5vw, 40px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -.03em;
        }

        .contact-banner h1 span {
          color: #18C6C8;
        }

        .contact-banner p {
          color: #F1F5F9;
          font-size: 16px;
          max-width: 650px;
          margin: 24px auto 0;
          line-height: 1.75;
        }


        /* ==========================================
           CONTACT SECTION
           ========================================== */

        .contact-section {
          padding: 70px 20px;
          background: #f7f9fc;
        }

        .contact-main-container {
          max-width: 1080px;
          margin: 0 auto;
        }


        /* ==========================================
           MAIN LAYOUT
           ========================================== */

        .contact-layout {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 34px;
          align-items: stretch;
        }


        /* ==========================================
           LEFT - ADMISSION FORM
           ========================================== */

        .contact-form-card {
          width: 100%;
          min-height: 590px;
          box-sizing: border-box;
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 30px rgba(0,0,0,.08);
        }

        .contact-form-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }

        .contact-form-icon {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 12px;
          background: #071a36;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .contact-form-header h2 {
          margin: 0 0 5px;
          font-size: 26px;
          color: #071a36;
        }

        .contact-form-header p {
          margin: 0;
          color: #687386;
          font-size: 14px;
        }


        /* ==========================================
           FORM
           ========================================== */

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-field label {
          font-size: 14px;
          font-weight: 600;
          color: #26354a;
        }

        .contact-field input,
        .contact-field select,
        .contact-field textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #d9e0e8;
          border-radius: 8px;
          padding: 13px 14px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          background: #ffffff;
          color: #26354a;
        }

        .contact-field input:focus,
        .contact-field select:focus,
        .contact-field textarea:focus {
          border-color: #071a36;
        }

        .contact-field textarea {
          resize: vertical;
          min-height: 120px;
        }


        /* ==========================================
           BUTTON
           ========================================== */

        .contact-submit-btn {
          width: fit-content;
          padding: 13px 28px;
          border: none;
          border-radius: 8px;
          background: #071a36;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }


        /* ==========================================
           RIGHT SIDE
           ========================================== */

        .contact-right-column {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }


        /* ==========================================
           VISIT / CALL / EMAIL / OFFICE HOURS
           ========================================== */

        .contact-info-card {
          width: 100%;
          height: 100px;
          min-height: 100px;
          box-sizing: border-box;
          background: #ffffff;
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          box-shadow: 0 8px 25px rgba(0,0,0,.07);
        }

        .contact-info-icon {
          width: 46px;
          height: 46px;
          min-width: 46px;
          border-radius: 10px;
          background: #071a36;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .contact-info-content {
          flex: 1;
          min-width: 0;
        }

        .contact-info-content h3 {
          margin: 0 0 5px;
          font-size: 18px;
          color: #071a36;
        }

        .contact-info-content p {
          margin: 0;
          color: #687386;
          font-size: 13px;
          line-height: 1.5;
        }


        /* ==========================================
           MAP
           ========================================== */

        .contact-map {
          width: 100%;
          height: 190px;
          min-height: 190px;
          overflow: hidden;
          border-radius: 14px;
          background: #e9edf2;
          box-shadow: 0 8px 25px rgba(0,0,0,.07);
        }

        .contact-map iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }


        /* ==========================================
           SUCCESS
           ========================================== */

        .contact-success {
          min-height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #071a36;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 18px;
        }

        .contact-success h3 {
          margin: 0 0 8px;
          color: #071a36;
          font-size: 25px;
        }

        .contact-success p {
          margin: 0 0 20px;
          color: #687386;
        }

        .contact-success button {
          padding: 11px 22px;
          border: none;
          border-radius: 8px;
          background: #071a36;
          color: #ffffff;
          cursor: pointer;
        }


        /* ==========================================
           MOBILE
           ========================================== */

        @media (max-width: 768px) {

          .contact-banner {
            padding: 160px 20px 70px !important;
          }

          .contact-banner h1 {
            font-size: 40px !important;
            line-height: 1.08 !important;
          }

          .contact-banner p {
            font-size: 15px !important;
            line-height: 1.7 !important;
            padding: 0 4px;
          }

          .contact-section {
            padding: 45px 15px;
          }

          .contact-layout {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .contact-form-card {
            min-height: auto;
            padding: 24px;
          }

          .contact-form-row {
            grid-template-columns: 1fr;
          }

          .contact-info-card {
            height: auto;
            min-height: 90px;
          }

          .contact-map {
            height: 250px;
            min-height: 250px;
          }

        }


        /* ==========================================
           SMALL MOBILE
           ========================================== */

        @media (max-width: 480px) {

          .contact-banner {
            padding: 155px 16px 58px !important;
          }

          .contact-banner h1 {
            font-size: 34px !important;
          }

          .contact-section {
            padding: 40px 12px;
          }

          .contact-form-card {
            padding: 20px;
          }

          .contact-form-header {
            gap: 10px;
          }

          .contact-form-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            font-size: 19px;
          }

          .contact-form-header h2 {
            font-size: 23px;
          }

          .contact-info-card {
            padding: 16px;
          }

          .contact-info-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
          }

          .contact-info-content h3 {
            font-size: 16px;
          }

          .contact-map {
            height: 230px;
            min-height: 230px;
          }

        }

      `}</style>


      {/* ==========================================
          CONTACT BANNER
          ========================================== */}

      <section className="contact-banner">

        <div className="contact-banner-glow" />

        <div className="contact-banner-content">

          <span className="contact-banner-tag">

            <span className="contact-banner-line" />

            Get in Touch

            <span className="contact-banner-line" />

          </span>


          <h1 className="font-sans">

            We'd Love to<br />

            <span>Hear From You</span>

          </h1>


          <p>
            Whether it's an admissions query, research collaboration,
            or a campus visit — reach us anytime.
          </p>

        </div>

      </section>


      {/* ==========================================
          CONTACT SECTION
          ========================================== */}

      <section className="contact-section">

        <div className="contact-main-container">

          <div className="contact-layout">


            {/* ======================================
                LEFT - ADMISSION ENQUIRY
                ====================================== */}

            <div className="contact-form-card">

              <div className="contact-form-header">

                <div className="contact-form-icon">
                  ✉
                </div>

                <div>

                  <h2>
                    Admission Enquiry
                  </h2>

                  <p>
                    Have questions about admissions? Send us a message.
                  </p>

                </div>

              </div>


              {!submitted ? (

                <form
                  onSubmit={handle}
                  className="contact-form"
                >


                  {/* NAME + EMAIL */}

                  <div className="contact-form-row">

                    <div className="contact-field">

                      <label>
                        Full Name *
                      </label>

                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value
                          })
                        }
                        placeholder="Enter your full name"
                        required
                      />

                    </div>


                    <div className="contact-field">

                      <label>
                        Email Address *
                      </label>

                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            email: e.target.value
                          })
                        }
                        placeholder="Enter your email"
                        required
                      />

                    </div>

                  </div>


                  {/* PHONE + PROGRAMME */}

                  <div className="contact-form-row">

                    <div className="contact-field">

                      <label>
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value
                          })
                        }
                        placeholder="Enter your phone number"
                      />

                    </div>


                    <div className="contact-field">

                      <label>
                        Programme of Interest
                      </label>

                      <select
                        value={form.course}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            course: e.target.value
                          })
                        }
                      >

                        <option value="">
                          Select a programme
                        </option>

                        <option value="B.Sc. Nursing">
                          B.Sc. Nursing
                        </option>

                        <option value="M.Sc. Nursing">
                          M.Sc. Nursing
                        </option>

                        <option value="Post Basic B.Sc. Nursing">
                          Post Basic B.Sc. Nursing
                        </option>

                      </select>

                    </div>

                  </div>


                  {/* MESSAGE */}

                  <div className="contact-field">

                    <label>
                      Your Message
                    </label>

                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          message: e.target.value
                        })
                      }
                      placeholder="Write your message..."
                      rows={6}
                    />

                  </div>


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="contact-submit-btn"
                  >
                    Submit Enquiry
                  </button>


                </form>

              ) : (

                /* SUCCESS MESSAGE */

                <div className="contact-success">

                  <div className="success-icon">
                    ✓
                  </div>

                  <h3>
                    Thank You!
                  </h3>

                  <p>
                    Your enquiry has been submitted successfully.
                  </p>

                  <button
                    type="button"
                    onClick={() => {

                      setSubmitted(false)

                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        course: '',
                        message: ''
                      })

                    }}
                  >
                    Send Another Enquiry
                  </button>

                </div>

              )}

            </div>


            {/* ======================================
                RIGHT SIDE
                ====================================== */}

            <div className="contact-right-column">


              {/* ==================================
                  VISIT US
                  ================================== */}

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  📍
                </div>

                <div className="contact-info-content">

                  <h3>
                    Visit Us
                  </h3>

                  <p>
                    Madha Nagar, Somangalam Road, Kundrathur,
                    <br />
                    Chennai – 600 069, Tamil Nadu
                  </p>

                </div>

              </div>


              {/* ==================================
                  CALL US
                  ================================== */}

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  📞
                </div>

                <div className="contact-info-content">

                  <h3>
                    Call Us
                  </h3>

                  <p>
                    +91 91576 51234
                    <br />
                    +91 72749 01234
                  </p>

                </div>

              </div>


              {/* ==================================
                  EMAIL US
                  ================================== */}

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  ✉
                </div>

                <div className="contact-info-content">

                  <h3>
                    Email Us
                  </h3>

                  <p>
                    info@madhanursing.in
                  </p>

                </div>

              </div>


              {/* ==================================
                  OFFICE HOURS
                  ================================== */}

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  🕐
                </div>

                <div className="contact-info-content">

                  <h3>
                    Office Hours
                  </h3>

                  <p>
                    Mon – Sat: 9:00 AM – 5:30 PM
                    <br />
                    Sunday: Closed
                  </p>

                </div>

              </div>


              {/* ==================================
                  GOOGLE MAP
                  ================================== */}

              <div className="contact-map">

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4623.315388179329!2d80.0805181163073!3d12.9891557286007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528ab1c6803f5b%3A0x2d1ec24ba6bf360e!2sMadha%20Dental%20College%20%26%20Hospital!5e0!3m2!1sen!2sin!4v1788501034038!5m2!1sen!2sin"width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Madha College of Nursing Location"
                />

              </div>


            </div>

          </div>

        </div>

      </section>

    </div>
  )
}