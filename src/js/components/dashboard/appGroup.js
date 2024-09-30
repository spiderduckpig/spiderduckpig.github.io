import Vue from 'vue';

import { getPixelImage } from '../../utils/image';
import colors from '../../constants/colors';
import { getLang } from '../../utils/lang';

export default Vue.component('app-group', {

    props: {
        apps: {
            type: Array,
            default: () => []
        },
        title: {
            type: Object,
            default: ''
        }
    },

    template:
        `<div class="app-group" :style="{'background-image': 'url(' + appGroupImg + ')'}">
            <div class="app-group-title" :style="{'background-image': 'url(' + appGroupTitleImg + ')'}">{{ title[lang] }}</div>
            <div class="app-group-desc"></div>
            <div class="app-group-content">
                <app v-for="appId in apps" :app-id="appId" :key="appId"></app>
            </div>
            
        </div>`,

    data: function () {
        return {
            appGroupImg: '',
            appGroupTitleImg: '',
            lang: getLang()
        };
    },

    computed: {
    },

    methods: {
        resize: function () {
            const group = this.$el;

            this.appGroupImg = getPixelImage({
                width: group.clientWidth,
                height: group.clientHeight,
                radius: 2,
                fillColor: colors.appGroup
            });

            const title = group.getElementsByClassName('app-group-title')[0];
            this.appGroupTitleImg = getPixelImage({
                width: title.clientWidth,
                height: title.clientHeight,
                radius: [2, 2, 0, 0],
                fillColor: colors.appGroupTitle
            });
        }
    },

    mounted: function () {
        this.resize();

        console.log(this._props.title.en)
        if(this._props.title.en == 'Bio') {
            const desc = this.$el.getElementsByClassName('app-group-desc')[0]
            desc.innerHTML = 'Hi, my name is Brian Yu, and welcome to my site. I am a current undergrad student at UChicago who is interested in CS and physics'
        }

        window.addEventListener('resize', this.resize);
    }
});
