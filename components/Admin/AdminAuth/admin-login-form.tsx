'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import {
  getSafeAdminNextPath,
  setAdminSession,
  validateAdminCredentials,
} from '@/lib/admin/auth-session';
import styles from './admin-login-form.module.css';

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!validateAdminCredentials(email, password)) {
      setError('Invalid email or password.');
      setSubmitting(false);
      return;
    }

    setAdminSession(email);
    const next = getSafeAdminNextPath(searchParams.get('next'));
    router.replace(next);
  };

  return (
    <div className={`adminRoot ${styles.loginPage}`}>
      <div className={styles.loginCard}>
        <div className={styles.brand}>
          <Link href="/" aria-label="Annabel Karmel home">
            <Image
              src="/brand/annabel-karmel-logo.png"
              alt="Annabel Karmel"
              width={100}
              height={49}
              priority
              style={{ height: 'auto' }}
            />
          </Link>
        </div>
        <h1 className={styles.title}>Admin login</h1>
        <p className={styles.subtitle}>Sign in with your email and password.</p>

        <form className={styles.form} onSubmit={onSubmit}>
          {error ? <p className={styles.error}>{error}</p> : null}

          <div className="field">
            <label className="fieldLabel" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              className="fieldInput"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="field">
            <label className="fieldLabel" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              className="fieldInput"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`btn btnPrimary ${styles.submit}`}
            disabled={submitting}
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
