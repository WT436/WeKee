//#region import
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { listFormRoleStart, RoleCreateStart, RoleEditStart, RoleRemoveFeCancel, RoleRemoveFeStart, RoleRemoveStart } from '../actions';
import {
    CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined,
    FilePdfOutlined, PlusOutlined, RedoOutlined, SearchOutlined
} from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Switch, Table, Tag } from 'antd'
import {
    makeSelectCompleted, makeSelectDataRole, makeSelectDataRemoveRole, makeSelectLoading, makeSelectPageIndex,
    makeSelectPageSize, makeSelectTotalCount, makeSelectTotalPages
} from '../selectors';
import { RoleDto } from '../dtos/roleDto';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;
//#endregion

interface IRoleComponentsProps {

}


const stateSelector = createStructuredSelector<any, any>({
    loading: makeSelectLoading(),
    completed: makeSelectCompleted(),
    pageIndex: makeSelectPageIndex(),
    pageSize: makeSelectPageSize(),
    totalCount: makeSelectTotalCount(),
    totalPages: makeSelectTotalPages(),
    dataRole: makeSelectDataRole(),
    dataRemoveRole: makeSelectDataRemoveRole()
});


export default function RoleComponents(props: IRoleComponentsProps) {

    const [checkCreate, setCheckCreate] = useState(false);
    const [checkRemove, setCheckRemove] = useState(true);
    const [checkRestart, setCheckRestart] = useState(true);
    const [isModalVisible, setisModalVisible] = useState(false);
    // 0 : bật tất cả 1: đang xóa, 2 đang update khóa/mở
    const [isDataChange, setisDataChange] = useState(0);
    const [SelectColumn, setSelectColumn] = useState(["All"]);
    const [valuesSearch, setvaluesSearch] = useState<string[]>([]);
    const [OrderbyColumn, setOrderbyColumn] = useState("");
    const [OrderbyTypes, setOrderbyTypes] = useState("");

    const dispatch = useDispatch();

    const {
        loading, dataRole, pageSize, totalCount, pageIndex,
        dataRemoveRole
    } = useSelector(stateSelector);

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: 50
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            sorter: {
                compare: (a: { name: string; }, b: { name: string; }) => a.name.length - b.name.length,
                multiple: 3,
            }
        },
        {
            title: 'Kích Hoạt',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text: boolean) => (text === true ? <Tag color="#2db7f5">True</Tag> : <Tag color="red">False</Tag>)
        },
        {
            title: 'Xóa Bỏ',
            dataIndex: 'isDelete',
            key: 'isDelete',
            render: (text: boolean) => (text === true ? <Tag color="#2db7f5">True</Tag> : <Tag color="red">False</Tag>)
        },
        {
            title: 'Cấp độ',
            dataIndex: 'levelRole'
        },
        {
            title: 'Role cha',
            dataIndex: 'roleMainName'
        },
        {
            title: 'Chi tiết',
            dataIndex: 'description'
        },
        {
            title: 'Người tạo',
            dataIndex: 'createByName'
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss.ms")
        },
        {
            title: 'Ngày update',
            dataIndex: 'updatedAt',
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss.ms")
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text: RoleDto) => (
                <div>
                    <Button type="link" icon={<EditOutlined />}
                        onClick={() => {
                            setCheckCreate(true);
                            onFill(text);
                        }}></Button>
                    &nbsp;
                    <Button type="link" icon={<DeleteOutlined />}
                        onClick={() => {
                            onRemove(text);
                        }}
                    ></Button>
                </div>
            )
        }
    ];

    useEffect(() => {
        dispatch(listFormRoleStart({
            pageIndex: pageIndex,
            pageSize: pageSize,
            propertyOrder: "",
            valueOrderBy: "",
            propertySearch: [],
            valuesSearch: []
        }));
    }, []);
 
    useEffect(() => {
        if (dataRemoveRole.length === 0) {
            setCheckRemove(true);
        }
        else {
            setCheckRemove(false);
            setCheckRestart(false);
        }
    }, [dataRemoveRole]);

    const [form] = Form.useForm();

    const onFill = (value: RoleDto) => {
        form.setFieldsValue(value);
    };

    const onRemove = (value: RoleDto) => {
        setisDataChange(1);
        //dispatch(ResourceRemoveFeStart(value.id, 1));
    };

    const onChangeIsStatus = (value: RoleDto) => {
        setisDataChange(2);
        //dispatch(ResourceRemoveFeStart(value.id, 2));
    };

    let onChange = (page: any, pageSize: any) => {
        dispatch(listFormRoleStart({
            pageIndex: page - 1,
            pageSize: pageSize,
            propertyOrder: OrderbyColumn,
            valueOrderBy: OrderbyTypes,
            propertySearch: [],
            valuesSearch: valuesSearch
        }));
    };

    const onFinish = (values: RoleDto) => {
        if (values.id === undefined) {
            //dispatch(ResourceCreateStart(values));
        }
        else {
            //dispatch(ResourceEditStart(values));
        }
    };

    const onReset = () => {
        setCheckCreate(false);
        form.resetFields();
    };

    const onGenderChange = (value: string) => {
        form.setFieldsValue({ types: value });
    };

    return (
        <Row gutter={[10, 10]}>
            <Col span={24}>
                <Row gutter={[10, 10]} >
                    <Col span={3}>
                        <Button loading={loading}
                            onClick={() => {
                                dispatch(listFormRoleStart({
                                    pageIndex: pageIndex,
                                    pageSize: pageSize,
                                    propertyOrder: "",
                                    valueOrderBy: "",
                                    propertySearch: [],
                                    valuesSearch: []
                                }));
                                setCheckRestart(true);
                                setisDataChange(0);
                                setSelectColumn(["All"]);
                            }}
                            disabled={checkRestart}
                            block icon={<RedoOutlined />}>Làm Mới</Button>
                    </Col>
                    <Col span={2}>
                        <Button loading={loading}
                            disabled={checkRemove}
                            block
                            onClick={() => {
                                //dispatch(ResourceRemoveStart(dataRemoveAction, isDataChange));
                                setisDataChange(0);
                            }}
                            icon={<CheckOutlined />}>Lưu</Button>
                    </Col>
                    <Col span={2}>
                        <Button loading={loading} disabled={checkRemove}
                            onClick={() => {
                                //dispatch(ResourceRemoveFeCancel());
                                setisDataChange(0);
                            }} block icon={<CloseOutlined />}>Hủy</Button>
                    </Col>
                    <Col span={3}>
                        <Button loading={loading} block icon={<FilePdfOutlined />}>Xuất File</Button>
                    </Col>
                    <Col span={3}>
                        <Button loading={loading} block icon={<PlusOutlined />}
                            onClick={() => setisModalVisible(true)}
                        >Thêm</Button>
                    </Col>
                    <Col span={4}>
                        {console.log()}
                        {
                            SelectColumn.indexOf("CreatedAt") === 0 || SelectColumn.indexOf("UpdatedAt") === 0
                                ? <RangePicker onChange={(date, dateString) => {
                                    setvaluesSearch([]);
                                    setvaluesSearch(dateString);
                                }
                                } />
                                : <Input onChange={(value) => {
                                    setvaluesSearch([]);
                                    setvaluesSearch([value.target.value]);
                                }} disabled={loading} placeholder="Từ khóa" />
                        }
                    </Col>
                    <Col span={3}>
                        <Select
                            optionFilterProp="children"
                            style={{ width: '100%' }}
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={loading}
                            defaultValue={SelectColumn}
                            onChange={(value: any) => {
                                setSelectColumn([]);
                                setSelectColumn(value);
                            }}
                        >
                            <Option value="All">Tìm kiếm Tất cả</Option>
                            <Option value="Id">Id</Option>
                            <Option value="Name">Tên</Option>
                            <Option value="TypesRsc">Kiểu</Option>
                            <Option value="Description">Chi tiết</Option>
                            <Option value="IsActive">Trạng thái</Option>
                            <Option value="CreatedAt">Ngày Tạo</Option>
                            <Option value="CreateBy">Người sửa</Option>
                            <Option value="UpdatedAt">Ngày cập nhật</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Select
                            optionFilterProp="children"
                            style={{ width: '100%' }}
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            defaultValue={"All"}
                            disabled={loading}
                            onChange={(value) => {
                                setOrderbyColumn(value.substring(0, value.lastIndexOf("_")));
                                setOrderbyTypes(value.substring(value.lastIndexOf("_") + 1));
                            }}
                        >
                            <Option value="All">Không Sắp Xếp</Option>
                            <Option value="Id_ASC ">Id tăng dần</Option>
                            <Option value="Id_DESC">Id giảm dần</Option>
                            <Option value="Name_ASC ">Tên tăng dần</Option>
                            <Option value="Name_DESC">Tên giảm dần</Option>
                            <Option value="TypesRsc_ASC ">Kiểu tăng dần</Option>
                            <Option value="TypesRsc_DESC">Kiểu giảm dần</Option>
                            <Option value="Description_ASC ">Chi tiết tăng dần</Option>
                            <Option value="Description_DESC">Chi tiết giảm dần</Option>
                            <Option value="IsActive_ASC ">Trạng thái tăng dần</Option>
                            <Option value="IsActive_DESC">Trạng thái giảm dần</Option>
                            <Option value="CreatedAt_ASC ">Ngày Tạo tăng dần</Option>
                            <Option value="CreatedAt_DESC">Ngày Tạo giảm dần</Option>
                            <Option value="CreateBy_ASC ">Người sửa tăng dần</Option>
                            <Option value="CreateBy_DESC">Người sửa giảm dần</Option>
                            <Option value="UpdatedAt_ASC ">Ngày cập nhật tăng dần</Option>
                            <Option value="UpdatedAt_DESC">Ngày cập nhật giảm dần</Option>
                        </Select>
                    </Col>
                    <Col span={1}>
                        <Button
                            disabled={loading}
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={() => {
                                dispatch(listFormRoleStart({
                                    pageIndex: 0,
                                    pageSize: 0,
                                    propertyOrder: OrderbyColumn,
                                    valueOrderBy: OrderbyTypes,
                                    propertySearch: SelectColumn,
                                    valuesSearch: valuesSearch
                                }));
                            }}
                        >
                        </Button>
                    </Col>
                </Row>
                <Row style={{ margin: '10px 0' }}>
                    <Table
                        columns={columns}
                        dataSource={dataRole}
                        rowKey={(record: RoleDto) => record.id.toString()}
                        loading={loading}
                        style={{ width: '100%' }}
                        scroll={{ y: 350 }}
                        size='small'
                        pagination={{
                            pageSize: pageSize,
                            total: totalCount,
                            defaultCurrent: 1,
                            onChange: onChange,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20', '50', '100']
                        }}
                    />
                </Row>
            </Col>
            <Modal title="Thêm mới hoặc sửa Resource"
                visible={isModalVisible}
                onCancel={() => setisModalVisible(false)}
                maskClosable={false}
                style={{ top: 20 }}
                footer={null}
            >
                <Row style={{
                    fontSize: '16px', fontFamily: 'monospace',
                    margin: '10px 0', padding: '20px 10px',
                    borderTop: '3px solid #150799', borderRadius: '5px',
                }}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        form={form}
                        onFinish={onFinish}
                        style={{ width: '100%', textAlign: 'left' }}
                    >
                        <Form.Item
                            label="ID"
                            name="id"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            label="Tên :"
                            name="name"
                            rules={[{ required: true, message: 'Tên không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Chi Tiết"
                            name="description"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="RoleId :"
                            name="roleId"
                            initialValue={1}
                        >
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item
                            label="level Role :"
                            name="levelRole"
                            initialValue={0}
                            rules={[{ required: true, message: 'level Role không được để trống!' }]}
                        >
                            <Input type='number' max='100' min='0' />
                        </Form.Item>
                        <Form.Item name="isActive" label="Active">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="isDelete" label="Delete">
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            label="Ngày sửa :"
                            name="dateCreate"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Row gutter={[10, 10]}>
                            <Col span={6}><Button loading={loading} onClick={onReset} block icon={<RedoOutlined />}>Làm Mới</Button></Col>
                            <Col span={6}><Button loading={loading} hidden={!checkCreate} type="primary" htmlType="submit" block icon={<CheckOutlined />}>Lưu</Button></Col>
                            <Col span={6}><Button loading={loading} hidden={!checkCreate} onClick={onReset} block icon={<CloseOutlined />}>Hủy</Button></Col>
                            <Col span={6}><Button loading={loading} hidden={checkCreate} type="primary" htmlType="submit" block icon={<PlusOutlined />}>Tạo mới</Button></Col>
                        </Row>
                    </Form>
                </Row>
            </Modal>
        </Row >
    )
}
