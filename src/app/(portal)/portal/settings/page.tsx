"use client";

import { useState } from "react";

const inputClass =
  "w-full border rounded-sm px-4 py-2.5 text-sm outline-none transition-all bg-background text-foreground placeholder:text-muted/50";

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative flex-shrink-0 w-10 h-5 rounded-full cursor-pointer transition-colors duration-200"
      style={{
        background: checked ? "var(--gold)" : "var(--border)",
      }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{
          transform: checked ? "translateX(22px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}

interface NotificationSetting {
  label: string;
  description: string;
  key: string;
  defaultOn: boolean;
}

const notificationSettings: NotificationSetting[] = [
  {
    label: "Quarterly Statements",
    description: "Email when new statements are available",
    key: "quarterly",
    defaultOn: true,
  },
  {
    label: "Capital Calls",
    description: "Email 30 days before scheduled capital calls",
    key: "capitalCalls",
    defaultOn: true,
  },
  {
    label: "Distributions",
    description: "Email when distributions are processed",
    key: "distributions",
    defaultOn: true,
  },
  {
    label: "Market Commentary",
    description: "Monthly market commentary from Aurion",
    key: "commentary",
    defaultOn: false,
  },
  {
    label: "Annual Report",
    description: "Email when annual reports are published",
    key: "annual",
    defaultOn: true,
  },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(
      notificationSettings.map((s) => [s.key, s.defaultOn])
    )
  );
  const [twoFA, setTwoFA] = useState(true);

  function toggleNotification(key: string, val: boolean) {
    setNotifications((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div>
      {/* Header */}
      <h1 className="font-serif text-2xl font-bold text-foreground">
        Settings
      </h1>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Profile card */}
          <div
            className="rounded-xl p-6"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2 className="text-sm font-semibold text-foreground mb-6">
              Profile Information
            </h2>
            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  className="block text-xs font-medium mb-1.5 tracking-wide"
                  style={{ color: "rgba(10,15,30,0.7)" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Alexandra Pemberton"
                  className={inputClass}
                  style={{ borderColor: "var(--border)" }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "0 0 0 2px rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "rgba(201,168,76,0.4)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--border)";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium mb-1.5 tracking-wide"
                  style={{ color: "rgba(10,15,30,0.7)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="a.pemberton@pembertonfamily.com"
                  className={inputClass}
                  style={{ borderColor: "var(--border)" }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "0 0 0 2px rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "rgba(201,168,76,0.4)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--border)";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium mb-1.5 tracking-wide"
                  style={{ color: "rgba(10,15,30,0.7)" }}
                >
                  Company
                </label>
                <input
                  type="text"
                  defaultValue="Pemberton Family Office"
                  className={inputClass}
                  style={{ borderColor: "var(--border)" }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "0 0 0 2px rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "rgba(201,168,76,0.4)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--border)";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium mb-1.5 tracking-wide"
                  style={{ color: "rgba(10,15,30,0.7)" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (212) 555-0182"
                  className={inputClass}
                  style={{ borderColor: "var(--border)" }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "0 0 0 2px rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "rgba(201,168,76,0.4)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--border)";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium mb-1.5 tracking-wide"
                  style={{ color: "rgba(10,15,30,0.7)" }}
                >
                  Investor Type
                </label>
                <select
                  defaultValue="Family Office"
                  className={inputClass}
                  style={{ borderColor: "var(--border)" }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLSelectElement).style.boxShadow =
                      "0 0 0 2px rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLSelectElement).style.borderColor =
                      "rgba(201,168,76,0.4)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLSelectElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLSelectElement).style.borderColor =
                      "var(--border)";
                  }}
                >
                  <option>Family Office</option>
                  <option>Institutional Investor</option>
                  <option>High Net Worth Individual</option>
                  <option>Endowment / Foundation</option>
                  <option>Pension Fund</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium rounded-sm transition-colors"
                style={{
                  background: "var(--foreground)",
                  color: "white",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "var(--foreground)")
                }
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Security card */}
          <div
            className="rounded-xl p-6"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2 className="text-sm font-semibold text-foreground mb-6">
              Security
            </h2>

            {/* Change Password */}
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  className="block text-xs font-medium mb-1.5 tracking-wide"
                  style={{ color: "rgba(10,15,30,0.7)" }}
                >
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  style={{ borderColor: "var(--border)" }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "0 0 0 2px rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "rgba(201,168,76,0.4)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--border)";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium mb-1.5 tracking-wide"
                  style={{ color: "rgba(10,15,30,0.7)" }}
                >
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  style={{ borderColor: "var(--border)" }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "0 0 0 2px rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "rgba(201,168,76,0.4)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--border)";
                  }}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium rounded-sm transition-colors"
                style={{
                  background: "var(--foreground)",
                  color: "white",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "var(--foreground)")
                }
              >
                Update Password
              </button>
            </form>

            {/* 2FA toggle */}
            <div
              className="flex items-center justify-between mt-6 pt-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  Two-Factor Authentication
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--muted)" }}
                >
                  Add an extra layer of security to your account
                </p>
              </div>
              <ToggleSwitch checked={twoFA} onChange={setTwoFA} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Notifications card */}
          <div
            className="rounded-xl p-6"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2 className="text-sm font-semibold text-foreground mb-6">
              Notifications
            </h2>
            <div className="space-y-5">
              {notificationSettings.map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-start gap-4 justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {setting.label}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--muted)" }}
                    >
                      {setting.description}
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={notifications[setting.key]}
                    onChange={(v) => toggleNotification(setting.key, v)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Relationship Manager card */}
          <div
            className="rounded-xl p-6"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2 className="text-sm font-semibold text-foreground mb-4">
              Your Relationship Manager
            </h2>

            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(26,58,92,0.1)" }}
            >
              <span
                className="font-semibold text-sm"
                style={{ color: "var(--accent)" }}
              >
                SW
              </span>
            </div>

            <p className="font-semibold text-foreground mt-3">
              Sarah Winters
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              Managing Director, Client Relations
            </p>

            <a
              href="mailto:s.winters@aurioncapital.com"
              className="block text-sm mt-2 transition-colors"
              style={{ color: "var(--accent)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--gold)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--accent)")
              }
            >
              s.winters@aurioncapital.com
            </a>

            <p className="text-sm mt-1.5" style={{ color: "var(--muted)" }}>
              +1 (212) 555-0198
            </p>

            <button
              className="w-full py-2.5 rounded-sm text-sm text-foreground mt-4 transition-colors"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#fafafa")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "transparent")
              }
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
