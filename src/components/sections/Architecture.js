import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from "../elements/Image";

const propTypes = {
    ...SectionTilesProps.types,
};

const defaultProps = {
    ...SectionTilesProps.defaults,
};

const Architecture = ({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    pushLeft,
    ...props
}) => {
    const outerClasses = classNames(
        'testimonial section',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'testimonial-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames('tiles-wrap', pushLeft && 'push-left');

    const sectionHeader = {
        title: 'Capital One Hackathon Architecture',
        paragraph:
            'Introducing the Architecture for the Capital One Hackathon Application. Made through the many Red Bulls and Coffee keeping us awake',
    };

    return (
        <section {...props} className={outerClasses}>
            <div className="container">
                <div className={innerClasses}>
                    <SectionHeader
                        data={sectionHeader}
                        className="center-content"
                    />
                    <div className="center-content">
                        <Image
                            src={require('./../../assets/images/capital-one-architecture.png')}
                            alt="Capital one Architecture"
                            width={1000}
                            height={600}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

Architecture.propTypes = propTypes;
Architecture.defaultProps = defaultProps;

export default Architecture;
