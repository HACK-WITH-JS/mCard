import React from 'react'
import { getAdBanner } from '@/remote/adBanner'
import { useQuery } from 'react-query'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

function AdBanners() {
  const { data } = useQuery(['adBanners'], () => getAdBanner())

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map(({ title, link, description, id }) => (
          <SwiperSlide key={id}>
            <Link to={link}>
              <Flex direction="column" css={bannerContainerStyles}>
                <Text bold>{title}</Text>
                <Text typography="t7">{description}</Text>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

export default AdBanners
