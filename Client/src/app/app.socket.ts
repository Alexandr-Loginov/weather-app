import { SocketIoConfig } from 'ngx-socket-io';

import { environment } from '../environments/environment';

export const CONFIG: SocketIoConfig = {
    url: `${environment.BASE_URL}`,
    options: {},
};
