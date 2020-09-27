import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Amplify from 'aws-amplify';
import {AmplifyChatbot} from '@aws-amplify/ui-react';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const propTypes = {
    ...SectionTilesProps.types,
};

const defaultProps = {
    ...SectionTilesProps.defaults,
};

const Testimonial = ({
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
        title: 'Capital One Chat Bot',
        paragraph:
            'Introducing the Capital One Chatbot that leverages Amazon AWS Lex and our custom serverless architecture to process data and scale up to infinite loads.' +
            ' The chat bot is able to provide unique insights on your spendings on the spot leveraging our backend within milliseconds.',
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
                    <AmplifyChatbot
                        botName="CapitalOneHackathon"
                        botTitle="Capital One Hackathon"
                        welcomeMessage="Hello, how can I help you?"
                        conversationModeOn={true}
                    />
                    </div>
                </div>
            </div>
        </section>
    );
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;
