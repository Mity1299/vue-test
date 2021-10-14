Vue.component('vTable', {
    props: {
        columns: {
            type: Array,
            default: function () {
                return [];
            }
        },
        data: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    // 区别就是在于，如果用template的话，
    // 受限于DOM结构，currentColumns的循环要写好多次
    // 但是用render就可以更专注于逻辑
    template: `
      <table>
      <colgroup>
        <col v-for="(col,index) in currentColumns" :style="{width:col.width != null? col.width: 'auto'}">
      </colgroup>
      <tr>
        <th v-for="(col,index) in currentColumns">
          <span>{{ col.title }}</span>
          <span v-if="col.sortable">
              <a :class="{on:col._sortType === 'desc'}" @click="handleSortByDesc(index)">↑</a>
              <a :class="{on:col._sortType === 'asc'}" @click="handleSortByAsc(index)">↓</a>
          </span>
        </th>
      </tr>
      <tbody>
      <tr v-for="row in currentData">
        <td v-for="col in currentColumns">
          {{ row[col.key] }}
        </td>
      </tr>
      </tbody>

      </table>
    `,
    methods: {
        makeColumns: function () {
            this.currentColumns = this.columns.map(function (col, index) {
                col._sortType = 'normal';
                col._index = index;
                return col;
            });
        },
        makeData: function () {
            this.currentData = this.data.map(function (row, index) {
                row._index = index;
                return row;
            });
        },
        handleSortByAsc: function (index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';

            this.currentData.sort(function (a, b) {
                return a[key] > b[key] ? 1 : -1;
            });
        },
        handleSortByDesc: function (index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'desc';

            this.currentData.sort(function (a, b) {
                return a[key] < b[key] ? 1 : -1;
            });
        }
    },
    watch: {
        data: function () {
            this.makeData();
            var sortedColumn = this.currentColumns.filter(function (col) {
                return col._sortType !== 'normal';
            });

            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === 'asc') {
                    this.handleSortByAsc(sortedColumn[0]._index);
                } else {
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    },
    mounted() {
        this.makeColumns();
        this.makeData();
    }
});
