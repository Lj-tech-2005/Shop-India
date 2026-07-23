import { Suspense } from 'react';
import LoginWrapper from './LoginWrapper';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-lg">Loading...</div>}>
      <LoginWrapper />
    </Suspense>
  );
}
