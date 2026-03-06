import { AnalysisResult, RiskLevel, ThreatSignal } from "../types";

// Mock phishing detection algorithm
export function analyzeURL(url: string): AnalysisResult {
  const threatSignals: ThreatSignal[] = [];
  let riskScore = 0;

  // Normalize URL
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
    normalizedUrl = "https://" + normalizedUrl;
  }

  try {
    const urlObj = new URL(normalizedUrl);
    const hostname = urlObj.hostname;
    const path = urlObj.pathname;

    // Check 1: URL Length
    if (url.length > 75) {
      threatSignals.push({
        name: "URL Length",
        status: "warning",
        description: "URL is unusually long, which is common in phishing attempts",
        riskLevel: "suspicious",
      });
      riskScore += 15;
    } else {
      threatSignals.push({
        name: "URL Length",
        status: "pass",
        description: "URL length is within normal range",
        riskLevel: "safe",
      });
    }

    // Check 2: IP Address in URL
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipPattern.test(hostname)) {
      threatSignals.push({
        name: "IP Address Usage",
        status: "fail",
        description: "URL uses IP address instead of domain name - highly suspicious",
        riskLevel: "high-risk",
      });
      riskScore += 30;
    } else {
      threatSignals.push({
        name: "IP Address Usage",
        status: "pass",
        description: "URL uses proper domain name",
        riskLevel: "safe",
      });
    }

    // Check 3: Suspicious Keywords
    const suspiciousKeywords = [
      "login",
      "verify",
      "account",
      "secure",
      "update",
      "confirm",
      "banking",
      "paypal",
      "signin",
    ];
    const hasSuspiciousKeyword = suspiciousKeywords.some(
      (keyword) => hostname.toLowerCase().includes(keyword) || path.toLowerCase().includes(keyword)
    );

    if (hasSuspiciousKeyword) {
      threatSignals.push({
        name: "Suspicious Keywords",
        status: "warning",
        description: "URL contains keywords commonly used in phishing attempts",
        riskLevel: "suspicious",
      });
      riskScore += 20;
    } else {
      threatSignals.push({
        name: "Suspicious Keywords",
        status: "pass",
        description: "No suspicious keywords detected",
        riskLevel: "safe",
      });
    }

    // Check 4: Subdomain Analysis
    const parts = hostname.split(".");
    if (parts.length > 3) {
      threatSignals.push({
        name: "Subdomain Analysis",
        status: "warning",
        description: "Multiple subdomains detected - could be masquerading attempt",
        riskLevel: "suspicious",
      });
      riskScore += 15;
    } else {
      threatSignals.push({
        name: "Subdomain Analysis",
        status: "pass",
        description: "Domain structure appears normal",
        riskLevel: "safe",
      });
    }

    // Check 5: Domain Age (simulated)
    const randomAge = Math.floor(Math.random() * 3650);
    if (randomAge < 90) {
      threatSignals.push({
        name: "Domain Age",
        status: "fail",
        description: `Domain is only ${randomAge} days old - newly created domains are often used for phishing`,
        riskLevel: "high-risk",
      });
      riskScore += 25;
    } else if (randomAge < 365) {
      threatSignals.push({
        name: "Domain Age",
        status: "warning",
        description: `Domain is ${randomAge} days old - relatively new`,
        riskLevel: "suspicious",
      });
      riskScore += 10;
    } else {
      threatSignals.push({
        name: "Domain Age",
        status: "pass",
        description: `Domain is ${Math.floor(randomAge / 365)} years old - established domain`,
        riskLevel: "safe",
      });
    }

    // Check 6: SSL Certificate
    const hasSSL = normalizedUrl.startsWith("https://");
    if (!hasSSL) {
      threatSignals.push({
        name: "SSL Certificate",
        status: "fail",
        description: "No HTTPS connection - data is not encrypted",
        riskLevel: "high-risk",
      });
      riskScore += 20;
    } else {
      threatSignals.push({
        name: "SSL Certificate",
        status: "pass",
        description: "Valid SSL certificate detected",
        riskLevel: "safe",
      });
    }

    // Check 7: Blacklist Status (simulated)
    const isBlacklisted = Math.random() < 0.1; // 10% chance
    if (isBlacklisted) {
      threatSignals.push({
        name: "Blacklist Status",
        status: "fail",
        description: "URL found in known phishing blacklists",
        riskLevel: "high-risk",
      });
      riskScore += 40;
    } else {
      threatSignals.push({
        name: "Blacklist Status",
        status: "pass",
        description: "URL not found in known blacklists",
        riskLevel: "safe",
      });
    }

    // Determine overall risk level
    let riskLevel: RiskLevel;
    if (riskScore >= 50) {
      riskLevel = "high-risk";
    } else if (riskScore >= 25) {
      riskLevel = "suspicious";
    } else {
      riskLevel = "safe";
    }

    // Generate technical details
    const technicalDetails = {
      ipAddress: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(
        Math.random() * 256
      )}.${Math.floor(Math.random() * 256)}`,
      hostingCountry: ["United States", "Germany", "Netherlands", "Singapore", "Russia", "China"][
        Math.floor(Math.random() * 6)
      ],
      domainAge: randomAge < 365 ? `${randomAge} days` : `${Math.floor(randomAge / 365)} years`,
      sslValid: hasSSL,
      redirectChain: [normalizedUrl],
    };

    return {
      url: normalizedUrl,
      riskLevel,
      riskScore: Math.min(100, riskScore),
      threatSignals,
      technicalDetails,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    // Invalid URL
    return {
      url: url,
      riskLevel: "high-risk",
      riskScore: 100,
      threatSignals: [
        {
          name: "URL Format",
          status: "fail",
          description: "Invalid URL format",
          riskLevel: "high-risk",
        },
      ],
      technicalDetails: {
        ipAddress: "Unknown",
        hostingCountry: "Unknown",
        domainAge: "Unknown",
        sslValid: false,
        redirectChain: [],
      },
      timestamp: new Date().toISOString(),
    };
  }
}
