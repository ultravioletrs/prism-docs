import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';


type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
};


const FeatureList: FeatureItem[] = [
    {
        title: 'Secure Collaboration',
        Svg: require('@site/static/img/placeholder.svg').default,
        description: (
            <>
                Allows multiple parties to collaboratively process data without exposing sensitive information. Powered by Trusted Execution Environments (TEEs), our platform ensures the confidentiality and privacy of your data exchanges and AI workloads.
            </>
        ),
    },
    {
        title: 'Secure VM Provisioning and Management',
        Svg: require('@site/static/img/placeholder.svg').default,
        description: (
            <>
                Uses Trusted Execution Environments (TEEs) for secure workloads.
            </>
        ),
    },
    {
        title: 'Fine-Grained Access Control',
        Svg: require('@site/static/img/placeholder.svg').default,
        description: (
            <>
                Allows precise management of user and data permissions.
            </>
        ),
    },
    {
        title: 'End-to-End Encryption',
        Svg: require('@site/static/img/placeholder.svg').default,
        description: (
            <>
                Ensures data privacy from input to output.
            </>
        ),
    },
    {
        title: 'Support for Multiple Backends',
        Svg: require('@site/static/img/placeholder.svg').default,
        description: (
            <>
                Integrates with various computational backends.
            </>
        ),
    },
    {
        title: 'User-Friendly Interface',
        Svg: require('@site/static/img/placeholder.svg').default,
        description: (
            <>
                Simplifies complex AI workflow management.
            </>
        ),
    },
    {
        title: 'Logging and Monitoring',
        Svg: require('@site/static/img/placeholder.svg').default,
        description: (
            <>
                Provides comprehensive tracking and auditing capabilities.
            </>
        ),
    },
];

function Feature({title, Svg, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
