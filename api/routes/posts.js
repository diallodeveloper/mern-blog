const express = require('express');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');
const path = require('path');
const router = express.Router();


router.get('/posts', async (req, res) => {
    res.json(await Post.find())
    
})
router.get('/posts', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname} = req.file;
    const parts = originalname.split('.')
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath);

    const {title, summary, content} = req.body;
    const postDoc = Post.create({
        title,
        summary, 
        content,
        cover:newPath,
    })
    res.json(postDoc)
})
router.post('/posts/:id', async (req, res) => {

})
router.put('/posts/:id', async (req, res) => {

})
router.delete('/posts/:id', async (req, res) => {

})

module.exports = router;