import React from 'react'
import { Card, Rate, Typography } from 'antd'
import { HeartTwoTone } from '@ant-design/icons';
const { Meta } = Card;
const { Text } = Typography;

declare var abp: any;
interface CardProduct {

}
var loadding = true;
export default function index() {
    return (
        <div className='hsurnjftyd'>
            <div className="dcp-khung">
                <span className="dcp-khung-before"></span>
                <span className="dcp-loi">
                    <span className="dcp-base">
                        <span>-20%</span>
                    </span>
                </span>
            </div>
            <a className="MgCJXPSMyz" href="/DSQUARED2-Ao-khoac-blazer-nam-pho-co-satin-S71BN0735-900/adsid=1">
                <img alt="example" src={abp.appServiceUrlStaticFile + '/album/product/wekee-wekee-d0527ac9bb587450edd57fda1520a241-011654-23092021--012154-23092021-S220x220.jpg'} />
            </a>
            <div className="ZDyVztAfXt">
                <div className="ayVIoBempd">
                    <span className='title-product'>Khởi Nghiệp Kinh Doanh Online - Bán Hàng Hiệu Quả Trên Facebook - Bán Hàng Hiệu Quả Trên Facebook - Bán Hàng Hiệu Quả Trên Facebook</span>
                </div>
                <div className='description-product'>
                    <p className='description-product-money'>
                        <Text strong type='danger'>10.000.000 ₫</Text>&nbsp;-&nbsp; <Text delete>11.000.000 ₫</Text>
                    </p>
                    <p className='description-product-promotion'><span>Mưa quà tặng</span><span>Tư vấn free</span><span>Giảm 15%</span></p>
                    <p className='description-product-evaluate'><a><HeartTwoTone twoToneColor="#eb2f96" /></a><Rate disabled allowHalf defaultValue={2.5} />(300)&nbsp;|&nbsp;<span>Đã bán : 1000</span></p>
                </div>
            </div>
        </div>
    )
}