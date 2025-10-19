// porfolio/src/pages/demo.js (Modified)
import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Demo.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { requestDemoAndCreateUser } from "@/services";

export default function Demo() {
  const router = useRouter();
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
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

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
    setMessage("");
    setIsError(false);

    if (
      !formData.fullName ||
      !formData.organization ||
      !formData.role ||
      !formData.workEmail ||
      !formData.primaryInterest ||
      !formData.demoFormat ||
      !formData.password
    ) {
      setMessage("Please fill in all required fields (*).");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    // Additional password strength check
    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    if (formData.regions.length === 0) {
      setMessage("Please select at least one Region of Interest (*).");
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    const userData = {
      name: formData.fullName,
      email: formData.workEmail,
      password: formData.password,
      organization: formData.organization,
      role: formData.role,
      phone: formData.phone,
      primaryInterest: formData.primaryInterest,
      regions: formData.regions,
      demoFormat: formData.demoFormat,
      message: formData.message,
    };

    const result = await requestDemoAndCreateUser(userData);

    if (result.success) {
      setMessage(result.message);
      setIsSubmitted(true);
    } else {
      setMessage(
        result.message || "An error occurred during the demo request."
      );
      setIsError(true);
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Demo Request Submitted – Metanym Risk</title>
          <meta
            name="description"
            content="Thank you for requesting a Metanym demo."
          />
        </Head>

        <div className={styles.successContainer}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h1 className={styles.successTitle}>Request Received</h1>
            <p className={styles.successMessage}>
              Thank you for your interest. We've created your account. Please
              check your account by logging in with your email and the password
              you provided.
            </p>
            <Link href="/auth/login" className={styles.backButton}>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Request a Demo – Metanym Risk</title>
        <meta
          name="description"
          content="Experience how Metanym Risk transforms complex global events into clear, actionable intelligence."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1>Request Access</h1>
            <p className={styles.subtitle}>
              Experience how our platform turns complex global events into
              clear, actionable intelligence.
            </p>
            {message && (
              <p
                className={`${styles.message} ${
                  isError ? styles.error : styles.success
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.mainContent}>
          <div className={styles.contentContainer}>
            {/* Sub-Header */}
            <div className={styles.subHeader}>
              <p className={styles.subHeaderText}>
                Whether you're monitoring emerging risks, evaluating
                investments, or preparing policy responses, Metanym Risk
                delivers the insights you need—when you need them.
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
                      <label htmlFor="password" className={styles.label}>
                        Create Password *
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        minLength="8"
                        placeholder="Minimum 8 characters"
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
                      <label htmlFor="primaryInterest" className={styles.label}>
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
                        <option value="Custom use case">Custom use case</option>
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
                          <span className={styles.checkboxText}>{region}</span>
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

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request My Demo"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
