import { Migration } from '@mikro-orm/migrations';

export class Migration20210204104755 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "prontuario" ("num_prontuario" serial primary key, "apresentacao" varchar(255) not null, "aih" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
