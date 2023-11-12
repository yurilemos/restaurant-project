import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'

const SetupPage = async () => {
  const profile = await initialProfile()

  if (profile) {
    redirect('/dashboard')
  }

  return <div>Loading Server</div>
}

export default SetupPage
