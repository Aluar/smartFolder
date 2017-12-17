const electron = require('electron');
const path = require('path');
const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');

let observers = [];
const sep = '/';

class Store {  
  
  constructor(opts) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');

    this.data = parseDataFile(this.path, opts.defaults);
  }
  
  // This will just return the property on the `data` object
  get(key) {
    return this.itemGet(key);
  }
  
  push(key, value)
  {
	this.itemPush(key, value);
	
	this.callObservers(key);
	
	this.writeData();
  }  
  
  set(key, value) 
  { 
    this.itemSet(key, value);
			
	this.callObservers(key);
	
	this.writeData();
  }
  
  remove(key)
  {
	let keys = key.split(sep);
	
	if (keys.length == 0)
	{
		delete this.data;
	}else
	{
		let res = this.data;
		
		for(let i = 0; i < (keys.length - 1); i++)
		{
			if (!(keys[i] in res) || (res[keys[i]] == null))
				res[keys[i]] = {};
			
			res = res[keys[i]];			
		}

		delete res[keys[keys.length - 1]];
	}	
	
	this.callObservers(key);
	
	this.writeData();
  }
    
  observer(funct, sender, key,  id)
  {	
	observers.push({key:key, sender:sender, funct:funct, id:id});
	
	this.callObservers(key);
  }
  
  itemGet(key)
  {
	let keys = key.split(sep);
	let res = this.data;
	
	for(let k of keys)
		if (k in res)
			res = res[k];		
		else
			return null;
	
	return res;
  }
  
  itemSet(key, value)
  {
	let keys = key.split(sep);
	
	if (keys.length == 0)
	{
		this.data = value;
		return;
	}
	
	let res = this.data;
	
	for(let i = 0; i < (keys.length - 1); i++)
	{
		if (!(keys[i] in res) || (res[keys[i]] == null))
			res[keys[i]] = {};
		
		res = res[keys[i]];			
	}
	
	res[keys[keys.length - 1]] = value;
  }
  
  itemPush(key, value)
  {
	let keys = key.split(sep);
	
	if (keys.length == 0)
	{
		this.data = value;
		return;
	}
	
	let res = this.data;
	
	for(let i = 0; i < keys.length; i++)
	{
		if (!(keys[i] in res) || (res[keys[i]] == null))
			res[keys[i]] = {};
		
		res = res[keys[i]];			
	}
	
	let i = 0;
/*	
	do{
		if (!(i in res))
		{
			res[i] = value;
			break;
		}
		i++;
	}while(true);
*/
	res[generateGUID()] = value;	
  }
  
  callObservers(key, value)
  {
	for (let item of observers)
		if (key.includes(item.key))
			item.sender.send(item.funct, {key:item.key, id:item.id, value:this.get(item.key)})
  }
  
  writeData()
  {
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
	try {
		fs.writeFileSync(this.path, JSON.stringify(this.data));
	} catch(error) {
		//
		throw err;
	}
  }
}

function parseDataFile(filePath, defaults) 
{
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  
  try 
  {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

function generateGUID()
{
  return new Date().toISOString().slice(0,10) + '_' + uuidv4();
  //Math.random().toString(36).substr(2, 9);
}

 
// expose the class
module.exports = Store;