"use client";

import { FormEvent, useState } from "react";

import { ContactSelect } from "@/components/contact-select";
import { contactCountries } from "@/data/contact-countries";
import styles from "./contact-page.module.css";

const enquiryTypes = [
  "General",
  "Product Related",
  "Technical Issues (Website)",
  "Technical Issues (Apps - iOS)",
  "Technical Issues (Apps - Android)",
  "Trade Enquiry - Stock Our Products",
  "Partner with us",
  "Unsubscribe from AK Club - Delete my data",
  "Press and Media",
  "Competitions",
  "Work for us",
  "Others",
];

type FormErrors = {
  enquiryType?: string;
  firstName?: string;
  email?: string;
  country?: string;
};

function validateForm(formData: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.get("enquiryType")) {
    errors.enquiryType = "This field is required. Please select a value.";
  }

  if (!String(formData.get("firstName") ?? "").trim()) {
    errors.firstName = "This field is required. Please input your name.";
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    errors.email = "This field is required. Please input a valid email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "This field is required. Please input a valid email.";
  }

  if (!formData.get("country")) {
    errors.country = "This field is required. Please select the country.";
  }

  return errors;
}

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [enquiryType, setEnquiryType] = useState("");
  const [country, setCountry] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.intro}>
          We love to hear from our customers and website visitors so please feel free to drop us a line
          – no matter what your enquiry is about. If you love our products or have a suggestion, we&apos;d
          especially love to hear your thoughts.
        </p>
        <p className={styles.intro}>We look to respond to all enquiries within two working days.</p>

        <div className={styles.formCard}>
          {submitted ? (
            <p className={styles.successMessage}>
              Thank you for your message. We aim to respond within two working days.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <ContactSelect
                  name="enquiryType"
                  value={enquiryType}
                  placeholder="Type of Enquiry"
                  options={enquiryTypes}
                  hasError={Boolean(errors.enquiryType)}
                  onChange={(nextValue) => {
                    setEnquiryType(nextValue);
                    if (errors.enquiryType) {
                      setErrors((current) => ({ ...current, enquiryType: undefined }));
                    }
                  }}
                />
                {errors.enquiryType ? <p className={styles.error}>{errors.enquiryType}</p> : null}
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <input
                    id="firstName"
                    className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    autoComplete="given-name"
                    onChange={() => {
                      if (errors.firstName) {
                        setErrors((current) => ({ ...current, firstName: undefined }));
                      }
                    }}
                  />
                  {errors.firstName ? <p className={styles.error}>{errors.firstName}</p> : null}
                </div>

                <div className={styles.field}>
                  <input
                    id="lastName"
                    className={styles.input}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <input
                  id="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  autoComplete="email"
                  onChange={() => {
                    if (errors.email) {
                      setErrors((current) => ({ ...current, email: undefined }));
                    }
                  }}
                />
                {errors.email ? <p className={styles.error}>{errors.email}</p> : null}
              </div>

              <div className={styles.field}>
                <ContactSelect
                  name="country"
                  value={country}
                  placeholder="Select country"
                  options={contactCountries}
                  hasError={Boolean(errors.country)}
                  onChange={(nextValue) => {
                    setCountry(nextValue);
                    if (errors.country) {
                      setErrors((current) => ({ ...current, country: undefined }));
                    }
                  }}
                />
                {errors.country ? <p className={styles.error}>{errors.country}</p> : null}
              </div>

              <div className={styles.field}>
                <textarea
                  className={styles.textarea}
                  name="message"
                  rows={6}
                  placeholder="Enter your message"
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          )}
        </div>

        <p className={styles.emailNote}>
          You can also email us directly at{" "}
          <a href="mailto:contact@annabelkarmel.com" className={styles.emailLink}>
            contact@annabelkarmel.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
