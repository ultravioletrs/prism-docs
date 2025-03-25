import Link from "@docusaurus/Link";
import { HeaderData } from "@site/data/data";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@site/src/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "@site/src/components/ui/separator";

export default function HeaderSection() {
    return (
      <header className="tw-sticky tw-top-0 tw-z-50 tw-shadow-sm tw-py-4 tw-bg-gray-900 tw-text-white">
        <div className="container tw-mx-auto tw-flex tw-items-center tw-justify-between">
          <Link 
            href="/" 
            className="web-link"
          >
            <img
              src={HeaderData.logo.src}
              alt={HeaderData.logo.alt}
              width={HeaderData.logo.width}
              height={HeaderData.logo.height}
            />
          </Link>
          <nav className="tw-hidden md:tw-flex tw-flex-1 tw-justify-center">
            <ul className="tw-flex tw-space-x-8 tw-items-center">
              {HeaderData.navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="web-link tw-text-lg tw-transition-colors hover:tw-text-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
  
          <div className="tw-hidden md:tw-flex tw-items-center tw-gap-6">
            <Button 
              variant="outline" 
              aria-label={HeaderData.ctaButton.text} 
              asChild={true}
            >
              <Link href={HeaderData.ctaButton.link} className="web-link">
                {HeaderData.ctaButton.text}
              </Link>
            </Button>
          </div>
  
          <MobileMenu />
        </div>
      </header>
    );
  }
  
  function MobileMenu() {
    const [open, setOpen] = useState(false);
  
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild={true}>
          <Button className="md:tw-hidden" aria-label="Toggle Mobile menu">
            <Menu className="tw-h-6 tw-w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="tw-bg-gray-900 tw-text-white">
          <SheetHeader>
            <SheetTitle className="tw-hidden">Menu</SheetTitle>
          </SheetHeader>
          <Separator className="tw-my-8 tw-bg-gray-700" />
          <nav className="tw-flex tw-flex-col tw-gap-4">
            <ul className="tw-flex tw-flex-col tw-space-y-4 tw-items-center">
              {HeaderData.navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="web-link tw-text-xl hover:tw-text-blue-300 tw-transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Separator className="tw-my-4 tw-bg-gray-700" />
  
            <Button 
              variant="outline" 
              aria-label={HeaderData.ctaButton.text} 
              asChild={true}
            >
              <Link
                className="web-link"
                href={HeaderData.ctaButton.link}
                onClick={() => setOpen(false)}
              >
                {HeaderData.ctaButton.text}
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
