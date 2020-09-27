import React, {useState} from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import {PieChart, Pie, Cell, Tooltip} from 'recharts';
import LabelList from "recharts/lib/component/LabelList";

var Merchants;
var Purchases;
var Sum;
var Categories;

async function getData() {
    var Percentages;
    Merchants = await getMerchantCategory();
    Purchases = await getPurchasesByID();
    Sum = await getPurchaseSum(Purchases);
    Categories = await getSumCategories(Merchants, Purchases);
    Percentages = await getPercentages(Categories);
    console.log(Percentages);
    return Percentages;
}

async function getPercentages(Categories) {
    let PricePercentages = [];

    let keys = Array.from(Categories.keys());

    for (var j = 0; j < keys.length; j++) {
        PricePercentages.push({
            name: keys[j],
            value: (parseFloat(Categories.get(keys[j])) / Sum) * 100,
        });
    }

    return PricePercentages;
}

async function getPurchaseSum(Purchases) {
    let sum = 0;

    for (var i = 0; i < Purchases.length; i++) {
        sum += parseFloat(Purchases[i].amount);
    }

    return sum;
}

async function getSumCategories(Merchants, Purchases) {
    let PricesSumByCategory = new Map();

    for (var i = 0; i < Purchases.length; i++) {
        var obj = Purchases[i];

        var category = Merchants.get(obj.merchant_id);

        let currentValue = obj.amount;

        if (Array.isArray(category)) {
            category = category[0];
        }

        if (PricesSumByCategory.has(category)) {
            currentValue += parseFloat(PricesSumByCategory.get(category));
        }

        PricesSumByCategory.set(category, currentValue);
    }

    return PricesSumByCategory;
}

async function getPurchasesByID() {
    let Purchases = [];
    await fetch(
        'http://api.reimaginebanking.com/accounts/5f6ea470f1bac107157e1199/purchases?key=9c1ac5d3dab026944436f0acda93c966'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (obj) {
            for (var i = 0; i < obj.length; i++) {
                Purchases.push(obj[i]);
            }
        });
    return Purchases;
}

async function getMerchantCategory() {
    let MerchantCategory = new Map();

    await fetch(
        'http://api.reimaginebanking.com/merchants?key=9c1ac5d3dab026944436f0acda93c966'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (obj) {
            for (var i = 0; i < obj.length; i++) {
                var jsonObj = obj[i];
                MerchantCategory.set(jsonObj._id, jsonObj.category);
            }
        });

    return MerchantCategory;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(2)}%`}
        </text>
    );
};

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
    const [data, setData] = useState([]);

    getData().then(result => {
        setData(result);
        return result;
    }).catch(error => {
        console.error(`There was an error with the getData method`, error);
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
                                            data={data}
                                            cx={175}
                                            cy={180}
                                            labelLine={true}
                                            label={renderCustomizedLabel}
                                            outerRadius={150}
                                            innerRadius={100}
                                            paddingAngle={5}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
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
                                        <Tooltip/>
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
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Robust Workflow
                                    </h4>
                                    <PieChart width={360} height={360}>
                                        <Pie
                                            data={data}
                                            cx={175}
                                            cy={180}
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={150}
                                            innerRadius={100}
                                            paddingAngle={5}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
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
                                    </PieChart>
                                </div>
                            </div>
                        </div>

                        <div
                            className="tiles-item reveal-from-bottom"
                            data-reveal-delay="400"
                        >
                            <div className="tiles-item-inner">
                                <div className="features-tiles-item-header">
                                    <div className="features-tiles-item-image mb-16">
                                        <Image
                                            src={require('./../../assets/images/feature-tile-icon-03.svg')}
                                            alt="Features tile icon 03"
                                            width={64}
                                            height={64}
                                        />
                                    </div>
                                </div>
                                <div className="features-tiles-item-content">
                                    <h4 className="mt-0 mb-8">
                                        Robust Workflow
                                    </h4>
                                    <PieChart width={360} height={360}>
                                        <Pie
                                            data={data}
                                            cx={175}
                                            cy={180}
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={150}
                                            innerRadius={100}
                                            paddingAngle={5}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
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
                                    </PieChart>
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
