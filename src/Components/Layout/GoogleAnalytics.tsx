import { GoogleAnalytics } from '@next/third-parties/google';
import { cookies } from 'next/headers';

export async function GA() {
  const cookieStore = await cookies();
  
  // Kontrola cookie consent
  const consentCookie = cookieStore.get('cc_cookie');
  let analyticsEnabled = true;
  
  if (consentCookie) {
    try {
      const consent = JSON.parse(consentCookie.value);
      analyticsEnabled = consent.categories?.includes('analytics') || false;
    } catch (error) {
      // Pokud nejde parsovat cookie, analytics jsou zakázané
      analyticsEnabled = false;
    }
  }
  
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  // Pouze renderuj GoogleAnalytics pokud je consent a GA ID
  if (analyticsEnabled && gaId) {
    return <GoogleAnalytics gaId={gaId} />;
  }
  
  return null;
}