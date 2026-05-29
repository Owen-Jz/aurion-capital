import crypto from "crypto";
import { connectDB } from "./db";
import { OtpCode } from "./models/OtpCode";

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function generateOtp(): string {
  const n = crypto.randomInt(0, 1_000_000);
  return n.toString().padStart(6, "0");
}

export async function issueOtp(email: string): Promise<string> {
  await connectDB();
  const code = generateOtp();
  const key = email.toLowerCase();
  await OtpCode.findOneAndUpdate(
    { email: key },
    { email: key, code, expiresAt: new Date(Date.now() + OTP_TTL_MS), attempts: 0 },
    { upsert: true }
  );
  return code;
}

export async function verifyOtp(email: string, code: string): Promise<boolean> {
  await connectDB();
  const key = email.toLowerCase();
  const entry = await OtpCode.findOne({ email: key });
  if (!entry) return false;

  if (entry.expiresAt.getTime() < Date.now()) {
    await OtpCode.deleteOne({ email: key });
    return false;
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    await OtpCode.deleteOne({ email: key });
    return false;
  }

  // Constant-time-ish compare via crypto.timingSafeEqual on equal-length buffers.
  const a = Buffer.from(entry.code);
  const b = Buffer.from(code.trim());
  const matches = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!matches) {
    await OtpCode.updateOne({ email: key }, { $inc: { attempts: 1 } });
    return false;
  }

  await OtpCode.deleteOne({ email: key });
  return true;
}

export function generateBackupCodes(n = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = crypto.randomBytes(2).toString("hex");
    const b = crypto.randomBytes(2).toString("hex");
    codes.push(`${a}-${b}`);
  }
  return codes;
}
