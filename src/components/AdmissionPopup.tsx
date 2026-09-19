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
      const response = await fetch('/api/admission-enquiry', {
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
          align-items: center;
          justify-content: center;

          padding: 15px;
          box-sizing: border-box;

          background: rgba(5, 15, 38, 0.72);

          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);

          animation: popupOverlay .25s ease;
        }


        .admission-popup {
          position: relative;

          width: 350px;
          max-width: 100%;

          background: #ffffff;

          border-radius: 14px;

          overflow: hidden;

          box-shadow:
            0 25px 70px rgba(0, 0, 0, .35),
            0 5px 20px rgba(70, 40, 180, .15);

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
              rgba(181, 77, 255, .85) 0%,
              rgba(124, 67, 225, .45) 50%,
              transparent 72%
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
              rgba(210, 65, 194, .35) 0%,
              rgba(111, 66, 226, .25) 50%,
              transparent 75%
            );

          z-index: -1;
        }


        /* CLOSE */

        .popup-close {
          position: absolute;

          top: 8px;
          right: 8px;

          width: 25px;
          height: 25px;

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

          padding: 20px 27px 17px;

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
          width: 43px;
          height: 43px;

          min-width: 43px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: white;

          background:
            linear-gradient(
              145deg,
              #5031d2,
              #7745e8
            );

          box-shadow:
            0 7px 15px rgba(83, 49, 210, .22);
        }


        .popup-title {
          margin: 0;

          font-family: var(--font-sans, Arial, sans-serif);

          font-size: 19px;

          line-height: 1.1;

          font-weight: 750;

          letter-spacing: -.025em;

          color: #152d5b;
        }


        .popup-title span {
          background:
            linear-gradient(
              90deg,
              #7136d6,
              #d73fbd
            );

          -webkit-background-clip: text;
          background-clip: text;

          -webkit-text-fill-color: transparent;

          color: #7136d6;
        }


        .popup-description {
          margin: 4px 0 0;

          color: #53688c;

          font-size: 9px;

          line-height: 1.4;

          font-weight: 500;
        }


        /* INPUT FIELDS */

        .popup-field {
          position: relative;

          width: 100%;
          height: 28px;

          margin-bottom: 5px;

          display: flex;
          align-items: center;

          border-radius: 7px;

          border: 1px solid rgba(100, 75, 210, .05);

          background:
            linear-gradient(
              90deg,
              #f5f3fc,
              #eeecf9
            );

          box-sizing: border-box;

          transition: .2s ease;
        }


        .popup-field:focus-within {
          background: #ffffff;

          border-color: rgba(103, 61, 216, .32);

          box-shadow:
            0 0 0 2px rgba(103, 61, 216, .07);
        }


        .popup-field-icon {
          width: 34px;
          min-width: 34px;

          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #5e3bd1;

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

          color: #29436f;

          font-family: inherit;

          font-size: 9px;

          font-weight: 500;

          padding: 0 9px 0 0;

          box-sizing: border-box;
        }


        .popup-field input::placeholder {
          color: #8292b1;
          opacity: 1;
        }


        .popup-field select {
          appearance: none;
          -webkit-appearance: none;

          cursor: pointer;

          padding-right: 28px;
        }


        .popup-field select option {
          color: #29436f;
          background: white;
        }


        .popup-select-arrow {
          position: absolute;

          right: 9px;
          top: 50%;

          transform: translateY(-50%);

          color: #5e3bd1;

          display: flex;

          pointer-events: none;
        }


        /* SUBMIT */

        .popup-submit {
          width: 100%;
          height: 31px;

          margin-top: 4px;

          border: none;
          border-radius: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          background:
            linear-gradient(
              90deg,
              #5533d3 0%,
              #793edb 48%,
              #d83fbe 100%
            );

          color: white;

          font-family: inherit;

          font-size: 10px;

          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 7px 15px rgba(101, 56, 210, .18);

          transition: .2s ease;
        }


        .popup-submit:hover:not(:disabled) {
          transform: translateY(-1px);

          box-shadow:
            0 9px 20px rgba(101, 56, 210, .28);

          filter: brightness(1.04);
        }


        .popup-submit:disabled {
          opacity: .7;
          cursor: not-allowed;
        }


        /* FOOTER */

        .popup-priority {
          display: flex;
          align-items: center;

          gap: 5px;

          margin-top: 8px;

          color: #566a8d;

          font-size: 8px;

          font-weight: 600;
        }


        .popup-priority svg {
          color: #633bd7;
        }


        /* SUCCESS */

        .popup-success {
          min-height: 270px;

          padding: 35px 25px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;

          box-sizing: border-box;
        }


        .popup-success-icon {
          width: 55px;
          height: 55px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              #5635d6,
              #d63fbc
            );

          color: white;

          font-size: 26px;

          margin-bottom: 14px;
        }


        .popup-success h2 {
          margin: 0 0 7px;

          color: #142b58;

          font-size: 22px;
        }


        .popup-success p {
          margin: 0 0 20px;

          color: #61718e;

          font-size: 13px;
        }


        .popup-success-button {
          height: 36px;

          padding: 0 25px;

          border: none;
          border-radius: 20px;

          color: white;

          background:
            linear-gradient(
              90deg,
              #5635d6,
              #d63fbc
            );

          cursor: pointer;

          font-weight: 700;
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

        @media (max-width: 600px) {

          .admission-popup-overlay {
            padding: 12px;
          }


          .admission-popup {
            width: 350px;
            max-width: 100%;
          }


          .popup-form {
            padding: 19px 23px 16px;
          }


          .popup-title {
            font-size: 18px;
          }


          .popup-description {
            font-size: 8.5px;
          }


          .popup-field {
            height: 29px;
          }


          .popup-field input,
          .popup-field select {
            font-size: 9px;
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
            font-size: 17px;
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