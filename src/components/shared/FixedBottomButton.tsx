import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { createPortal } from 'react-dom'

import Button from './Button'
import { colors } from '@/styles/colorPalette'
import { motion } from 'framer-motion'

interface FixedBottomProps {
  label: string
  onClick: () => void
}

function FixedBottomButton({ label, onClick }: FixedBottomProps) {
  const $portal_root = document.getElementById('root-portal')

  if ($portal_root == null) {
    return null
  }

  return createPortal(
    <Container>
      <motion.div
        initial={{ translateY: 100 }}
        transition={{
          duration: 0.7,
        }}
        animate={{
          translateY: 0,
        }}
      >
        <Button onClick={onClick} full css={buttonStyles} size="medium">
          {label}
        </Button>
      </motion.div>
    </Container>,
    $portal_root,
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
