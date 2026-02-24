/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      tours: "Tours",
      testimonials: "Testimonials",
      contact: "Contact",
      selectLanguage: "Select Language",
      chooseLanguage: "Choose language",
      mobileFollow: "Follow us on social media",
    },
    home: {
      kicker: "Premium Private Tours in Georgia",
      title: "VanTravelGeorgia",
      subtitle: "Explore Georgia With Comfort & Freedom",
      description:
        "Private tours, mountain adventures, cultural journeys and unforgettable road trips across Georgia.",
      viewTours: "View Tours",
      contactUs: "Contact Us",
      happyTravelers: "Happy Travelers",
      signatureRoutes: "Signature Routes",
      support: "Support",
    },
    about: {
      title: "About VanTravelGeorgia",
      p1: "At VanTravelGeorgia, we believe in exploring Georgia with comfort and freedom. Our private tours, mountain adventures, wine journeys, and cultural experiences are designed to give you an unforgettable journey through one of the world's most beautiful destinations.",
      p2: "Our mission is to make your travel safe, enjoyable, and full of authentic Georgian experiences. From the peaks of Kazbegi to the coastal beauty of Batumi, we take care of every detail so you can focus on the adventure.",
      f1Title: "Comfortable Travel",
      f1Text: "Modern, well-maintained vehicles for your journey",
      f2Title: "Expert Guides",
      f2Text: "Local knowledge and insider perspectives",
      f3Title: "Authentic Experiences",
      f3Text: "Genuine Georgian culture and traditions",
    },
    testimonials: {
      title: "What Our Travelers Say",
      subtitle: "Real experiences from people who explored Georgia with us",
    },
    tours: {
      title: "Our Tours",
      filters: {
        all: "All",
        mountain: "Mountain",
        wine: "Wine",
        sea: "Sea",
        culture: "Culture",
      },
      detail: {
        back: "Back",
        notFound: "Tour not found",
        backToTours: "Back to Tours",
        perPerson: "per person",
        about: "About This Tour",
        highlights: "Tour Highlights",
        itinerary: "Itinerary",
        included: "What's Included",
        gallery: "Gallery",
        day: "Day",
        from: "From",
        duration: "Duration",
        location: "Location",
        category: "Category",
        bookNow: "Book Now",
        bookingNote: "Contact us for custom dates and group bookings",
      },
    },
    contact: {
      title: "Get in Touch",
      intro:
        "Ready to start your Georgian adventure? We'd love to hear from you! Reach out with any questions or to book your personalized tour.",
      phone: "Phone",
      email: "Email",
      location: "Location",
      phoneHours: "Mon-Sun: 9:00 AM - 8:00 PM",
      emailReply: "We reply within 24 hours",
      locationCity: "Tbilisi, Georgia",
      locationCoverage: "Serving all of Georgia",
      followUs: "Follow Us",
      formTitle: "Send us a Message",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      subjectLabel: "Subject",
      messageLabel: "Your Message",
      namePlaceholder: "John Doe",
      emailPlaceholder: "john@example.com",
      phonePlaceholder: "+995 555 123 456",
      messagePlaceholder: "Tell us about your travel plans...",
      topicPlaceholder: "Select a topic",
      topicBooking: "Tour Booking",
      topicCustom: "Custom Tour Request",
      topicQuestion: "General Question",
      topicFeedback: "Feedback",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully. We will contact you soon.",
      timeout: "Request timed out. Please check server and try again.",
      fail: "Failed to send message. Please try again in a moment.",
    },
    footer: {
      description:
        "Explore the beauty of Georgia with comfort and freedom. From mountains to coast, we create unforgettable experiences.",
      quickLinks: "Quick Links",
      aboutUs: "About Us",
      ourTours: "Our Tours",
      popularTours: "Popular Tours",
      kazbegi: "Kazbegi Mountains",
      wine: "Wine Region Tours",
      batumi: "Batumi & Black Sea",
      svaneti: "Svaneti Adventure",
      custom: "Custom Tours",
      contactInfo: "Contact Info",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
  ge: {
    nav: {
      home: "მთავარი",
      about: "ჩვენ შესახებ",
      tours: "ტურები",
      testimonials: "შეფასებები",
      contact: "კონტაქტი",
      selectLanguage: "ენის არჩევა",
      chooseLanguage: "აირჩიეთ ენა",
      mobileFollow: "გამოგვყევით სოციალურ ქსელებში",
    },
    home: {
      kicker: "პრემიუმ კერძო ტურები საქართველოში",
      title: "VanTravelGeorgia",
      subtitle: "აღმოაჩინე საქართველო კომფორტითა და თავისუფლებით",
      description:
        "კერძო ტურები, მთის თავგადასავლები, კულტურული მარშრუტები და დაუვიწყარი მოგზაურობები საქართველოს გარშემო.",
      viewTours: "ტურების ნახვა",
      contactUs: "დაგვიკავშირდი",
      happyTravelers: "კმაყოფილი მოგზაური",
      signatureRoutes: "მთავარი მარშრუტი",
      support: "მხარდაჭერა",
    },
    about: {
      title: "VanTravelGeorgia-ს შესახებ",
      p1: "VanTravelGeorgia-ში გვჯერა, რომ საქართველო უნდა აღმოაჩინო კომფორტითა და თავისუფლებით. ჩვენი კერძო ტურები, მთის თავგადასავლები, ღვინის მარშრუტები და კულტურული გამოცდილებები შექმნილია დაუვიწყარი მოგზაურობისთვის.",
      p2: "ჩვენი მისიაა შენი მოგზაურობა იყოს უსაფრთხო, სასიამოვნო და ავთენტური ქართული გამოცდილებებით სავსე. ყაზბეგის მწვერვალებიდან ბათუმის სანაპირომდე, ყველა დეტალზე ჩვენ ვზრუნავთ.",
      f1Title: "კომფორტული მგზავრობა",
      f1Text: "თანამედროვე, გამართული ტრანსპორტი თქვენი მოგზაურობისთვის",
      f2Title: "პროფესიონალი გიდები",
      f2Text: "ადგილობრივი ცოდნა და ინსაიდერული ხედვა",
      f3Title: "ავთენტური გამოცდილება",
      f3Text: "ნამდვილი ქართული კულტურა და ტრადიციები",
    },
    testimonials: {
      title: "რას ამბობენ ჩვენი მოგზაურები",
      subtitle: "რეალური გამოცდილებები მათგან, ვინც ჩვენთან ერთად იმოგზაურა",
    },
    tours: {
      title: "ჩვენი ტურები",
      filters: {
        all: "ყველა",
        mountain: "მთის",
        wine: "ღვინის",
        sea: "ზღვის",
        culture: "კულტურული",
      },
      detail: {
        back: "უკან",
        notFound: "ტური ვერ მოიძებნა",
        backToTours: "ტურებზე დაბრუნება",
        perPerson: "ერთ ადამიანზე",
        about: "ტურის შესახებ",
        highlights: "ტურის მთავარი პუნქტები",
        itinerary: "მარშრუტი",
        included: "რაში შედის",
        gallery: "გალერეა",
        day: "დღე",
        from: "ფასი იწყება",
        duration: "ხანგრძლივობა",
        location: "ლოკაცია",
        category: "კატეგორია",
        bookNow: "დაჯავშნა",
        bookingNote: "დაგვიკავშირდით ინდივიდუალური თარიღებისა და ჯგუფური ჯავშნისთვის",
      },
    },
    contact: {
      title: "დაგვიკავშირდით",
      intro:
        "მზად ხარ შენი ქართული თავგადასავლისთვის? სიამოვნებით მოგისმენთ! მოგვწერე შეკითხვებისთვის ან ინდივიდუალური ტურის დასაგეგმად.",
      phone: "ტელეფონი",
      email: "ელფოსტა",
      location: "ლოკაცია",
      phoneHours: "ორშ-კვ: 09:00 - 20:00",
      emailReply: "პასუხს 24 საათში გიბრუნებთ",
      locationCity: "თბილისი, საქართველო",
      locationCoverage: "ვმუშაობთ მთელი საქართველოს მასშტაბით",
      followUs: "გამოგვყევით",
      formTitle: "გამოგვიგზავნეთ შეტყობინება",
      nameLabel: "თქვენი სახელი",
      emailLabel: "ელფოსტის მისამართი",
      phoneLabel: "ტელეფონის ნომერი",
      subjectLabel: "თემა",
      messageLabel: "თქვენი შეტყობინება",
      namePlaceholder: "მაგ: ირაკლი",
      emailPlaceholder: "მაგ: user@example.com",
      phonePlaceholder: "+995 555 123 456",
      messagePlaceholder: "მოგვწერეთ თქვენი სურვილები...",
      topicPlaceholder: "აირჩიეთ თემა",
      topicBooking: "ტურის დაჯავშნა",
      topicCustom: "ინდივიდუალური ტური",
      topicQuestion: "ზოგადი კითხვა",
      topicFeedback: "შეფასება",
      send: "გაგზავნა",
      sending: "იგზავნება...",
      success: "შეტყობინება წარმატებით გაიგზავნა. მალე დაგიკავშირდებით.",
      timeout: "მოთხოვნამ გადააჭარბა დროს. გადაამოწმეთ სერვერი და სცადეთ თავიდან.",
      fail: "შეტყობინების გაგზავნა ვერ მოხერხდა. სცადეთ ხელახლა.",
    },
    footer: {
      description:
        "აღმოაჩინე საქართველოს სილამაზე კომფორტითა და თავისუფლებით. მთებიდან სანაპირომდე, ჩვენ ვქმნით დაუვიწყარ გამოცდილებებს.",
      quickLinks: "სწრაფი ბმულები",
      aboutUs: "ჩვენ შესახებ",
      ourTours: "ჩვენი ტურები",
      popularTours: "პოპულარული ტურები",
      kazbegi: "ყაზბეგის მთები",
      wine: "ღვინის რეგიონი",
      batumi: "ბათუმი და შავი ზღვა",
      svaneti: "სვანეთის თავგადასავალი",
      custom: "ინდივიდუალური ტურები",
      contactInfo: "საკონტაქტო ინფორმაცია",
      rights: "ყველა უფლება დაცულია.",
      privacy: "კონფიდენციალობის პოლიტიკა",
      terms: "მომსახურების პირობები",
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    return saved === "ge" ? "ge" : "en";
  });

  const value = useMemo(
    () => ({
      language,
      setLanguage: (next) => {
        const normalized = next === "ge" ? "ge" : "en";
        localStorage.setItem("language", normalized);
        setLanguage(normalized);
      },
      t: translations[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
