import { getAdBanner } from '@/remote/adBanner'
import { getCards } from '@/remote/card'
import Top from '@shared/Top'
import React, { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    getCards().then((res) => console.log(res))
    getAdBanner().then((res) => console.log(res))
  }, [])

  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subtitle="회원님을 위해서 혜택 좋은 카드를 모아 봤어요"
      />
    </div>
  )
}

export default HomePage
