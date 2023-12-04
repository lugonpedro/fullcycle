import {
  FindAllStorageCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.dto";

export default interface StoreCatalogFacadeInterface {
  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStorageCatalogFacadeOutputDto>;
}
