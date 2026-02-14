import "/home/lea/tours/tours-ge/src/styles/about.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-content">
        <h2>About VanTravelGeorgia</h2>
        <p>
          At VanTravelGeorgia, we believe in exploring Georgia with comfort and
          freedom. Our private tours, mountain adventures, wine journeys, and
          cultural experiences are designed to give you an unforgettable
          journey.
        </p>
        <p>
          Our mission is to make your travel safe, enjoyable, and full of
          authentic Georgian experiences. From the peaks of Kazbegi to the
          coastal beauty of Batumi, we take care of every detail so you can
          focus on the adventure.
        </p>
      </div>
      <div className="about-image">
        <img
          src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Travel in Georgia"
        />
      </div>
    </section>
  );
}
