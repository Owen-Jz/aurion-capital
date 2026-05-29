/**
 * Aurion Capital Group — Transactional Email Service
 *
 * Sends formally-worded, institutionally-styled emails for the investor
 * lifecycle: account submitted, account under review, account approved,
 * account rejected, OTP code, investment confirmed, documents delivered.
 *
 * Transport: prefers Resend (via RESEND_API_KEY); falls back to a logging
 * transport in development.
 */

const FROM_EMAIL =
  process.env.MAIL_FROM ?? "Aurion Capital Group <no-reply@aurioncapital.com>";
const REPLY_TO = process.env.MAIL_REPLY_TO ?? "investorrelations@aurioncapital.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? REPLY_TO;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://aurioncapital.com";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

async function sendViaResend(args: SendArgs): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: args.to,
        subject: args.subject,
        html: args.html,
        text: args.text,
        reply_to: REPLY_TO,
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("[email] Resend transport failed:", e);
    return false;
  }
}

export async function sendEmail(args: SendArgs): Promise<void> {
  const sent = await sendViaResend(args);
  if (!sent) {
    console.log(
      `\n────────── EMAIL (dev transport) ──────────\nTo:      ${args.to}\nSubject: ${args.subject}\n${args.text ?? args.html.replace(/<[^>]+>/g, "")}\n──────────────────────────────────────────\n`
    );
  }
}

/* ───────────────────────────── Template chrome ───────────────────────────── */

function shell(opts: {
  title: string;
  preheader?: string;
  bodyHtml: string;
}): string {
  const { title, preheader = "", bodyHtml } = opts;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:Georgia, 'Times New Roman', serif;color:#1a1f2e;">
  <span style="display:none!important;opacity:0;color:#f4f1ea;height:0;width:0;overflow:hidden;">${preheader}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f1ea;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e6dfcc;">
        <!-- Header -->
        <tr><td style="padding:32px 40px 24px;border-bottom:1px solid #e6dfcc;">
          <table width="100%"><tr>
            <td align="left" style="font-family:Georgia,serif;color:#0a0f1e;">
              <div style="font-size:11px;letter-spacing:0.32em;color:#c9a84c;text-transform:uppercase;font-weight:600;font-family:Helvetica,Arial,sans-serif;">Aurion</div>
              <div style="font-size:20px;font-weight:700;letter-spacing:0.04em;margin-top:2px;">Aurion Capital Group</div>
            </td>
            <td align="right" style="font-family:Helvetica,Arial,sans-serif;font-size:10px;color:#7a7468;letter-spacing:0.18em;text-transform:uppercase;">
              Investor Relations
            </td>
          </tr></table>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px 28px;font-family:Georgia,serif;font-size:15px;line-height:1.65;color:#1a1f2e;">
          ${bodyHtml}
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px 32px;border-top:1px solid #e6dfcc;background:#fbf9f3;font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;color:#7a7468;">
          <div style="margin-bottom:8px;"><strong style="color:#1a1f2e;">Aurion Capital Group, LLC</strong> · 200 Park Avenue, Suite 4200, New York, NY 10166</div>
          <div>Investor Relations: <a href="mailto:${REPLY_TO}" style="color:#1a3a5c;text-decoration:none;">${REPLY_TO}</a> · +1 (212) 555-0114</div>
          <div style="margin-top:16px;font-size:10px;color:#9a9588;">
            This communication is confidential and intended solely for the named recipient. It does not constitute an offer or solicitation in any jurisdiction in which such an offer or solicitation is not authorised. Aurion Capital Group, LLC is a registered investment adviser. Past performance is not indicative of future results. Investments in private placements are speculative, illiquid, and subject to risk of total loss.
          </div>
        </td></tr>
      </table>

      <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;color:#9a9588;margin-top:18px;">
        © ${new Date().getFullYear()} Aurion Capital Group, LLC. All rights reserved.
      </div>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
    <tr><td style="background:#c9a84c;">
      <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;color:#0a0f1e;text-decoration:none;letter-spacing:0.16em;text-transform:uppercase;">${label}</a>
    </td></tr>
  </table>`;
}

/* ───────────────────────────── Templates ───────────────────────────── */

export async function emailAccountSubmitted(opts: {
  to: string;
  name: string;
}) {
  const { to, name } = opts;
  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">Thank you for submitting your application for an investor account with <strong>Aurion Capital Group</strong>. We are honoured by your interest in our private investment platform.</p>
    <p style="margin:0 0 16px;">In keeping with our obligations under applicable securities and anti-money-laundering regulations, every prospective investor undergoes a formal compliance review prior to portal activation. Our Investor Relations and Compliance teams have received your file and will undertake the following steps:</p>
    <ol style="margin:0 0 16px;padding-left:22px;">
      <li style="margin-bottom:6px;">Verification of identity, residency and tax status.</li>
      <li style="margin-bottom:6px;">Assessment of accredited-investor / suitability criteria.</li>
      <li style="margin-bottom:6px;">Review of source-of-funds documentation and risk profile.</li>
    </ol>
    <p style="margin:0 0 16px;">You may expect a definitive response within <strong>one to three business days</strong>. During this period your account will remain in a pending state and the investor portal will not be accessible. We will notify you by email the moment a decision is reached.</p>
    <p style="margin:0 0 16px;">Should our compliance team require any additional documentation, you will receive a request directly from <a href="mailto:${REPLY_TO}" style="color:#1a3a5c;">${REPLY_TO}</a>.</p>
    <p style="margin:24px 0 4px;">With kind regards,</p>
    <p style="margin:0 0 0;font-style:italic;">The Aurion Investor Relations Team</p>
  `;
  await sendEmail({
    to,
    subject: "Your Aurion Capital application is under review",
    html: shell({
      title: "Application received",
      preheader: "We have received your application and our compliance team will respond within 1–3 business days.",
      bodyHtml: body,
    }),
  });
}

export async function emailAccountApproved(opts: {
  to: string;
  name: string;
}) {
  const { to, name } = opts;
  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">On behalf of the partners and the Investor Relations team at Aurion Capital Group, it is my pleasure to confirm that your application has been <strong>approved</strong>. Your investor portal is now fully provisioned and ready for use.</p>
    <p style="margin:0 0 16px;">Welcome to Aurion. You now have access to the same disciplined private market opportunities that our institutional and family-office clients have relied on for over two decades — across private equity, infrastructure, real estate, private credit, and our newly launched artificial-intelligence growth strategy.</p>
    ${btn(`${APP_URL}/login`, "Access Your Portfolio")}
    <p style="margin:0 0 16px;">From your portal you may review live opportunities, complete subscription documents, schedule wire or digital settlements, and download quarterly statements. A dedicated relationship manager will be in touch within the coming week to arrange an onboarding call at your convenience.</p>
    <p style="margin:0 0 16px;">Thank you for entrusting Aurion with your capital. We look forward to a long and rewarding partnership.</p>
    <p style="margin:24px 0 4px;">Sincerely,</p>
    <p style="margin:0 0 0;font-style:italic;">Edward Hartwell · Managing Partner, Investor Relations<br/>Aurion Capital Group, LLC</p>
  `;
  await sendEmail({
    to,
    subject: "Welcome to Aurion Capital Group — your portfolio is ready",
    html: shell({
      title: "Account approved",
      preheader: "Your Aurion investor account has been approved and your portfolio is now live.",
      bodyHtml: body,
    }),
  });
}

export async function emailAccountRejected(opts: {
  to: string;
  name: string;
  reason?: string;
}) {
  const { to, name, reason } = opts;
  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">Thank you for the time you devoted to submitting an application with Aurion Capital Group. Following careful review by our Compliance Committee, we regret to inform you that we are unable to approve your investor account at this time.</p>
    ${reason ? `<p style="margin:0 0 16px;padding:16px;background:#fbf9f3;border-left:3px solid #c9a84c;"><strong>Notes from Compliance:</strong><br/>${escapeHtml(reason)}</p>` : ""}
    <p style="margin:0 0 16px;">This decision should not be construed as a reflection on your standing. Aurion's mandate restricts onboarding to accredited investors and qualified purchasers meeting specific regulatory criteria.</p>
    <p style="margin:0 0 16px;">If you believe the determination warrants reconsideration, or if your circumstances change in the future, you are most welcome to contact our Investor Relations team at <a href="mailto:${REPLY_TO}" style="color:#1a3a5c;">${REPLY_TO}</a>.</p>
    <p style="margin:24px 0 4px;">With kind regards,</p>
    <p style="margin:0;font-style:italic;">The Aurion Compliance Committee</p>
  `;
  await sendEmail({
    to,
    subject: "Update regarding your Aurion Capital application",
    html: shell({
      title: "Application decision",
      bodyHtml: body,
    }),
  });
}

export async function emailAdminNewApplication(opts: {
  name: string;
  email: string;
  investorType: string;
  firm?: string;
  isAccredited?: boolean;
  expectedSize?: string;
}) {
  const { name, email, investorType, firm, isAccredited, expectedSize } = opts;
  const reviewUrl = `${APP_URL}/admin/users`;
  const body = `
    <p style="margin:0 0 16px;">A new investor application has been submitted and is awaiting compliance review.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #e6dfcc;margin:20px 0;">
      <tr style="background:#fbf9f3;"><td style="padding:12px 16px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;color:#7a7468;text-transform:uppercase;" colspan="2">Applicant Summary</td></tr>
      ${row("Name", escapeHtml(name))}
      ${row("Email", escapeHtml(email))}
      ${row("Investor type", escapeHtml(investorType))}
      ${firm ? row("Firm / Organisation", escapeHtml(firm)) : ""}
      ${row("Accredited investor", isAccredited ? "Yes" : "No / Not disclosed")}
      ${expectedSize ? row("Expected first-year commitment", escapeHtml(expectedSize)) : ""}
    </table>
    ${btn(reviewUrl, "Review Application")}
    <p style="margin:0 0 16px;font-size:13px;color:#5a5448;">Please log in to the admin portal and navigate to <strong>Investors</strong> to approve or decline this application. The applicant has been informed that their file is under review.</p>
  `;
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New investor application — ${name}`,
    html: shell({
      title: "New application for review",
      preheader: `${name} (${email}) has submitted an investor application and is awaiting review.`,
      bodyHtml: body,
    }),
  });
}

export async function emailOtpCode(opts: { to: string; name: string; code: string }) {
  const { to, name, code } = opts;
  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">A one-time verification code has been requested in connection with your Aurion Capital Group investor portal. Please use the code below to complete authentication.</p>
    <div style="margin:28px 0;padding:24px;background:#0a0f1e;text-align:center;">
      <div style="font-family:'SF Mono', Menlo, Consolas, monospace;font-size:34px;letter-spacing:0.4em;color:#c9a84c;font-weight:700;">${code}</div>
    </div>
    <p style="margin:0 0 16px;font-size:13px;color:#5a5448;">This code is valid for <strong>10 minutes</strong> and may only be used once. For your security, never share this code with anyone — including representatives of Aurion Capital Group.</p>
    <p style="margin:0 0 16px;">If you did not initiate this request, please contact our Investor Relations team immediately at <a href="mailto:${REPLY_TO}" style="color:#1a3a5c;">${REPLY_TO}</a>.</p>
    <p style="margin:24px 0 4px;">Regards,</p>
    <p style="margin:0;font-style:italic;">Aurion Security Operations</p>
  `;
  await sendEmail({
    to,
    subject: `Aurion verification code: ${code}`,
    html: shell({
      title: "Verification code",
      preheader: `Your Aurion verification code is ${code}.`,
      bodyHtml: body,
    }),
  });
}

export async function emailInvestmentDocumentsReady(opts: {
  to: string;
  name: string;
  companyName: string;
  tierName: string;
  amount: number;
  durationLabel: string;
  paymentUrl: string;
}) {
  const { to, name, companyName, tierName, amount, durationLabel, paymentUrl } = opts;
  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">Your application to participate in the <strong>${escapeHtml(companyName)}</strong> offering has been formally accepted. The following subscription package is now available within your investor portal:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #e6dfcc;margin:20px 0;">
      <tr style="background:#fbf9f3;"><td style="padding:12px 16px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;color:#7a7468;text-transform:uppercase;" colspan="2">Investment Summary</td></tr>
      ${row("Company", escapeHtml(companyName))}
      ${row("Tier", escapeHtml(tierName))}
      ${row("Subscription Amount", `$${amount.toLocaleString()}`)}
      ${row("Holding Period", escapeHtml(durationLabel))}
    </table>
    <p style="margin:0 0 16px;">Three documents have been prepared and require your review and electronic execution prior to settlement:</p>
    <ul style="margin:0 0 16px;padding-left:22px;">
      <li style="margin-bottom:4px;"><strong>Non-Disclosure Agreement (NDA)</strong> — includes the agreed return profile and lock-up schedule for your selected holding period.</li>
      <li style="margin-bottom:4px;"><strong>Subscription Agreement</strong> — formal commitment of capital to the offering.</li>
      <li style="margin-bottom:4px;"><strong>Private Placement Memorandum (PPM)</strong> — risk factors, use of proceeds and offering terms.</li>
    </ul>
    ${btn(paymentUrl, "Review Documents & Fund")}
    <p style="margin:0 0 16px;">All three documents are available for inspection and download on the secure settlement page above. Wire instructions and approved digital-asset settlement addresses are presented once you confirm document review.</p>
    <p style="margin:24px 0 4px;">With kind regards,</p>
    <p style="margin:0;font-style:italic;">The Aurion Investor Relations Team</p>
  `;
  await sendEmail({
    to,
    subject: `Subscription package ready — ${companyName}`,
    html: shell({
      title: "Documents ready for execution",
      bodyHtml: body,
    }),
  });
}

export async function emailInvestmentConfirmed(opts: {
  to: string;
  name: string;
  companyName: string;
  amount: number;
}) {
  const { to, name, companyName, amount } = opts;
  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">We are pleased to confirm receipt of your subscription in <strong>${escapeHtml(companyName)}</strong> in the amount of <strong>$${amount.toLocaleString()}</strong>. Your shares have been allocated and the position is now visible in your portfolio dashboard.</p>
    ${btn(`${APP_URL}/portal/portfolio`, "View Portfolio")}
    <p style="margin:0 0 16px;">A formal allocation letter and the executed subscription package have been attached to your investor file. Distributions, statements and any future capital events related to this position will be communicated through the portal.</p>
    <p style="margin:24px 0 4px;">With sincere thanks,</p>
    <p style="margin:0;font-style:italic;">The Aurion Investor Relations Team</p>
  `;
  await sendEmail({
    to,
    subject: `Subscription confirmed — ${companyName}`,
    html: shell({ title: "Investment confirmed", bodyHtml: body }),
  });
}

/* ───────────────────────────── helpers ───────────────────────────── */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:10px 16px;border-top:1px solid #f0eada;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#7a7468;width:45%;">${label}</td><td style="padding:10px 16px;border-top:1px solid #f0eada;font-family:Georgia,serif;font-size:14px;color:#1a1f2e;font-weight:600;">${value}</td></tr>`;
}
