import React from 'react'
import AdBanners from '@/components/home/AdBanners'
import Top from '@shared/Top'
import CardList from '@/components/home/CardList'

function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subtitle="회원님을 위해서 혜택 좋은 카드를 모아 봤어요"
      />

      <AdBanners />
      <CardList />
    </div>
  )
}

export default HomePage
