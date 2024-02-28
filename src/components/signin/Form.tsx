import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import validator from 'validator'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { colors } from '@/styles/colorPalette'
import { FormValues } from '@/models/signin'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])
  const enableSubitStatus = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="test@test.com"
        value={formValues.email}
        onChange={handleFormValues}
      />
      <Spacing size={16} />

      <TextField
        type="password"
        label="비밀번호"
        name="password"
        value={formValues.password}
        onChange={handleFormValues}
      />
      <Spacing size={32} />

      <Button
        size="medium"
        onClick={() => onSubmit(formValues)}
        disabled={!enableSubitStatus}
      >
        로그인
      </Button>
      <Spacing size={12} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인 해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상 입력 해주세요'
  }

  return errors
}

export default Form
