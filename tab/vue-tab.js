Vue.component("light-tab",{
    data:function(){
        return {
            panels:[],
            tabItems:[],
            tabActiveName:""
        }
    },
    created:function(){
        this.tabActiveName = this.$attrs.value;
    },
    provide:function(){
        return {
            setTabActiveName : newValue => {
                this.tabActiveName = newValue;
            }, 
            getTabActiveName : () => {
                return this.tabActiveName;
            }, 
        }
    },
    mounted:function(){
        let slots = this.$slots.default;
        if(slots.length > 0){
            this.panels = slots.filter((vnode)=>{
                return vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === "light-tab-panel";
            }).map((vnode)=>{
                return vnode.componentInstance;
            });
        }
        if(this.tabActiveName === ""){
            this.tabActiveName = this.panels[0].name;
        }
    },
    updated:function(){
        if(this.$refs.tabItems && this.tabItems.length != this.$refs.tabItems.length){
            this.tabItems = [...this.$refs.tabItems];
        }
    },
    computed:{
        barStyle:function(){
            let tabSize = 0;
            let offset = 0;
            let style = {};
            let activeName = this.tabActiveName;
            const items = this.tabItems;
            if(items && items.length > 0){
                items.every((item,index)=>{
                    const cliWidth = item.$el['clientWidth']
                    if(item.name == activeName){
                        tabSize = cliWidth;
                        return false;
                    } else {
                        offset += cliWidth;
                        return true;
                    }
                });
            }
            style.width = tabSize + "px";
            style.transform = `translate(${offset}px,0)`;
            return style;
        }
    },
    methods:{
        changeTab:function(item){
            this.tabActiveName = item.name;
        }
    },
    template:`
    <div class="light-tab">
        <div class="tab-header">
            <div class="tab-nav">
                <div class="light-tabs__active-bar" :style="barStyle"></div>
                <light-tab-item ref="tabItems" v-for="item in panels" :key="item.name" :name="item.name" :label="item.label"></light-tab-item>
            </div>
        </div>
        <div class="tab-content">
            <slot></slot>
        </div>
    </div>
    `
})

Vue.component("light-tab-item",{
    props:["label","name"],
    inject: ['setTabActiveName','getTabActiveName'],
    template:`
    <div class="tab-item" @click="setTabActiveName(name)" :class="{'is-active':name==getTabActiveName()}">{{label}}</div>
    `
})

Vue.component("light-tab-panel",{
    props:["label","name"],
    inject: ['setTabActiveName','getTabActiveName'],
    computed:{
        isActiveTab:function(){
            return this.name === this.getTabActiveName();
        }
    },
    template:`
    <div class="tab-panel" v-show="isActiveTab"><slot></slot></div>
    `
})