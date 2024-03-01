import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('etherscan_transactions')
export class EtherscanTransactionsEntity {
  @PrimaryColumn({ unique: true })
  hash: string;

  @Column({ name: 'block_number', type: 'numeric' })
  blockNumber: string;

  @Column({ nullable: true })
  from: string;

  @Column({ nullable: true })
  to: string;

  @Column({ type: 'numeric' })
  value: string;
}
