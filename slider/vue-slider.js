Vue.component("slider",{
    template: `
        <div class="slider-container" :style="{width:width+'px',height:height+'px'}">
            <div class="slider-trigger-next" @click="next">>>></div>
            <div class="slider-trigger-prev" @click="prev"><<<</div>
            <div class="slider" :style="{transform:transform}"><slot></slot></div>
        </div>
    `,
    props:['width','height','isAuto'],
    computed:{
        transform:function(){
            let transLeft = -this.idx*100 + "%";
            return `translate(${transLeft},0)`;
        }
    },
    mounted:function(){
        this.itemSize = this.$children.length;
        if(this.isAuto){
            this.startTimer();
        }
    },
    data : () => {
        return {
            idx : 0
        }
    },
    methods:{
        next:function(){
            if(this.idx >= this.itemSize-1) return;
            this.idx ++;
            if(this.isAuto){
                this.startTimer();
            }
        },
        startTimer:function(){
            if(this.timer){
                clearInterval(this.timer);
            }
            this.timer = setInterval(()=>{
                if(this.idx >= this.itemSize-1){
                    this.idx = 0;
                } else {
                    this.idx ++;
                }
            },3000)
        },
        prev:function(){
            if(this.idx == 0) return;
            this.idx --;
            if(this.isAuto){
                this.startTimer();
            }
        }
    }
});
Vue.component("slider-item",{
    template: `
        <div class="slider-item"><slot></slot></div>
    `,
    props:[],
    data : () => {
        return {

        }
    }
});