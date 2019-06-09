import fs from 'fs';
import path from 'path';

const base = '../nodejs-course';
const dst = './temp';

if (!fs.existsSync(dst)) {
    fs.mkdirSync(dst);
}

const readDir = (base, level) => {
    const files = fs.readdirSync(base);

    files.forEach(item => {
        let localBase = path.join(base, item);
        let state = fs.statSync(localBase);
        if (state.isDirectory()) {
            console.log(' '.repeat(level) + 'DIR: ' + item);
            readDir(localBase, level + 1);
        } else {
            let subDirName = item.charAt(0).toUpperCase();
            console.log(' '.repeat(level) + 'File: ' + subDirName + ' => ' + item);
            if (!fs.existsSync(`${dst}/${subDirName}`)) {
                fs.mkdirSync(`${dst}/${subDirName}`);
            }
            let newPath = `${dst}/${subDirName}/${item}`;

            if (fs.existsSync(newPath)) {
                return;
            }

            fs.link(localBase, newPath, err => {
                if (err) {
                    console.error(err.message);
                }
            });
        }
    })
};

readDir(base, 0);
