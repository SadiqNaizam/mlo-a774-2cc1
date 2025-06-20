import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Sitemap', path: '/sitemap' },
  ];

  const socialLinks = [
    { label: 'GitHub', icon: Github, path: 'https://github.com' },
    { label: 'Twitter', icon: Twitter, path: 'https://twitter.com' },
    { label: 'LinkedIn', icon: Linkedin, path: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-muted/40 border-t text-muted-foreground">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-foreground">CS Platform</span>
            </Link>
            <p className="text-sm">
              Your comprehensive resource for computer science learning and practice.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted">
          <p className="text-center text-sm">
            &copy; {currentYear} CS Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;