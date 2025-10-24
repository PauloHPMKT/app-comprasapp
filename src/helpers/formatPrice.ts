export class FormatPrice {
  private static formatCurrency(currLocation: string, curr: string) {
    return Intl.NumberFormat(currLocation, { style: 'currency', currency: curr });
  }

  static toBRL(value: string | number): string {
    const numberValue = typeof value === 'string' ? Number(value) : value;
    return this.formatCurrency('pt-BR', 'BRL').format(numberValue).replace('.', ',');
  }
}
