import { useState, type FormEvent } from 'react'

interface AdmissionPopupProps {
  onClose: () => void
}

export default function AdmissionPopup({
  onClose,
}: AdmissionPopupProps) {
  const [form, setForm] = useState({
    name: '',
    course: '',
    phone: '',
    email: '',
  })

  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (sending) return

    setSending(true)

    try {
      const response = await fetch('https://madha-nursing-api.onrender.com/api/admission-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: form.course,
          message: 'Admission enquiry submitted from popup.',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send enquiry')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Admission enquiry error:', error)
      alert('Unable to send enquiry. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className="admission-popup-overlay">
        <div
          className="admission-popup"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Decorative shapes */}
          <div className="popup-purple-top" />
          <div className="popup-purple-bottom" />

          {/* Close */}
          <button
            type="button"
            className="popup-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          {submitted ? (

            /* SUCCESS */
            <div className="popup-success">

              <div className="popup-success-icon">
                ✓
              </div>

              <h2>Thank You!</h2>

              <p>
                Your enquiry has been submitted successfully.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="popup-success-button"
              >
                Close
              </button>

            </div>

          ) : (

            /* FORM */
            <form
              className="popup-form"
              onSubmit={handleSubmit}
            >

              {/* HEADER */}
              <div className="popup-header">

                <div className="popup-cap-icon">

                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 9.5L12 4l9.5 5.5L12 15 2.5 9.5Z" />
                    <path d="M6 12v4c0 1.2 2.7 3.3 6 3.3s6-2.1 6-3.3v-4" />
                    <path d="M21.5 9.5v5" />
                  </svg>

                </div>

                <div>

                  <h2 className="popup-title">
                    Admission <span>Enquiry</span>
                  </h2>

                  <p className="popup-description">
                    Fill in your details and we will get back to you
                    <br />
                    with the best guidance.
                  </p>

                </div>

              </div>


              {/* NAME */}
              <div className="popup-field">

                <div className="popup-field-icon">

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
                  </svg>

                </div>

                <input
                  type="text"
                  placeholder="Name *"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* COURSE */}
              <div className="popup-field">

                <div className="popup-field-icon">

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
                    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
                    <path d="M8 7h8M8 10h6" />
                  </svg>

                </div>

                <select
                  value={form.course}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      course: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select Course *
                  </option>

                  <option value="B.Sc Nursing">
                    B.Sc Nursing
                  </option>

                  <option value="M.Sc Nursing">
                    M.Sc Nursing
                  </option>

                  <option value="Post Basic B.Sc Nursing">
                    Post Basic B.Sc Nursing
                  </option>

                  <option value="GNM">
                    GNM
                  </option>
                </select>

                <div className="popup-select-arrow">

                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>

                </div>

              </div>


              {/* MOBILE */}
              <div className="popup-field">

                <div className="popup-field-icon">

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6.5 3.5h3l1.4 4-2.1 1.7a15.4 15.4 0 0 0 6 6l1.7-2.1 4 1.4v3c0 1.1-.9 2-2 2C10.2 19.5 4.5 13.8 4.5 5.5c0-1.1.9-2 2-2Z" />
                  </svg>

                </div>

                <input
                  type="tel"
                  placeholder="Mobile Number *"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* EMAIL */}
              <div className="popup-field">

                <div className="popup-field-icon">

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="m4 7 8 6 8-6" />
                  </svg>

                </div>

                <input
                  type="email"
                  placeholder="Email Id"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />

              </div>


              {/* SUBMIT */}
              <button
                type="submit"
                className="popup-submit"
                disabled={sending}
              >

                <span>
                  {sending ? 'Submitting...' : 'Submit'}
                </span>

                {!sending && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h13" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                )}

              </button>


              {/* FOOTER */}
              <div className="popup-priority">

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 8.7c0 5.2-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.7A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.3Z" />
                </svg>

                <span>
                  Your future is our priority
                </span>

              </div>

            </form>
          )}

        </div>
      </div>


      {/* =====================================================
          POPUP CSS
          ===================================================== */}

      <style>{`

        .admission-popup-overlay {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 999999;

          display: flex;
          align-items: flex-start;
          justify-content: center;

          /* Move popup closer to the website header */
          padding: 185px 15px 30px;
          box-sizing: border-box;

          background: rgba(5, 15, 38, 0.72);

          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);

          animation: popupOverlay .25s ease;
        }


        .admission-popup {
          position: relative;

          width: 480px;
          max-width: 100%;

          background: #ffffff;

          border: 1px solid rgba(151, 165, 210, 0.34);

          border-radius: 16px;

          overflow: hidden;

          box-shadow:
            0 28px 75px rgba(2, 16, 43, .42),
            0 8px 28px rgba(48, 61, 125, .20);

          isolation: isolate;

          animation: popupOpen .3s cubic-bezier(.16, 1, .3, 1);
        }


        /* TOP PURPLE DECORATION */

        .popup-purple-top {
          position: absolute;

          width: 145px;
          height: 105px;

          top: -60px;
          left: -65px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(198, 177, 255, .90) 0%,
              rgba(165, 140, 235, .55) 48%,
              rgba(165, 140, 235, 0) 74%
            );

          z-index: -1;
        }


        /* BOTTOM PURPLE DECORATION */

        .popup-purple-bottom {
          position: absolute;

          width: 230px;
          height: 115px;

          right: -70px;
          bottom: -65px;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(198, 177, 255, .52) 0%,
              rgba(165, 140, 235, .34) 50%,
              rgba(165, 140, 235, 0) 76%
            );

          z-index: -1;
        }


        /* CLOSE */

        .popup-close {
          position: absolute;

          top: 8px;
          right: 8px;

          width: 28px;
          height: 28px;

          border: none;
          border-radius: 50%;

          background: transparent;

          color: #26395e;

          font-size: 21px;
          font-weight: 400;

          line-height: 1;

          cursor: pointer;

          z-index: 10;

          display: flex;
          align-items: center;
          justify-content: center;

          transition: .2s ease;
        }


        .popup-close:hover {
          background: #633bd7;
          color: white;
          transform: rotate(90deg);
        }


        /* FORM */

        .popup-form {
          position: relative;

          padding: 30px 38px 25px;

          box-sizing: border-box;
        }


        /* HEADER */

        .popup-header {
          display: flex;
          align-items: flex-start;

          gap: 12px;

          margin-bottom: 13px;

          padding-right: 18px;
        }


        .popup-cap-icon {
          width: 58px;
          height: 58px;

          min-width: 58px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: white;

          background:
            linear-gradient(
              145deg,
              #071a36 0%,
              #0b2545 100%
            );

          box-shadow:
            0 7px 15px rgba(7, 26, 54, .24);
        }


        .popup-title {
          margin: 0;

          color: #032F70;

          font-family: var(--font-sans, Arial, sans-serif);

          font-size: 28px;

          line-height: 1.1;

          font-weight: 800;

          letter-spacing: -0.025em;
        }


        .popup-title span {
          color: #032F70;

          background: none;

          -webkit-background-clip: initial;
          background-clip: initial;

          -webkit-text-fill-color: initial;
        }


        .popup-description {
          margin: 5px 0 0;

          color: #36547D;

          font-size: 12px;

          line-height: 1.5;

          font-weight: 600;
        }


        /* INPUT FIELDS */

        .popup-field {
          position: relative;

          width: 100%;
          height: 43px;

          margin-bottom: 9px;

          display: flex;
          align-items: center;

          border: 1px solid rgba(3, 47, 112, 0.18);

          border-radius: 9px;

          background: #f7f9fd;

          box-sizing: border-box;

          transition:
            background .2s ease,
            border-color .2s ease,
            box-shadow .2s ease;
        }


        .popup-field:focus-within {
          background: #ffffff;

          border-color: #032F70;

          box-shadow:
            0 0 0 2px rgba(3, 47, 112, 0.08);
        }


        .popup-field-icon {
          width: 38px;
          min-width: 38px;

          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #032F70;

          opacity: 1;
          filter: none;

          pointer-events: none;
        }


        .popup-field input,
        .popup-field select {
          width: 100%;
          height: 100%;

          min-width: 0;

          border: none;
          outline: none;

          background: transparent;

          color: #032F70;

          font-family: inherit;

          font-size: 14px;

          font-weight:  800;

          opacity: 1;
          filter: none;

          padding: 0 10px 0 0;

          box-sizing: border-box;
        }


        .popup-field input::placeholder {
          color: #032F70;

          opacity: 1;

          font-weight: 700;
        }


        .popup-field select {
          appearance: none;
          -webkit-appearance: none;

          cursor: pointer;

          color: #032F70;

          font-weight: 700;

          padding-right: 30px;
        }


        .popup-field select option {
          color: #032F70;
          background: #ffffff;
          font-weight: 700;
        }


        .popup-select-arrow {
          position: absolute;

          right: 11px;
          top: 50%;

          transform: translateY(-50%);

          color: #032F70;

          display: flex;
          align-items: center;

          opacity: 1;

          pointer-events: none;
        }


        /* CRISP FIELD TYPOGRAPHY */
        .popup-field input,
        .popup-field select {
          color: #032F70 !important;
          font-family: Arial, Helvetica, sans-serif !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          opacity: 1 !important;
          filter: none !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
          text-shadow: none !important;
        }

        .popup-field input::placeholder {
          color: #032F70 !important;
          opacity: 1 !important;
          font-family: Arial, Helvetica, sans-serif !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          text-shadow: none !important;
        }

        .popup-field select {
          color: #032F70 !important;
          font-size: 14px !important;
          font-weight: 800 !important;
        }

        .popup-field select option {
          color: #032F70 !important;
          background: #ffffff !important;
          font-family: Arial, Helvetica, sans-serif !important;
          font-size: 14px !important;
          font-weight: 800 !important;
        }

        .popup-field {
          height: 46px;
        }


        /* SUBMIT */

        .popup-submit {
          width: 100%;
          height: 47px;

          margin-top: 9px;

          border: none;
          border-radius: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          background: #032F70;

          color: #ffffff;

          font-family: inherit;

          font-size: 14px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 7px 16px rgba(3, 47, 112, 0.22);

          transition:
            background .2s ease,
            transform .2s ease,
            box-shadow .2s ease;
        }


        .popup-submit:hover:not(:disabled) {
          background: #08245A;

          transform: translateY(-1px);

          box-shadow:
            0 10px 22px rgba(3, 47, 112, 0.30);
        }


        .popup-submit:active:not(:disabled) {
          transform: translateY(0);
        }


        .popup-submit:disabled {
          opacity: .72;
          cursor: not-allowed;
        }


        /* FOOTER */

        .popup-priority {
          display: flex;
          align-items: center;

          gap: 6px;

          margin-top: 9px;

          color: #032F70;

          font-size: 10px;

          font-weight: 700;
        }


        .popup-priority svg {
          color: #032F70;
        }


        /* SUCCESS */

        .popup-success {
          position: relative;

          min-height: 310px;

          padding: 42px 30px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;

          box-sizing: border-box;

          overflow: hidden;

          background: #ffffff;
        }


        .popup-success::before {
          content: "";

          position: absolute;

          width: 135px;
          height: 100px;

          top: -55px;
          left: -55px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(198, 177, 255, 0.90) 0%,
              rgba(165, 140, 235, 0.55) 48%,
              rgba(165, 140, 235, 0) 74%
            );

          pointer-events: none;
        }


        .popup-success::after {
          content: "";

          position: absolute;

          width: 220px;
          height: 110px;

          right: -70px;
          bottom: -65px;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(198, 177, 255, 0.52) 0%,
              rgba(165, 140, 235, 0.34) 50%,
              rgba(165, 140, 235, 0) 76%
            );

          pointer-events: none;
        }


        .popup-success > * {
          position: relative;
          z-index: 1;
        }


        .popup-success-icon {
          width: 58px;
          height: 58px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #032F70;

          color: #ffffff;

          font-size: 28px;
          font-weight: 800;

          margin-bottom: 16px;

          box-shadow:
            0 8px 18px rgba(3, 47, 112, 0.22);
        }


        .popup-success h2 {
          margin: 0 0 8px;

          color: #032F70;

          font-size: 25px;
          font-weight: 800;
        }


        .popup-success p {
          margin: 0 0 22px;

          color: #36547D;

          font-size: 13px;
          font-weight: 600;
        }


        .popup-success-button {
          height: 40px;

          padding: 0 28px;

          border: none;
          border-radius: 22px;

          color: #ffffff;

          background: #032F70;

          cursor: pointer;

          font-family: inherit;
          font-size: 13px;
          font-weight: 800;

          box-shadow:
            0 7px 16px rgba(3, 47, 112, 0.22);

          transition:
            background .2s ease,
            transform .2s ease,
            box-shadow .2s ease;
        }


        .popup-success-button:hover {
          background: #08245A;

          transform: translateY(-1px);

          box-shadow:
            0 10px 22px rgba(3, 47, 112, 0.30);
        }


        /* ANIMATION */

        @keyframes popupOverlay {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }


        @keyframes popupOpen {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }


        /* MOBILE */

        @media (max-height: 700px) and (min-width: 601px) {

          .admission-popup-overlay {
            align-items: flex-start;
            padding-top: 105px;
            overflow-y: auto;
          }

        }


        @media (max-width: 600px) {

          .admission-popup-overlay {
            align-items: center;
            padding: 15px;
            overflow-y: auto;
          }


          .admission-popup {
            width: 480px;
            max-width: 100%;
          }


          .popup-form {
            padding: 26px 30px 22px;
          }


          .popup-title {
            font-size: 20px;
          }


          .popup-description {
            font-size: 10px;
          }


          .popup-field {
            height: 42px;
          }


          .popup-field input,
          .popup-field select {
            font-size: 10.5px;
          }


          .popup-submit {
            height: 45px;
          }

        }


        @media (max-width: 360px) {

          .admission-popup {
            width: 100%;
          }


          .popup-form {
            padding: 18px 20px 15px;
          }


          .popup-title {
            font-size: 22px;
            font-weight: 800;
          }


          .popup-cap-icon {
            width: 40px;
            height: 40px;
            min-width: 40px;
          }

        }

      `}</style>
    </>
  )
}