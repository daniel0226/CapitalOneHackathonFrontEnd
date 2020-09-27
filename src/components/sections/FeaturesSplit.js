import React, {useState} from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import {Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis, RadialBarChart, RadialBar, Legend} from "recharts";
import {getPieChartData} from "./utils/pieChartUtils";
import {getAreaChartData} from "./utils/areaChartUtils";
const deepEqual = require('deep-equal');

const propTypes = {
    ...SectionSplitProps.types,
};

const defaultProps = {
    ...SectionSplitProps.defaults,
};
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const radialData = [
    {
      name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8',
    },
    {
      name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed',
    },
    {
      name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1',
    },
    {
      name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d',
    },
    {
      name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c',
    },
    {
      name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57',
    },
    {
      name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658',
    },
  ];

const radialStyle = {
    top: 0,
    left: 350,
    lineHeight: '24px',
  };

const FeaturesSplit = ({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    invertMobile,
    invertDesktop,
    alignTop,
    imageFill,
    ...props
}) => {
    console.log('COMPONENT DID MOUNT');
    const [data, setData] = useState({
        pieChartData: [],
        areaChartData: []
    });

    getPieChartData().then(result => {
        if (!deepEqual(data.pieChartData, result)) {
            setData({
                pieChartData: result
            });
        }
        return result;
    }).catch(error => {
        console.error(`There was an error with the getPieChartData method`, error);
    });

    getAreaChartData().then(result => {
        if (!deepEqual(data.areaChartData, result)) {
            setData({
                ...data,
                areaChartData: result
            });
        }
        return result
    }).catch(error => {
        console.error(`There was an error with the getAreaChartData method`, error);
    });
    const outerClasses = classNames(
        'features-split section',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'features-split-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );

    const splitClasses = classNames(
        'split-wrap',
        invertMobile && 'invert-mobile',
        invertDesktop && 'invert-desktop',
        alignTop && 'align-top'
    );

    const sectionHeader = {
        title: 'Your finances at a glance with Statistics',
        paragraph:
            "Whether it's your salary coming in or money going out, when you're buying that treat in your favorite cafe-thanks to our automatic categorization feauture, " +
            " you can see all your transactions at a glance, divided into smart sub-categories to keep you posted on your fiancial habits.",
    };

    return (
        <section {...props} className={outerClasses}>
            <div className="container">
                <div className={innerClasses}>
                    <SectionHeader
                        data={sectionHeader}
                        className="center-content"
                    />
                    <div className={splitClasses}>
                        <div className="split-item">
                            <div
                                className="split-item-content center-content-mobile reveal-from-left"
                                data-reveal-container=".split-item"
                            >
                                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                                    Data-driven insights
                                </div>
                                <h3 className="mt-0 mb-12">
                                    Spending by Categories
                                </h3>
                                <p className="m-0">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                    — Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                            </div>
                            <div
                                className={classNames(
                                    'split-item-image center-content-mobile reveal-from-bottom',
                                    imageFill && 'split-item-image-fill'
                                )}
                                data-reveal-container=".split-item"
                            >
                                <PieChart width={360} height={360}>
                                    <Pie
                                        data={data.pieChartData}
                                        cx={175}
                                        cy={180}
                                        outerRadius={150}
                                        innerRadius={100}
                                        paddingAngle={5}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.pieChartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                    index %
                                                    COLORS.length
                                                        ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value, name, props) => { return [value.toString().substring(0,5), name ] }}/>
                                </PieChart>
                            </div>
                        </div>

                        <div className="split-item">
                            <div
                                className="split-item-content center-content-mobile reveal-from-right"
                                data-reveal-container=".split-item"
                            >
                                <div className="text-xxs text-color-primary fw-600 tt-u mb-8 alignRight">
                                    Lightning fast workflow
                                </div>
                                <h3 className="mt-0 mb-12 alignRight">
                                    Daily Total Purchases
                                </h3>
                                <p className="m-0 alignRight">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                    — Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                            </div>
                            <div
                                className={classNames(
                                    'split-item-image center-content-mobile reveal-from-bottom',
                                    imageFill && 'split-item-image-fill'
                                )}
                                data-reveal-container=".split-item"
                            >
                                <AreaChart width={550} height={250} data={data.areaChartData}
                                           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="dailyTotal" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                </AreaChart>
                            </div>
                        </div>

                        <div className="split-item">
                            <div
                                className="split-item-content center-content-mobile reveal-from-left"
                                data-reveal-container=".split-item"
                            >
                                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                                    Lightning fast workflow
                                </div>
                                <h3 className="mt-0 mb-12">
                                    Data-driven insights
                                </h3>
                                <p className="m-0">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                    — Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                            </div>
                            <div
                                className={classNames(
                                    'split-item-image center-content-mobile reveal-from-bottom',
                                    imageFill && 'split-item-image-fill'
                                )}
                                data-reveal-container=".split-item"
                            >
                                <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={170} barSize={35} data={radialData}>
                                    <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
                                </RadialBarChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
