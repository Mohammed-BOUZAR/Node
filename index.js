const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground')
.then(() => console.log("MongoDB is connected ...."))
.catch(err => console.error("MongoDB isn't connected ...."));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'NodeJS Course',
    author: 'Mohammed',
    tags: ['node', 'backend'],
    isPublished: true
});