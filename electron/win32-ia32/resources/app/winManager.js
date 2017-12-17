const { BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const dev = true;
const servWM = 'winmsg';
const loadingIndex = 'loading.html';
const iconName = 'mi_dvd_logofi.ico';

let loadingWindow = null;
let windows = {};

module.exports =
{
	showLoading()
	{
		return new Promise((resolve, reject) =>
		{
			if (loadingWindow == null)
			{
				loadingWindow = new BrowserWindow({
					width: 300,
					height: 270,
					frame: false,
					show: false,
					center:true,
					resizable:false,
					movable:false,
					icon: path.join(__dirname, 'assets',iconName)
				})
				// Specify entry point
				loadingWindow.loadURL(url.format({
					pathname: path.join(__dirname, loadingIndex),
					protocol: 'file:',
					slashes: true
				}))
				//loadingWindow.webContents.openDevTools();

				loadingWindow.once('ready-to-show', () => {
				  loadingWindow.show();
				  resolve();
				})
			}
			else
			{
				loadingWindow.show();
				resolve();
			}
		})
	},

	hideLoading()
	{
		if (loadingWindow)
			loadingWindow.hide();
	},

	createWindow : function(index, W=1000, H=600)
	{
	  // Create the browser window.
	  let w = new BrowserWindow(
		{
			width: W,
			height: H,
			frame: false,
			show: false,
			icon: path.join(__dirname, iconName)
		})
	  // Specify entry point
	  w.loadURL(url.format({
		pathname: path.join(__dirname, index),
		protocol: 'file:',
		slashes: true
	  }))

	  // Show dev tools
	  // Remove this line before distributing
	  if (dev)
			w.webContents.openDevTools();

	  w.once('ready-to-show', () => {
		  this.hideLoading();
		  w.show();
	  })

	  return w;
	},

	newWindows : function (winName, path)
	{
		return new Promise((resolve, reject) =>
		{
			if (!windows.hasOwnProperty(winName) || windows[winName] == null)
			{
				windows[winName] = this.createWindow(path);
				windows[winName].on('closed', () =>
				{
					windows[winName] = null;
				});
			}

			if (windows[winName] != null)
				resolve(winName);
		})
	},

	close : function (winname)
	{
		if (windows.hasOwnProperty(winname))
			windows[winname].close();
	},

	clouseAll : function ()
	{
		for (let w in windows)
			windows[w].close();

		if (loadingWindow)
			loadingWindow.close();
	},

	minimize : function (winName)
	{
		if (windows.hasOwnProperty(winName))
			windows[winName].minimize();
	},

	minimizeAll : function ()
	{
		for (let w in windows)
			windows[w].minimize();
	},

	message : function (winName, winsender, funct, args)
	{
		if (windows.hasOwnProperty(winName))
			windows[winName].webContents.send(servWM, {sender:winsender, funct:funct, args:args});
	},

	messageAll : function (winsender, funct, args)
	{
		for (let w in windows)
			w.webContents.send(servWM, {sender:winsender, funct:funct, args:args});
	}
}
