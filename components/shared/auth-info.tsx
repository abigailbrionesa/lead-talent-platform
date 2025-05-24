import { auth } from '@/auth';

export default async function AuthInfo() {
  const session = await auth();

  return (
    <pre className="p-8">{JSON.stringify(session, null, 2)}</pre>
  );
}