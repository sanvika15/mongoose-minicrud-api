const Employee = require('../models/empModel');

exports.fetchAll = async () => {
  return await Employee.find();
};

exports.create = async (payload) => {
  if (!payload.name || !payload.email || !payload.position) {
    throw new Error('All fields are required');
  }
  return await new Employee(payload).save();
};

exports.update = async (id, payload) => {
  return await Employee.findByIdAndUpdate(id, payload, { new: true });
};

exports.remove = async (id) => {
  return await Employee.findByIdAndDelete(id);
};
