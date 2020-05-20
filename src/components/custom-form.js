Vue.component('custom-form', {
    props: ['name', 'message'],
    data: function () {
        console.log(arguments);
        return {
            // propName: '',
            // propMessage: ''
        }
    },
    ...new LifeCycleConfig('custom-form'),
    template: `
        <form style="padding: 20px;">
            <div style="padding-bottom: 20px; margin-bottom: 20px; border-bottom: 1px solid #eee">
                <input :value="name" placeholder="change name" @input="$emit('change-name', $event.target.value)" />
                <div>总字数：{{name ? name.length : 0}}</div>
            </div>
            <div>
                <textarea :value="message" placeholder="change message" @input="$emit('change-message', $event.target.value)"></textarea>
                <div>总字数：{{message ? message.length : 0}}</div>
            </div>
            <input type="submit" value="提交" />
        </form>
    `
})