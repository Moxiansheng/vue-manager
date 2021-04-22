<template>
    <a-table :columns="columnsInner"
             :data-source="dataInput"
             :pagination="pageSizeInput"
             :scroll="scrollHeightInput"
             size="middle"
             :rowClassName="zebra"
             @change="handleClick"
    >
        <template #title>{{headerInput}}</template>
        <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
            <div style="padding: 8px">
                <a-input
                        ref="searchInput"
                        :placeholder="`Search ${column.dataIndex}`"
                        :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
                />
                <a-button
                        type="primary"
                        size="small"
                        style="width: 90px; margin-right: 8px"
                        @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
                >
                    <template #icon><SearchOutlined /></template>
                    Search
                </a-button>
                <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                    Reset
                </a-button>
            </div>
        </template>
        <template #filterIcon="filtered">
            <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
        </template>
        <template #customRender="{ text, column }">
            <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
                v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
                  v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                  class="highlight"
                  :key="i"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
            <template v-else>
                {{ text }}
            </template>
        </template>
    </a-table>
</template>

<script>
    import { defineComponent, reactive, ref, toRefs } from 'vue';
    import { SearchOutlined } from '@ant-design/icons-vue';

    export default defineComponent({
        name: "InfoTable",
        props: ['dataInput','columnsInput','pageSizeInput','headerInput','scrollHeightInput'],
        components: {
            SearchOutlined
        },
        setup(props){
            const state = reactive({
                searchText: '',
                searchedColumn: '',
            });

            const clickState = reactive({
                clickedRow: Number,
                clickedColumn: ''
            })

            const searchInput = ref();

            const handleClick = (pagination, filters, sorter) => {
                pagination;
                filters;
                clickState.clickedColumn = sorter.columnKey;
            }

            const handleSearch = (selectedKeys, confirm, dataIndex) => {
                confirm();
                state.searchText = selectedKeys[0];
                state.searchedColumn = dataIndex;
            };

            const handleReset = clearFilters => {
                clearFilters();
                state.searchText = '';
            };

            const zebra = (record, index) => {
                index % 2 === 1 ? 'table-striped' : null
            }

            const columnSlots = {
                slots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'customRender',
                }
            }

            const { columnsInput } = toRefs(props);
            const columnsInner = ref(columnsInput);
            columnsInner.value.map(item => {
                Object.assign(item, columnSlots, {
                    onFilter: (value, record) =>
                        record[state.searchedColumn].toString().toLowerCase().includes(value.toLowerCase())
                }, {
                    onFilterDropdownVisibleChange: (visible) => {
                        if (visible) {
                            setTimeout(() => {
                                searchInput.value.focus();
                            });
                        }
                    }
                }, {
                    sorter: (a, b) => {
                        // console.log(clickState.clickedColumn)
                        // console.log(a[clickState.clickedColumn]);
                        // console.log(typeof a[clickState.clickedColumn]+" "+typeof b[clickState.clickedColumn])
                        if(typeof a[clickState.clickedColumn] == "number"){
                            return a[clickState.clickedColumn] - b[clickState.clickedColumn]
                        }else if(typeof a[clickState.clickedColumn] == "string"){
                            return a[clickState.clickedColumn].length - b[clickState.clickedColumn].length
                        }
                    }
                }, {
                    sortDirections: ['descend', 'ascend'],
                });
            })

            return {
                zebra,
                handleSearch,
                handleReset,
                handleClick,
                searchInput,
                state,
                searchText:'',
                searchedColumn:'',
                columnsInner,
                clickState,
            }
        }
    })
</script>

<style scoped>
    .ant-table-striped :deep(.table-striped) {
        background-color: #fafafa;
    }
</style>
