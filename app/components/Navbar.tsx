import Image from "next/image";

export default function Navbar() {
  return (
    <header className="header">
      <div className="header__profile">
        <div className="avatar-ring">
          <Image
            src="/photo.jpg"
            alt="Kush Adhana"
            width={44}
            height={44}
            className="avatar-photo"
            priority
          />
        </div>
        <h3 className="header__name">KUSH ADHANA</h3>
      </div>
    </header>
  );
}
