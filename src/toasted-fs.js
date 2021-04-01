/*
formats:
textData=what data is provided is put in,
fileObject=the js file object,
blob=a file as a blob,
Base64=to Base64 file[default]
*/
const formats = {
    textData: "textData",
    fileObject: "fileObject",
    blob: "blob",
    Base64: "Base64"
}
const toBlob = "toBlob"
const toBase64 = "toBase64"
const toFileObj = "toFileObj"
const toDiskFormat = "toDiskFormat"
class toastedDisk {
    constructor(name, format) {
        this._name = name || "_x0_"
        this._format = format || "Base64"
        this.vDisk = {}
        /*return {
            _vDisk_name: this.name,
            vDisk: {folder:{a_file: "nono"}},
            _format: this.format || "blob"
        }*/
    }
    getDisk() {
        return {
            _vDisk_name: this._name,
            vDisk: this.vDisk,
            _format: this._format
        }
    }
    diskSize() {
        return new Blob([this.vDisk]).size
    }
    mkdir(path, name) {
        path = path.replaceAll("/", ".")
        path = path.split(".");
        if (path == "") {
            this.vDisk[name] = {}
        } else {
            let disk = 'disk'
            for (var i=0;i<path.length;i++) {
                disk += `['${path[i]}']`
            }
            disk += `[name] = {}\nreturn disk`
            disk = new Function('disk','name',disk);
            this.vDisk = disk(this.vDisk, name)
            //this.vDisk[path][name] = {}
        }
    }
    async touch (path, name, data, to) {
        if (to) {
            if(to == toBase64) {
                let type = data.type
                let fileName = data.fileName
                data = new Blob([data.filePart], {type : data.type})
                data = new File([data], fileName || name || "untitled", {
                    type: type,
                });
                data = await convertBase64(data)
            } else if(to == toBlob) {
                data = new Blob([data.filePart], {type : data.type})
            } else if(to == toFileObj) {
                let type = data.type
                let fileName = data.fileName
                data = new Blob([data.filePart], {type : data.type})
                data = new File([data], fileName || name || "untitled", {
                    type: type,
                });
            } else if(to == toDiskFormat) {
                if(this._format == "Base64") {
                    let type = data.type
                    let fileName = data.fileName
                    data = new Blob([data.filePart], {type : data.type})
                    data = new File([data], fileName || name || "untitled", {
                        type: type,
                    });
                    data = await convertBase64(data)
                } else if(this._format == "blob") {
                    data = new Blob([data.filePart], {type : data.type})
                } else if(this._format == "fileObject") {
                    let type = data.type
                    let fileName = data.fileName
                    data = new Blob([data.filePart], {type : data.type})
                    data = new File([data], fileName || name || "untitled", {
                        type: type,
                    });
                }
            } else {
                return {error: "No Disk format found"}
            }
        }
        path = path.replaceAll("/", ".")
        path = path.split(".");
        name = name.replaceAll(".", "_").replaceAll("/", "")
        if (path == "") {
            this.vDisk[name] = data
        } else {  
            let disk = 'disk'
            for (var i=0;i<path.length;i++) {
                disk += `['${path[i]}']`
            }
            disk += `[name] = data\nreturn disk`
            disk = new Function('disk','data','name',disk);
            this.vDisk = disk(this.vDisk, data, name)
        }
    }
}
function print(txt) {return console.log(txt)}
const convertBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
