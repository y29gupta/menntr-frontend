import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  roles?: string[];
};

export async function getUserRole(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.roles?.[0] ?? null;
  } catch {
    return null;
  }
}
