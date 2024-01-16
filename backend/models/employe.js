

const mongoose = require('mongoose');

const EmployeSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const EmployeModel = mongoose.model('employe', EmployeSchema); // Change 'employes' to 'employe'
module.exports = { EmployeModel };
