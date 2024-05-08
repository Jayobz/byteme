import { useSelector } from 'react-redux';
import { selectFavoriteProduct } from '../../redux/features/favorites/favoriteSlice.js';
import Product from './Product';

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct)
  return (
    <div className='ml-[10rem]'>
      <h1 className='text-lg font-bold ml-[3re]'>Favorites</h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
            <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Favorites