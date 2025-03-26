import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { TrustedBySection } from '@site/src/components/trusted_by';
import { HeroSection } from '../components/hero';
import HeaderSection from '../components/header';
import { ProductSection } from "../components/product";
import { BenefitsSection } from "../components/benefits";
import { UsedForSection } from "../components/use-for";
import { UsecasesSection } from "../components/section-usecases";
import { PricingSection } from "../components/section-pricing";
import { FaqSection } from "../components/section-faq";
import { FooterSection } from "../components/section-footer";


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className="web-body">
      <HeaderSection />
      <div className="tw-mt-4 container">
        <div className="row">
          <div className="col col--12">
            <HeroSection />
            <TrustedBySection />
            <ProductSection />
            <BenefitsSection />
            <UsedForSection />
            <UsecasesSection />
            <PricingSection />
            <FaqSection />
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
