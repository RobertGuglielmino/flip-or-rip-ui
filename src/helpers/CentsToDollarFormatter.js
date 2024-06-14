function centsToDollars(amount) {
    let unit = amount;
    const cents = (unit % 100);
    const dollars = ((unit - cents) / 100);
    const centsDisplay = cents < 10 ? "0" + cents : cents;

    return "$" + dollars + "." + centsDisplay;
}

export default centsToDollars;