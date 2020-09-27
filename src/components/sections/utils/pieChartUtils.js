export async function getPieChartData() {
    const Merchants = await getMerchantCategory();
    const Purchases = await getPurchasesByID();
    const Sum = await getPurchaseSum(Purchases);
    const Categories = await getSumCategories(Merchants, Purchases);
    const Percentages = await getPercentages(Categories, Sum);
    return Percentages;
}

async function getPercentages(Categories, sum) {
    let PricePercentages = [];
    let keys = Array.from(Categories.keys());

    for (var j = 0; j < keys.length; j++) {
        PricePercentages.push({
            name: keys[j],
            value: (parseFloat(Categories.get(keys[j])) / sum) * 100,
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
        'https://bg19k9870g.execute-api.us-east-1.amazonaws.com/dev/purchases/5f6ea470f1bac107157e1199'
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
        'https://bg19k9870g.execute-api.us-east-1.amazonaws.com/dev/merchants'
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
