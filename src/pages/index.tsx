import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { TrustedBySection } from '@site/src/components/trusted_by';
import { HeroSection } from '../components/hero';
import HeaderSection from '../components/header';


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
          </div>
        </div>
      </div>
    </div>
  );
}
