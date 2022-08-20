import path from 'path';
import * as del from 'del';
import {log, error} from '../utils/console';

(async () => await del(path.join(__dirname, '../../dist'))
  .then(msg => {
    log('Files cleaned:\n', msg.join(',\n'));
  }, error))();
