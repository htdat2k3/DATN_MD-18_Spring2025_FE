export function formatNumberWithCommas(num: number): string {
  return num.toLocaleString("en-US");
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};