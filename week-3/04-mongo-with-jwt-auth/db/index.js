const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('connection-string/db_name');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    image: String,
});


const PurchaseSchema = new mongoose.Schema({
    // Schema definition here
    userId: String,
    courseId:String,
    course:CourseSchema
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = {
    Admin,
    User,
    Course,
    Purchase
}