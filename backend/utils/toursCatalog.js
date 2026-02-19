export const toursCatalog = [
  { id: 1, title: 'Kazbegi Mountain Escape', price: 180 },
  { id: 2, title: 'Kakheti Wine Journey', price: 120 },
  { id: 3, title: 'Batumi Coastal Tour', price: 150 },
  { id: 4, title: 'Ushguli Adventure', price: 220 },
  { id: 5, title: 'Tbilisi City Vibes', price: 100 }
];

export const getTourById = (tourId) => {
  const normalizedId = Number(tourId);
  if (!Number.isInteger(normalizedId)) {
    return null;
  }

  return toursCatalog.find((tour) => tour.id === normalizedId) || null;
};
