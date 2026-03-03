export type RiskLevel = "safe" | "suspicious" | "high-risk";

export interface ThreatSignal {
  name: string;
  status: "pass" | "warning" | "fail";
  description: string;
  riskLevel: RiskLevel;
}

export interface AnalysisResult {
  url: string;
  riskLevel: RiskLevel;
  riskScore: number;
  threatSignals: ThreatSignal[];
  technicalDetails: {
    ipAddress: string;
    hostingCountry: string;
    domainAge: string;
    sslValid: boolean;
    redirectChain: string[];
  };
  timestamp: string;
}
