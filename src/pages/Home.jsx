import "../styles/home.css";

export default function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <h1 className="home-title">დაწყეთ თქვენი დაუვიწყარი მოგზაურობა</h1>
        <p className="home-paragraph">
          ჩვენ გთავაზობთ საუკეთესო ტურებს საქართველოში. შეიძინეთ გამოცდილება, რომელიც არ დაივიწყებთ!
        </p>
        <button className="home-button">გადახედეთ ტურებს</button>
      </div>
    </section>
  );
}
