import React from "react";
const Footer = () => {
  const navLinks = [
    {
      linkName: "Services",
      links: [
        { name: "Branding", href: "#" },
        { name: "Design", href: "#" },
        { name: "Marketing", href: "#" },
        { name: "Advertisement", href: "#" },
      ],
    },
    {
      linkName: "Company",
      links: [
        { name: "About us", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Jobs", href: "#" },
        { name: "Press kit", href: "#" },
      ],
    },
    {
      linkName: "Legal",
      links: [
        { name: "Terms of use", href: "#" },
        { name: "Privacy policy", href: "#" },
        { name: "Cookie policy", href: "#" },
      ],
    },
  ];
  return (
    <div>
      <footer className="footer sm:footer-horizontal  text-base-content p-10">
        <aside>
          <img src="webLogo.png" alt="" className="w-10 h-10" />
          <p>
            Spendly pvt Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        {navLinks.map((item,idx) => (
          <nav key={idx}>
            <h6 className="footer-title">{item.linkName}</h6>
            {item.links.map((itm,i) => (
              <a key={i} className="link link-hover" href={itm.href}>
                {itm.name}
              </a>
            ))}
          </nav>
        ))}
      </footer>
    </div>
  );
};

export default Footer;
