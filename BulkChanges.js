// ==UserScript==
// @name 修改京东自营详情页
// @namespace Violentmonkey Scripts
// @match https://vcp.jd.com/*
// @grant none
// ==/UserScript==
document.onreadystatechange = subSomething
function subSomething() {
    var Batch = {
        init: function () {
            var _this = this
            if (this.matchUrl.initItem.test(location.href)) {
                this.watch()
                this.addText(function (page, masterMap, newTextarea) {
                    _this.bind(page, masterMap, newTextarea)
                })
            } else if (this.matchUrl.initPage.test(location.href)) {
                this.editPic()
            } else if (this.matchUrl.initApplyListPage.test(location.href)) {
                location.href = 'https://vcp.jd.com/sub_item/item/initItemListPage'
            } else if(this.matchUrl.initItemPicListPage.test(location.href)){
                location.href = 'https://vcp.jd.com/sub_item/item/initItemListPage'
            }
            else {
                console.log('其他页面')
            }


        },
        matchUrl: {
            initItem: /https:\/\/vcp.jd.com\/sub_item\/item\/initItemListPage/,
            initPage: /https:\/\/vcp.jd.com\/sub_item\/item\/preview\/init.*/,
            initApplyListPage: /https:\/\/vcp.jd.com\/sub_item\/item\/initApplyListPage/,
            initItemPicListPage:/https:\/\/vcp.jd.com\/sub_item\/itemPic\/initItemPicListPage/
        },
        addText: function (callback) {
            var doc = document.querySelector('.page-right')
            var docFragement = document.createDocumentFragment()
            var newTextarea = document.createElement('textarea')
            var addPage = document.createElement('button')
            var addMastermap = document.createElement('button')
            var Pagename = document.createTextNode('详情页')
            var Mapname = document.createTextNode('主图')

            addPage.appendChild(Pagename)
            addMastermap.appendChild(Mapname)

            newTextarea.style.width = '1000px'
            newTextarea.style.height = '600px'

            addPage.style.width = '100px'
            addPage.style.height = '60px'
            addPage.style.backgroundColor = '#4587d5'
            addPage.style.color = '#fff'

            addMastermap.style.width = '100px'
            addMastermap.style.height = '60px'
            addMastermap.style.backgroundColor = '#4587d5'
            addMastermap.style.marginLeft = '20px'
            addMastermap.style.color = '#fff'

            docFragement.appendChild(newTextarea)
            docFragement.appendChild(addPage)
            docFragement.appendChild(addMastermap)

            doc.appendChild(docFragement)
            callback(addPage, addMastermap, newTextarea)


        },
        bind: function (page, masterMap, newTextarea) {
            var _this = this
            page.onclick = function () {
                _this.getData(newTextarea, '详情页')
            }
            masterMap.onclick = function () {
                _this.getData(newTextarea, '主图')
            }

        },
        watch: function () {
            var _this = this
            if (localStorage.newPageData) {
                if (localStorage.newSource == '详情页') {
                    _this.find(localStorage.newPageData)
                } else if (localStorage.newSource == '主图') {
                    _this.find(localStorage.newPageData)
                }
            }
        },
        getData: function (data,message) {
            var _this = this
            if (data.value !== '') {
                var pageData = data.value
                localStorage.newPageData = pageData.match(/\d{5,11}/g)
                localStorage.newSource = message
                console.log(localStorage.newPageData)
                if (localStorage.newPageData !== null) {
                    console.log('有数据')
                    _this.find(localStorage.newPageData)
                } else { alert('输入错误，请重新输入') }
            } else { alert('请输入SKU') }
        },
        find: function (data) {
            var _this = this
            var dataList = data.split(',')
            var newData = dataList[0]
            dataList.shift()
            localStorage.newPageData=dataList
            var inputValue = document.querySelector('#wareId')
            var SearchProduct = document.querySelector('.btn.btn-primary')
            inputValue.value = newData
            SearchProduct.click()  //这里是ajax
            setTimeout(function () { _this.submit() }, 1000)
        },
        submit: function () {
            if (localStorage.newSource == '详情页') {
                var entryPage = document.querySelectorAll('.btn-group .btn.btn-default')
                console.log(entryPage[1])
                entryPage[1].click()
            } else if (localStorage.newSource == '主图') {
                var entryPage = document.querySelectorAll('.dropdown-menu li')[2].children[0]
                entryPage.click()
            }

        },
        editPic: function () {
            setTimeout(function () {
                var editHref = document.querySelectorAll('.page-header .edit-href')
                editHref[3].click()
            }, 1000)
        }
    }
    Batch.init()
}

