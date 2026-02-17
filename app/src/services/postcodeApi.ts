interface PostcodeResponse {
  status: number;
  result: {
    postcode: string;
    parliamentary_constituency: string;
    // other fields we don't need
  };
  error?: string;
}

// Simple in-memory rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;
let requestCount = 0;
let windowStart = Date.now();

function checkRateLimit(): boolean {
  const now = Date.now();
  if (now - windowStart > RATE_LIMIT_WINDOW) {
    requestCount = 0;
    windowStart = now;
  }

  if (requestCount >= MAX_REQUESTS) {
    return false;
  }

  requestCount++;
  return true;
}

export async function lookupPostcode(postcode: string): Promise<string | null> {
  try {
    if (!checkRateLimit()) {
      console.warn('Rate limit exceeded for postcode lookups');
      throw new Error('Please wait a moment before trying again.');
    }

    // Remove all whitespace
    const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();

    // Strict validation: UK postcodes are alphanumeric, 5-7 chars typically (excluding spaces)
    // Regex based on UK government standard (simplified):
    // ^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$
    // For our API safety, generic alphanumeric 5-7 chars is a good baseline + explicitly allowing only expected chars.
    if (!/^[A-Z0-9]{5,7}$/.test(cleanPostcode)) {
      console.warn('Invalid postcode format rejected locally');
      return null;
    }

    const res = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);
    const data: PostcodeResponse = await res.json();

    if (data.status === 200 && data.result) {
      return data.result.parliamentary_constituency;
    }
    return null;
  } catch (error) {
    console.error('Postcode lookup failed:', error);
    // Propagate rate limit errors roughly, or just return null
    if (error instanceof Error && error.message.includes('wait')) {
      throw error;
    }
    return null;
  }
}
