var fs = require('fs');

// appends the specified content at the end of the specified file
    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });


// // file is opened for writing
    fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });



//   replaces the specified file and content if it exists

    fs.writeFile('mynewfile1.txt', 'Hello content 2!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });



// // delete a file
    fs.unlink('mynewfile2.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });

// // Rename
    fs.rename('mynewfile1.txt', 'myfile.txt', function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    });