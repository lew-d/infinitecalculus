import LandingPage from '../components/Landing'
import { Auth } from '@supabase/ui'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/authUser'

const Index = () => {
  const { user } = useUser()


  return (
    <>
      {user ? <Dashboard /> : <LandingPage />}
    </>
  )
}

export default Index
