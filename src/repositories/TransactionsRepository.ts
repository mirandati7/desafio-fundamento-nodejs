import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  /** *
   * Return transactions Income
   */
  public getTransactionsIncome(): number {
    const incomesTransactions = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (accumulator: Balance, transaction: Transaction) => {
          accumulator.income += transaction.value;
          return accumulator;
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      );

    return incomesTransactions.income;
  }

  /** *
   * Return transactions Outcome
   */
  public getTransactionsOutcome(): number {
    const outcomesTransactions = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (accumulator: Balance, transaction: Transaction) => {
          accumulator.outcome += transaction.value;
          return accumulator;
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      );

    return outcomesTransactions.outcome;
  }

  public getBalance(): Balance {
    const income = this.getTransactionsIncome();
    const outcome = this.getTransactionsOutcome();

    const total = this.getTransactionsIncome() - this.getTransactionsOutcome();
    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
