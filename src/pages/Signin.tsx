import { useCallback } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'

import Form from '@/components/signin/Form'
import { FormValues } from '@/models/signin'
import { auth } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { useAlertContext } from '@/contexts/AlertContext'
import { useNavigate } from 'react-router-dom'

function SigninPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (error) {
        // firebase 에러
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {},
            })
          }

          return
        }

        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해주세요',
          onButtonClick: () => {},
        })
      }
    },
    [open],
  )
  return <Form onSubmit={handleSubmit} />
}

export default SigninPage
