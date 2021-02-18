Vue.component('VueSepet', {
    props: {
      sepet: { type: Array, required: true, default: () => { return [] } },
    },
    computed: {
        genelToplam() {
            let genelToplam = 0;
            this.sepet.forEach((item) => {
                genelToplam += parseFloat(item.fiyat, 10) * item.adet;
            });
            //return genelToplam.toFixed(2);
            return genelToplam;
        },
    },
    methods:{
        sepettenSil(index) {
            return this.sepet.splice(index, 1);
        },
        adetGuncelle(index, event) {
            let adet = event.target.value;
            let urun = this.sepet[index];
            if(adet === "0"){
                alert("adet 0 olamaz");
            }else if(adet > 9){
                alert("adet 9dan büyük olamaz")
            } else{
                urun.adet = adet;
            }
        }
    },
    template: `
    <table class="table table-hover">
    <thead>
        <tr>
            <th>Ürün Adı</th>
            <th>Adet</th>    
            <th class="text-center">Fiyatı</th>
            <th>#</th>
        </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in sepet">
        <td class="col-sm-8 col-md-6">
            <div class="media">
                <a class="thumbnail pull-left" v-bind:href="item.url">
                    <img class="media-object" v-bind:src="item.resim" style="width: 72px; height: 72px;"> 
                </a>
                <div class="media-body">
                    <h4 class="media-heading"><a v-bind:href="item.url">{{ item.urunAdi }}</a></h4>
                </div>
            </div>
        </td>
        <td class="col-sm-1 col-md-1" style="text-align: center">
            <input type="number" name = "adet" class="form-control" v-bind:value="item.adet" v-on:change="adetGuncelle(index, $event)">
        </td>
        <td class="col-sm-1 col-md-1 text-center"><strong>{{ item.fiyat }} TL</strong></td>
        <td class="col-sm-1 col-md-1">
            <a class="btn btn-danger" v-on:click="sepettenSil(index)">Kaldır</a>
        </td>
    </tr>
    <tr>
        <td>   </td>
        <td>   </td>
        <td><h5><b>TOPLAM</b></h5></td>
        <td class="text-right"><h5><strong>{{ genelToplam }} TL</strong></h5></td>
    </tr>
    </tbody>
    </table>
    `
});

window.addEventListener('load', () => {

window.vue = new Vue({
        el: '#app',
        name:'Sepet',
        data: {
            isLoading: true,
            sepet: []
        },
        methods:{
            //
        },
        created() {
           fetch('./data.json')
               .then((res) => { return res.json() })
               .then((res) => {
                   this.isLoading = false;
                   this.sepet = res.sepet;
               })
        }
    });
});