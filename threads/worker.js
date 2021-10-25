let ffmpeg = require('ffmpeg');
const fs = require('fs');

const { workerData, parentPort } = require('worker_threads');
let dest = '/dest/video.mp4';

try {
    
    let process = new ffmpeg(workerData.file);
    process.then(video => {
        video.fnAddWatermark(
            __dirname + '/logoar.png',
            __dirname + '/' + workerData.filename,
            {position: 'C'}
        ),
        (err, file) => {
            if(!err){
                console.log('El nombre del video procesado es '+ file);
                parentPort.postMessage({ status: 'Done', file: file });
            }else{
                console.log(err);
            }
        }
    });

} catch (error) {
    console.log(error.code);
    console.log(error.msg);
}