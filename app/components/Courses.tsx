import Image from "next/image";

const books = [
  { src: "/hairfall-guide.png", alt: "Hairfall Guide", featured: false },
  { src: "/facial-symmetry.png", alt: "Facial Symmetry", featured: true },
  { src: "/aesthetic-glowup.png", alt: "Aesthetic Glow Up", featured: false },
];

export default function Courses() {
  return (
    <section className="courses">
      <button className="courses__arrow" aria-label="Previous">
        &#8592;
      </button>

      <div className="courses__grid">
        {books.map((book) => (
          <article
            key={book.alt}
            className={`courses__card${book.featured ? " courses__card--featured" : ""}`}
          >
            <Image
              src={book.src}
              alt={book.alt}
              width={book.featured ? 400 : 290}
              height={book.featured ? 540 : 390}
              style={{ width: "100%", height: "auto" }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
