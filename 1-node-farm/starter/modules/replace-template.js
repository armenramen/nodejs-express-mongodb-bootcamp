module.exports = (template, product) => {
    let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%PRODUCT_ID%}/g, product.id);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%FROM%}/g, product.from);

    if (!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}