function lifeCycleLog(elName, lifeName) {
    return function () {
        console.group(elName, lifeName);
        console.log(...arguments);
        console.groupEnd(elName, lifeName);
    }
}

function lifeCycleConfig(elName, obj = {}) {
    const life = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'beforeDestroy', 'destroyed', 'errorCaptured'];
    life.map((lifeName) => {
        obj[lifeName] = lifeCycleLog(elName, lifeName);
    })
    return obj;
}

class LifeCycleConfig{
    constructor(elName) {
        lifeCycleConfig(elName, this);
    }
}

window.LifeCycleConfig = LifeCycleConfig;
