import validator from 'validator'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import { css } from '@emotion/react'
import Spacing from '../shared/Spacing'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { FormValues } from '@/models/signup'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const [dirty, setDirty] = useState<Partial<FormValues>>()

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: true,
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
        hasError={Boolean(dirty?.email) && Boolean(errors.email)}
        helpMessage={errors.email}
        onBlur={handleBlur}
      />
      <Spacing size={16} />

      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.password) && Boolean(errors.password)}
        helpMessage={errors.password}
        onBlur={handleBlur}
      />
      <Spacing size={16} />

      <TextField
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.rePassword) && Boolean(errors.rePassword)}
        helpMessage={errors.rePassword}
        onBlur={handleBlur}
      />
      <Spacing size={16} />

      <TextField
        label="이름"
        name="name"
        placeholder="hack"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.name) && Boolean(errors.name)}
        helpMessage={errors.name}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원 가입"
        onClick={() => {
          onSubmit(formValues)
        }}
        disabled={!enableSubitStatus}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인 해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상 입력 해주세요'
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8자 이상 입력 해주세요'
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    errors.rePassword = '비밀번호를 확인 해주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 두 글자 이상 입력 해주세요'
  }

  return errors
}

export default Form
