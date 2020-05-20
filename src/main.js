window.onload = init;
let app = null, kid = null, form;
let data = {
    message: 'Hello Vue',
    name: 'Hi',
    rawHtml: '<div style="background-color: red; height: 20px; width: 20px"></div>',
    kidName: 'hi vue',
    kidClass: 'red',
    seen: false,
    rawClasses: ['red'],
    isShowBtn: false,
    items: [
        {name: 'item1'},
        {name: 'item2'},
        {name: 'item3'},
    ],
    dictionary: {
        name: 'a',
        age: '10',
        sex: 'male'
    }
};

const methods = {
    changeName,
    changeMessage
};

function init() {
    app = new Vue({
        el: '#app',
        data,
        methods,
        ...new LifeCycleConfig('app')
    });
    // form = new Vue({
    //     el: '#custom-form'
    // });
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
        app.$data.rawClasses.push('blue');
        app.$data.isShowBtn = true;
        // app.$el.removeChild(kid.$el); // 不会触发生命周期
    }, 2000);
}

function changeName(name) {
    data.name = typeof name === 'string' ? name : 'Hi Vue';
    console.log(this.name, name);
}

function changeMessage(message) {
    data.message = typeof message === 'string' ? message : 'Hello World!';
    console.log(this.message, message);
}

function baseWatch(watchName, newValue, oldValue) {
    return [watchName, (newValue, oldValue) => {
        console.log(`${watchName} changed: newValue: ${newValue}, oldValue: ${oldValue}`);
    }];
}