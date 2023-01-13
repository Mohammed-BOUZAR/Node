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

async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Mohammed',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

//createCourse();

async function getCourses(){
    
    const pageNumber = 2;
    const pageSize = 10;

    // comparison operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal)
    // lt (less than)
    // lte (less than or equal)
    // in 
    // nin (not in)


    // logical operators
    // or
    // and

    const courses = await Course
    // .find({price: {$gt: 10, $lte: 20}})
    // .find({price: {$in: [10, 15, 20]}})

    // regular expression 

    // start with
    // .find({author: /^Mohammed/})

    // end with
    // .find({author: /Mohammed$/i})

    
    // contains 
    // .find({author: /.*Mohammed.*/i})

    
    .find({author: "Mohammed"})
    //.or([{author: "Mohammed"}, {isPublished: true}])
    //.and([{author: "Mohammed"}, {isPublished: true}])
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    console.log(courses);
}

getCourses();