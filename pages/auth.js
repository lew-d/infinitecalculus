import React from 'react'
import { AuthRedirect } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'

import { Auth, Typography, Button } from '@supabase/ui'

const Container = (props) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return props.children
}

export default function AuthBasic() {
  AuthRedirect()

  return (
    <div className="flex">
      <div className="min-w-1/5 w-96 m-auto pt-24">
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Container supabaseClient={supabase}>
            <Auth supabaseClient={supabase} />
          </Container>
        </Auth.UserContextProvider>
      </div>
    </div>
  )
}