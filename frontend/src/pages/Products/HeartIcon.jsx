import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, deleteFromFavorites, selectFavoriteProduct, setFavorites } from "../../redux/features/favorites/favoriteSlice.js";
import { useEffect } from "react";
import { getFavoritesFromLocal, deleteFavoritesFromLocal, addFavoritesToLocal } from "../../Utils/localStorage";
const HeartIcon = ({product}) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorites = favorites.some((pro) => pro._id == product._id)

    useEffect(() => {
        const favoritesFromLocal = getFavoritesFromLocal();
        dispatch(setFavorites(favoritesFromLocal));
    }, [])


    const toggleFavorites = () => {
        if (isFavorites) {
            dispatch(deleteFromFavorites(product))

            deleteFavoritesFromLocal(product._id)
        }
        else {
            dispatch(addToFavorites(product))

            addFavoritesToLocal(product)
        }
    }

  return (
    <div onClick={toggleFavorites} className="absolute top-2 right-5 cursor-pointer">
      {isFavorites ? (<FaHeart className="text-white mix-blend-difference" />) : (<FaRegHeart className="text-white mix-blend-difference" />)}
    </div>
  )
}

export default HeartIcon;
