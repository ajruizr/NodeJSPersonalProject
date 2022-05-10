const Entity = require('../context/entity');

class TasksEntity extends Entity {
    constructor() {
        super('task', 'task_id');
    }
}

module.exports = TasksEntity;