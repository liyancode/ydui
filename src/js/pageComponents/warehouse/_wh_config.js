import React from 'react';
export const _WH_Config = {
    _measure_unit_options,
    _inventory_type_options,
    _en_to_cn,
    _sort_list_arr_by_last_update_at,
    _sort_list_arr_by_batch_at,
    _format_time_string_by_day,
    _format_time_string_by_minute,
    _format_number,
}

function _measure_unit_options() {
    return [
        <Option value="meter"key="meter">米</Option>,
        <Option value="kg" key="kg">千克</Option>,
        <Option value="juan"key="juan">卷</Option>,
        <Option value="jian"key="jian">件</Option>,
        <Option value="tiao"key="tiao">条</Option>,
        <Option value="pi"key="pi">匹</Option>,
        <Option value="xiang"key="xiang">箱</Option>,
        <Option value="ge"key="ge">个</Option>,
        <Option value="tong"key="ge">桶</Option>,
    ]
}

function _inventory_type_options() {
    return [
        <Option value="yuanliao"key="yuanliao">原料</Option>,
        <Option value="peibu"key="yuanliao">胚布</Option>,
        <Option value="chengpin"key="yuanliao">成品</Option>,
        <Option value="zhuji"key="yuanliao">助剂</Option>,
        <Option value="fuliao"key="yuanliao">辅料</Option>,
    ]
}

function _en_to_cn(enWord){
    switch (enWord){
        case "inbound":
            return "入库"
        case "outbound":
            return "出库"
        case "update":
            return "更新"
        case "yuanliao":
            return "更新"
        case "peibu":
            return "更新"
        case "chengpin":
            return "成品"
        case "zhuji":
            return "助剂"
        case "fuliao":
            return "辅料"
        case "meter":
            return "米"
        case "kg":
            return "千克"
        case "juan":
            return "卷"
        case "jian":
            return "件"
        case "条":
            return "条"
        case "pi":
            return "匹"
        case "xiang":
            return "箱"
        case "ge":
            return "个"
        case "tong":
            return "桶"
    }
}

function _sort_list_arr_by_last_update_at(a, b) {
    return a.last_update_at > b.last_update_at ? 1 : -1
}

function _sort_list_arr_by_batch_at(a, b) {
    return a.batch_at > b.batch_at ? 1 : -1
}

function _format_time_string_by_day(timeStr){
    return timeStr.split('+')[0].replace(/(^\s*)|(\s*$)/g, "").split(' ')[0];
}

function _format_time_string_by_minute(timeStr){
    return timeStr.split('+')[0].replace(/(^\s*)|(\s*$)/g, "");
}

function _format_number(numberStr) {
    return new Number(numberStr).toString()
}