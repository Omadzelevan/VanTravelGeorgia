import { useState } from "react";
// import PropTypes from "prop-types";
import "../../styles/bookingmodal.css";

const API_BASE = (import.meta.env.VITE_API_BASE || "/api").replace(/\/+$/, "");

export default function BookingModal({ isOpen, onClose, tour }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: 1,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour.id,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          date: formData.date,
          guests: Number(formData.guests),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Booking request failed");
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          guests: 1,
          message: "",
        });
        onClose();
      }, 3000);
    } catch (error) {
      setErrorText(
        error.message || "Failed to submit booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = tour.price * formData.guests;

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {!isSuccess ? (
          <>
            <div className="modal-header">
              <h2>Book Your Tour</h2>
              <p className="modal-tour-title">{tour.title}</p>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+995 555 123 456"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <div className="guests-selector">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        guests: Math.max(1, prev.guests - 1),
                      }))
                    }
                    className="guests-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="20"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        guests: Math.min(20, prev.guests + 1),
                      }))
                    }
                    className="guests-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Special Requests (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any special requirements or questions..."
                ></textarea>
              </div>

              <div className="booking-summary">
                <div className="summary-row">
                  <span>Price per person:</span>
                  <span>${tour.price}</span>
                </div>
                <div className="summary-row">
                  <span>Number of guests:</span>
                  <span>{formData.guests}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Price:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <button
                type="submit"
                className="submit-booking-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading-spinner">Processing...</span>
                ) : (
                  "Confirm Booking"
                )}
              </button>

              <p className="booking-disclaimer">
                * You will receive a confirmation email within 24 hours. Final
                payment can be made on the tour day.
              </p>
              {errorText ? <p className="booking-error">{errorText}</p> : null}
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Booking Successful!</h2>
            <p>
              Thank you for booking <strong>{tour.title}</strong>!
            </p>
            <p>
              We've sent a confirmation email to{" "}
              <strong>{formData.email}</strong>
            </p>
            <p className="success-note">
              Our team will contact you within 24 hours to confirm the details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
