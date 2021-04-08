# toasted-fs
a browser-based file system giving you a virtual disk to work with.

## Installation
add to your html
```html
<script src="https://cdn.jsdelivr.net/gh/imagineeeinc/toasted-fs/src/toasted-fs.js"></script>
```
## Api
**Start a new disk**
```js
toastedDisk(<drive_name>, <drive_format>)
```
drive_name: the name of the drive[default='_x0_']
drive_format: the format of the files, available formTs:
- textData=what data is provided is put in
- fileObject=the js file object
- blob=a file as a blob
- Base64=to Base64 file[default]

to get the formats you can use `formats.<format from above>`, eg.: `formats.blob`

### functions
`getDisk()`
returns the disk so that you can export it

`mkdir(<path>, <name>)`
to make a folder
- path: the path at which you will make the folder, leave empty for root directory, must be presented as `folder/another folder`, the `/` is used to break between folders.
- name: the name of your folder

`touch(<path>, <name>, <data>, <convert to>)`
to add a file
- path: the path at which you will make the folder, leave empty for root directory, must be presented as `folder/another folder`, the `/` is used to break between folders.
- name: the name of the file, including `.` will be changed to `/`
- data: the internal data
- convert to: this will turn the data into the chosen file format, formats: `toBlob`: converts to blob | `toBase64`: converts to base64 | `toFileObj`: converts to file object | `toDiskForm`: converts to the chossen format of the disk`

### Data format
Data format is the schema for taking data a changing it to a format. when you provide a convert to key

you will put this in the place of data in the touch command
```
{
    filePart: internal data,
    //the data for the inside of the file
    type: the file type
    //file type is the type of file for example .js file will be 'text/js'
    fileName: the name of the file
    //file name is only available in select file formats
}
