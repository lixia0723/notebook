<templete>
    <div>
        <button @click="toggleCollapse">
            {{ collapsed ? '展开' : '折叠' }}
        </button>
        <div v-show="!collapsed">
            <slot></slot>
        </div>
    </div>
</templete>
<script>

export default ({
    model:{
        prop:'collapsed',
        event:'toggle',
    },
    prop:{
        collapsed:{
            type:Boolean,
            default:true,
        }
    },
    methods:{
        toggleCollapse(){
            this.$emit('toggle',!this.collapsed)
        }
    }
})
</script>
