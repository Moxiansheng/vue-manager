<template>
    <info-table :dataInput="dataSource"
                    :columnsInput="columns"
                    :pageSizeInput="pageSize"
                    :headerInput="header"
                    :scrollHeightInput="scrollHeight"
                    bordered
    />
    <!--    <test-table></test-table>-->

</template>

<script>
    import {defineComponent} from 'vue';
    import InfoTable from "../../components/InfoTable";
    // import TestTable from "../../components/TestTable"


    export default defineComponent({
        name: "Stock",
        props: [],
        components: {
            InfoTable,
            // TestTable
        },
        setup() {
            const columns = [
                {
                    key: 'name',
                    title: 'Name',
                    dataIndex: 'name',
                    width: 150,
                },
                {
                    key: 'age',
                    title: 'Age',
                    dataIndex: 'age',
                    width: 150,
                },
                {
                    key: 'address',
                    title: 'Address',
                    dataIndex: 'address',
                },
            ];

            const dataSource = [...Array(100)].map((_, i) => ({
                key: i,
                name: `Edward King ${i}`,
                age: i,
                address: `London, Park Lane no. ${i}`,
            }));

            const pageSize = {
                pageSize: 25
            }

            const header = '库存信息'

            const scrollHeight = { y: 240 }

            return {
                columns,
                dataSource,
                pageSize,
                header,
                scrollHeight,
            }
        }
    })
</script>

<style scoped>

</style>
