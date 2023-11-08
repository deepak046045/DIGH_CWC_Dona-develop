import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Environment } from './utils/environment';

/* eslint-disable no-restricted-exports */
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/healthcheck
     * - api/auth
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images
     * - icons
     */
    '/((?!api/healthcheck|api/auth|_next/static|_next/image|images|icons|favicon.ico).*)',
  ],
};

const isActiveSession = async (request: NextRequest): Promise<boolean> => {
  const session = await getToken({
    req: request,
    secret: Environment.get('nextAuthSecret'),
  });

  return !!session;
};

const isLoginOrLogoutPage = (request: NextRequest) => {
  const { nextUrl } = request;
  return ['/auth/login', '/auth/logout'].includes(nextUrl.pathname);
};

const isEnvironmentWithAuth = () =>
  !['production', 'local'].includes(Environment.get('awsNodeEnv'));

const shouldRedirectToLogin = async (
  request: NextRequest
): Promise<boolean> => {
  if (!isEnvironmentWithAuth()) {
    return false;
  }

  if (isLoginOrLogoutPage(request)) {
    return false;
  }

  if (await isActiveSession(request)) {
    return false;
  }

  return true;
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (await shouldRedirectToLogin(request)) {
    return NextResponse.redirect(
      `${Environment.get('nextAuthURL')}/auth/login`
    );
  }

  return NextResponse.next();
}
