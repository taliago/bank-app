export enum TransactionType { openAccount, deposit, withdraw }

export class BankTransaction {
    constructor(public amount: number, public trnDate: Date = new Date(), public asmachta: string, public trnTyp: TransactionType) { }
    toString(): string {
        return `on ${this.trnDate.toDateString()} a ${TransactionType[this.trnTyp]} of ${this.amount} NIS`;
    }

}
//let t2: BankTransaction = new BankTransaction(1000, undefined, "opening", TransactionType.openAccount);
//console.log(t2.toString());
