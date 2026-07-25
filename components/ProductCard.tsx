"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

async function fetchSession(product: Product): Promise<{ url?: string }> {
  return fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      return {};
    });
}

export default function ProductCard({
  name,
  description,
  price,
  imageUri,
}: Product) {
  const [hover, setHover] = useState(false);

  const handleClick = async () => {
    const session = await fetchSession({ name, description, price, imageUri });

    if (session.url) {
      window.location.href = session.url;
    }
  };

  const background = hover
    ? "has-background-white-bis"
    : "has-background-white-ter";

  return (
    <div
      className={"card " + background}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-image">
        <figure className="image is-square">
          <img
            className="p-3"
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
          S${(price / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
