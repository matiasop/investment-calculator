const investment_calculator = (initial, years, r, contribution) => {
  // initial: initial amount of money
  // years: years in which compounding interest will be calculated
  // r: yearly interest rate (calculated every month)
  // contribution: amount to be contributed monthly

  const monthly_r = Math.pow(1 + r, 1 / 12) - 1;
  let current_date = new Date();

  const investment = [
    {
      'year': 1,
      'month': 1,
      'date': new Date(current_date.setMonth(current_date.getMonth() + 1)),
      'start_principal': initial,
      'start_balance': initial,
      'interest': initial * monthly_r,
      'end_principal': initial + contribution,
      'end_balance': initial + initial * monthly_r + contribution
    }
  ]

  let year = 1;
  let month = 1;
  const total_months = years * 12;

  for (let i = 0; i < total_months; i++) {
    if (i == 0) {
      continue
    }
    month += 1;
    if (i % 12 == 0) {
      year += 1;
      month = 1;
    }
    investment.push({
      'year': year,
      'month': month,
      'date': new Date(current_date.setMonth(current_date.getMonth() + 1)),
      'start_principal': investment[i - 1].end_principal,
      'start_balance': investment[i - 1].end_balance,
      'interest': investment[i - 1].end_balance * monthly_r,
      'end_principal': investment[i - 1].end_principal + contribution,
      'end_balance': investment[i - 1].end_balance
        + investment[i - 1].end_balance * monthly_r + contribution
    });
  }
  return investment;
}

export default investment_calculator;