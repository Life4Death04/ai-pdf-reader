/**
 * Audit Trail
 * 
 * Logs critical user actions for compliance and debugging.
 * Should be persisted to database in production.
 */

import { logger } from "./logger";

export type AuditAction =
  | "document.upload"
  | "document.delete"
  | "document.download"
  | "cache.clear"
  | "user.login"
  | "user.logout"
  | "settings.update";

export interface AuditEntry {
  action: AuditAction;
  userId?: string;
  ip?: string;
  resourceId?: string;
  resourceType?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
  success: boolean;
  error?: string;
}

/**
 * In-memory audit log (for development).
 * In production, persist to database.
 */
const auditLog: AuditEntry[] = [];
const MAX_AUDIT_ENTRIES = 10000;

/**
 * Log an audit event.
 */
export function logAudit(params: {
  action: AuditAction;
  userId?: string;
  ip?: string;
  resourceId?: string;
  resourceType?: string;
  metadata?: Record<string, unknown>;
  success: boolean;
  error?: string;
}) {
  const entry: AuditEntry = {
    ...params,
    timestamp: new Date().toISOString(),
  };

  // Add to in-memory log
  auditLog.push(entry);

  // Trim old entries
  if (auditLog.length > MAX_AUDIT_ENTRIES) {
    auditLog.shift();
  }

  // Log to structured logger
  logger.info(
    {
      module: "audit",
      ...entry,
    },
    `Audit: ${params.action}`
  );

  // TODO: In production, persist to database
  // await prisma.auditLog.create({ data: entry });
}

/**
 * Get recent audit entries (for debugging/monitoring).
 */
export function getAuditLog(filter?: {
  userId?: string;
  action?: AuditAction;
  limit?: number;
}): AuditEntry[] {
  let filtered = auditLog;

  if (filter?.userId) {
    filtered = filtered.filter((entry) => entry.userId === filter.userId);
  }

  if (filter?.action) {
    filtered = filtered.filter((entry) => entry.action === filter.action);
  }

  const limit = filter?.limit ?? 100;
  return filtered.slice(-limit).reverse();
}

/**
 * Get audit statistics.
 */
export function getAuditStats() {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  const recentEntries = auditLog.filter(
    (entry) => new Date(entry.timestamp).getTime() > oneHourAgo
  );

  const todayEntries = auditLog.filter(
    (entry) => new Date(entry.timestamp).getTime() > oneDayAgo
  );

  return {
    total: auditLog.length,
    lastHour: recentEntries.length,
    last24Hours: todayEntries.length,
    byAction: auditLog.reduce((acc, entry) => {
      acc[entry.action] = (acc[entry.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    failureRate:
      auditLog.length > 0
        ? auditLog.filter((e) => !e.success).length / auditLog.length
        : 0,
  };
}
