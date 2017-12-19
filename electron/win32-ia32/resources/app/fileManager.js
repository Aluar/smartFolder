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

	getDir : function (dir)
	{
		return new Promise((resolve, reject) =>
		{
			fs.readdir(dir, (err, files) =>
			{
				if(err) reject(err);

				let res = (files)? files.map((name, index, array) => 
				{
					let fn = path.join(dir, name);
					let b = {fileName:path.basename(name, path.extname(name)),
							fileExt:path.extname(name).slice(1),
							fullFileName:fn							
							};
							
					try
					{
						let a = fs.statSync(fn);
						
						b.isFile = a.isFile();
						b.isDirectory = a.isDirectory();
						b.size = a.size;
						b.userId = a.uid;
						b.groupId = a.gid;
						b.createTime = a.ctie;
						b.modifyTime = a.mtime;
						b.accessTime = a.atime;
						b.mode = a.mode;
						b.others = {execute:(a.mode && 1),write:(a.mode && 2),read:(a.mode && 4)};
						b.group = {execute:(a.mode && 10),write:(a.mode && 20),read:(a.mode && 40)};
						b.owner = {execute:(a.mode && 100),write:(a.mode && 200),read:(a.mode && 400)};
						b.isArchive = a.mode && 1000;
						b.isSystem = a.mode && 2000;						
						b.isHidden = a.mode && 4000;
/*
       The following flags are defined for the st_mode field:

           S_IFMT     0170000   bit mask for the file type bit fields
           S_IFSOCK   0140000   socket
           S_IFLNK    0120000   symbolic link
           S_IFREG    0100000   regular file
           S_IFBLK    0060000   block device
           S_IFDIR    0040000   directory
           S_IFCHR    0020000   character device
           S_IFIFO    0010000   FIFO
           S_ISUID    0004000   set UID bit
           S_ISGID    0002000   set-group-ID bit (see below)
           S_ISVTX    0001000   sticky bit (see below)
           S_IRWXU    00700     mask for file owner permissions
           S_IRUSR    00400     owner has read permission
           S_IWUSR    00200     owner has write permission
           S_IXUSR    00100     owner has execute permission
           S_IRWXG    00070     mask for group permissions
           S_IRGRP    00040     group has read permission
           S_IWGRP    00020     group has write permission
           S_IXGRP    00010     group has execute permission
           S_IRWXO    00007     mask for permissions for others (not in group)
           S_IROTH    00004     others have read permission
           S_IWOTH    00002     others have write permission
           S_IXOTH    00001     others have execute permission
*/
					}catch(err)
					{
						//reject(err);
					}
					return b;
				}) : [];
				
				resolve(res);
			});
		});
	},
	
	readfile : function (file)
	{	
		return new Promise((resolve, reject) =>
			{
console.log("main readfile");
				fs.readFile(file,  (err, data) => 
				{

console.log("error");
console.log(err);
console.log("data");
console.log(data);
					if (err)
						reject(err);

					resolve(data);
				})
			});
	},
	
	writefile : function (file, data)
	{
		return new Promise((resolve, reject) =>
			{
				fs.writeFile(file, data,  (err) => 
				{
					if (err)
						reject(err);

					resolve(true);
				})
			});
	}
}