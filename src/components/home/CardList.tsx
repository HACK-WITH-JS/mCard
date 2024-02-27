import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ListRow from '@shared/ListRow'
import { useInfiniteQuery } from 'react-query'
import { getCards } from '@/remote/card'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import Badge from '../shared/Badge'

// 무한 스크롤 로직이 구현 되어 있는 컴포넌트
function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    // snapshot에는 getCards에서 호출된 데이터가 들어있음
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const navigate = useNavigate()

  if (data === undefined) {
    return null
  }

  const cards = flatten(data?.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<div>로딩</div>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subtitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow
              onClick={() => navigate(`/card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
