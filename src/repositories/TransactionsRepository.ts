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

  public getBalance(): Balance {
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

    const { income } = incomesTransactions;
    const { outcome } = outcomesTransactions;

    const total = income - outcome;
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
