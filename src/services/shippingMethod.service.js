import createApiClient from './api.service';

class shippingMethodService {
  constructor(path = '/shipping-method') {
    this.api = createApiClient(path);
  }

  async getAll() {
    return (await this.api.get('/')).data;
  }
}

export default new shippingMethodService();
