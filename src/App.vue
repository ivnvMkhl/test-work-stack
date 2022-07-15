<template>
    <div class="header-wrapper">
        <div class="input-wrapper">
            <a-input v-model:value="searchValue" placeholder="Найти по ФИО..." size="large" />
        </div>
        <a-button type="primary" size="large" v-on:click="showModal">Добавить</a-button>
        <a-modal
            v-model:visible="visible"
            width="500px"
            title="Добавить организацию"
            @ok="addRowHendler(addName, addCompany, addTel)"
            :ok-button-props="{ disabled: modalOkDisabled }"
        >
            <a-input class="add-input" v-model:value="addCompany" placeholder="Название" size="large" />
            <a-input class="add-input" v-model:value="addTel" placeholder="Номер телефона" size="large" />
            <a-input class="add-input" v-model:value="addName" placeholder="ФИО Директора" size="large" />
        </a-modal>
    </div>

    <a-table :dataSource="dataRender" :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'delete'">
                <a-button type="primary" @click="removeRow(record)"> X </a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface IDataItem {
    key: string;
    name: string;
    company: string;
    tel: string;
}

export default defineComponent({
    data() {
        return {
            visible: false,
            searchValue: '',
            addName: '',
            addCompany: '',
            addTel: '',
            columns: [
                {
                    title: 'Название',
                    dataIndex: 'company',
                    sorter: true,
                    width: '20%',
                },
                {
                    title: 'ФИО директора',
                    dataIndex: 'name',
                    sorter: true,
                    width: '20%',
                },
                {
                    title: 'Телефон',
                    dataIndex: 'tel',
                },
                {
                    title: 'Удалить',
                    key: 'delete',
                    width: '5%',
                },
            ],
            dataSource: [
                {
                    key: '10',
                    name: 'Иванов И.И.',
                    company: 'ООО "Вектор"',
                    tel: '+79998885522',
                },
                {
                    key: '20',
                    name: 'Сидоров С.С.',
                    company: 'ИП Сидоров С.С.',
                    tel: '+79998885522',
                },
            ],
        };
    },
    computed: {
        modalOkDisabled(this: any) {
            return !!!(this.addName && this.addCompany && this.addTel);
        },
        dataRender(this: any) {
            return this.dataSource.filter((data: IDataItem) => data.name.includes(this.searchValue));
        },
    },
    methods: {
        removeRow(this: any, removeValue: IDataItem) {
            this.dataSource = this.dataSource.filter((data: any) => data.key !== removeValue.key);
        },
        addRowHendler(this: any, addName: string, addCompany: string, addTel: string) {
            const addItem: IDataItem = {
                key: `${this.dataSource.length + 10}`,
                name: `${addName}`,
                company: `${addCompany}`,
                tel: `${addTel}`,
            };
            this.dataSource.push(addItem);
            this.clearInputData();
            this.hideModal();
        },
        clearInputData(this: any) {
            this.addCompany = '';
            this.addName = '';
            this.addTel = '';
        },
        showModal(this: any, e: MouseEvent) {
            this.visible = true;
        },
        hideModal(this: any, e: MouseEvent) {
            this.visible = false;
        },
    },
});
</script>

<style>
.header-wrapper {
    display: flex;
    justify-content: space-between;
}

.input-wrapper {
    width: 300px;
    margin-bottom: 2rem;
}

.add-input {
    margin-bottom: 1rem !important;
}
</style>
