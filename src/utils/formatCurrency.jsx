const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "SGD",
  style: "currency",
});

export function formatCurrency(number) { // i think this would be nicer if you could also pass a source and/or target currency
  return CURRENCY_FORMATTER.format(number);
}
