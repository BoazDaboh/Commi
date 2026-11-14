"use client";

import { useState, type FormEvent } from "react";
import styles from "@/app/page.module.css";

export default function FeedbackForm() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Not sent. Feedback is not connected yet.");
  }

  return (
    <form
      className={styles.feedbackForm}
      onSubmit={submit}
      aria-label="Share feedback"
      aria-describedby="feedback-note"
    >
      <div className={styles.feedbackBlock}>
        <label htmlFor="feedback-details" className={styles.srOnly}>
          Your thoughts
        </label>
        <textarea
          id="feedback-details"
          name="details"
          placeholder="Your feedback"
          rows={6}
          minLength={10}
          maxLength={3000}
          required
          onChange={() => setStatus("")}
        />
        <hr className={styles.feedbackDivider} />
        <label htmlFor="feedback-email" className={styles.srOnly}>
          Your email
        </label>
        <input
          id="feedback-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email"
          required
          maxLength={254}
          onChange={() => setStatus("")}
        />
      </div>
      <div className={styles.feedbackActions}>
        <p id="feedback-note">Preview only. Messages aren’t sent.</p>
        <button type="submit">
          Send feedback <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className={styles.feedbackStatus} role="status">
        {status}
      </p>
    </form>
  );
}
