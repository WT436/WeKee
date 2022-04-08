import { PagedListOutput } from '../../../services/dto/pagedListOutput';
import { SearchOrderPageInput } from '../../../services/dto/searchOrderPageInput';
import http from '../../../services/httpService';
import { ProductAttributeInsertDto } from './dtos/productAttributeInsertDto';
import { ProductAttributeReadDto } from './dtos/productAttributeReadDto';

class AttributeProductService { // day

    //#region  createAttributeProduct
    public async createAttributeProductService(input: ProductAttributeInsertDto): Promise<Number> {
        let rs = await http.post('/product-attribute', input);
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }
    //#endregion

    //#region  getDataAttributeProductService
    public async getDataAttributeProductService(input: SearchOrderPageInput)
        : Promise<PagedListOutput<ProductAttributeReadDto>> {
        let rs = await http.get('/product-attribute', { params: input });
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }
    //#endregion

    public async authenticate() {
        let rs = await http.post('/get/log-in');
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }
}

export default new AttributeProductService(); // day