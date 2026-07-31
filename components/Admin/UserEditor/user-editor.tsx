'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import {
  ADMIN_USER_ROLES,
  buildDisplayNameOptions,
  roleLabel,
  type AdminUser,
  type AdminUserRole,
} from '@/lib/admin/users/types';
import { saveAdminUserOverride } from '@/lib/admin/users/users-storage';
import styles from './user-editor.module.css';

type UserEditorProps = {
  initialUser: AdminUser;
};

export function UserEditor({ initialUser }: UserEditorProps) {
  const [user, setUser] = useState(initialUser);
  const [message, setMessage] = useState<string | null>(null);
  const [messageError, setMessageError] = useState(false);
  const [saving, setSaving] = useState(false);

  const displayOptions = useMemo(() => {
    const options = buildDisplayNameOptions(user);
    if (user.displayName && !options.includes(user.displayName)) {
      return [user.displayName, ...options];
    }
    return options;
  }, [user]);

  const update = <K extends keyof AdminUser>(key: K, value: AdminUser[K]) => {
    setUser((prev) => ({ ...prev, [key]: value }));
    setMessage(null);
  };

  const onSave = (event: FormEvent) => {
    event.preventDefault();
    setMessageError(false);

    if (!user.nickname.trim()) {
      setMessageError(true);
      setMessage('Nickname is required.');
      return;
    }

    if (!user.email.trim()) {
      setMessageError(true);
      setMessage('Email is required.');
      return;
    }

    setSaving(true);
    try {
      const saved = saveAdminUserOverride({
        ...user,
        nickname: user.nickname.trim(),
        email: user.email.trim(),
        firstName: user.firstName.trim(),
        lastName: user.lastName.trim(),
        displayName:
          user.displayName.trim() ||
          buildDisplayNameOptions(user)[0] ||
          user.username,
      });
      setUser(saved);
      setMessage('User updated.');
    } catch {
      setMessageError(true);
      setMessage('Could not save user.');
    } finally {
      setSaving(false);
    }
  };

  const sendPasswordReset = () => {
    setMessageError(false);
    setMessage('Password reset email sent (demo).');
  };

  return (
    <form className={styles.editor} onSubmit={onSave}>
      <p style={{ margin: 0, fontSize: 13 }}>
        <Link
          href="/admin/users"
          style={{ color: 'var(--admin-brand, #963b58)' }}
        >
          ← All Users
        </Link>
      </p>

      <section className={styles.panel}>
        <h2 className={styles.panelHeader}>Name</h2>
        <table className={styles.formTable}>
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="user-nickname">
                  Nickname <span className={styles.required}>(required)</span>
                </label>
              </th>
              <td>
                <input
                  id="user-nickname"
                  className={styles.input}
                  value={user.nickname}
                  onChange={(event) => update('nickname', event.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="user-username">Username</label>
              </th>
              <td>
                <input
                  id="user-username"
                  className={styles.input}
                  value={user.username}
                  disabled
                  readOnly
                />
                <span className={styles.fieldHint}>
                  Usernames cannot be changed.
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="user-role">Role</label>
              </th>
              <td>
                <select
                  id="user-role"
                  className={styles.select}
                  value={user.role}
                  onChange={(event) =>
                    update('role', event.target.value as AdminUserRole)
                  }
                >
                  {ADMIN_USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {roleLabel(role)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="user-first-name">First Name</label>
              </th>
              <td>
                <input
                  id="user-first-name"
                  className={styles.input}
                  value={user.firstName}
                  onChange={(event) => update('firstName', event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="user-last-name">Last Name</label>
              </th>
              <td>
                <input
                  id="user-last-name"
                  className={styles.input}
                  value={user.lastName}
                  onChange={(event) => update('lastName', event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="user-display-name">
                  Display name publicly as
                </label>
              </th>
              <td>
                <select
                  id="user-display-name"
                  className={styles.select}
                  value={user.displayName}
                  onChange={(event) =>
                    update('displayName', event.target.value)
                  }
                >
                  {displayOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.panel}>
        <h2 className={styles.panelHeader}>Contact Info</h2>
        <table className={styles.formTable}>
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="user-email">Email</label>
              </th>
              <td>
                <input
                  id="user-email"
                  className={styles.input}
                  type="email"
                  value={user.email}
                  onChange={(event) => update('email', event.target.value)}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.panel}>
        <h2 className={styles.panelHeader}>Account Management</h2>
        <div style={{ padding: 14 }}>
          <div className={styles.actions}>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={sendPasswordReset}
            >
              Send password reset
            </button>
          </div>
        </div>
      </section>

      <div className={styles.actions}>
        <button type="submit" className="btn btnPrimary" disabled={saving}>
          {saving ? 'Updating…' : 'Update User'}
        </button>
        {message ? (
          <p
            className={`${styles.message}${messageError ? ` ${styles.messageError}` : ''}`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
