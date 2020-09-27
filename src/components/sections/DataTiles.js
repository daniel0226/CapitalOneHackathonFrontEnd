import React, {useState, useEffect } from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import {PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid} from 'recharts';
import {getPieChartData} from "./utils/pieChartUtils";
import {getAreaChartData} from "./utils/areaChartUtils";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const propTypes = {
    ...SectionTilesProps.types,
};

const defaultProps = {
    ...SectionTilesProps.defaults,
};
const DataTiles = ({
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
    const [data, setData] = useState({
        pieChartData: [],
        areaChartData: []
    });

    getPieChartData().then(result => {
        setData({
            ...data,
            pieChartData: result
        });
        return result;
    }).catch(error => {
        console.error(`There was an error with the getPieChartData method`, error);
    });

    getAreaChartData().then(result => {
        setData({
            ...data,
            areaChartData: result
        });
        return result
    }).catch(error => {
        console.error(`There was an error with the getAreaChartData method`, error);
    });

    const outerClasses = classNames(
        'features-tiles section',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'features-tiles-inner section-inner pt-0',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
        'tiles-wrap center-content',
        pushLeft && 'push-left'
    );

    const sectionHeader = {
        title: 'Build up the whole picture',
        paragraph:
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.',
    };

    return (
        <section {...props} className={outerClasses}>
            <div className="container">
                <div className={innerClasses}>
                    <SectionHeader
                        data={sectionHeader}
                        className="center-content"
                    />
                    <div className={tilesClasses}>
                        <div className="tiles-item reveal-from-bottom">
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/feature-tile-icon-02.svg')}
                                            alt="Features tile icon 02"
                                            width={64}
                                            height={64}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Purchases by Category
                                    </h4>
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
                        </div>

                        <div
                            className="tiles-item reveal-from-bottom"
                            data-reveal-delay="200"
                        >
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/feature-tile-icon-02.svg')}
                                            alt="Features tile icon 02"
                                            width={64}
                                            height={64}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content" style={{"background-color": "white"}}>
                                    <h4 className="mt-0 mb-8">
                                        Robust Workflow
                                    </h4>
                                    <AreaChart width={730} height={250} data={data.areaChartData}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

DataTiles.propTypes = propTypes;
DataTiles.defaultProps = defaultProps;

export default DataTiles;
