import { useState } from 'react'

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

  const handleSubmit = async (e: React.FormEvent) => {
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

      // Show success message inside the popup
      setSubmitted(true)

    } catch (error) {
      console.error('Admission enquiry error:', error)

      // This alert is only for an actual error
      alert('Unable to send enquiry. Please try again.')

    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* =====================================================
          ADMISSION ENQUIRY POPUP
          ===================================================== */}

      <div className="admission-popup-overlay">

        <div
          className="admission-popup"
          onClick={(e) => e.stopPropagation()}
        >

          {/* =================================================
              HEADER
              ================================================= */}

          <div className="admission-popup-header">

            <div className="admission-popup-title">
              Admission Enquiry
            </div>

            <button
              type="button"
              className="admission-popup-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>

          </div>


          {/* =================================================
              SUCCESS MESSAGE / FORM
              ================================================= */}

          {submitted ? (

            <div className="admission-popup-success">

              <div className="admission-popup-success-icon">
                ✓
              </div>

              <div className="admission-popup-success-title">
                Thank You!
              </div>

              <div className="admission-popup-success-message">
                Your enquiry has been submitted successfully.
              </div>

              <button
                type="button"
                className="admission-popup-success-close"
                onClick={onClose}
              >
                Close
              </button>

            </div>

          ) : (

            <form
              className="admission-popup-form"
              onSubmit={handleSubmit}
            >

              {/* =================================================
                  NAME
                  ================================================= */}

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


              {/* =================================================
                  COURSE
                  ================================================= */}

              <label className="admission-popup-course-label">
                Select Course *
              </label>

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
                  Select Course
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


              {/* =================================================
                  MOBILE
                  ================================================= */}

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


              {/* =================================================
                  EMAIL
                  ================================================= */}

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


              {/* =================================================
                  SUBMIT
                  ================================================= */}

              <button
                type="submit"
                className="admission-popup-submit"
                disabled={sending}
              >
                {sending ? 'Submitting...' : 'Submit'}
              </button>

            </form>

          )}

        </div>

      </div>


      {/* =====================================================
          CSS
          ===================================================== */}

      <style>{`

        /* =====================================================
           POPUP OVERLAY
           ===================================================== */

        .admission-popup-overlay {
          position: fixed;
          inset: 0;

          width: 100%;
          height: 100%;

          background: rgba(0, 0, 0, 0.58);

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 999999;

          padding: 20px;

          box-sizing: border-box;
        }


        /* =====================================================
           POPUP BOX
           ===================================================== */

        .admission-popup {
          width: 455px;
          max-width: 100%;

          background: #ffffff;

          box-shadow:
            0 10px 35px rgba(0, 0, 0, 0.30);

          overflow: hidden;

          box-sizing: border-box;
        }


        /* =====================================================
           HEADER
           ===================================================== */

        .admission-popup-header {
          position: relative;

          width: 100%;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #F26A3D;

          color: #ffffff;
        }


        .admission-popup-title {
          font-size: 23px;
          font-weight: 500;

          line-height: 1;
        }


        /* =====================================================
           CLOSE BUTTON
           ===================================================== */

        .admission-popup-close {
          position: absolute;

          right: 0;
          top: 0;

          width: 42px;
          height: 58px;

          border: none;

          background: #0B2545;
          color: #ffffff;

          font-size: 27px;
          font-weight: 600;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;
        }


        .admission-popup-close:hover {
          background: #071A36;
        }


        /* =====================================================
           FORM
           ===================================================== */

        .admission-popup-form {
          width: 100%;

          padding: 15px 14px 28px;

          box-sizing: border-box;
        }


        /* =====================================================
           INPUTS + SELECT
           ===================================================== */

        .admission-popup-form input,
        .admission-popup-form select {
          width: 100%;
          height: 38px;

          border: 1px solid #d4d4d4;
          border-radius: 0;

          background: #ffffff;

          padding: 0 10px;

          font-family: inherit;
          font-size: 14px;

          color: #333333;

          outline: none;

          box-sizing: border-box;
        }


        .admission-popup-form input:focus,
        .admission-popup-form select:focus {
          border-color: #0B2545;
        }


        /* =====================================================
           COURSE LABEL
           ===================================================== */

        .admission-popup-course-label {
          display: block;

          margin-top: 22px;
          margin-bottom: 7px;

          font-size: 18px;
          font-weight: 600;

          color: #0B2545;
        }


        /* =====================================================
           FIELD SPACING
           ===================================================== */

        .admission-popup-form input {
          margin-bottom: 18px;
        }


        .admission-popup-form select {
          margin-bottom: 18px;
        }


        /* =====================================================
           SUBMIT BUTTON
           ===================================================== */

        .admission-popup-submit {
          min-width: 100px;
          height: 42px;

          border: none;
          border-radius: 0;

          background: #0B2545;
          color: #ffffff;

          padding: 0 24px;

          font-family: inherit;
          font-size: 14px;
          font-weight: 500;

          cursor: pointer;
        }


        .admission-popup-submit:hover {
          background: #071A36;
        }


        .admission-popup-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }


        /* =====================================================
           SUCCESS MESSAGE
           ===================================================== */

        .admission-popup-success {
          min-height: 260px;

          padding: 35px 25px;

          box-sizing: border-box;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;

          background: #ffffff;
        }


        .admission-popup-success-icon {
          width: 58px;
          height: 58px;

          border-radius: 50%;

          background: #0B2545;
          color: #ffffff;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 30px;
          font-weight: 700;

          margin-bottom: 18px;
        }


        .admission-popup-success-title {
          font-size: 24px;
          font-weight: 700;

          color: #0B2545;

          margin-bottom: 10px;
        }


        .admission-popup-success-message {
          font-size: 16px;

          color: #475569;

          line-height: 1.6;

          margin-bottom: 24px;
        }


        .admission-popup-success-close {
          height: 42px;

          border: none;
          border-radius: 0;

          background: #0B2545;
          color: #ffffff;

          padding: 0 25px;

          font-family: inherit;
          font-size: 14px;
          font-weight: 500;

          cursor: pointer;
        }


        .admission-popup-success-close:hover {
          background: #071A36;
        }


        /* =====================================================
           MOBILE
           ===================================================== */

        @media (max-width: 600px) {

          .admission-popup-overlay {
            padding: 15px;
          }


          .admission-popup {
            width: 100%;
            max-width: 455px;
          }


          .admission-popup-header {
            height: 54px;
          }


          .admission-popup-title {
            font-size: 20px;
          }


          .admission-popup-close {
            width: 40px;
            height: 54px;
          }


          .admission-popup-form {
            padding: 14px 12px 24px;
          }


          .admission-popup-success {
            min-height: 240px;

            padding: 30px 20px;
          }


          .admission-popup-success-title {
            font-size: 22px;
          }


          .admission-popup-success-message {
            font-size: 15px;
          }

        }

      `}</style>
    </>
  )
}