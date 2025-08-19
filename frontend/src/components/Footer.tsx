import { MapPin, Mail, Phone, Github, Linkedin, X } from "lucide-react";
import { Button } from "./ui/button";
import civicIssueLogo from "../assets/civic-issue.png";
import { Link } from "react-router-dom";
import { handleSupportClick } from "./SupportModel";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted p-2 shadow-sm">
                <img
                  src={civicIssueLogo}
                  alt="Civic Issue Reporter Logo"
                  className="object-contain h-full w-full"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                FixMyTown
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Empowering communities to report and resolve civic issues through
              technology and civic engagement.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: X, label: "Twitter" },
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="icon"
                  aria-label={label}
                  className="hover:text-primary hover:scale-110 transition-transform duration-200"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Report Issue", to: "/report-issue" },
                { label: "View Reports", href: "#" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Community Guidelines", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Help Center", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                {
                  label: "Contact Us",
                  onClick: handleSupportClick,
                  href: "#",
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={link.onClick}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Contact
            </h4>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  text: "support@fixmytown.com",
                },
                {
                  icon: Phone,
                  text: "+91 0123456789",
                },
                {
                  icon: MapPin,
                  text: (
                    <>
                      123 Civic Center
                      <br />
                      Community City, CC 12345
                    </>
                  ),
                  multiline: true,
                },
              ].map(({ icon: Icon, text, multiline }, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 group hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground mt-[2px]" />
                  <span
                    className={`text-muted-foreground ${
                      multiline ? "" : "flex items-center"
                    }`}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FixMyTown. All rights
            reserved. Building better communities together.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
