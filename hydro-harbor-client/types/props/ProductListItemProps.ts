export type ProductListItemProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  manufacturer: string;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
};
