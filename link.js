var exec = require('child_process').exec;
var fs   = require('fs');
var path = require('path');


var child = exec('npm link libs/react-native-barcodescanner', function(err, stdout, stderr) {
	if (err) throw err;
	console.log(stdout);

	if(process.platform != "win32"){
		current_path = process.cwd();
    project_node_modules_path = path.resolve(current_path, "node_modules");
		react_native_barcodescanner_link_path = path.resolve(current_path, "node_modules/react-native-barcodescanner")
		react_native_barcodescanner_real_path = path.resolve(project_node_modules_path, fs.readlinkSync(react_native_barcodescanner_link_path));
		fs.unlinkSync(react_native_barcodescanner_link_path);
		fs.symlinkSync(react_native_barcodescanner_real_path, react_native_barcodescanner_link_path);
		console.log(react_native_barcodescanner_link_path + " -> " + react_native_barcodescanner_real_path);
	}
});
