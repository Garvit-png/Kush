import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__dot hero__dot--top"></div>

      {/* LEFT */}
      <div className="hero__left">
        <div className="hero__badge">
          <div className="hero__badge-text">Helped And Guided Over</div>
          <div className="hero__badge-row">
            <span className="hero__badge-number">1L+</span>
            <span className="hero__badge-label">peoples</span>
            <div className="avatar-stack">
              <span className="avatar-stack__item avatar-stack__item--1"></span>
              <span className="avatar-stack__item avatar-stack__item--2"></span>
              <span className="avatar-stack__item avatar-stack__item--3"></span>
              <span className="avatar-stack__item avatar-stack__item--4"></span>
              <span className="avatar-stack__more">+</span>
            </div>
          </div>
        </div>

        <h1 className="hero__title">
          Build Yourself <br />
          <strong>Anytime,</strong>
        </h1>

        <p className="hero__subtitle">
          Join thousands of learners and take your career to the next level with
          our expert-led courses.
        </p>

        <button className="btn btn--dark">Start Learning Now</button>
      </div>

      {/* RIGHT */}
      <div className="hero__right">
        <div className="hero__photo-frame">
          <div className="hero__photo-backdrop"></div>
          <Image
            src="/hero.png"
            alt="Kush Adhana"
            width={420}
            height={560}
            className="hero__photo"
            priority
          />
          <div className="hero__pill">Success Courses</div>
        </div>
      </div>
    </section>
  );
}
