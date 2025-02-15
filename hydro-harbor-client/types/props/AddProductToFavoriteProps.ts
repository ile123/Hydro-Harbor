export type AddProductToFavoriteProps = {
  id: string;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
};
