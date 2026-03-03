export interface DecodedToken {
  header: any;
  payload: any;
  signature: string;
  isValid: boolean;
  error?: string;
}

function base64UrlDecode(str: string): string {
  // Replace base64url characters
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Add padding
  const pad = base64.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error('Invalid base64url string');
    }
    base64 += new Array(5 - pad).join('=');
  }
  
  try {
    // Decode base64
    const decoded = atob(base64);
    return decoded;
  } catch (e) {
    throw new Error('Failed to decode base64');
  }
}

export function decodeJWT(token: string): DecodedToken {
  try {
    // Remove whitespace
    token = token.trim();
    
    if (!token) {
      return {
        header: null,
        payload: null,
        signature: '',
        isValid: false,
        error: 'Token is empty'
      };
    }

    // Split the token
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      return {
        header: null,
        payload: null,
        signature: '',
        isValid: false,
        error: `Invalid token structure. Expected 3 parts, got ${parts.length}`
      };
    }

    const [headerPart, payloadPart, signaturePart] = parts;

    // Decode header
    let header;
    try {
      const headerJson = base64UrlDecode(headerPart);
      header = JSON.parse(headerJson);
    } catch (e) {
      return {
        header: null,
        payload: null,
        signature: signaturePart,
        isValid: false,
        error: 'Failed to decode header'
      };
    }

    // Decode payload
    let payload;
    try {
      const payloadJson = base64UrlDecode(payloadPart);
      payload = JSON.parse(payloadJson);
    } catch (e) {
      return {
        header,
        payload: null,
        signature: signaturePart,
        isValid: false,
        error: 'Failed to decode payload'
      };
    }

    return {
      header,
      payload,
      signature: signaturePart,
      isValid: true
    };
  } catch (e) {
    return {
      header: null,
      payload: null,
      signature: '',
      isValid: false,
      error: e instanceof Error ? e.message : 'Unknown error'
    };
  }
}

export function isTokenExpired(payload: any): boolean {
  if (!payload || !payload.exp) {
    return false;
  }
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}
