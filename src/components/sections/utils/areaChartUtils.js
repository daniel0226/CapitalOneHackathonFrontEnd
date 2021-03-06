export const getAreaChartData = async () => {
    return await fetch(
        'https://bg19k9870g.execute-api.us-east-1.amazonaws.com/dev/purchases/5f6ea470f1bac107157e1199/daily/top'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                data[i].date = data[i].date.substring(5);
            }
            return data.reverse();
        });
};
