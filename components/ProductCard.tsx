"use client";

import { fetchSession } from "@/actions/fetchSession";
import type { Product } from "@/lib/types";
import Image from "next/image";

const handleClick = async ({
  id,
  name,
  description,
  price,
  imageUri,
}: Product) => {
  const session = await fetchSession({
    id,
    name,
    description,
    price,
    imageUri,
  });

  if (session.url) {
    window.location.href = session.url;
  }
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUri,
}: Product) {
  const displayPrice = (price / 100).toFixed(2);

  return (
    <div
      className="card"
      onClick={handleClick.bind(null, {
        id,
        name,
        description,
        price,
        imageUri,
      })}
    >
      <div className="card-image">
        <figure className="image is-square">
          <Image
            className="p-3"
            fill
            src={"/images/drinks/" + imageUri}
            alt={description}
          />
        </figure>
      </div>
      <div className="card-content">
        <p className="title has-text-grey-darker has-text-centered is-size-6-mobile is-size-5-desktop is-size-5-fullhd">
          {name}
        </p>
        <p className="subtitle has-text-danger has-text-weight-semibold has-text-centered is-size-6-mobile is-size-5-desktop is-size-5-fullhd">
          S${displayPrice}
        </p>
      </div>
    </div>
  );
}
