const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground')
.then(() => console.log("MongoDB is connected ...."))
.catch(err => console.error("MongoDB isn't connected ...."));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'NodeJS Course',
        author: 'Mohammed',
        tags: ['node', 'backend'],
        isPublished: true
    });

    try {
        // await course.validate();
        const result = await course.save();
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}

// createCourse();

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

//getCourses();

async function updateCourse(id){

    // Query First
    /*const course = await Course.findById(id);
    if(!course) return;

    //course.isPublished = true;
    //course.author = 'Another Author';

    // or
    course.set({
        isPublished: true,
        author: 'Another'
    });

    const result = await course.save();
    console.log(result);*/

    // Update First
    /*const result = await Course.updateMany({_id: id},{
    // or
    const result = await Course.updateOne({_id: id},{
        $set: {
            author: 'Last Modified 3',
            isPublished: false
        }
    });
    console.log(result);*/

    // or
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Mohammed',
            isPublished: true
        }
    }, {new: true});
    console.log(course);
}

// updateCourse('63c1da4428840520593e94a0');

async function deleteCourse(id){
    // const course = await Course.deleteOne({_id: id});
    // const course = await Course.deleteMany({_id: id});
    // const course = await Course.findByIdAndRemove({_id: id});
    const course = await Course.findByIdAndDelete({_id: id});
    console.log(course);
}

// deleteCourse('63c2d894da0c74dd77c9bf17');