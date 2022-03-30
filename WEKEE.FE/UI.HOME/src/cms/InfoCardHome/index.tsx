//#region  import
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors';
import { watchPageStart } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoading } from './selectors';
import { Badge, Button, Checkbox, Col, Collapse, Dropdown, Form, Input, Menu, Row } from 'antd';
import { CaretRightOutlined, CheckOutlined, DesktopOutlined, EllipsisOutlined, LockOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
declare var abp: any;
const { Panel } = Collapse;
//#endregion
export interface IInfoCardHomeProps {
    location: any;
}
const key = 'infomatyonCardHome';
const stateSelector = createStructuredSelector<any, any>({
    loading: makeSelectLoading()
});

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
export default function InfoCardHome(props: IInfoCardHomeProps) {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);

    const dispatch = useDispatch();
    const { loading } = useSelector(stateSelector);
    useEffect(() => {
        dispatch(watchPageStart());
    }, []);

    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

    return (
        <>
          <Dropdown
                trigger={['click']}
                overlay={
                    <Menu className="ccSjlOHyqP">
                        <div className="ygsRYzMMyV">
                            <span>Tài khoản</span>
                            <Dropdown
                                trigger={['click']}
                                overlay={<Menu className="ccSjlOHyqP">
                                    <Menu.Item key="sada" >
                                        <CheckOutlined /> Đánh dấu tất cả đã đọc
                                    </Menu.Item>
                                    <Menu.Item key="sadas" >
                                        <SettingOutlined />  Cài đặt thông báo
                                    </Menu.Item>
                                    <Menu.Item key="dasdsasdasda" >
                                        <DesktopOutlined />  Mở thông báo
                                    </Menu.Item>
                                </Menu>}>
                                <EllipsisOutlined className='YLvdaHYdIV' />
                            </Dropdown>
                        </div>
                        <Menu.Divider />
                        <div className="DXObXwsQyb">
                            <span>Mới nhất</span>
                            <span>Xem tất cả</span>
                        </div>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.serviceAlbumImage + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.serviceAlbumImage + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <div className="DXObXwsQyb">
                            <span>Trước đó</span>
                            <span></span>
                        </div>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.serviceAlbumImage + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.serviceAlbumImage + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.serviceAlbumImage + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login">Đăng Nhập</a>
                        </Menu.Item>
                    </Menu>
                }>
                <Badge size='small' className="wuurxwiIVq">
                    <UserOutlined className='hdfutmacic' />
                </Badge>
            </Dropdown>
        </>
    )
}