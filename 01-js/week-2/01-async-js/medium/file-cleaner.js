const fs = require('fs');

function cleanContent(input, output) {
    fs.readFile(input, 'utf-8', (err, data) => {
        const cleanedContent = data.split(' ').filter((word) => { return word != '' }).join(' ');
        fs.writeFile(output, cleanedContent, 'utf-8', (err) => {
            if (err)
                console.log(err)
        })
    });
}
let input = '1-file-cleaner.md', output = '1-file-cleaner.md';
cleanContent(input, output);