import fs from 'fs';
import { parse } from 'csv-parse';
import { randomUUID } from 'crypto';
import { Database } from './database.js';

const database = new Database()

const __dirname = new URL('../fs_read.csv', import.meta.url);

(async () => {
  const parser = fs
    .createReadStream(__dirname)
    .pipe(parse({
        from_line: 1
    }));

  for await (const record of parser) {
    const task = {
        id: randomUUID(),
        title: record[0],
        description: record[1],
        completed_at: null,
        created_at: new Date().toLocaleDateString(),
        updated_at: null
    }
    
    database.insert('tasks', task)
  }
})();