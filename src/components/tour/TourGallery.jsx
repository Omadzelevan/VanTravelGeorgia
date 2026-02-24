import { useState } from "react";
import ToursCard from "./TourCard";
import TourFilters from "./TourFilters";
import BookingModal from "../../features/booking/BookingModal";
import "../../styles/tours.css";
import { useLanguage } from "../../context/LanguageContext";
import { toursData } from "../../data/tours";

export default function TourGallery() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const tours = toursData;

  const filteredTours =
    filter === "all" ? tours : tours.filter((tour) => tour.category === filter);

  const handleQuickBook = (tourData) => {
    const tour = tours.find((t) => t.id === tourData.id);
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  return (
    <section className="tour-gallery" id="tours">
      <h2>{t.tours.title}</h2>
      <TourFilters activeFilter={filter} setFilter={setFilter} />
      <div className="tour-grid">
        {filteredTours.map((tour) => (
          <ToursCard
            key={tour.id}
            {...tour}
            images={tour.gallery}
            onQuickBook={handleQuickBook}
          />
        ))}
      </div>

      {/* Booking Modal */}
      {selectedTour && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          tour={selectedTour}
        />
      )}
    </section>
  );
}
