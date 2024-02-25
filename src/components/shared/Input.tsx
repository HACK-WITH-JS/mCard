import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.grey};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  // 인풋 값이 적절하지 않을 경우 바꿀 속성
  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
