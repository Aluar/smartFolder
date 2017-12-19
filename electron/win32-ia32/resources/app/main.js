const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain
const windows = require('./winManager.js');
const files = require('./fileManager.js');
const Store = require('./db.js');

let mainWindow = null;

const dbName = 'inventario';
const mainIndex = 'smartfolder/index.html';
const servCLOUSE = 'win-clouse';
const servMINIMIZE = 'win-minimize';
const servOFD = 'open-file-dialog';
const servCF = 'copy-file';
const servDI = 'drives-info';
const servDL = 'dirrectori-list';
const servNW = 'show-window';
const servWM = 'winmsg';
const servDBPUSH = 'push';
const servDBGET = 'get';
const servDBSET = 'set';
const servDBREMOVE = 'remove';
const servDBOBSERVER = 'observe';
const servRF = 'readfile';
const servWF = 'writefile';

let db;

app.on('ready', () =>
{
	windows.showLoading().then(() =>
	{
		db = new Store({configName: dbName, defaults: { }});

		mainWindow = windows.createWindow(mainIndex);
		mainWindow.on('closed', () =>
		{
			windows.clouseAll();
			mainWindow = null;
		});
	})
});

app.on('window-all-closed', () =>
{
  if (process.platform !== 'darwin')
  {
    app.quit();
  }
});

app.on('activate', () =>
{
  if (main === null) {
	main = windows.createWindow(mainIndex);
	main.on('closed', () => {
		windows.clouseAll();
		mainWindow = null;
	});
	//db = sotore.Store();
  }
});

ipc.on(servCLOUSE, function (event,args)
{
	if (args)
	{
		if (args.winname == "main")
			mainWindow.close();
		else
			windows.close(args.winname);
	}
})

ipc.on(servOFD, function (event, args)
{
	files.getFile(args).then((file) => event.sender.send(servOFD, file));
})

ipc.on(servCF,  function(event, args)
{
	files.copyFiles(args.srcfiles, args.destdirectory, (data) =>
	{
		event.sender.send(servCF, data)
	});
})

ipc.on(servDI, function (event,args)
{
	files.drivesInfo()
		.then((drives) => event.sender.send(servDI, {drives:drives}))
		.catch((err) => event.sender.send(servDI, {error:err}))
})

ipc.on(servDL, function (event,args)
{
	files.getDir(args.path)
		.then((files) => event.sender.send(servDL, {files:files}))
		.catch((err) => event.sender.send(servDL, {error:err}))
})

ipc.on(servNW, function (event, args)
{
	windows.newWindows(args.winname, args.path)
		.then((winName) => event.sender.send(servNW, {winname:winName}))
})

ipc.on(servWM, function (event, args)
{
	if (args && (args.reciver == "main"))
		mainWindow.webContents.send(servWM, {sender:args.sender, funct:args.funct, args:args.args});
	else
		windows.message(args.reciver, args.sender, args.funct, args.args);
})

ipc.on(servDBPUSH, function (event, args)
{
	db.push(args.key, args.value);
})

ipc.on(servDBGET, function (event, args)
{
	event.sender.send(servDBGET, {value:db.get(args.key)})
})

ipc.on(servDBSET, function (event, args)
{
	db.set(args.key, args.value);
})

ipc.on(servDBREMOVE, function (event, args)
{
	db.remove(args.key);
})

ipc.on(servDBOBSERVER, function (event, args)
{
	db.observer(servDBOBSERVER, event.sender, args.key, args.id);
})

ipc.on(servMINIMIZE, function (event, args)
{
	if (args && args.winname)
		if (args.winname == "main")
		{
			//windows.minimizeAll();
			mainWindow.minimize();
		}else
			windows.minimize(args.winname);
})

ipc.on(servRF, function (event,args)
{
	files.readfile(args.file)
		.then((data) => event.sender.send(servRF, {data:data}))
		.catch((err) => event.sender.send(servRF, {error:err}))
})

ipc.on(servWF, function (event,args)
{
	files.writefile(args.file, args.data)
		.then((data) => event.sender.send(servWF, {succed:true}))
		.catch((err) => event.sender.send(servWF, {succed:false, error:err}))
})