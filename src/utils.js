const UTILS = {
    formatCNPJ(cnpj) {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    },

    formatDate(date) {
        let datef = date.split(' ')[0]
        const timef = date.split(' ')[1]
        datef = datef.split('-').reverse().join('/')
        return `${datef} ${timef}`
    },

    formatMoney(money) {
        money = parseFloat(money)
        return money.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    },

    formatNumber(number) {
        return number.replace(/[^0-9,]/g, '').replace(',', '.');
    },

    sortDate(a, b) {
        let dateArr = null

        dateArr = a.split(' ')
        a = `${dateArr[0].split('/').reverse().join('-')} ${dateArr[1]}`
        a = +new Date(a)

        dateArr = b.split(' ')
        b = `${dateArr[0].split('/').reverse().join('-')} ${dateArr[1]}`
        b = +new Date(b)
        
        return a-b
    },

    sortValue(a, b) {
        a = a.replace(/^R\$\s|,/g, '').replace(',','.')
        b = b.replace(/^R\$\s|,/g, '').replace(',','.')
        return a-b
    },

    colors() {
        return {
            primary: '#1b1c30',
            secondary: '#222339',
            success: '#2ecc71',
            danger: '#ff4757',
            warning: '#ffba00',
            info: '#0890fd',
            dark: '#1e1e1e',
        }
    },

    icons() {
        return {
            dashboard: 'mdi-view-dashboard',
            products: 'mdi-shopping ',
            stores: 'mdi-cart',
            notes: 'mdi-receipt',
            maps: 'mdi-google-maps',
            search: 'mdi-magnify',
            openLink: 'mdi-open-in-new',
            create: 'mdi-plus',
        }
    },

    dataTable: {
        footerProps: {
            'items-per-page-text': 'Itens por página',
            'items-per-page-all-text': 'Todos'
        }
    },

    emptyObject(object) {
        console.log(JSON.stringify(object))
        console.log(JSON.stringify(object) === '[]')
        return JSON.stringify(object) === '[]';
    }
}

export default UTILS;