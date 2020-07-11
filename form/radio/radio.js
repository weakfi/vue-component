Vue.component('light-radio', {
    name: 'light-radio',
    data: function(){
        return {

        }
    },
    props: {
        model: String,
        value: String
    },
    model: {
        prop: 'model',
        event: 'change'
    },
    computed: {
        checked: function(){
            return this.model === this.value
        }
    },
    methods: {
        handleChange: function(e){
            let checked = e.target.checked;
            checked && this.$emit('change', this.value);
        }
    },

    template: `
        <label 
          class="light-radio"
          :class="[
              {'is-checked':checked}
          ]"
        >
            <span class="light-radio_input">
                <span class="light-radio_inner">
                </span>
                <input
                  type="radio" 
                  :value="value"
                  :checked="checked"
                  v-on:change="handleChange"
                  class="light-radio_original" 
                />
            </span>
            <span class="light-radio_label">
                <slot></slot>
            </span>
        </label>
    `

});