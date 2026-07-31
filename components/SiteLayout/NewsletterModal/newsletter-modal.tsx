'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { newsletterPopupContent } from '@/data/promo-banners';

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const titleId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = useCallback(() => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    emailRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data?.error ?? newsletterPopupContent.errorMessage);
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(newsletterPopupContent.errorMessage);
    }
  };

  return createPortal(
    <div className="newsletter-modal-root" role="presentation">
      <button
        type="button"
        className="newsletter-modal-scrim"
        aria-label="Close newsletter popup"
        onClick={handleClose}
      />
      <div
        className="newsletter-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="newsletter-modal-close"
          aria-label="Close newsletter popup"
          onClick={handleClose}
        >
          <span aria-hidden>×</span>
        </button>

        <h2 id={titleId} className="newsletter-modal-title">
          {newsletterPopupContent.title}
        </h2>

        <p className="newsletter-modal-subtitle">
          {newsletterPopupContent.subtitle}
        </p>

        {status === 'success' ? (
          <p className="newsletter-modal-success" role="status">
            {newsletterPopupContent.successMessage}
          </p>
        ) : (
          <form className="newsletter-modal-form" onSubmit={handleSubmit}>
            <div className="newsletter-modal-field">
              <label htmlFor="newsletter-modal-email" className="sr-only">
                Email address
              </label>
              <input
                ref={emailRef}
                id="newsletter-modal-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder={newsletterPopupContent.emailPlaceholder}
                value={email}
                disabled={status === 'loading'}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit" disabled={status === 'loading'}>
                {status === 'loading'
                  ? 'Signing up…'
                  : newsletterPopupContent.submitLabel}
              </button>
            </div>
            {status === 'error' && errorMessage ? (
              <p className="newsletter-modal-error" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </form>
        )}

        <p className="newsletter-modal-legal">
          {newsletterPopupContent.legalText}
        </p>
      </div>
    </div>,
    document.body,
  );
}
