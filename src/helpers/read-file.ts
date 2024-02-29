import path from 'path';
import fs from 'fs';

export default (file: string) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'source', file), 'utf8'));
};
