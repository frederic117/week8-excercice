<template>
<div>
  <nav class="navbar is-dark">
      <div>
      <div class="babblesMenu">
            <a  @click="curInsights()" class="babMenu navbar-item is-tab">My current insights</a>
            <a  @click="WatchList()" class="babMenu navbar-item is-tab">My watch list</a>
            <a  @click="PastInsights()"class="babMenu navbar-item is-tab is-active">My past insights</a>
            <a  @click="InsidersFollowed()" class="babMenu navbar-item is-tab">Insiders I follow</a>
      </div>
      </div>
   </nav>
        <b-table

            :data="pastInsights"
            :loading="loading"

            :paginated="isPaginated"
            :per-page="perPage"
            :pagination-simple="isPaginationSimple"

            :total="total"
            @page-change="onPageChange"

            :striped="true"

            :default-sort-direction="defaultSortOrder"
            :default-sort="defaultSortField"
            backend-sorting
            @sort="onSort">

            <template slot-scope="props">
              <b-table-column field='created' numeric sortable centered label="Initiated">
                    {{ moment(props.row.created_at).format('L') }}
                </b-table-column>
                <b-table-column label="Stock" field='longName' sortable centered><router-link :to="'/stocks/'+props.row.stockId.longName"class="stockName is-6" data-replace="Symbol">
                    {{ props.row.stockId.longName }}</router-link>
                </b-table-column>

                <b-table-column field='position' :class="{'has-text-green' : props.row.position==='bull', 'has-text-red' : props.row.position==='bear'}"sortable centered label="Insight">
                    {{ props.row.position }}
                </b-table-column>
                 <b-table-column field='initialPrice' numeric sortable centered label="Initial price">
                    {{ props.row.initialPrice }}
                </b-table-column>

                <b-table-column  field='soldPrice' sortable numeric centered label="Sold price">
                    {{ props.row.soldPrice }}
                </b-table-column>

                <b-table-column field='variation' numeric sortable centered :class="{'has-text-green' : (props.row.soldPrice-props.row.initialPrice) > 0, 'has-text-red' : (props.row.soldPrice-props.row.initialPrice)<0}" label="Variation">
                    {{((props.row.soldPrice-props.row.initialPrice)/props.row.initialPrice).toFixed(2)}} %
                </b-table-column><b-table-column field='performancePoints' :class="{'has-text-green': props.row.performancePoints>0}" numeric sortable centered label="P$">
                    {{ props.row.performancePoints }}
                </b-table-column>
                <b-table-column field='closed' numeric sortable centered label="Closed">
                    {{ moment(props.row.updated_at).format('L') }}
                </b-table-column>

            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="sentiment_very_satisfied"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>...loading</p>
                    </div>
                </section>
            </template>
        </b-table>
   </div>

</template>

<script>
import moment from "moment";
import { getMyPastInsights } from "@/api/apiDashboard";

export default {
  data() {
    return {
      pastInsights: [],
      indexSelected: "all",
      total: 0,
      loading: false,
      defaultSortField: "closed",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 20,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc"
    };
  },

  created() {
    getMyPastInsights().then(pastInsights => {
      this.pastInsights = pastInsights;
    });
  },

methods: { 
    moment: function(time) {
      return moment(time);
    },
    curInsights(){ 
         this.$emit("curIns");
    },
    WatchList(){
         this.$emit("Watch");
    },
    InsidersFollowed(){
         this.$emit("InsFollo");
    },
    PastInsights(){
        this.$emit("PastIns");
    },
    onPageChange(page) {
      this.page = page;
      this.onSort();
    },
    /*
             * Handle sort event
             */
    onSort(field, order) {
      this.loading = true;
      getMyPastInsights()({
        sort: makeSortParam(field, order)
      }).then(pastInsights => {
        this.pastInsights = pastInsights;
        this.loading = false;
      });
    },
    /*
             * Type style in relation to the value
             */
    type(value) {
      const number = parseFloat(value);
      if (number < 6) {
        return "is-danger";
      } else if (number >= 6 && number < 8) {
        return "is-warning";
      } else if (number >= 8) {
        return "is-success";
      }
    }
  },
  filters: {
    /**
             * Filter to truncate string, accepts a length parameter
             */
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    }
  }
};
</script>

<style scoped>
.main {
    background-color: #f9f9f9!important;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}

.navbar.is-dark {
    background-color: #192b41!important;
    color: #f9f9f9!important;
}

.navbar-item.is-tab.is-active {
    background-color: transparent;
    border-bottom-color: #f9f9f9!important;
    border-bottom-style: solid!important;
    border-bottom-width: 3px!important;
    color: #f9f9f9!important;
    padding-bottom: calc(0.5rem - 3px)!important;
}
.babblesMenu {
    display: flex;
    overflow:auto;
}
</style>
