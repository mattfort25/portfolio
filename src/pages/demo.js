// pages/demo.js
import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Demo.module.css";

export default function Demo() {
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    role: "",
    workEmail: "",
    phone: "",
    primaryInterest: "",
    regions: [],
    demoFormat: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const regions = [
    "North America",
    "Europe",
    "Asia-Pacific",
    "Middle East & Africa",
    "Latin America",
    "Southeast Asia",
    "Eastern Europe",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      regions: checked
        ? [...prev.regions, value]
        : prev.regions.filter((region) => region !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Demo Request Submitted – Metanym</title>
          <meta
            name="description"
            content="Thank you for requesting a Metanym demo."
          />
        </Head>

        <div className={styles.successContainer}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <h1 className={styles.successTitle}>Demo Request Submitted!</h1>
            <p className={styles.successMessage}>
              Thank you for your interest in Metanym. Our team will review your
              request and contact you within 24 hours to schedule your
              personalized demo.
            </p>
            <a href="/" className={styles.backButton}>
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Request a Demo – Metanym</title>
        <meta
          name="description"
          content="Experience how Metanym's geopolitical dashboard turns complex global events into clear, actionable intelligence."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </Head>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>See Metanym in Action</h1>
            <p className={styles.heroSubtitle}>
              Experience how our geopolitical dashboard turns complex global
              events into clear, actionable intelligence.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.content}>
              {/* Sub-Header */}
              <div className={styles.subHeader}>
                <p className={styles.subHeaderText}>
                  Whether you're monitoring emerging risks, evaluating
                  investments, or preparing policy responses, Metanym delivers
                  the insights you need—when you need them.
                </p>
              </div>

              {/* Demo Request Form */}
              <div className={styles.formSection}>
                <div className={styles.formCard}>
                  <h2 className={styles.formTitle}>Demo Request Form</h2>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.label}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="organization" className={styles.label}>
                          Organization / Company *
                        </label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                          placeholder="Enter your organization"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="role" className={styles.label}>
                          Role / Title *
                        </label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                          placeholder="Enter your role or title"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="workEmail" className={styles.label}>
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="workEmail"
                          name="workEmail"
                          value={formData.workEmail}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                          placeholder="Enter your work email"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={styles.input}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label
                          htmlFor="primaryInterest"
                          className={styles.label}
                        >
                          Primary Area of Interest *
                        </label>
                        <select
                          id="primaryInterest"
                          name="primaryInterest"
                          value={formData.primaryInterest}
                          onChange={handleInputChange}
                          className={styles.select}
                          required
                        >
                          <option value="">Select an area of interest</option>
                          <option value="Business Risk">Business Risk</option>
                          <option value="Financial Risk">Financial Risk</option>
                          <option value="Policy/NGO">Policy/NGO</option>
                          <option value="Research">Research</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="demoFormat" className={styles.label}>
                          Preferred Demo Format *
                        </label>
                        <select
                          id="demoFormat"
                          name="demoFormat"
                          value={formData.demoFormat}
                          onChange={handleInputChange}
                          className={styles.select}
                          required
                        >
                          <option value="">Select demo format</option>
                          <option value="Live walk-through">
                            Live walk-through
                          </option>
                          <option value="Pre-recorded overview">
                            Pre-recorded overview
                          </option>
                          <option value="Custom use case">
                            Custom use case
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Regions of Interest */}
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Regions of Interest *
                      </label>
                      <div className={styles.checkboxGrid}>
                        {regions.map((region) => (
                          <label key={region} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              value={region}
                              checked={formData.regions.includes(region)}
                              onChange={handleRegionChange}
                              className={styles.checkbox}
                            />
                            <span className={styles.checkboxText}>
                              {region}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={styles.label}>
                        Message / Notes (optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={styles.textarea}
                        rows="4"
                        placeholder="Tell us more about your specific needs or questions..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-hand-point-right"></i>
                          Request My Demo
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
