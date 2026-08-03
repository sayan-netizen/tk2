/**
 * Helper utility for handling Sponsor inquiries, mailto formatting,
 * webmail deep-links, clipboard operations, and API dispatching.
 */

export interface SponsorFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  tier: string;
  message: string;
}

export const TARGET_SPONSOR_EMAIL = "tech.kurukshetra.uem@gmail.com";

/**
 * Validates sponsor form data.
 */
export function validateSponsorForm(data: SponsorFormData): { isValid: boolean; errors: Partial<Record<keyof SponsorFormData, string>> } {
  const errors: Partial<Record<keyof SponsorFormData, string>> = {};

  if (!data.companyName.trim()) {
    errors.companyName = "Company or organization name is required";
  }

  if (!data.contactName.trim()) {
    errors.contactName = "Contact person name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds a structured, professional email subject string.
 */
export function buildSponsorEmailSubject(companyName: string, tier: string): string {
  return `[Sponsorship Inquiry - ${tier}] ${companyName.trim()}`;
}

/**
 * Formats a clean, readable text body for sponsorship inquiries.
 */
export function buildSponsorEmailBody(data: SponsorFormData): string {
  const dateStr = new Date().toLocaleString("en-US", { timeZoneName: "short" });
  return (
    `=========================================\n` +
    `TECH KURUKSHETRA 2026 - SPONSORSHIP INQUIRY\n` +
    `=========================================\n\n` +
    `Company / Organization : ${data.companyName.trim()}\n` +
    `Contact Person        : ${data.contactName.trim()}\n` +
    `Official Email         : ${data.email.trim()}\n` +
    `Phone Number           : ${data.phone.trim() || "Not provided"}\n` +
    `Interest Tier          : ${data.tier}\n` +
    `Submission Timestamp   : ${dateStr}\n\n` +
    `-----------------------------------------\n` +
    `MESSAGE / SPECIAL REQUIREMENTS:\n` +
    `-----------------------------------------\n` +
    `${data.message.trim() || "No additional message specified."}\n\n` +
    `=========================================`
  );
}

/**
 * Generates standard mailto URL.
 */
export function getMailtoUrl(data: SponsorFormData): string {
  const subject = encodeURIComponent(buildSponsorEmailSubject(data.companyName, data.tier));
  const body = encodeURIComponent(buildSponsorEmailBody(data));
  return `mailto:${TARGET_SPONSOR_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Generates direct Gmail compose web link.
 */
export function getGmailWebUrl(data: SponsorFormData): string {
  const subject = encodeURIComponent(buildSponsorEmailSubject(data.companyName, data.tier));
  const body = encodeURIComponent(buildSponsorEmailBody(data));
  return `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${TARGET_SPONSOR_EMAIL}&su=${subject}&body=${body}`;
}

/**
 * Generates direct Outlook compose web link.
 */
export function getOutlookWebUrl(data: SponsorFormData): string {
  const subject = encodeURIComponent(buildSponsorEmailSubject(data.companyName, data.tier));
  const body = encodeURIComponent(buildSponsorEmailBody(data));
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${TARGET_SPONSOR_EMAIL}&subject=${subject}&body=${body}`;
}

/**
 * Dispatches mailto trigger reliably without triggering popup blockers.
 */
export function triggerMailtoClient(data: SponsorFormData): void {
  const mailtoUrl = getMailtoUrl(data);
  // Using an anchor click is more reliable than window.open for mailto: across browsers
  const link = document.createElement("a");
  link.href = mailtoUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Dispatches API request if backend endpoint is configured, with fallback.
 */
export async function sendSponsorApiRequest(data: SponsorFormData): Promise<{ success: boolean; message: string }> {
  const apiUrl = (import.meta as any).env?.VITE_SPONSOR_API_URL || "/api/sponsor";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        targetEmail: TARGET_SPONSOR_EMAIL,
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return { success: true, message: "Sponsorship inquiry received successfully!" };
    } else {
      return { success: false, message: `Server responded with status ${response.status}` };
    }
  } catch (err: any) {
    // API endpoint unavailable or timed out; silent fallback to mailto handlers
    return { success: false, message: err.message || "API endpoint unreachable" };
  }
}

/**
 * Copies text safely to clipboard.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      textarea.remove();
      return successful;
    }
  } catch {
    return false;
  }
}
