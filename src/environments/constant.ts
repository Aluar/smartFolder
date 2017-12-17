export const COMMA = 188;
export const SEP = "/";

export const PRECIOS = "config/tienda/precios";
export const CONFIGVIDEOS = "config/video";
export const TAGS = "tags";
export const INVENTARIO = "inventario";

export const FILETYPES = {imagen:{name: 'Images', extensions: ['jpg', 'png', 'gif']},
					video:{name: 'Movies', extensions: ['mp4']}};

export const SERVCLOUSE = 'win-clouse';
export const SERVMINIMIZE = 'win-minimize';
export const SERVOFD = 'open-file-dialog';
export const SERVCF = 'copy-file';
export const SERVDI = 'drives-info';
export const SERVDL = 'dirrectori-list';
export const SERVNW = 'show-window';
export const SERVWM = 'winmsg';
export const SERVDBPUSH = 'push';
export const SERVDBGET = 'get';
export const SERVDBSET = 'set';
export const SERVDBREMOVE = 'remove';
export const SERVDBOBSERVER = 'observe';
export const ELECTRON = 'electron';

export const CLIENTUNIT = 'client-unit';
export const SHOWTIENDA = 'show-tienda';
export const SHOWTRAILERS = 'show-trailers';
export const SELECTION = 'seleccion';

export const PATHINDEXTIENDA = 'tienda/index.html';

export interface peli_vid{
	name:string;
	filename:string;
	filepath:string;
	start:number;
	duration:number;
}

export interface seleccion{
	fbkey:string;
	title:string;
	files:{name:string, size:number, file:string}[];
}
