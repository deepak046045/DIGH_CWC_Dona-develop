import { Environment } from '@/utils/environment';
import { Logger } from '@/utils/logger';
import { redirect } from 'next/navigation';

export function GET() {
  try {
    const endSessionURL = `https://login.microsoftonline.com/18a59a81-eea8-4c30-948a-d8824cdc2580/oauth2/v2.0/logout`;
    const endSessionParams = new URLSearchParams({
      post_logout_redirect_uri: `${Environment.get('nextAuthURL')}/auth/logout`,
      'client-request-id': `${Environment.get('openidClientId')}`,
    });
    const location = `${endSessionURL}?${endSessionParams.toString()}`;
    const response = new Response(undefined, {
      status: 307,
      headers: {
        Location: location,
        'Cache-Control': 'no-store',
      },
    });
    return response;
  } catch (err) {
    Logger.log(err);
    redirect(`${Environment.get('nextAuthURL')}/auth/login`);
  }
}
