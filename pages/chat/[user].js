import { useRouter } from 'next/router'

const User = () => {
  
  const router = useRouter()

  const { user } = router.query

  return(
    <div style = {{ paddingTop: '10px'}}>
      This is the user :: { user }
    </div>
  )
}

export default  User
