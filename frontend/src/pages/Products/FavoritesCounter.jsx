import React from 'react'
import { useSelector } from 'react-redux';

const FavoritesCounter = () => {
    const favorites = useSelector(state => state.favorites)
    const favoriteCount = favorites.length;




  return (
    <div className='absolute let-2 top-0'>
      {favoriteCount > 0 && (
        <span className='px-1 py-0 text-sm text-white bg-red-700 rounded-full'>{favoriteCount}</span>
      )}
    </div>
  )
}

export default FavoritesCounter
