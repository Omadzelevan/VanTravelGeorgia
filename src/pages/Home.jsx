import "../styles/home.css";

const highlights = [
  {
    title: "Private vans with local hosts",
    text: "Comfortable 4x4 vehicles, Wi-Fi on board, and hosts who grew up on these mountain roads.",
  },
  {
    title: "Food-first travel",
    text: "Khachapuri workshops, village wine tastings, and farm dinners baked in clay ovens.",
  },
  {
    title: "Flexible pacing",
    text: "Choose slow mornings or sunrise hikes. Every day adapts to your group.",
  },
];

const tours = [
  {
    title: "Kakheti Wine + Sighnaghi",
    days: "2 days",
    price: "From $320",
    tag: "Top pick",
    desc: "Sip qvevri wine, roll grape leaves with village cooks, and watch the sunset over Alazani Valley.",
  },
  {
    title: "Kazbegi Alpine Escape",
    days: "3 days",
    price: "From $540",
    tag: "Bestseller",
    desc: "Jeep to Gergeti, hike to waterfalls, and sleep under a roof of stars in Stepantsminda.",
  },
  {
    title: "Tbilisi Night & Art Walk",
    days: "1 day",
    price: "From $140",
    tag: "City vibes",
    desc: "Street art, sulfur baths, hidden courtyards, and a chef-led dinner in Sololaki.",
  },
];

const stats = [
  { value: "11", label: "Years guiding Georgia" },
  { value: "2800+", label: "Happy travelers" },
  { value: "4.9/5", label: "Average guest rating" },
  { value: "24/7", label: "Host support" },
];

const itineraries = [
  {
    day: "Day 1",
    title: "Tbilisi to Kazbegi",
    text: "Start with mountain viewpoints, then warm up with a private dinner and local stories.",
  },
  {
    day: "Day 2",
    title: "Alpine trails + Gergeti",
    text: "Cable car to the ridge, gentle hike, and a sunset picnic by the river.",
  },
  {
    day: "Day 3",
    title: "Return via Ananuri",
    text: "Stop at the fortress, meet honey makers, and return to Tbilisi at golden hour.",
  },
];

const testimonials = [
  {
    name: "Ava M.",
    trip: "Kakheti Wine Weekend",
    quote:
      "Every stop felt personal. Our host introduced us to a family vineyard and we spent the afternoon cooking together.",
  },
  {
    name: "Jonas K.",
    trip: "Kazbegi Escape",
    quote:
      "The van was pristine, the pace was perfect, and the views were unreal. Toru knows the hidden roads.",
  },
];

const faqs = [
  {
    q: "How many people can join a van?",
    a: "Most tours are built for 2 to 6 travelers. Larger groups can be split across premium vans.",
  },
  {
    q: "Do you offer airport pickup?",
    a: "Yes. We can arrange a private pickup any time of day or night in Tbilisi.",
  },
  {
    q: "Are tours family friendly?",
    a: "Absolutely. We tailor activities for kids and include plenty of relaxed stops.",
  },
];

export default function Home() {
  return (
    <main className="home">
      <section className="hero section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Van Travel Georgia</p>
            <h1 className="hero-title">
              Private van journeys through Georgia, designed like a slow-burning
              story.
            </h1>
            <p className="hero-lead">
              From the wine valleys of Kakheti to the snow lines of Kazbegi, we
              curate flexible adventures with local hosts, open skies, and
              unforgettable meals.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">Explore Tours</button>
              <button className="btn btn-ghost">Build a Custom Route</button>
            </div>
            <div className="hero-pillars">
              <div className="pillar">
                <span>5-10 days</span>
                <p>Recommended trip length</p>
              </div>
              <div className="pillar">
                <span>Private vans</span>
                <p>Comfort, Wi-Fi, and local hosts</p>
              </div>
              <div className="pillar">
                <span>Tailored pace</span>
                <p>Adventure + downtime balanced</p>
              </div>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-top">
              <p className="hero-card-title">Next departures</p>
              <span className="badge">Spring 2026</span>
            </div>
            <div className="hero-card-body">
              <div className="hero-card-row">
                <div>
                  <p className="label">Kakheti Wine</p>
                  <p className="value">Mar 14</p>
                </div>
                <p className="price">$320</p>
              </div>
              <div className="hero-card-row">
                <div>
                  <p className="label">Kazbegi Alpine</p>
                  <p className="value">Apr 3</p>
                </div>
                <p className="price">$540</p>
              </div>
              <div className="hero-card-row">
                <div>
                  <p className="label">Tbilisi Night</p>
                  <p className="value">Every Fri</p>
                </div>
                <p className="price">$140</p>
              </div>
            </div>
            <button className="btn btn-primary hero-card-btn">
              Reserve a seat
            </button>
          </div>
        </div>
      </section>

      <section className="section" id="why-toru">
        <div className="container">
          <p className="eyebrow">Why Toru</p>
          <h2 className="section-title">
            Travel with hosts who grew up on these routes.
          </h2>
          <p className="section-lead">
            Our guides are storytellers, chefs, and mountain drivers. We design
            each trip so you see Georgia the way locals do.
          </p>
          <div className="grid-3">
            {highlights.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="tours">
        <div className="container">
          <p className="eyebrow">Signature tours</p>
          <div className="section-head">
            <h2 className="section-title">
              Choose a journey built for your pace.
            </h2>
            <button className="btn btn-ghost">View all tours</button>
          </div>
          <div className="grid-3">
            {tours.map((tour) => (
              <article className="tour-card" key={tour.title}>
                <div className="tour-card-top">
                  <span className="badge">{tour.tag}</span>
                  <span className="tour-days">{tour.days}</span>
                </div>
                <h3>{tour.title}</h3>
                <p>{tour.desc}</p>
                <div className="tour-card-footer">
                  <span className="price">{tour.price}</span>
                  <button className="btn btn-primary">Reserve</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section stats">
        <div className="container stats-grid">
          {stats.map((item) => (
            <div className="stat" key={item.label}>
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="itineraries">
        <div className="container">
          <p className="eyebrow">Sample route</p>
          <h2 className="section-title">A three-day Kazbegi escape.</h2>
          <div className="itinerary">
            {itineraries.map((item) => (
              <article className="itinerary-item" key={item.day}>
                <div className="itinerary-day">{item.day}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="stories">
        <div className="container">
          <p className="eyebrow">Guest stories</p>
          <h2 className="section-title">Moments that stay with you.</h2>
          <div className="grid-2">
            {testimonials.map((item) => (
              <article className="testimonial" key={item.name}>
                <p className="quote">"{item.quote}"</p>
                <div className="testimonial-footer">
                  <span className="name">{item.name}</span>
                  <span className="trip">{item.trip}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">A few things travelers ask most.</h2>
          <div className="grid-2">
            {faqs.map((item) => (
              <article className="faq" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta section">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow">Ready to go</p>
            <h2 className="section-title">
              Tell us your dream route. We will design the drive.
            </h2>
            <p className="section-lead">
              Share your dates, group size, and interests. We reply within 24
              hours.
            </p>
          </div>
          <div className="cta-actions">
            <button className="btn btn-primary">Start planning</button>
            <button className="btn btn-ghost">WhatsApp us</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h3>Toru Travel Georgia</h3>
            <p>
              Private van tours across Georgia, curated by local hosts and
              storytellers.
            </p>
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <p>hello@torutravel.ge</p>
            <p>+995 555 123 456</p>
          </div>
          <div>
            <p className="footer-label">Base</p>
            <p>Tbilisi, Georgia</p>
            <p>Open daily 08:00-22:00</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
