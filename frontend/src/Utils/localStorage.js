export const addFavoritesToLocal = (product) => {
    const favorites = getFavoritesFromLocal()
    if (!favorites.some((p) => p._id === product._id)) {
        favorites.push(product)
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
}


export const deleteFavoritesFromLocal = (productId) => {
    const favorites = getFavoritesFromLocal()
    const updateFavorites = favorites.filter((product) => product._id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updateFavorites))
}


export const getFavoritesFromLocal = () => {
    const favoritesJSON = localStorage.getItem('favorites')
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}