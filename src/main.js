window.onload = this.init;
let app = null, kid = null;
let data = {
    message: 'Hello Vue',
    name: 'Hi',
    rawHtml: '<div style="background-color: red; height: 20px; width: 20px"></div>',
    kidName: 'hi vue',
    kidClass: 'red',
    seen: false
};

const methods = {
    changeName,
    changeMessage
};

function lifeCycleLog(elName, lifeName) {
    return function () {
        console.group(elName, lifeName);
        console.log(...arguments);
        console.groupEnd(elName, lifeName);
    }
}

function lifeCycleConfig(elName) {
    let config = {};
    const life = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'beforeDestroy', 'destroyed', 'errorCaptured'];
    life.map((lifeName) => {
        config[lifeName] = lifeCycleLog(elName, lifeName);
    })
    return config;
}

function init() {
    app = new Vue({
        el: '#app',
        data,
        methods,
        ...lifeCycleConfig('app')
    });
    // kid = new Vue({
    //     el: '#app > p',
    //     data: { kidName: '', kidClass: '' },
    //     ...lifeCycleConfig('kid')
    // });
    // setTimeout(changeMessage, 2000);
    app.$watch(...baseWatch('message'));
    app.$watch(...baseWatch('name'));
    setTimeout(() => {
        data.kidName = 'I\'m a kid'; // 不会触发重新渲染
        // app.kidName = 'I\'m a kid'; // 会触发重新渲染
        data.kidClass = 'blue';
        app.$data.seen = true;
        // app.$el.removeChild(kid.$el); // 不会触发生命周期
    }, 2000);
}

function changeName() {
    data.name = 'Hi Vue';
}

function changeMessage() {
    data.message = 'Hello World!';
}

function baseWatch(watchName, newValue, oldValue) {
    return [watchName, (newValue, oldValue) => {
        console.log(`${watchName} changed: newValue: ${newValue}, oldValue: ${oldValue}`);
    }];
}