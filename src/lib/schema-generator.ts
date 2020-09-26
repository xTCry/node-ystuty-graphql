import Fs from 'fs';
import path from 'path';
import { printSchema } from 'graphql';
import schema from '../graphql/schema';

Fs.writeFileSync(path.resolve(path.join(__dirname, '../../schema.graphql')), printSchema(schema));
