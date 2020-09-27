export const getAreaChartData = async () => {
    let Purchases = [];
    const data = await fetch(
        'https://bg19k9870g.execute-api.us-east-1.amazonaws.com/dev/purchases/5f6ea470f1bac107157e1199/daily/top'
    );

    return data;
};
