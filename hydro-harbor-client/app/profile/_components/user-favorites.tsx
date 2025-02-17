import Card from "@/components/card";
import { UserFavoritesProps } from "@/types/props/UserFavoritesProps";
import Image from "next/image";
import Link from "next/link";

export default function UserFavorites({ favorites }: UserFavoritesProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Card className="w-96 h-96 overflow-y-auto">
        {favorites.length === 0 ? (
          <h3 className="text-dark dark:text-white text-center">
            No favorites found.
          </h3>
        ) : (
          <div>
            {favorites.map((item, key) => (
              <Card key={key} className="bg-white dark:bg-[#222831] mb-4 ring">
                <Link href={`/products/${item.id}`}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-cover w-48 h-48 mx-auto mb-4"
                  />
                  <h3 className="text-dark dark:text-white">
                    Name - {item.name}
                  </h3>
                  <h3 className="text-dark dark:text-white">
                    Date added - {formatDate(item.dateAddedToFavorites)}
                  </h3>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
