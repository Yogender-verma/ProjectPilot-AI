import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { syncClerkUser } from '@/lib/userSync';

export const dynamic = 'force-dynamic';

export default async function AuthCallbackPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect('/login');
  }

  let syncedDbUser = null;

  try {
    // Perform database sync using unified helper
    syncedDbUser = await syncClerkUser({
      id: clerkUser.id,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      emailAddresses: clerkUser.emailAddresses,
      primaryEmailAddressId: clerkUser.primaryEmailAddressId,
      imageUrl: clerkUser.imageUrl
    });
  } catch (error) {
    console.error('Error during auth callback synchronization:', error);
  }

  // redirect() throws internally, so these checks must live outside the
  // try/catch above — otherwise the catch block would swallow the redirect.

  // If this account was soft-deleted, send them to the recovery prompt
  // instead of straight into the dashboard.
  if (syncedDbUser && 'deletedAt' in syncedDbUser && syncedDbUser.deletedAt) {
    redirect('/restore-account');
  }

  // Directly restore access to dashboard if they completed onboarding already
  if (syncedDbUser && syncedDbUser.onboardingCompleted) {
    redirect('/dashboard');
  }

  // Direct new accounts to the interactive onboarding wizard
  redirect('/onboarding');
}
