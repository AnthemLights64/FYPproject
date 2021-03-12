const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '..', 'public/upload');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, function (error) {
                if (error) {
                    console.log(err);
                } else {
                    cb(null, dirPath);
                }
            });
        } else {
            cb(null, dirPath);
        }
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
const upload = multer({storage});
const uploadOne = upload.single('image');

module.exports = function fileUpload(router) {
    // Upload an image
    router.post('/management/member/image/upload', (req, res) => {
        uploadOne(req, res, function (error) {
            if (error) {
                return res.send({
                    status: 1,
                    msg: 'Failed to upload file.'
                });
            }
            var file = req.file;
            res.send({
                status: 0,
                data: {
                    name: file.filename,
                    url: 'http://localhost:5000/upload/' + file.filename
                }
            });
        });
    });

    // Delete an image
    router.post('/management/member/image/delete', (req, res) => {
        const {name} = req.body;
        fs.unlink(path.join(dirPath, name), (err) => {
            if (err) {
                console.log(err);
                res.send({
                    status: 1,
                    msg: 'Failed to delete file.'
                });
            } else {
                res.send({
                    status: 0
                });
            }
        });
    });
}