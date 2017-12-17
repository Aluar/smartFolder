const dialog = require('electron').dialog
const path = require('path')
const fs = require('fs-extra')
const ds = require('fd-diskspace')

module.exports =
{
	getFile : function(args)
	{
		return new Promise((resolve, reject) =>
		{
			dialog.showOpenDialog(
			{
				filters:[args.filetype],
				properties: ['openFile']
			}, function (files)
			{
				let res = {filename:"", size:0, extra:""}
				if (files)
				{
					res.filename = files[0];
					res.size = fs.statSync(res.filename).size;
					res.extra = args.extra;
				}

				resolve(res);
			})
		})
	},

	copyFiles : function(srcFiles, destDirectory, callback)
	{
		fs.ensureDir(destDirectory, err =>
		{
			if (err)
				callback({error:err});
		})

		this.copyFile(srcFiles, destDirectory, 0, callback, this.copyFile);
	},

	copyFile : function (srcFiles, destDirectory, index, callback, next)
	{
		if (index < srcFiles.length)
		{
			callback({filename:srcFiles[index], index:index, total:srcFiles.length, copied:false});

			fs.copy(srcFiles[index], path.join(destDirectory, path.basename( srcFiles[index] )), (err) =>
			{
				let res = {filename:srcFiles[index], index:index, total:srcFiles.length, copied:true};

				if (err)
					res["error"] = err;

				callback(res);

				next(srcFiles, destDirectory, (index + 1), callback, this.copyFile);
			});
		}
	},

	drivesInfo : function ()
	{
		return new Promise((resolve, reject) =>
		{
			ds.diskSpace((err, res) =>
			{
				if(err) reject(err);

				resolve(res.disks);
			});
		})
	},

	getDir : function (path)
	{
		return new Promise((resolve, reject) =>
		{
			fs.readdir(path, (err, files) =>
			{
				if(err) reject(err);

				resolve(files);
			});
		})
	}
}
