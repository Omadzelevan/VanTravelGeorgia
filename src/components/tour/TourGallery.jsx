import { useState } from "react";
import ToursCard from "./TourCard";
import TourFilters from "./TourFilters";
import "/home/lea/tours/tours-ge/src/styles/tours.css";

export default function TourGallery() {
  const [filter, setFilter] = useState("all");
  const tours = [
    {
      id: 1,
      title: "Kazbegi Mountain Escape",
      location: "Stepantsminda, Georgia",
      duration: "2 Days",
      price: 180,
      category: "mountain",
      image:
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      title: "Kakheti Wine Journey",
      location: "Kakheti Region",
      duration: "1 Day",
      price: 120,
      category: "wine",
      image:
        "https://images.pexels.com/photos/367233/pexels-photo-367233.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      title: "Batumi Coastal Tour",
      location: "Batumi, Georgia",
      duration: "2 Days",
      price: 150,
      category: "sea",
      image:
        "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      title: "Ushguli Adventure",
      location: "Svaneti, Georgia",
      duration: "3 Days",
      price: 220,
      category: "culture",
      image:
        "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 5,
      title: "Tbilisi City Vibes",
      location: "Tbilisi, Georgia",
      duration: "1 Day",
      price: 100,
      category: "city",
      image:
        "https://images.pexels.com/photos/3894365/pexels-photo-3894365.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const filteredTours =
    filter === "all" ? tours : tours.filter((tour) => tour.category === filter);

  return (
    <section className="tour-gallery">
      <h2>Our Tours</h2>

      <TourFilters setFilter={setFilter} />

      <div className="tour-grid">
        {filteredTours.map((tour) => (
          <ToursCard key={tour.id} {...tour} />
        ))}
      </div>
    </section>
  );
}
