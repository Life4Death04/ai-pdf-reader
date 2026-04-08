/**
 * Security Headers Middleware
 * 
 * Adds security headers to protect against common web vulnerabilities.
 */

import { NextResponse } from "next/server";

/**
 * Security headers to add to all responses.
 */
export const securityHeaders = {
  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",

  // Enable XSS filter in browsers
  "X-XSS-Protection": "1; mode=block",

  // Prevent clickjacking attacks
  "X-Frame-Options": "DENY",

  // Control referrer information
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Permissions policy (restrict browser features)
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",

  // Strict Transport Security (only serve over HTTPS)
  // Note: Enable only in production with HTTPS
  ...(process.env.NODE_ENV === "production"
    ? {
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      }
    : {}),
};

/**
 * Content Security Policy (CSP) configuration.
 * 
 * This restricts where resources can be loaded from to prevent XSS attacks.
 */
export const contentSecurityPolicy = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-eval'", "'unsafe-inline'"], // Next.js requires eval
  "style-src": ["'self'", "'unsafe-inline'"], // Tailwind requires inline styles
  "img-src": ["'self'", "data:", "blob:"],
  "font-src": ["'self'"],
  "connect-src": ["'self'", "http://localhost:*"], // Allow local services
  "media-src": ["'self'", "blob:"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  "upgrade-insecure-requests": process.env.NODE_ENV === "production" ? [] : undefined,
};

/**
 * Generate CSP header value from policy object.
 */
export function generateCSP(): string {
  return Object.entries(contentSecurityPolicy)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key} ${value.join(" ")}`;
      }
      return key;
    })
    .join("; ");
}

/**
 * Add security headers to a response.
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Add all security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add CSP header
  response.headers.set("Content-Security-Policy", generateCSP());

  return response;
}

/**
 * Create a response with security headers.
 */
export function createSecureResponse(
  body: any,
  init?: ResponseInit
): NextResponse {
  const response = NextResponse.json(body, init);
  return addSecurityHeaders(response);
}
