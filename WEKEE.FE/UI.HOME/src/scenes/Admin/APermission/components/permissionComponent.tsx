//#region  import
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { L } from "../../../../lib/abpUtility";

import {
    Button, Card, Col, DatePicker, Form, Input, InputNumber, Modal, notification, Row,
    Select, Switch, Table, Tag, Tooltip,
} from "antd";
import {
    DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined, PullRequestOutlined, RedoOutlined,
    RetweetOutlined, SearchOutlined,
} from "@ant-design/icons";
import OrderByProperty from "../../../../services/dto/orderByProperty";
import moment from "moment";
import ConstPermission, { confirmTypesPermission } from "../objectValues/constPermission";
import { PermissionReadDto } from "../dto/permissionReadDto";
import {
    deletePermissionStart, editStatusPermissionStart, getPermissionStart, insertOrUpdatePermissionStart, searchSummaryPermissionStart, summaryAtomicStart,
} from "../actions";
import ChartComponent from "../../../../components/ChartComponent";
import utils from "../../../../utils/utils";
import { makeAtomicSummaryRead, makeCompletedPermission, makeLoadingButtonPermission, makeLoadingPermission, makeLoadingTablePermission, makePageIndexPermission, makePageSizePermission, makePermissionReads, makepermissionSummaryRead, makeTotalCountPermission, makeTotalPagesPermission } from "../selectors";
import { AtomicSummaryReadDto } from "../dto/atomicSummaryReadDto";
import { PermissionSummaryReadDto } from "../dto/permissionSummaryReadDto";
import PermissionFtResourceComponent from "./permissionFtResourceComponent";

const { Option } = Select;
const { RangePicker } = DatePicker;

declare var abp: any;
//#endregion


interface IPermissionComponentProps {
    location?: any;
}
const stateSelector = createStructuredSelector<any, any>({
    loadingAll: makeLoadingPermission(),
    loadingTable: makeLoadingTablePermission(),
    loadingButton: makeLoadingButtonPermission(),
    completedAll: makeCompletedPermission(),
    pageIndex: makePageIndexPermission(),
    pageSize: makePageSizePermission(),
    totalCount: makeTotalCountPermission(),
    totalPages: makeTotalPagesPermission(),
    permissionData: makePermissionReads(),
    atomicSummaryRead: makeAtomicSummaryRead(),
    permissionSummaryRead: makepermissionSummaryRead()
});
export default function PermissionComponent(props: IPermissionComponentProps) {
    //#region START
    const dispatch = useDispatch();

    const { permissionSummaryRead, atomicSummaryRead, loadingAll, loadingTable, loadingButton, completedAll, pageSize, totalCount, pageIndex, permissionData,
    } = useSelector(stateSelector);

    useEffect(() => {
        dispatch(
            getPermissionStart({
                propertySearch: [],
                valuesSearch: [],
                propertyOrder: 0,
                valueOrderBy: 1,
                pageIndex: 1,
                pageSize: 20,
            })
        );
        dispatch(summaryAtomicStart());
    }, [dispatch]);
    //#endregion
    //#region CSS Layout Item
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
    };
    //#endregion
    //#region SEARCH
    const [propertySearch, setpropertySearch] = useState<any[]>([]);
    const [valuesSearch, setvaluesSearch] = useState<any[]>([]);
    const [SelectColumnSearch, setSelectColumnSearch] = useState<JSX.Element>(
        <Input placeholder={L("KEYWORD", "COMMON")} disabled />
    );

    function _selectColumnSearch(value: number) {
        value === ConstPermission.NULL || value === 0
            ? setpropertySearch([])
            : setpropertySearch([value]);
        setvaluesSearch([]);
        if (confirmTypesPermission(value) === "DATE") {
            setSelectColumnSearch(
                <RangePicker
                    format="YYYY/MM/DD"
                    onChange={(date, dateString) =>
                        _onChangeDataColumnSearch(dateString[0] + "|" + dateString[1])
                    }
                />
            );
        } else if (confirmTypesPermission(value) === "SELECT") {
            setSelectColumnSearch(
                <Select
                    showSearch
                    placeholder={L("FILL", "COMMON")}
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    onChange={(values: number) => _onChangeDataColumnSearch(values)}
                >
                    {(() => {
                        if (ConstPermission[value] === ConstPermission[ConstPermission.CREATE_BY])
                            // return (optionCategoryProduct.map((province: CateProReadIdAndNameDto) => (
                            //     <Option value={province.id}>{province.name}</Option>
                            // )))
                            return <Option value={"province.id"}>{"province.name"}</Option>;
                        // else if (
                        //     ConstPermission[value] === ConstPermission[ConstPermission.TYPES_RSC]
                        // ) {
                        //     return Object.keys(ConstTypesPermission).map((key: any) => {
                        //         if (!isNaN(Number(key))) {
                        //             return (
                        //                 <Option value={key}>
                        //                     {L(ConstTypesPermission[key], "CONST_TYPE_PERMISSION")}
                        //                 </Option>
                        //             );
                        //         }
                        //     });
                        //} 
                        else {
                            return <></>;
                        }
                    })()}
                </Select>
            );
        } else if (confirmTypesPermission(value) === "BOOLEAN") {
            setSelectColumnSearch(
                <Select
                    showSearch
                    placeholder={L("FILL", "COMMON")}
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    onChange={(values: number) => _onChangeDataColumnSearch(values)}
                >
                    <Option value={1}>TRUE</Option>
                    <Option value={0}>FALSE</Option>
                </Select>
            );
        } else if (confirmTypesPermission(value) === "NUMBER") {
            setSelectColumnSearch(
                <InputNumber
                    placeholder={L("KEYWORD", "COMMON")}
                    style={{ width: "100%" }}
                    formatter={(value) =>
                        `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    defaultValue={0}
                    onChange={_onChangeDataColumnSearch}
                />
            );
        } else if (confirmTypesPermission(value) === "STRING") {
            setSelectColumnSearch(
                <Input
                    placeholder={L("KEYWORD", "COMMON")}
                    onChange={(values: any) =>
                        _onChangeDataColumnSearch(values.target.value)
                    }
                />
            );
        } else {
            setSelectColumnSearch(
                <Input
                    placeholder={L("KEYWORD", "COMMON")}
                    value={""}
                    disabled={true}
                />
            );
        }
    }

    // khi cột value search thay đổi mà  key null  => xóa vaule
    const _onChangeDataColumnSearch = (value: any) => {
        if (propertySearch[0] === ConstPermission.NULL || value === 0) {
            setvaluesSearch([]);
        }
        setvaluesSearch([value]);
    };
    //#endregion
    //#region ORDER
    const [orderbyColumn, setOrderbyColumn] = useState<number>(0);
    const [orderbyTypes, setOrderbyTypes] = useState<number>(0);
    function _selectColumnOrder(value: number) {
        if (value === 0) {
            setOrderbyColumn(0);
            setOrderbyTypes(0);
        }
        setOrderbyColumn(value);
    }
    function _selectColumnOrderValue(value: any) {
        setOrderbyTypes(value);
    }
    //#endregion
    //#region CLICK SEARCH
    const _searchDataOnClick = (
        page: number,
        pageSizeTable: number | undefined,
        type: boolean
    ) => {
        if (type) {
            if (propertySearch.length === valuesSearch.length) {
                dispatch(
                    getPermissionStart({
                        propertySearch: propertySearch,
                        valuesSearch: valuesSearch,
                        propertyOrder: orderbyColumn,
                        valueOrderBy: orderbyTypes,
                        pageIndex: 1,
                        pageSize: pageSize,
                    })
                );
            } else {
                notification.warning({
                    message: "Thất Bại",
                    description:
                        "Bạn cần nhập dữ liệu tìm kiếm, không để dữ liệu mặc định!",
                    placement: "bottomRight",
                });
            }
        } else {
            if (propertySearch.length === valuesSearch.length) {
                dispatch(
                    getPermissionStart({
                        propertySearch: propertySearch,
                        valuesSearch: valuesSearch,
                        propertyOrder: orderbyColumn,
                        valueOrderBy: orderbyTypes,
                        pageIndex: page,
                        pageSize: pageSizeTable === undefined ? 20 : pageSizeTable,
                    })
                );
            } else {
                notification.warning({
                    message: "Thất Bại",
                    description:
                        "Bạn cần nhập dữ liệu tìm kiếm, không để dữ liệu mặc định!",
                    placement: "bottomRight",
                });
            }
        }
    };
    //#endregion
    //#region RESTART
    const _restartData = () => {
        dispatch(
            getPermissionStart({
                propertySearch: [],
                valuesSearch: [],
                propertyOrder: 0,
                valueOrderBy: 1,
                pageIndex: 1,
                pageSize: 20,
            })
        );
    };
    //#endregion
    //#region TABLE
    const columns = [
        {
            title: L("NAME", "CONST_TYPE_PERMISSION"),
            dataIndex: "name",
        },
        {
            title: L("IS_ACTIVE", "CONST_TYPE_PERMISSION"),
            dataIndex: "isActive",
            key: "isActive",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("ATOMIC_NAME", "CONST_TYPE_PERMISSION"),
            dataIndex: "atomicName",
        },
        {
            title: L("LEVEL_PERMISSION", "CONST_TYPE_PERMISSION"),
            dataIndex: "levelPermition",
        },
        {
            title: L("PERMISSION_NAME", "CONST_TYPE_PERMISSION"),
            dataIndex: "permissionName",
        },
        {
            title: L("CREATE_BY_NAME", "CONST_TYPE_PERMISSION"),
            dataIndex: "createByName",
            render: (text: string) =>
                text.toUpperCase() === "ADMIN" || text.toUpperCase() === "SYSTEM" ? (
                    <Tag color="#b3d4ff">{text}</Tag>
                ) : (
                    <Tag color="#2db7f5">{text}</Tag>
                ),
        },
        {
            title: L("CREATE_DATE_UTC", "CONST_TYPE_PERMISSION"),
            dataIndex: "updatedOnUtc",
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("UPDATE_DATE_UTC", "CONST_TYPE_PERMISSION"),
            dataIndex: "createdOnUtc",
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("ACTION", "COMMON"),
            dataIndex: "",
            key: "x",
            width: 120,
            render: (text: PermissionReadDto) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title={L("EDIT", "COMMON")}>
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => {
                                onFill(text);
                            }}
                        ></Button>
                    </Tooltip>
                    <Tooltip title={L("MAP", "COMMON")}>
                        <Button
                            type="link"
                            disabled={!text.isActive}
                            icon={<PullRequestOutlined />}
                            onClick={() => _mapPermessionPtResource(text.id)}
                        ></Button>
                    </Tooltip>
                </div>
            ),
        },
    ];
    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>(
        []
    );
    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: PermissionReadDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: PermissionReadDto) => ({
            //disabled: record.isActive === false,
            name: record.name,
        }),
    };
    //#endregion
    //#region REMOVE
    const _removeItemSelect = () => {
        Modal.confirm({
            title: <>{L("WANNING_PROCESSS_DELETE", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_PROCESSS_DELETE", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                dispatch(deletePermissionStart(dataSelectFromTable));
                _restartData();
            },
        });
    };
    //#endregion
    //#region EDIT STATUS
    const _editItemSelect = () => {
        Modal.confirm({
            title: <>{L("WANNING_EDIT", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_EDIT", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                dispatch(
                    editStatusPermissionStart({
                        ids: dataSelectFromTable,
                        types: ConstPermission.IS_ACTIVE,
                    })
                );
                _restartData();
            },
        });
    };
    //#endregion
    //#region INSERT OR UPDATE FORM DATA
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isModalAdd, setisModalAdd] = useState(false);
    const [dataBeginEdit, setdataBeginEdit] = useState<
        PermissionReadDto | undefined
    >(undefined);
    const [form] = Form.useForm();

    const onFill = (value: PermissionReadDto | undefined) => {
        setdataBeginEdit(value);
        if (value === undefined) {
            setisModalAdd(true);
            form.resetFields();
            setisModalVisible(true);
        } else {
            setisModalAdd(false);
            form.setFieldsValue(value);
            setisModalVisible(true);
        }
    };

    const _onCancelModalAddOrEdit = () => {
        form
            .validateFields()
            .then((values: PermissionReadDto) => {
                if (
                    values.description !== dataBeginEdit?.description ||
                    values.name !== dataBeginEdit?.name ||
                    values.isActive !== dataBeginEdit?.isActive
                ) {
                    _notificationEdit();
                } else {
                    form.setFieldsValue(undefined);
                    setisModalVisible(false);
                }
            })
            .catch((values) => {
                if (
                    values.values.description !== undefined ||
                    values.values.name !== undefined ||
                    values.values.typesRsc !== undefined ||
                    values.values.isActive !== undefined
                ) {
                    _notificationEdit();
                } else {
                    form.setFieldsValue(undefined);
                    setisModalVisible(false);
                }
            });
    };

    const _notificationEdit = () => {
        Modal.confirm({
            title: <>{L("WANNING_PROCESSS_DELETE", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_CANCEL_EDIT", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                form.setFieldsValue(undefined);
                setisModalVisible(false);
            },
            onCancel: () => {
                setisModalVisible(true);
            },
        });
    };

    const _onOkModalAddOrEdit = () => {
        form.validateFields().then((values) => {
            dispatch(insertOrUpdatePermissionStart(values));
        });
    };
    //#endregion
    //#region  CHART
    interface yyy {
        name: string;
        uv0: number;
        uv1: number;
        uv2: number;
        uv3: number;
        uv4: number;
        uv5: number;
    }
    const data: yyy[] = [];
    const renderData = () => {
        for (var i = 0; i <= 10; i++) {
            data.push({
                name: "ATC-" + i,
                uv0: Math.floor(Math.random() * 500),
                uv1: Math.floor(Math.random() * 500),
                uv2: Math.floor(Math.random() * 500),
                uv3: Math.floor(Math.random() * 500),
                uv4: Math.floor(Math.random() * 500),
                uv5: Math.floor(Math.random() * 500),
            });
        }
    };
    //#endregion
    //#region  SEARCH SELCECT

    let timeout: any;
    let currentValue: any;

    const _handleSearchModal = (value: any) => {
        console.log(timeout);
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        timeout = setTimeout(() => dispatch(searchSummaryPermissionStart({ text: value })), 1000);
    };

    const _handleChangeModal = (value: any) => {

    };

    //#endregion
    //#region  SHOW EDIT MAPPING
    const [isModalVisibleMapping, setisModalVisibleMapping] = useState(false);
    const [idPermessionSelect, setidPermessionSelect] = useState(0);
    const _mapPermessionPtResource = (id: number) => {
        console.log("first", id);
        setisModalVisibleMapping(true);
        setidPermessionSelect(id);
    }
    //#endregion
    return (
        <>
            {renderData()}
            <ChartComponent<yyy>
                data={data}
                loading={loadingTable}
                title={L("TITLE_ALL_CHART", "CONST_TYPE_PERMISSION")}
                keyGen={["uv1", "uv2", "uv3", "uv4", "uv5", "uv0"]}
            />
            <Card
                title={L("TITLE_ALL_TABLE", "CONST_TYPE_PERMISSION")}
                size="small"
                type="inner"
            >
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <Row gutter={[10, 10]}>
                            <Col span={1}>
                                <Tooltip placement="bottom" title={L("REFRESH", "COMMON")}>
                                    <Button
                                        loading={loadingAll}
                                        block
                                        icon={<RedoOutlined />}
                                        onClick={() => _restartData()}
                                    ></Button>
                                </Tooltip>
                            </Col>
                            <Col span={1}>
                                <Tooltip placement="bottom" title={L("DELETE", "COMMON")}>
                                    <Button
                                        loading={loadingAll}
                                        onClick={() => _removeItemSelect()}
                                        disabled={dataSelectFromTable.length === 0}
                                        block
                                        icon={<DeleteOutlined />}
                                    ></Button>
                                </Tooltip>
                            </Col>
                            <Col span={1}>
                                <Tooltip placement="bottom" title={L("CHANGE", "COMMON")}>
                                    <Button
                                        loading={loadingAll}
                                        onClick={() => _editItemSelect()}
                                        disabled={dataSelectFromTable.length === 0}
                                        block
                                        icon={<RetweetOutlined />}
                                    ></Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip placement="top" title={L("REPORT_FILE", "COMMON")}>
                                    <Select
                                        style={{ width: "100%" }}
                                        placeholder={L("REPORT_FILE", "COMMON")}
                                    >
                                        <Option value={1}>{L("EXCEL", "COMMON")}</Option>
                                        <Option value={2}>{L("PDF", "COMMON")}</Option>
                                        <Option value={3}>{L("ALL", "COMMON")}</Option>
                                    </Select>
                                </Tooltip>
                            </Col>
                            <Col span={1}>
                                <Tooltip placement="bottom" title={L("ADD", "COMMON")}>
                                    <Button
                                        loading={loadingAll}
                                        onClick={() => {
                                            onFill(undefined);
                                        }}
                                        block
                                        icon={<PlusOutlined />}
                                    ></Button>
                                </Tooltip>
                            </Col>
                            <Col span={4}>
                                <Select
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    disabled={loadingAll}
                                    placeholder={L("SELECT", "COMMON")}
                                    filterOption={(input, option: any) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value: number) => {
                                        _selectColumnSearch(value);
                                    }}
                                    value={
                                        propertySearch[0] === "" ? undefined : propertySearch[0]
                                    }
                                >
                                    {Object.keys(ConstPermission).map((key: any) => {
                                        if (!isNaN(Number(key))) {
                                            return (
                                                <Option value={key}>
                                                    {L(ConstPermission[key], "CONST_TYPE_PERMISSION")}
                                                </Option>
                                            );
                                        }
                                    })}
                                </Select>
                            </Col>
                            <Col span={6}>{SelectColumnSearch}</Col>
                            <Col span={4}>
                                <Select
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    filterOption={(input, option: any) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    defaultValue={orderbyColumn === 0 ? undefined : orderbyColumn}
                                    disabled={loadingAll}
                                    placeholder={L("SORT", "COMMON")}
                                    value={orderbyColumn === 0 ? undefined : orderbyColumn}
                                    onChange={_selectColumnOrder}
                                >
                                    {Object.keys(ConstPermission).map((key: any) => {
                                        if (!isNaN(Number(key))) {
                                            return (
                                                <Option value={key}>
                                                    {L(ConstPermission[key], "CONST_TYPE_PERMISSION")}
                                                </Option>
                                            );
                                        }
                                    })}
                                </Select>
                            </Col>
                            <Col span={3}>
                                <Select
                                    optionFilterProp="children"
                                    style={{ width: "100%" }}
                                    filterOption={(input, option: any) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    disabled={orderbyColumn === 0}
                                    onChange={(value: any) => _selectColumnOrderValue(value)}
                                    placeholder={L("BY", "COMMON")}
                                    value={orderbyTypes === undefined ? undefined : orderbyTypes}
                                    defaultValue={
                                        orderbyTypes === undefined ? undefined : orderbyTypes
                                    }
                                >
                                    {Object.keys(OrderByProperty).map((key: any) => {
                                        if (!isNaN(Number(key))) {
                                            return (
                                                <Option value={key}>
                                                    {L(OrderByProperty[key], "COMMON")}
                                                </Option>
                                            );
                                        }
                                    })}
                                </Select>
                            </Col>
                            <Col span={1}>
                                <Tooltip
                                    placement="bottom"
                                    title={L("SEARCH_BUTTON", "COMMON")}
                                >
                                    <Button
                                        disabled={loadingAll}
                                        type="primary"
                                        icon={<SearchOutlined />}
                                        onClick={() => _searchDataOnClick(0, 0, true)}
                                    ></Button>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ margin: "10px 0", width: "100%" }}>
                        <Table
                            columns={columns}
                            dataSource={permissionData}
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                            }}
                            rowKey={(record: PermissionReadDto) => record.id}
                            loading={loadingTable}
                            style={{ width: "100%" }}
                            size="small"
                            pagination={{
                                pageSize: pageSize,
                                total: totalCount,
                                defaultCurrent: 1,
                                onChange: (page: number, pageSize?: number | undefined) =>
                                    _searchDataOnClick(page, pageSize, false),
                                showSizeChanger: true,
                                pageSizeOptions: ["5", "10", "20", "50", "100"],
                            }}
                        />
                    </Col>
                </Row>
            </Card>
            <Modal
                title={<>{isModalAdd ? L("ADD", "COMMON") : L("EDIT", "COMMON")}</>}
                visible={isModalVisible}
                onOk={() => {
                    _onOkModalAddOrEdit();
                }}
                onCancel={() => {
                    _onCancelModalAddOrEdit();
                }}
                okText={<>{L("OK", "COMMON")}</>}
                cancelText={<>{L("CANCEL", "COMMON")}</>}
                maskClosable={false}
                confirmLoading={loadingButton}
            >
                <Form layout="horizontal" {...formItemLayout} form={form}>
                    <Form.Item
                        label={L("ID", "CONST_TYPE_PERMISSION")}
                        name="id"
                        hidden={isModalAdd}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label={L("NAME", "CONST_TYPE_PERMISSION")}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={L("ATOMIC_ID", "CONST_TYPE_PERMISSION")}
                        name="atomicId"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Select showSearch optionFilterProp="children"
                            filterOption={(input: any, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>

                            {atomicSummaryRead.map((province: AtomicSummaryReadDto) => (
                                <Option value={province.id}>{province.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={L("PERMISSION_ID", "CONST_TYPE_PERMISSION")}
                        name="permissionId"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            //value={SearchSelectModal.value}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={(value: any) => _handleSearchModal(value)}
                            onChange={(value: any) => _handleChangeModal(value)}
                            notFoundContent={null}
                        >
                            {permissionSummaryRead.map((province: PermissionSummaryReadDto) => (
                                <Option value={province.id}>{province.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={L("DESCRIPTION", "CONST_TYPE_PERMISSION")}
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={L("IS_ACTIVE", "CONST_TYPE_PERMISSION")}
                        name="isActive"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={<>{L("EDIT_PERMISSION_FT_RESOURCE", "CONST_TYPE_PERMISSION")}</>}
                visible={isModalVisibleMapping}
                footer={null}
                className="modalMapPermission"
                style={{ width: '70%' }}
                onCancel={() => {
                    setisModalVisibleMapping(false);
                    setidPermessionSelect(0);
                }}
                maskClosable={false}
            >
                <PermissionFtResourceComponent idPermission={idPermessionSelect} />
            </Modal>
        </>
    )
}